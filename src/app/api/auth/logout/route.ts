import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'লগআউট সফল হয়েছে।'
  });

  // Clear HttpOnly auth cookie
  response.cookies.set({
    name: 'madrasha_auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  return response;
}
