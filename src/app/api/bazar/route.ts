import { NextResponse } from 'next/server';
import { BazarModel } from '@/lib/models/OtherModels';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'weekly';
    const items = BazarModel.getAll(type);
    return NextResponse.json({ success: true, count: items.length, items });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.itemName) {
      return NextResponse.json({ success: false, message: 'পণ্যের নাম প্রদান আবশ্যক।' }, { status: 400 });
    }
    const item = BazarModel.create(body);
    return NextResponse.json({ success: true, message: 'বাজার হিসাব সংরক্ষিত হয়েছে।', item });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
