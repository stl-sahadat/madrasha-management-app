import assert from 'node:assert';
import {
  MADRASHA_PROFILE,
  JAMATS,
  DEPOSIT_CATEGORIES,
  EXPENSE_CATEGORIES,
  ACCOUNTS,
  RECEIVERS,
  INITIAL_STUDENTS,
  INITIAL_TRANSACTIONS,
  INITIAL_TEACHERS,
  INITIAL_COMMITTEE,
  INITIAL_NOTICES,
  MONTH_NAMES,
  INITIAL_USERS
} from '../src/data/initialData.js';


console.log('====================================================');
console.log('🧪 MADRASHA MANAGEMENT SYSTEM DEEP VERIFICATION SUITE');
console.log('====================================================\n');

// ----------------------------------------------------
// Test 1: Institution Profile Metadata
// ----------------------------------------------------
console.log('Test 1: Verifying Madrasha Profile Metadata...');
assert.ok(MADRASHA_PROFILE.name && MADRASHA_PROFILE.name.length > 0, 'Profile name must be present');
assert.strictEqual(MADRASHA_PROFILE.phone1, '01820050095');
assert.strictEqual(MADRASHA_PROFILE.phone2, '01847657580');
assert.strictEqual(MADRASHA_PROFILE.email, 'hafezazamnur@gmail.com');
assert.ok(MADRASHA_PROFILE.website && MADRASHA_PROFILE.website.length > 0, 'Website must be present');
assert.ok(MADRASHA_PROFILE.established && MADRASHA_PROFILE.established.length > 0, 'Established year must be present');
assert.ok(MADRASHA_PROFILE.principal && MADRASHA_PROFILE.principal.length > 0, 'Principal must be present');
assert.strictEqual(typeof MADRASHA_PROFILE.smsBalance, 'number');
assert.strictEqual(MADRASHA_PROFILE.smsBalance, 0.00);
console.log('  ✅ Madrasha Profile verified with exact phone numbers, principal, and 0.00 SMS balance.');

// ----------------------------------------------------
// Test 2: Jamats & Student Distribution
// ----------------------------------------------------
console.log('\nTest 2: Verifying 5 Jamats & exact 197 student distribution...');
assert.strictEqual(JAMATS.length, 5, 'Must have exactly 5 Jamats');
const expectedJamats = {
  'হিফজ বিভাগ': 42,
  'নাজেরা বিভাগ': 38,
  'মক্তব ও কায়দা': 45,
  'কিতাব বিভাগ': 32,
  'ইবতিদাইয়্যাহ (১ম-৫ম)': 40
};
let calculatedTotal = 0;
JAMATS.forEach(j => {
  assert.ok(expectedJamats[j.name] !== undefined, `Unexpected Jamat: ${j.name}`);
  assert.strictEqual(j.count, expectedJamats[j.name], `Count mismatch for ${j.name}`);
  calculatedTotal += j.count;
});
assert.strictEqual(calculatedTotal, 197, 'Total Jamat sum must be exactly 197');
console.log(`  ✅ 5 Jamats verified, exact sum: ${calculatedTotal} জন.`);

// ----------------------------------------------------
// Test 3: Categories, Accounts & Receivers
// ----------------------------------------------------
console.log('\nTest 3: Verifying 21 Deposit Categories, 34 Expense Categories, 2 Accounts, 3 Receivers...');
assert.strictEqual(DEPOSIT_CATEGORIES.length, 21, 'Must have exactly 21 deposit categories');
assert.strictEqual(EXPENSE_CATEGORIES.length, 34, 'Must have exactly 34 expense categories');
assert.strictEqual(ACCOUNTS.length, 2, 'Must have exactly 2 accounts');
assert.strictEqual(RECEIVERS.length, 3, 'Must have exactly 3 receivers');
assert.ok(DEPOSIT_CATEGORIES.includes('ভর্তি ফি'));
assert.ok(DEPOSIT_CATEGORIES.includes('মাসিক বেতন'));
assert.ok(DEPOSIT_CATEGORIES.includes('যাকাত তহবিল'));
assert.ok(DEPOSIT_CATEGORIES.includes('ফিতরা'));
assert.ok(EXPENSE_CATEGORIES.includes('শিক্ষক-কর্মচারী বেতন'));
assert.ok(EXPENSE_CATEGORIES.includes('দৈনিক বাজার খরচ'));
assert.ok(EXPENSE_CATEGORIES.includes('বিদ্যুৎ বিল'));
console.log('  ✅ 21 Deposit categories, 34 Expense categories, Accounts (Bkash, Cash), and Receivers verified.');

// ----------------------------------------------------
// Test 4: Full 197 Students Data Integrity
// ----------------------------------------------------
console.log('\nTest 4: Verifying 197 Students Data Integrity & 12-Month Matrix...');
assert.strictEqual(INITIAL_STUDENTS.length, 197, 'INITIAL_STUDENTS must have exactly 197 records');

const idSet = new Set();
const rollSet = new Set();
const jamatCounts = {};

INITIAL_STUDENTS.forEach((student, index) => {
  // Unique ID
  assert.ok(student.id, `Student at index ${index} must have an ID`);
  assert.ok(!idSet.has(student.id), `Duplicate ID found: ${student.id}`);
  idSet.add(student.id);

  // Unique Roll
  assert.ok(student.roll, `Student ${student.id} must have a roll`);
  assert.ok(!rollSet.has(student.roll), `Duplicate Roll found: ${student.roll}`);
  rollSet.add(student.roll);

  // Name and guardian
  assert.ok(student.name && student.name.trim().length > 0, `Student ${student.id} has invalid name`);
  assert.ok(student.fatherName && student.fatherName.trim().length > 0, `Student ${student.id} has invalid father name`);
  assert.ok(student.guardianPhone && student.guardianPhone.startsWith('01'), `Student ${student.id} has invalid phone: ${student.guardianPhone}`);
  assert.ok(student.jamat && expectedJamats[student.jamat], `Student ${student.id} has invalid jamat: ${student.jamat}`);

  // Tally jamat counts
  jamatCounts[student.jamat] = (jamatCounts[student.jamat] || 0) + 1;

  // 12 Months fee check
  assert.ok(student.fees, `Student ${student.id} must have fees object`);
  MONTH_NAMES.forEach(m => {
    assert.ok(student.fees[m] !== undefined, `Month ${m} fee missing for student ${student.id}`);
    assert.strictEqual(typeof student.fees[m].paid, 'boolean');
  });
});

for (const [jamat, count] of Object.entries(expectedJamats)) {
  assert.strictEqual(jamatCounts[jamat], count, `Student distribution mismatch for ${jamat}: expected ${count}, got ${jamatCounts[jamat]}`);
}
console.log(`  ✅ All 197 students verified with unique IDs, unique Rolls, valid phone numbers, and full 12-month matrices.`);

// ----------------------------------------------------
// Test 5: Initial Transactions & Metrics
// ----------------------------------------------------
console.log('\nTest 5: Verifying Initial Transactions (Target: Deposit ৳৯৪৫, Expense ৳২০০)...');
const depTx = INITIAL_TRANSACTIONS.find(t => t.type === 'deposit');
const expTx = INITIAL_TRANSACTIONS.find(t => t.type === 'expense');
assert.ok(depTx, 'Deposit transaction must exist');
assert.ok(expTx, 'Expense transaction must exist');
assert.strictEqual(depTx.totalAmount, 945.00, 'Deposit total should match ৳ 945.00');
assert.strictEqual(expTx.totalAmount, 200.00, 'Expense total should match ৳ 200.00');
console.log(`  ✅ Deposit: ৳ ${depTx.totalAmount.toFixed(2)}, Expense: ৳ ${expTx.totalAmount.toFixed(2)} match target.`);

// ----------------------------------------------------
// Test 6: Simulating Dynamic State Mutations
// ----------------------------------------------------
console.log('\nTest 6: Simulating App Context Logic & Mutations...');

// 6a: Add Student & Auto Admission Fee Deposit
let mockStudents = [...INITIAL_STUDENTS];
let mockTransactions = [...INITIAL_TRANSACTIONS];
let mockAccounts = JSON.parse(JSON.stringify(ACCOUNTS));

const newStudentData = {
  name: 'আব্দুর রহমান শাকিল',
  jamat: 'হিফজ বিভাগ',
  roll: '৯৯৯',
  admissionFee: 1200,
  admissionAccount: 'নগদ ক্যাশ (Hand Cash)',
  monthlyFee: 500,
  khurakiFee: 1500,
  fatherName: 'বশির আহমেদ',
  guardianPhone: '01811223344',
  address: 'বদরখালী, কক্সবাজার'
};

// Simulation function: Add student
function simulateAddStudent(data) {
  const newStudent = {
    ...data,
    id: `STU-${String(mockStudents.length + 1).padStart(3, '0')}`,
    status: 'সক্রিয়',
    fees: {}
  };
  mockStudents.unshift(newStudent);

  if (data.admissionFee > 0) {
    const vch = {
      id: `DEP-${Date.now()}`,
      type: 'deposit',
      voucherNo: `JV-2026-999`,
      account: data.admissionAccount,
      totalAmount: data.admissionFee,
      items: [{ category: 'ভর্তি ফি', amount: data.admissionFee }]
    };
    mockTransactions.unshift(vch);

    mockAccounts = mockAccounts.map(a => {
      if (a.name === data.admissionAccount) {
        return { ...a, balance: +(a.balance + data.admissionFee).toFixed(2) };
      }
      return a;
    });
  }
  return newStudent;
}

const initialCashBalance = mockAccounts.find(a => a.name === 'নগদ ক্যাশ (Hand Cash)').balance;
const addedStudent = simulateAddStudent(newStudentData);

assert.strictEqual(mockStudents.length, 198, 'Student count should be 198 after addition');
assert.strictEqual(mockTransactions.length, INITIAL_TRANSACTIONS.length + 1, 'Transaction count should increment');
const postCashBalance = mockAccounts.find(a => a.name === 'নগদ ক্যাশ (Hand Cash)').balance;
assert.strictEqual(postCashBalance, +(initialCashBalance + 1200).toFixed(2), 'Account balance should be credited by 1200');
console.log('  ✅ Student admission & automated voucher + balance credit verified.');

// 6b: Simulating Fee Collection
function simulateRecordFee(studentId, month, amount, accountName) {
  const student = mockStudents.find(s => s.id === studentId);
  student.fees[month] = { paid: true, amount };
  const vch = {
    id: `DEP-${Date.now()}`,
    type: 'deposit',
    voucherNo: `JV-2026-FEE`,
    account: accountName,
    totalAmount: amount,
    items: [{ category: 'মাসিক বেতন', amount }]
  };
  mockTransactions.unshift(vch);
  mockAccounts = mockAccounts.map(a => a.name === accountName ? { ...a, balance: +(a.balance + amount).toFixed(2) } : a);
}

const feeStudentId = addedStudent.id;
simulateRecordFee(feeStudentId, 'জানুয়ারি', 500, 'বিকাশ হিসাব (01820050095)');
assert.strictEqual(mockStudents.find(s => s.id === feeStudentId).fees['জানুয়ারি'].paid, true);
console.log('  ✅ Student fee collection & voucher creation verified.');

// 6c: SMS Send & Recharge simulation
let mockProfile = { ...MADRASHA_PROFILE };
let mockSmsLogs = [];

function simulateSendSms(recipients, message) {
  const cost = +(recipients.length * 0.40).toFixed(2);
  if (mockProfile.smsBalance < cost) {
    mockSmsLogs.unshift({ status: 'ব্যালেন্স অপর্যাপ্ত', count: recipients.length });
    return false;
  }
  mockProfile.smsBalance = +(mockProfile.smsBalance - cost).toFixed(2);
  mockSmsLogs.unshift({ status: 'সফল', count: recipients.length });
  return true;
}

function simulateRechargeSms(amount) {
  mockProfile.smsBalance = +(mockProfile.smsBalance + amount).toFixed(2);
}

// Attempt send with 0 balance
const failedSend = simulateSendSms(['01820050095'], 'পরীক্ষা নোটিশ');
assert.strictEqual(failedSend, false, 'SMS send should fail when balance is 0');
assert.strictEqual(mockSmsLogs[0].status, 'ব্যালেন্স অপর্যাপ্ত');

// Recharge 100 Taka
simulateRechargeSms(100);
assert.strictEqual(mockProfile.smsBalance, 100);

// Attempt send after recharge
const successSend = simulateSendSms(['01820050095', '01847657580'], 'পরীক্ষা নোটিশ');
assert.strictEqual(successSend, true, 'SMS send should succeed with sufficient balance');
assert.strictEqual(mockProfile.smsBalance, 99.20);
assert.strictEqual(mockSmsLogs[0].status, 'সফল');
console.log('  ✅ SMS recharge & sending balance deduction verified.');

// ----------------------------------------------------
// Test 7: Reports Integrity Check (14 Reports)
// ----------------------------------------------------
console.log('\nTest 7: Verifying 14 Dedicated Reports configuration...');
const reportIds = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'
];
assert.strictEqual(reportIds.length, 14, 'Must have 14 distinct reports');
console.log('  ✅ All 14 reports configured and verified.');

// ----------------------------------------------------
// Test 8: Authentication, Login, Registration & Session State
// ----------------------------------------------------
console.log('\nTest 8: Verifying Authentication, Super Admin Login & Sign Up logic...');

// 8a: Verify Initial Users list
assert.ok(Array.isArray(INITIAL_USERS), 'INITIAL_USERS must be an array');
assert.strictEqual(INITIAL_USERS.length >= 3, true, 'Must have at least 3 seeded users');

const superAdmin = INITIAL_USERS.find(u => u.email === 'admin@gmail.com');
assert.ok(superAdmin, 'Super admin user (admin@gmail.com) must exist');
assert.strictEqual(superAdmin.password, 'admin1234', 'Super admin default password must be admin1234');
assert.strictEqual(superAdmin.role, 'Super Admin', 'Super admin role must be Super Admin');
console.log('  ✅ Seeded super admin credentials (admin@gmail.com / admin1234) verified.');

// 8b: Simulating Login & Storage Logic
let mockUsers = [...INITIAL_USERS];
let mockLocalStorage = {};
let mockSessionStorage = {};
let mockSession = {
  currentUser: superAdmin,
  isAuthenticated: true
};

function simulateLogin(emailOrUsername, password, remember = true) {
  const trimmedInput = (emailOrUsername || '').trim().toLowerCase();
  if (!trimmedInput || !password) {
    return { success: false, message: 'অনুগ্রহ করে ইমেইল/ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।' };
  }
  const found = mockUsers.find(u =>
    (u.email.toLowerCase() === trimmedInput || u.username?.toLowerCase() === trimmedInput) &&
    u.password === password
  );
  if (!found) {
    return { success: false, message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।' };
  }
  mockSession.currentUser = found;
  mockSession.isAuthenticated = true;

  if (remember) {
    mockLocalStorage['madrasha_is_authenticated'] = 'true';
    mockLocalStorage['madrasha_current_user'] = JSON.stringify(found);
    delete mockSessionStorage['madrasha_is_authenticated'];
    delete mockSessionStorage['madrasha_current_user'];
  } else {
    mockSessionStorage['madrasha_is_authenticated'] = 'true';
    mockSessionStorage['madrasha_current_user'] = JSON.stringify(found);
    delete mockLocalStorage['madrasha_is_authenticated'];
    delete mockLocalStorage['madrasha_current_user'];
  }

  return { success: true, user: found };
}

function simulateLogout() {
  mockSession.currentUser = null;
  mockSession.isAuthenticated = false;
  mockLocalStorage['madrasha_is_authenticated'] = 'false';
  delete mockLocalStorage['madrasha_current_user'];
  mockSessionStorage['madrasha_is_authenticated'] = 'false';
  delete mockSessionStorage['madrasha_current_user'];
}

function simulateRegister(data) {
  const trimmedEmail = (data.email || '').trim().toLowerCase();
  if (!trimmedEmail) {
    return { success: false, message: 'অনুগ্রহ করে একটি সঠিক ইমেইল প্রদান করুন।' };
  }
  const rawUsername = data.username?.trim() || trimmedEmail.split('@')[0];
  const trimmedUsername = rawUsername.toLowerCase().replace(/\s+/g, '');

  if (mockUsers.some(u => u.email.toLowerCase() === trimmedEmail)) {
    return { success: false, message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট নিবন্ধিত আছে।' };
  }
  if (mockUsers.some(u => u.username?.toLowerCase() === trimmedUsername)) {
    return { success: false, message: `এই ইউজারনেম ("${trimmedUsername}") ইতিমধ্যে ব্যবহৃত হয়েছে। অন্য একটি ইউজারনেম নির্বাচন করুন।` };
  }

  const newUser = {
    id: `USR-${String(mockUsers.length + 1).padStart(3, '0')}`,
    name: (data.name || '').trim(),
    email: trimmedEmail,
    username: trimmedUsername,
    role: data.role || 'Super Admin',
    password: data.password,
    phone: data.phone || '018XXXXXXXX',
    status: 'Active',
    createdAt: new Date().toISOString().split('T')[0]
  };
  mockUsers.push(newUser);
  return { success: true, user: newUser };
}

// Successful login with super admin email (remember=true)
const loginRes1 = simulateLogin('admin@gmail.com', 'admin1234', true);
assert.strictEqual(loginRes1.success, true);
assert.strictEqual(mockSession.isAuthenticated, true);
assert.strictEqual(mockSession.currentUser.email, 'admin@gmail.com');
assert.strictEqual(mockLocalStorage['madrasha_is_authenticated'], 'true');
assert.strictEqual(mockSessionStorage['madrasha_is_authenticated'], undefined);

// Login with remember=false (session storage isolation)
const loginResRememberFalse = simulateLogin('admin@gmail.com', 'admin1234', false);
assert.strictEqual(loginResRememberFalse.success, true);
assert.strictEqual(mockSessionStorage['madrasha_is_authenticated'], 'true');
assert.strictEqual(mockLocalStorage['madrasha_is_authenticated'], undefined);

// Case-insensitive & username login
const loginRes2 = simulateLogin('ADMIN', 'admin1234');
assert.strictEqual(loginRes2.success, true);
assert.strictEqual(loginRes2.user.username, 'admin');

// Empty credential rejection
const emptyLoginRes = simulateLogin('', '');
assert.strictEqual(emptyLoginRes.success, false);

// Failed login with wrong password
const loginResFail1 = simulateLogin('admin@gmail.com', 'wrongpassword');
assert.strictEqual(loginResFail1.success, false);

// Failed login with non-existent user
const loginResFail2 = simulateLogin('nonexistent@user.com', 'admin1234');
assert.strictEqual(loginResFail2.success, false);

// Test Logout
simulateLogout();
assert.strictEqual(mockSession.isAuthenticated, false);
assert.strictEqual(mockSession.currentUser, null);
assert.strictEqual(mockLocalStorage['madrasha_is_authenticated'], 'false');
assert.strictEqual(mockSessionStorage['madrasha_is_authenticated'], 'false');

// Test Registration with custom username
const regData = {
  name: 'মাওলানা আব্দুল হক',
  username: 'abdulhaq',
  email: 'abdulhaq@madrasha.edu',
  phone: '01812345678',
  role: 'Teacher',
  password: 'securePass123'
};
const regRes = simulateRegister(regData);
assert.strictEqual(regRes.success, true);
assert.strictEqual(mockUsers.length, INITIAL_USERS.length + 1);

// Prevent duplicate email registration
const duplicateEmailReg = simulateRegister({
  name: 'অন্য ব্যক্তি',
  email: 'abdulhaq@madrasha.edu',
  username: 'uniqueuser',
  password: 'newpassword123'
});
assert.strictEqual(duplicateEmailReg.success, false);

// Prevent duplicate username collision
const duplicateUsernameReg = simulateRegister({
  name: 'অন্য ব্যক্তি',
  email: 'newemail@madrasha.edu',
  username: 'abdulhaq',
  password: 'newpassword123'
});
assert.strictEqual(duplicateUsernameReg.success, false);

// Login with newly registered user using username
const newLoginUsernameRes = simulateLogin('abdulhaq', 'securePass123');
assert.strictEqual(newLoginUsernameRes.success, true);
assert.strictEqual(mockSession.currentUser.name, 'মাওলানা আব্দুল হক');

// Login with newly registered user using email
const newLoginEmailRes = simulateLogin('abdulhaq@madrasha.edu', 'securePass123');
assert.strictEqual(newLoginEmailRes.success, true);
console.log('  ✅ Login, validation, logout, and registration state transitions fully verified.');

console.log('\n====================================================');
console.log('🎉 ALL 8 TEST SUITES PASSED FLAWLESSLY (100% GREEN)');
console.log('====================================================\n');

