import { NextResponse } from 'next/server';
import { registerNewUser } from '@/lib/users';
import { signJwt } from '@/lib/security';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimitKey = `register:${ip}`;

    // Rate Limiting: 10 registrations per 15 minutes per IP
    const rateStatus = checkRateLimit(rateLimitKey, 10, 15 * 60 * 1000);

    if (!rateStatus.isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: `অতিরিক্ত রেজিস্ট্রেশন অনুরোধের কারণে সাময়িকভাবে স্থগিত করা হয়েছে। অনুগ্রহ করে ${Math.ceil(rateStatus.retryAfter / 60)} মিনিট পর পুনরায় চেষ্টা করুন।`
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const regResult = await registerNewUser(body);

    if (!regResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: regResult.message
        },
        { status: 400 }
      );
    }

    // Issue JWT for newly registered user
    const token = await signJwt({
      userId: regResult.user.id,
      email: regResult.user.email,
      username: regResult.user.username,
      role: regResult.user.role
    }, '7d');

    const response = NextResponse.json(
      {
        success: true,
        message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!',
        user: regResult.user,
        token
      },
      { status: 201 }
    );

    // Set HttpOnly cookie
    response.cookies.set({
      name: 'madrasha_auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'সার্ভারে অভ্যন্তরীণ ত্রুটি ঘটেছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।'
      },
      { status: 500 }
    );
  }
}
