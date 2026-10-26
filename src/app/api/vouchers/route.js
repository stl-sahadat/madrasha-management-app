import { NextResponse } from 'next/server';
import { VoucherModel } from '@/lib/models/VoucherModel';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const category = searchParams.get('category') || 'all';
    const date = searchParams.get('date') || null;
    const account = searchParams.get('account') || 'all';

    const vouchers = VoucherModel.getAll({ type, category, date, account });
    const summary = VoucherModel.getSummary();

    return NextResponse.json({
      success: true,
      count: vouchers.length,
      vouchers,
      summary
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.type || !body.category) {
      return NextResponse.json({ success: false, message: 'ভাউচারের ধরন ও খাত আবশ্যক।' }, { status: 400 });
    }

    const voucher = VoucherModel.create(body);
    const summary = VoucherModel.getSummary();

    return NextResponse.json({
      success: true,
      message: 'ভাউচার সফলভাবে সংরক্ষণ করা হয়েছে।',
      voucher,
      summary
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
