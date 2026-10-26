import { NextResponse } from 'next/server';
import { authenticateCredentials } from '@/lib/users';
import { signJwt, sanitizeString, MAX_PASSWORD_LENGTH, MAX_INPUT_LENGTH } from '@/lib/security';
import {
  recordFailedAttempt,
  checkRateLimitStatus,
  resetRateLimit,
  getClientIp
} from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const ipKey = `login:ip:${ip}`;

    // 1. Check if the client IP is currently rate-limited (max 15 failed attempts per 15 min)
    const ipStatus = checkRateLimitStatus(ipKey);
    if (!ipStatus.isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: `অতিরিক্ত ভুল লগইন চেষ্টার কারণে আপনার আইপি সাময়িকভাবে স্থগিত করা হয়েছে। অনুগ্রহ করে ${Math.ceil(ipStatus.retryAfter / 60)} মিনিট পর পুনরায় চেষ্টা করুন।`,
          retryAfter: ipStatus.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(ipStatus.retryAfter),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { emailOrUsername, password, remember = true } = body;

    const rawIdentifier = (emailOrUsername || '').trim();
    const cleanIdentifier = sanitizeString(rawIdentifier).toLowerCase();

    // 2. Check if the target account is currently rate-limited (max 5 failed attempts per 15 min)
    const accountKey = cleanIdentifier ? `login:acc:${cleanIdentifier}` : null;
    if (accountKey) {
      const accStatus = checkRateLimitStatus(accountKey);
      if (!accStatus.isAllowed) {
        return NextResponse.json(
          {
            success: false,
            message: `অতিরিক্ত ভুল চেষ্টার কারণে এই অ্যাকাউন্টটি সাময়িকভাবে সুরক্ষিত করা হয়েছে। অনুগ্রহ করে ${Math.ceil(accStatus.retryAfter / 60)} মিনিট পর পুনরায় চেষ্টা করুন।`,
            retryAfter: accStatus.retryAfter
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(accStatus.retryAfter),
              'X-RateLimit-Limit': '5',
              'X-RateLimit-Remaining': '0'
            }
          }
        );
      }
    }

    // 3. Validate input format and lengths
    if (!cleanIdentifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'অনুগ্রহ করে ইমেইল/ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।'
        },
        { status: 400 }
      );
    }

    if (cleanIdentifier.length > MAX_INPUT_LENGTH || (typeof password === 'string' && password.length > MAX_PASSWORD_LENGTH)) {
      return NextResponse.json(
        {
          success: false,
          message: 'অনুরোধের সাইজ সীমা অতিক্রম করেছে।'
        },
        { status: 400 }
      );
    }

    // 4. Authenticate against persistent user store with bcrypt
    const authResult = await authenticateCredentials(cleanIdentifier, password);

    if (!authResult.success) {
      // Record failed attempts against BOTH client IP and the targeted account
      const ipFail = recordFailedAttempt(ipKey, 10, 15 * 60 * 1000);
      const accFail = accountKey ? recordFailedAttempt(accountKey, 5, 15 * 60 * 1000) : { remaining: 4 };
      const remainingAttempts = Math.min(ipFail.remaining, accFail.remaining);

      return NextResponse.json(
        {
          success: false,
          message: authResult.message,
          remainingAttempts
        },
        {
          status: 401,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': String(remainingAttempts)
          }
        }
      );
    }

    // 5. On successful login: reset rate limiter for both IP and Account
    resetRateLimit(ipKey);
    if (accountKey) resetRateLimit(accountKey);

    // Issue secure signed JWT
    const expiresIn = remember ? '7d' : '24h';
    const maxAgeSeconds = remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60;
    const token = await signJwt({
      userId: authResult.user.id,
      email: authResult.user.email,
      username: authResult.user.username,
      role: authResult.user.role
    }, expiresIn);

    // Prepare response with safe user payload (no password fields)
    const response = NextResponse.json(
      {
        success: true,
        message: 'লগইন সফল হয়েছে!',
        user: authResult.user,
        token
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '5'
        }
      }
    );

    // Set bulletproof HttpOnly Secure cookie
    response.cookies.set({
      name: 'madrasha_auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: maxAgeSeconds
    });

    return response;
  } catch (error) {
    console.error('Login route error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'সার্ভারে অভ্যন্তরীণ ত্রুটি ঘটেছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।'
      },
      { status: 500 }
    );
  }
}
