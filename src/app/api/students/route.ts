import { NextResponse } from 'next/server';
import { StudentModel } from '@/lib/models/StudentModel';
import { VoucherModel } from '@/lib/models/VoucherModel';
import { sanitizeString } from '@/lib/security';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jamat = searchParams.get('jamat') || 'all';
    const search = searchParams.get('search') || '';
    const bloodGroup = searchParams.get('bloodGroup') || 'all';

    const students = StudentModel.getAll({ jamat, search, bloodGroup });
    return NextResponse.json({ success: true, count: students.length, students });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'শিক্ষার্থী তথ্য লোড করতে ব্যর্থ হয়েছে।' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.name || !body.jamat) {
      return NextResponse.json({ success: false, message: 'শিক্ষার্থীর নাম এবং জামাত প্রদান করা আবশ্যক।' }, { status: 400 });
    }

    const newStudent = StudentModel.create(body);

    // If admission fee was collected, auto-generate admission voucher
    const admissionFee = Number(body.admissionFee || 0);
    if (admissionFee > 0) {
      VoucherModel.create({
        type: 'deposit',
        category: 'ভর্তি ফি',
        amount: admissionFee,
        studentId: newStudent.id,
        account: body.account || 'হাতে নগদ',
        receiver: body.receiver || 'মুহতামিম',
        description: `নতুন ভর্তি ফি: ${newStudent.name} (রোল: ${newStudent.roll}, জামাত: ${newStudent.jamat})`
      });
    }

    return NextResponse.json({
      success: true,
      message: 'শিক্ষার্থী সফলভাবে ভর্তি করা হয়েছে।',
      student: newStudent
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, month, feeType, isPaid, amount, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'শিক্ষার্থী আইডি আবশ্যক।' }, { status: 400 });
    }

    let updated;
    if (month && feeType !== undefined) {
      updated = StudentModel.updateFeePayment(id, month, feeType, isPaid, amount);
    } else {
      updated = StudentModel.update(id, updates);
    }

    return NextResponse.json({ success: true, student: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
