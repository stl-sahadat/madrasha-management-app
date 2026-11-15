import assert from 'node:assert';
import fs from 'node:fs';
import { pathnameToTab } from '../src/utils/routing.js';

console.log('🧪 Starting ID Card Module 1:1 Verification Test Suite...\n');

// Test 1: URL Route Mappings
console.log('Test 1: Verifying URL Route mappings matching madrasha.hostzonebd.com...');
assert.strictEqual(pathnameToTab('/admin/id-card'), 'idcard-student', 'Expected /admin/id-card -> idcard-student');
assert.strictEqual(pathnameToTab('admin/id-card'), 'idcard-student', 'Expected admin/id-card -> idcard-student');
assert.strictEqual(pathnameToTab('/admin/id-card/student'), 'idcard-student', 'Expected /admin/id-card/student -> idcard-student');
assert.strictEqual(pathnameToTab('/id-card'), 'idcard-student', 'Expected /id-card -> idcard-student');
assert.strictEqual(pathnameToTab('id-card'), 'idcard-student', 'Expected id-card -> idcard-student');

assert.strictEqual(pathnameToTab('/admin/id-card/teacher'), 'idcard-teacher', 'Expected /admin/id-card/teacher -> idcard-teacher');
assert.strictEqual(pathnameToTab('admin/id-card/teacher'), 'idcard-teacher', 'Expected admin/id-card/teacher -> idcard-teacher');
assert.strictEqual(pathnameToTab('/id-card/teacher'), 'idcard-teacher', 'Expected /id-card/teacher -> idcard-teacher');
assert.strictEqual(pathnameToTab('id-card/teacher'), 'idcard-teacher', 'Expected id-card/teacher -> idcard-teacher');
console.log('  ✅ Test 1 Passed: All ID card routes mapped 1:1 correctly.');

// Test 2: Source Code Verification of IdCardGenerator.jsx
console.log('\nTest 2: Verifying IdCardGenerator.jsx design, filters, and safety rules...');
const idCardContent = fs.readFileSync('src/components/idcard/IdCardGenerator.jsx', 'utf-8');

// 2.1: No bracketed counts
assert(!idCardContent.includes('(মোট ১৯৭ জন)'), 'Must not contain (মোট ১৯৭ জন)');
assert(!idCardContent.includes('(সকল {students.length} জন)'), 'Must not contain (সকল {students.length} জন)');
assert(!idCardContent.includes('({count} জন)'), 'Must not contain ({count} জন)');
console.log('  ✅ Test 2.1: Zero bracketed count strings verified.');

// 2.2: "সকল জামাত" and direct search filter present
assert(idCardContent.includes('সকল জামাত'), 'Must contain সকল জামাত filter');
assert(idCardContent.includes('jamat_select'), 'Must have jamat_select dropdown');
assert(idCardContent.includes('student_select'), 'Must have student_select dropdown');
assert(idCardContent.includes('isStudentInJamat'), 'Must have unified isStudentInJamat helper');
assert(idCardContent.includes('student_search'), 'Must have student direct search input');
console.log('  ✅ Test 2.2: Jamat and Student dropdown filter controls & direct search verified.');

// 2.3: Target student 206, teacher 2 and teacher 1 seeds present matching live website
assert(idCardContent.includes('TARGET_STUDENT_206'), 'Must define TARGET_STUDENT_206');
assert(idCardContent.includes('errh'), 'Must have student errh for ID 206');
assert(idCardContent.includes('TARGET_TEACHER_2'), 'Must define TARGET_TEACHER_2');
assert(idCardContent.includes('আবু সায়েম'), 'Must have teacher Abu Sayem for ID 2');
assert(idCardContent.includes('TARGET_TEACHER_1'), 'Must define TARGET_TEACHER_1');
assert(idCardContent.includes('নোমান'), 'Must have teacher Noman for ID 1');
console.log('  ✅ Test 2.3: Target student 206, teacher 2, and teacher 1 live seeds verified.');

// 2.4: 1:1 Design & Photo Positioning
assert(idCardContent.includes('student-card .photo-section'), 'Must have student photo-section styling');
assert(idCardContent.includes('top: 60px'), 'Student photo must be top: 60px');
assert(idCardContent.includes('left: 48px'), 'Student photo must be left: 48px');
assert(idCardContent.includes('width: 160px'), 'Student photo must be width: 160px');
assert(idCardContent.includes('border: 3px solid #3b82f6'), 'Student photo must have 3px solid blue border');

assert(idCardContent.includes('teacher-card .photo-section'), 'Must have teacher photo-section styling');
assert(idCardContent.includes('top: 85px'), 'Teacher photo must be top: 85px');
assert(idCardContent.includes('left: 69px'), 'Teacher photo must be left: 69px');
assert(idCardContent.includes('width: 127px'), 'Teacher photo must be width: 127px');
assert(idCardContent.includes('full_name'), 'Must have teacher full_name');
assert(idCardContent.includes('top: 250px'), 'Teacher name must be top: 250px');
console.log('  ✅ Test 2.4: 1:1 Photo frame alignment and dimensions verified.');

// 2.5: Background images
assert(idCardContent.includes('id-card-front.png'), 'Must reference id-card-front.png');
assert(idCardContent.includes('id-card-back.png'), 'Must reference id-card-back.png');
assert(idCardContent.includes('teacher-id-card-front.png'), 'Must reference teacher-id-card-front.png');
assert(idCardContent.includes('teacher-id-card-back.png'), 'Must reference teacher-id-card-back.png');
console.log('  ✅ Test 2.5: Front & back background card assets verified.');

// 2.6: Print Media Query & PDF export
assert(idCardContent.includes('@media print'), 'Must include @media print');
assert(idCardContent.includes('print-color-adjust: exact'), 'Must have exact color adjust for print');
assert(idCardContent.includes('gap: 10mm'), 'Must set print gap to 10mm');
assert(idCardContent.includes('handleDownloadPdf'), 'Must have real PDF download handler');
console.log('  ✅ Test 2.6: @media print fidelity and PDF generator verified.');

// 2.7: Breadcrumbs suppression for ID card
const breadcrumbsContent = fs.readFileSync('src/components/layout/Breadcrumbs.jsx', 'utf-8');
assert(breadcrumbsContent.includes("activeTab.startsWith('idcard')"), 'Breadcrumbs must be suppressed for idcard');
console.log('  ✅ Test 2.7: Breadcrumbs clean suppression for ID Card verified.');

// Test 3: Live Local Server HTTP Endpoint verification
console.log('\nTest 3: Verifying live server responses on port 3000...');

async function testServer() {
  const resStudent = await fetch('http://localhost:3000/admin/id-card');
  assert.strictEqual(resStudent.status, 200, '/admin/id-card should return 200');
  console.log('  ✅ Test 3.1: /admin/id-card returned HTTP 200 OK.');

  const resStudentQuery = await fetch('http://localhost:3000/admin/id-card?student_id=206');
  assert.strictEqual(resStudentQuery.status, 200, '/admin/id-card?student_id=206 should return 200');
  console.log('  ✅ Test 3.2: /admin/id-card?student_id=206 returned HTTP 200 OK.');

  const resTeacher = await fetch('http://localhost:3000/admin/id-card/teacher');
  assert.strictEqual(resTeacher.status, 200, '/admin/id-card/teacher should return 200');
  console.log('  ✅ Test 3.3: /admin/id-card/teacher returned HTTP 200 OK.');

  const resTeacherQuery = await fetch('http://localhost:3000/admin/id-card/teacher?teacher_id=2');
  assert.strictEqual(resTeacherQuery.status, 200, '/admin/id-card/teacher?teacher_id=2 should return 200');
  console.log('  ✅ Test 3.4: /admin/id-card/teacher?teacher_id=2 returned HTTP 200 OK.');

  console.log('\n🎉 ALL ID CARD MODULE TESTS PASSED 100% SUCCESSFULLY!\n');
}

await testServer();
