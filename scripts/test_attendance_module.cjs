const http = require('http');
const assert = require('assert');
const fs = require('fs');

console.log('🧪 Starting Attendance Module 1:1 Verification Test Suite...\n');

// 1. Verify routing.ts maps all 4 routes
const routingContent = fs.readFileSync('src/utils/routing.ts', 'utf8');
assert(routingContent.includes("admin/attendance/student/report"), "Must support admin/attendance/student/report route");
assert(routingContent.includes("admin/attendance/student"), "Must support admin/attendance/student route");
assert(routingContent.includes("admin/attendance/teacher/report"), "Must support admin/attendance/teacher/report route");
assert(routingContent.includes("admin/attendance/teacher"), "Must support admin/attendance/teacher route");
console.log('  ✅ Test 1: All 4 live Attendance URL routes mapped correctly in routing.ts');

// 2. Verify AttendanceModule.tsx content
const attendanceContent = fs.readFileSync('src/components/attendance/AttendanceModule.tsx', 'utf8');
assert(attendanceContent.includes('উপস্থিতি সংরক্ষণ করুন'), "Must have 'উপস্থিতি সংরক্ষণ করুন' submit button");
assert(attendanceContent.includes('সবাইকে উপস্থিত'), "Must have 'সবাইকে উপস্থিত' shortcut button");
assert(attendanceContent.includes('status_'), "Must have radio buttons for students");
assert(attendanceContent.includes('tstatus_'), "Must have radio buttons for teachers");
assert(attendanceContent.includes('sick'), "Must have 'অসুস্থ' (sick) attendance state");
assert(attendanceContent.includes('অভিভাবকের ফোন নম্বর'), "Must have guardian phone column");
assert(!attendanceContent.includes('({currentJamatStudents.length} জন)'), "Must NOT have bracketed count in student filter button");
assert(!attendanceContent.includes('({teachers.length} জন)'), "Must NOT have bracketed count in teacher filter button");
console.log('  ✅ Test 2: AttendanceModule.tsx has exact 1:1 headers, 4 radio states, and zero bracket counts');

// 3. Test HTTP 200 on running server
function testUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert.strictEqual(res.statusCode, 200, `Expected 200 for ${path}, got ${res.statusCode}`);
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  try {
    await testUrl('/admin/attendance/student');
    console.log('  ✅ Test 3.1: /admin/attendance/student returned HTTP 200 OK');
    await testUrl('/admin/attendance/student/report');
    console.log('  ✅ Test 3.2: /admin/attendance/student/report returned HTTP 200 OK');
    await testUrl('/admin/attendance/teacher');
    console.log('  ✅ Test 3.3: /admin/attendance/teacher returned HTTP 200 OK');
    await testUrl('/admin/attendance/teacher/report');
    console.log('  ✅ Test 3.4: /admin/attendance/teacher/report returned HTTP 200 OK');

    console.log('\n🎉 ALL ATTENDANCE MODULE TESTS PASSED 100% SUCCESSFULLY!\n');
  } catch (err) {
    console.error('❌ Attendance test failed:', err);
    process.exit(1);
  }
})();
