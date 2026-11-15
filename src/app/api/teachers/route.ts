import { NextResponse } from 'next/server';
import { TeacherModel } from '@/lib/models/OtherModels';

export async function GET() {
  try {
    const teachers = TeacherModel.getAll();
    return NextResponse.json({ success: true, count: teachers.length, teachers });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body || !body.name) {
      return NextResponse.json({ success: false, message: 'শিক্ষকের নাম প্রদান আবশ্যক।' }, { status: 400 });
    }
    const teacher = TeacherModel.create(body);
    return NextResponse.json({ success: true, message: 'শিক্ষক সফলভাবে যুক্ত করা হয়েছে।', teacher });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
