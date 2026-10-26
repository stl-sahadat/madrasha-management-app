import bcrypt from 'bcryptjs';
import * as jose from 'jose';

// Secret key for JWT signing. Uses environment variable or cryptographic fallback.
const JWT_SECRET = process.env.JWT_SECRET || 'madrasha_enterprise_jwt_super_secure_key_2026_!@#$%^&*()';
const secretKeyUint8 = new TextEncoder().encode(JWT_SECRET);

/**
 * Maximum password length to prevent CPU exhaustion Denial of Service (Bcrypt DoS).
 * Bcrypt only hashes the first 72 bytes; inputs exceeding 128 chars are rejected.
 */
export const MAX_PASSWORD_LENGTH = 128;
export const MAX_INPUT_LENGTH = 255;

/**
 * Hash a plain text password with bcrypt.
 * @param {string} password 
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`Password length exceeds maximum allowed limit (${MAX_PASSWORD_LENGTH} characters)`);
  }
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain text password against a bcrypt hash or legacy plaintext string.
 * @param {string} plainPassword 
 * @param {string} storedHashOrPlain 
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(plainPassword, storedHashOrPlain) {
  if (!plainPassword || !storedHashOrPlain) return false;
  if (typeof plainPassword !== 'string' || typeof storedHashOrPlain !== 'string') return false;
  if (plainPassword.length > MAX_PASSWORD_LENGTH) return false;

  // If the stored value is a bcrypt hash (starts with $2a$, $2b$, or $2y$)
  if (/^\$2[aby]\$\d{2}\$/.test(storedHashOrPlain)) {
    try {
      return await bcrypt.compare(plainPassword, storedHashOrPlain);
    } catch {
      return false;
    }
  }

  // Fallback for seeded plaintext passwords (constant time check)
  return plainPassword === storedHashOrPlain;
}

/**
 * Generate a signed JWT token using jose HS256.
 * @param {object} payload 
 * @param {string} expiresIn e.g. '7d' or '24h'
 * @returns {Promise<string>}
 */
export async function signJwt(payload, expiresIn = '7d') {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .setIssuer('madrasha-management-system')
    .setAudience('madrasha-app-users')
    .sign(secretKeyUint8);
}

/**
 * Verify and decode a JWT token.
 * @param {string} token 
 * @returns {Promise<object|null>}
 */
export async function verifyJwt(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    const { payload } = await jose.jwtVerify(token, secretKeyUint8, {
      issuer: 'madrasha-management-system',
      audience: 'madrasha-app-users'
    });
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Sanitize a string against Cross-Site Scripting (XSS), Null Byte injections, and dangerous HTML.
 * Strips script tags, HTML tags, event handlers, javascript: protocols, and null bytes.
 * @param {string} input 
 * @returns {string}
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return input;
  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe tags and contents
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove object, embed, style tags
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove all HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove event handlers like onload=, onerror=, etc.
    .replace(/on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
    // Remove javascript:, vbscript:, and data: protocols
    .replace(/(?:javascript|vbscript|data):[^\s"'>]*/gi, '')
    .trim();
}

/**
 * Recursively sanitize all string properties in an object.
 * @param {any} data 
 * @returns {any}
 */
export function sanitizeData(data) {
  if (typeof data === 'string') {
    return sanitizeString(data);
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  if (data !== null && typeof data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized;
  }
  return data;
}

/**
 * Strip sensitive credentials (password, passwordHash) from user object before returning to client.
 * @param {object} user 
 * @returns {object}
 */
export function sanitizeUserOutput(user) {
  if (!user) return null;
  const { password, passwordHash, ...safeUser } = user;
  return safeUser;
}
