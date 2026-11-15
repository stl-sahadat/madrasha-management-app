import { NextResponse } from 'next/server';
import { TeacherModel } from '@/lib/models/OtherModels';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchText = (searchParams.get('search_text') || '').toLowerCase();
    let teachers = TeacherModel.getAll();

    if (searchText) {
      teachers = teachers.filter(t => 
        (t.name && t.name.toLowerCase().includes(searchText)) ||
        (t.designation && t.designation.toLowerCase().includes(searchText))
      );
    }

    // Exact format expected by /get-teachers on madrasha.hostzonebd.com
    const result = teachers.map(t => ({
      id: t.id,
      name: t.name,
      full_name: t.name,
      designation: t.designation,
      mobile: t.mobile || t.phone
    }));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json([]);
  }
}
