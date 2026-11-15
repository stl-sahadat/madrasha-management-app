import { NextResponse } from 'next/server';

export async function GET() {
  // Returns current SMS balance matching madrasha.hostzonebd.com /admin/settings/check-sms-balance
  return NextResponse.json(0, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}
