import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    system: 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা ম্যানেজমেন্ট সিস্টেম',
    runtime: 'Next.js 15 App Router + React 19',
    security: 'Enterprise Bulletproof (bcrypt + JWT + Rate Limiting + CSP)',
    timestamp: new Date().toISOString()
  });
}
