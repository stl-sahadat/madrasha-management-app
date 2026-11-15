import assert from 'node:assert';
import { countBengaliCharacters } from '../src/utils/smsUtils.ts';
import { pathnameToTab } from '../src/utils/routing.ts';

console.log('🧪 Starting SMS Module 1:1 Verification Test Suite...\n');

// Test 1: Bengali Character Counting Logic
console.log('Test 1: Verifying Bengali character counter formula...');
// Pure English text
const engText = "Hello World"; // 11 chars
const engCount = countBengaliCharacters(engText);
assert.strictEqual(engCount, 11, `Expected English count 11, got ${engCount}`);
assert.strictEqual(160 - engCount, 149, 'Expected 149 remaining chars');
console.log('  ✅ Test 1.1: English character count verified.');

// Bengali text (first Bengali character must add 91)
// "মা" has 2 chars (ম + া)
const banglaText = "মা";
const banglaCount = countBengaliCharacters(banglaText);
// First char 'ম' adds 91. Second char 'া' adds 1. Total = 92.
assert.strictEqual(banglaCount, 92, `Expected Bengali count 92, got ${banglaCount}`);
assert.strictEqual(160 - banglaCount, 68, 'Expected 68 remaining chars');
console.log('  ✅ Test 1.2: Bengali character UCS-2 jump (+91) formula verified.');

// Mixed English and Bengali: "A মা"
// 'A' -> 1
// ' ' -> 1
// 'ম' -> first Bengali char encountered -> +91
// 'া' -> +1
// Total: 1 + 1 + 91 + 1 = 94.
const mixedText = "A মা";
const mixedCount = countBengaliCharacters(mixedText);
assert.strictEqual(mixedCount, 94, `Expected mixed count 94, got ${mixedCount}`);
console.log('  ✅ Test 1.3: Mixed English-Bengali character count verified.');

// Test 2: URL Routing for SMS Pages
console.log('\nTest 2: Verifying URL Route mappings matching madrasha.hostzonebd.com...');
const clientTab = pathnameToTab('/admin/sms/send-to-client');
assert.strictEqual(clientTab, 'sms-student', `Expected 'sms-student' for /admin/sms/send-to-client, got ${clientTab}`);

const teacherTab = pathnameToTab('/admin/sms/send-to-teacher');
assert.strictEqual(teacherTab, 'sms-teacher', `Expected 'sms-teacher' for /admin/sms/send-to-teacher, got ${teacherTab}`);

const relativeClient = pathnameToTab('sms/send-to-client');
assert.strictEqual(relativeClient, 'sms-student', `Expected 'sms-student' for sms/send-to-client, got ${relativeClient}`);

const relativeTeacher = pathnameToTab('sms/send-to-teacher');
assert.strictEqual(relativeTeacher, 'sms-teacher', `Expected 'sms-teacher' for sms/send-to-teacher, got ${relativeTeacher}`);

const rootSms = pathnameToTab('/admin/sms');
assert.strictEqual(rootSms, 'sms-student', `Expected 'sms-student' for /admin/sms, got ${rootSms}`);

console.log('  ✅ Test 2 Passed: All SMS routes mapped 1:1 correctly.');

// Test 3: Backend API Endpoints
console.log('\nTest 3: Verifying live server matching API endpoints on port 3000...');

async function testEndpoints() {
  // Test /admin/settings/check-sms-balance
  const balanceRes = await fetch('http://localhost:3000/admin/settings/check-sms-balance');
  assert.strictEqual(balanceRes.status, 200, `/admin/settings/check-sms-balance status should be 200, got ${balanceRes.status}`);
  const balanceData = await balanceRes.json();
  console.log('  ✅ Test 3.1: /admin/settings/check-sms-balance returned 200 with:', balanceData);

  // Test /get-students
  const studentsRes = await fetch('http://localhost:3000/get-students');
  assert.strictEqual(studentsRes.status, 200, `/get-students status should be 200, got ${studentsRes.status}`);
  const studentsData = await studentsRes.json();
  assert(Array.isArray(studentsData), '/get-students should return an array');
  assert(studentsData.length > 0, '/get-students should return students list');
  assert(studentsData[0].id && studentsData[0].name, 'Student items should have id and name');
  console.log(`  ✅ Test 3.2: /get-students returned 200 with ${studentsData.length} students.`);

  // Test /get-teachers
  const teachersRes = await fetch('http://localhost:3000/get-teachers');
  assert.strictEqual(teachersRes.status, 200, `/get-teachers status should be 200, got ${teachersRes.status}`);
  const teachersData = await teachersRes.json();
  assert(Array.isArray(teachersData), '/get-teachers should return an array');
  assert(teachersData.length > 0, '/get-teachers should return teachers list');
  assert(teachersData[0].id && teachersData[0].name, 'Teacher items should have id and name');
  console.log(`  ✅ Test 3.3: /get-teachers returned 200 with ${teachersData.length} teachers.`);

  // Test 3.4 & 3.5: HTTP GET on the two SMS frontend routes
  const pageClient = await fetch('http://localhost:3000/admin/sms/send-to-client');
  assert.strictEqual(pageClient.status, 200, `/admin/sms/send-to-client should return 200`);
  console.log('  ✅ Test 3.4: /admin/sms/send-to-client returned HTTP 200 OK.');

  const pageTeacher = await fetch('http://localhost:3000/admin/sms/send-to-teacher');
  assert.strictEqual(pageTeacher.status, 200, `/admin/sms/send-to-teacher should return 200`);
  console.log('  ✅ Test 3.5: /admin/sms/send-to-teacher returned HTTP 200 OK.');

  // Test 3.6: /get-students with jamat query parameter
  const hifzRes = await fetch('http://localhost:3000/get-students?jamat=' + encodeURIComponent('হিফজ বিভাগ'));
  assert.strictEqual(hifzRes.status, 200, `/get-students?jamat should return 200`);
  const hifzData = await hifzRes.json();
  assert(hifzData.length > 0, 'Hifz students should be returned');
  assert(hifzData.every(s => s.jamat === 'হিফজ বিভাগ'), 'All students should belong to হিফজ বিভাগ');
  console.log(`  ✅ Test 3.6: /get-students?jamat=হিফজ বিভাগ correctly filtered ${hifzData.length} students.`);

  // Test 4: Verification of No Bracketed Counts in Source Files
  console.log('\nTest 4: Verifying NO "(মোট ১৯৭ জন)" or bracketed counts in Student selection components...');
  const fs = await import('node:fs');
  const filesToCheck = [
    'src/components/sms/SmsModule.tsx',
    'src/components/student/StudentSalaryEntry.tsx',
    'src/components/student/StudentKhurakiEntry.tsx',
    'src/components/student/StudentSalaryList.tsx',
    'src/components/student/StudentKhurakiList.tsx',
    'src/components/student/StudentFeeMatrix.tsx',
    'src/components/reports/StudentDepositReport.tsx',
    'src/components/reports/StudentSalaryDepositReport.tsx',
    'src/components/idcard/IdCardGenerator.tsx',
    'src/components/attendance/AttendanceModule.tsx',
    'src/components/student/StudentCertificate.tsx',
    'src/components/student/StudentProttoyonPotro.tsx',
    'src/components/student/StudentAdmissionForm.tsx'
  ];

  for (const file of filesToCheck) {
    const content = fs.readFileSync(file, 'utf-8');
    assert(!content.includes('(মোট ১৯৭ জন)'), `${file} must not contain '(মোট ১৯৭ জন)'`);
    assert(!content.includes('(সকল {students.length} জন)'), `${file} must not contain '(সকল {students.length} জন)'`);
    assert(!content.includes('({count} জন)'), `${file} must not contain '({count} জন)'`);
  }
  console.log('  ✅ Test 4 Passed: All 13 student selection components verified with zero bracketed counts.');

  console.log('\n🎉 ALL SMS MODULE AND JAMAT FILTER TESTS PASSED 100% SUCCESSFULLY!\n');
}

testEndpoints().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
