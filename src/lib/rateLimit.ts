// In-memory rate limiting store with sliding window
const rateLimitMap = new Map();

// Periodic cleanup of expired rate limit entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (entry.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Validates an IPv4 or IPv6 address string to prevent header injection or key manipulation.
 * @param {string} ip 
 * @returns {boolean}
 */
export function isValidIp(ip) {
  if (!ip || typeof ip !== 'string') return false;
  // IPv4 regex (0.0.0.0 - 255.255.255.255)
  const ipv4Regex = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip)) return true;
  // IPv6 basic regex
  const ipv6Regex = /^[0-9a-fA-F:]{2,39}$/;
  return ipv6Regex.test(ip);
}

/**
 * Check rate limit status WITHOUT incrementing the counter (read-only probe).
 * Useful to reject requests early if already locked out, saving CPU.
 * @param {string} key 
 * @returns {{ isAllowed: boolean, remaining: number, retryAfter: number }}
 */
export function checkRateLimitStatus(key) {
  if (!key) return { isAllowed: true, remaining: 5, retryAfter: 0 };
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || record.resetTime < now) {
    return { isAllowed: true, remaining: 5, retryAfter: 0 };
  }

  const isAllowed = record.count < record.limit;
  const remaining = Math.max(0, record.limit - record.count);
  const retryAfter = Math.ceil((record.resetTime - now) / 1000);

  return {
    isAllowed,
    remaining,
    retryAfter: isAllowed ? 0 : retryAfter
  };
}

/**
 * Record a failed attempt (e.g. wrong password) and return rate limit status.
 * @param {string} key Unique identifier, e.g. "login:ip:127.0.0.1" or "login:acc:admin"
 * @param {number} maxAttempts Maximum allowed failed attempts (default: 5)
 * @param {number} windowMs Time window in milliseconds (default: 15 minutes)
 * @returns {{ isAllowed: boolean, currentCount: number, limit: number, remaining: number, resetTime: number, retryAfter: number }}
 */
export function recordFailedAttempt(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  if (!key) return { isAllowed: true, currentCount: 0, limit: maxAttempts, remaining: maxAttempts, resetTime: 0, retryAfter: 0 };
  const now = Date.now();
  let record = rateLimitMap.get(key);

  if (!record || record.resetTime < now) {
    record = {
      count: 1,
      limit: maxAttempts,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(key, record);
    return {
      isAllowed: true,
      currentCount: 1,
      limit: maxAttempts,
      remaining: maxAttempts - 1,
      resetTime: record.resetTime,
      retryAfter: 0,
    };
  }

  record.count += 1;
  const isAllowed = record.count <= maxAttempts;
  const remaining = Math.max(0, maxAttempts - record.count);
  const retryAfter = Math.ceil((record.resetTime - now) / 1000);

  return {
    isAllowed,
    currentCount: record.count,
    limit: maxAttempts,
    remaining,
    resetTime: record.resetTime,
    retryAfter: isAllowed ? 0 : retryAfter,
  };
}

/**
 * Check and record an attempt for a given key (compatibility with existing tests).
 * @param {string} key Unique identifier
 * @param {number} maxAttempts Maximum allowed requests within the window
 * @param {number} windowMs Time window in milliseconds
 * @returns {{ isAllowed: boolean, currentCount: number, limit: number, remaining: number, resetTime: number, retryAfter: number }}
 */
export function checkRateLimit(key, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  return recordFailedAttempt(key, maxAttempts, windowMs);
}

/**
 * Reset rate limit counter for a key upon successful authentication.
 * @param {string} key 
 */
export function resetRateLimit(key) {
  if (key) rateLimitMap.delete(key);
}

/**
 * Extract and validate client IP from Next.js request headers.
 * Safely parses IP, strips port numbers, and rejects malformed inputs.
 * @param {Request} request 
 * @returns {string}
 */
export function getClientIp(request) {
  if (!request || !request.headers) return '127.0.0.1';

  // 1. Cloudflare connecting IP
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    const clean = cfConnectingIp.trim();
    if (isValidIp(clean)) return clean;
  }

  // 2. Nginx/Proxy Real IP
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    const clean = xRealIp.trim();
    if (isValidIp(clean)) return clean;
  }

  // 3. X-Forwarded-For (extract leftmost valid IP)
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',');
    for (const rawIp of ips) {
      let clean = rawIp.trim();
      // Strip port if formatted as ip:port
      if (clean.includes(':') && !clean.includes('::')) {
        const parts = clean.split(':');
        if (parts.length === 2 && isValidIp(parts[0])) {
          clean = parts[0];
        }
      }
      if (isValidIp(clean)) {
        return clean;
      }
    }
  }

  return '127.0.0.1';
}
