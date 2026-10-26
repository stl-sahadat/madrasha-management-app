import { NextResponse } from 'next/server';
import { DonorModel } from '@/lib/models/OtherModels';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const donors = DonorModel.getAll(type);
    return NextResponse.json({ success: true, count: donors.length, donors });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.name) {
      return NextResponse.json({ success: false, message: 'নাম প্রদান আবশ্যক।' }, { status: 400 });
    }
    const donor = DonorModel.create(body);
    return NextResponse.json({ success: true, message: 'সফলভাবে নিবন্ধিত হয়েছে।', donor });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
