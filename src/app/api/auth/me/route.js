import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/security';
import { findUserById } from '@/lib/users';
import { sanitizeUserOutput } from '@/lib/security';

export async function GET(request) {
  try {
    // 1. Check HttpOnly cookie first
    let token = request.cookies.get('madrasha_auth_token')?.value;

    // 2. Check Authorization header if cookie not present
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'অননুমোদিত অ্যাক্সেস (Unauthorized)' },
        { status: 401 }
      );
    }

    const payload = await verifyJwt(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { success: false, message: 'টোকেন অকার্যকর বা মেয়াদোত্তীর্ণ' },
        { status: 401 }
      );
    }

    const user = findUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: sanitizeUserOutput(user)
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { success: false, message: 'অভ্যন্তরীণ ত্রুটি' },
      { status: 500 }
    );
  }
}
