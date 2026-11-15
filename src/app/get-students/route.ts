import { NextResponse } from 'next/server';
import { StudentModel } from '@/lib/models/StudentModel';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('search_text') || '';
    const jamat = searchParams.get('jamat') || '';
    let students = StudentModel.getAll({ search: searchText });
    
    if (jamat && jamat !== 'all') {
      students = students.filter(s => s.jamat === jamat);
    }
    
    // Exact format expected by /get-students on madrasha.hostzonebd.com
    const result = students.map(s => ({
      id: s.id,
      name: s.name,
      roll: s.roll || s.admissionNo,
      jamat: s.jamat,
      guardian_phone: s.guardianPhone || s.phone,
      father_name: s.fatherName
    }));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json([]);
  }
}
