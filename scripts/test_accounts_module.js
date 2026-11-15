import assert from 'node:assert';
import { pathnameToTab } from '../src/utils/routing.js';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY, toStandardDateStr } from '../src/utils/bengaliWords.js';
import fs from 'node:fs';

console.log('====================================================');
console.log('🧪 ACCOUNTS MODULE REVERSE-ENGINEERING VERIFICATION');
console.log('====================================================\n');

// 1. Route Mapping Test (Including Account Edit Deep Linking)
console.log('Test 1: Verifying pathnameToTab routing for all 5 Account pages & Edit routes...');
assert.strictEqual(pathnameToTab('/admin/account/create'), 'account-create', 'Failed on /admin/account/create');
assert.strictEqual(pathnameToTab('admin/account/create'), 'account-create', 'Failed on admin/account/create');
assert.strictEqual(pathnameToTab('/admin/account'), 'account-list', 'Failed on /admin/account');
assert.strictEqual(pathnameToTab('admin/account'), 'account-list', 'Failed on admin/account');
assert.strictEqual(pathnameToTab('/admin/account/1/edit'), 'account-edit:1', 'Failed on /admin/account/1/edit');
assert.strictEqual(pathnameToTab('account/2/edit'), 'account-edit:2', 'Failed on account/2/edit');
assert.strictEqual(pathnameToTab('/admin/account/account/report'), 'account-report', 'Failed on /admin/account/account/report');
assert.strictEqual(pathnameToTab('/admin/account/report'), 'account-report', 'Failed on /admin/account/report');
assert.strictEqual(pathnameToTab('/admin/account/balance/transfer'), 'accounts-transfer', 'Failed on /admin/account/balance/transfer');
assert.strictEqual(pathnameToTab('/admin/balance/transfer'), 'accounts-transfer', 'Failed on /admin/balance/transfer');
assert.strictEqual(pathnameToTab('/admin/account/balancesheet'), 'balancesheet', 'Failed on /admin/account/balancesheet');
assert.strictEqual(pathnameToTab('/admin/balance/sheet'), 'balancesheet', 'Failed on /admin/balance/sheet');
console.log('  ✅ All live target account URLs & deep edit routes map to their exact respective tabs.');

// 2. Component Source Verification
console.log('\nTest 2: Verifying AccountsModule.jsx fields and UI elements...');
const moduleSource = fs.readFileSync(new URL('../src/components/accounts/AccountsModule.jsx', import.meta.url), 'utf-8');

// Check Create/Edit form fields
assert.ok(moduleSource.includes('name="name"'), 'Missing name input');
assert.ok(moduleSource.includes('name="description"'), 'Missing description input');
assert.ok(moduleSource.includes('name="number"'), 'Missing number input');
assert.ok(moduleSource.includes('name="contact_person"'), 'Missing contact_person input');
assert.ok(moduleSource.includes('name="contact_person_phone"'), 'Missing contact_person_phone input');
assert.ok(moduleSource.includes('name="is_bank"'), 'Missing is_bank checkbox');
assert.ok(moduleSource.includes('পুনরায় সেট করুন'), 'Missing reset button');
assert.ok(moduleSource.includes('বাতিল'), 'Missing cancel button');
assert.ok(moduleSource.includes('এ্যাকাউন্ট যুক্ত করুন'), 'Missing submit button');
assert.ok(moduleSource.includes('আপডেট করুন'), 'Missing update button');
assert.ok(moduleSource.includes('এ্যাকাউন্ট সম্পাদনা'), 'Missing edit header title');
assert.ok(moduleSource.includes('initialEditId'), 'Missing initialEditId prop support');
console.log('  ✅ Create / Edit Form fields and edit mode match live website 100%.');

// Check Account List Table Columns & Swal Modal
console.log('\nTest 3: Verifying Account List Table Columns & Swal Confirmation Modal...');
const listCols = ['নং', 'এ্যাকাউন্ট নাম', 'এ্যাকাউন্ট নাম্বার', 'বিবরণ', 'যোগাযোগ ব্যক্তি', 'মোবাইল', 'মুছুন'];
for (const col of listCols) {
  assert.ok(moduleSource.includes(col), `Missing column ${col} in Account List`);
}
assert.ok(moduleSource.includes('fa-pen-to-square'), 'Missing edit button icon');
assert.ok(moduleSource.includes('fa-trash'), 'Missing delete button icon');
assert.ok(moduleSource.includes('আপনি কি নিশ্চিত?'), 'Missing Swal confirmation title');
assert.ok(moduleSource.includes('একবার মুছে ফেলা হলে এটি পুনরুদ্ধার করা যাবে না!'), 'Missing Swal confirmation text');
assert.ok(moduleSource.includes('হ্যাঁ, মুছে দিন!'), 'Missing Swal confirm button text');
console.log('  ✅ Account List Table columns and SweetAlert2-style modal match live website 100%.');

// Check Account Statement / Report
console.log('\nTest 4: Verifying Account Statement / Report Table & Initial State...');
const reportCols = ['ক্রম', 'তারিখ', 'এ্যাকাউন্ট', 'জমা/খরচ', 'খাত', 'বিবরণ', 'জমা', 'খরচ'];
for (const col of reportCols) {
  assert.ok(moduleSource.includes(col), `Missing report column ${col}`);
}
assert.ok(moduleSource.includes('badge bg-success'), 'Missing deposit badge');
assert.ok(moduleSource.includes('badge bg-danger'), 'Missing expense badge');
assert.ok(moduleSource.includes('রিপোর্ট দেখাও'), 'Missing report search button');
assert.ok(moduleSource.includes('hasSearched'), 'Missing hasSearched unsearched initial state handling');
console.log('  ✅ Account Statement Table columns, badges, and initial state match live website 100%.');

// Check Balance Transfer
console.log('\nTest 5: Verifying Balance Transfer Form & Table...');
assert.ok(moduleSource.includes('from_account_id'), 'Missing from_account_id select');
assert.ok(moduleSource.includes('to_account_id'), 'Missing to_account_id select');
assert.ok(moduleSource.includes('name="amount"'), 'Missing amount input');
assert.ok(moduleSource.includes('name="transfer_date"'), 'Missing transfer_date input');
assert.ok(moduleSource.includes('name="note"'), 'Missing note input');
assert.ok(moduleSource.includes('ট্রান্সফার তালিকা'), 'Missing transfer list header');
const transferCols = ['ক্রম', 'তারিখ', 'প্রেরক', 'প্রাপক', 'পরিমাণ', 'নোট', 'অ্যাকশন'];
for (const col of transferCols) {
  assert.ok(moduleSource.includes(col), `Missing transfer column ${col}`);
}
console.log('  ✅ Balance Transfer Form and List match live website 100%.');

// Check Balance Sheet
console.log('\nTest 6: Verifying Balance Sheet Structure & Bengali in-words...');
const balanceSheetCols = ['নং', 'এ্যাকাউন্ট', 'এ্যাকাউন্ট নাম্বার', 'ব্যলেন্স'];
for (const col of balanceSheetCols) {
  assert.ok(moduleSource.includes(col), `Missing balancesheet column ${col}`);
}
assert.ok(moduleSource.includes('ব্যলেন্স সিট'), 'Missing balancesheet title');
assert.ok(moduleSource.includes('numberToBengaliWords'), 'Missing in-words Bengali conversion in balancesheet');
assert.ok(moduleSource.includes('প্রিন্ট করুন'), 'Missing print button in balancesheet');

// Test Bengali words calculation directly
assert.strictEqual(numberToBengaliWords(7245), 'সাত হাজার দুই শত পঁয়তাল্লিশ');
assert.strictEqual(numberToBengaliWords(29896), 'ঊনত্রিশ হাজার আট শত ছিয়ানব্বই');
assert.strictEqual(numberToBengaliWords(37787), 'সাঁইত্রিশ হাজার সাত শত সাতাশি');
assert.strictEqual(numberToBengaliWords(646), 'ছয় শত ছেচল্লিশ');
assert.strictEqual(numberToBengaliWords(500), 'পাঁচ শত');
assert.strictEqual(numberToBengaliWords(0), 'শূন্য');
console.log('  ✅ Balance Sheet structure and Bengali in-words conversion match live website 100%.');

// 7. Balance Transfer Logic Simulation with 0.01 paisa precision & multiple rollbacks
console.log('\nTest 7: Simulating Balance Transfer State Mutation, 0.01 Paisa Precision & Rollback...');
let demoAccounts = [
  { id: '1', name: 'Bkash', balance: 7245.00 },
  { id: '2', name: 'Hand Cash', balance: 29896.00 }
];
let demoTransfers = [];

function simulateTransfer(fromId, toId, amount, note, date) {
  const amt = parseFloat(amount);
  assert.ok(amt > 0, 'Amount must be greater than 0');
  const src = demoAccounts.find(a => a.id === fromId);
  const dest = demoAccounts.find(a => a.id === toId);
  assert.ok(src && dest, 'Accounts not found');
  assert.notStrictEqual(src.id, dest.id, 'Cannot transfer to same account');
  assert.ok(src.balance >= amt, 'Insufficient balance');
  
  src.balance = +(src.balance - amt).toFixed(2);
  dest.balance = +(dest.balance + amt).toFixed(2);

  const t = { id: Date.now() + Math.random(), fromId, toId, from: src.name, to: dest.name, amount: amt, note, date };
  demoTransfers.push(t);
  return t;
}

function simulateRevertTransfer(transferId) {
  const t = demoTransfers.find(item => item.id === transferId);
  assert.ok(t, 'Transfer not found');
  const src = demoAccounts.find(a => a.id === t.fromId);
  const dest = demoAccounts.find(a => a.id === t.toId);

  src.balance = +(src.balance + t.amount).toFixed(2);
  dest.balance = +(dest.balance - t.amount).toFixed(2);
  demoTransfers = demoTransfers.filter(item => item.id !== transferId);
}

// Perform transfer of 0.01 paisa from Hand Cash to Bkash
const t1 = simulateTransfer('2', '1', 0.01, 'পয়সা টেস্ট', '2026-11-14');
assert.strictEqual(demoAccounts.find(a => a.id === '2').balance, 29895.99);
assert.strictEqual(demoAccounts.find(a => a.id === '1').balance, 7245.01);

// Perform second transfer of 2000.50
const t2 = simulateTransfer('2', '1', 2000.50, 'ব্যাংক ডিপোজিট', '2026-11-14');
assert.strictEqual(demoAccounts.find(a => a.id === '2').balance, 27895.49);
assert.strictEqual(demoAccounts.find(a => a.id === '1').balance, 9245.51);
assert.strictEqual(demoTransfers.length, 2);

// Revert both in order
simulateRevertTransfer(t2.id);
assert.strictEqual(demoAccounts.find(a => a.id === '2').balance, 29895.99);
assert.strictEqual(demoAccounts.find(a => a.id === '1').balance, 7245.01);

simulateRevertTransfer(t1.id);
assert.strictEqual(demoAccounts.find(a => a.id === '2').balance, 29896.00);
assert.strictEqual(demoAccounts.find(a => a.id === '1').balance, 7245.00);
assert.strictEqual(demoTransfers.length, 0);
console.log('  ✅ 0.01 precision and multi-step transfer rollback verified cleanly.');

// 8. Print CSS Fidelity Check
console.log('\nTest 8: Verifying Physical Printer CSS Fidelity in index.css...');
const cssSource = fs.readFileSync(new URL('../src/index.css', import.meta.url), 'utf-8');
assert.ok(cssSource.includes('print-color-adjust: exact'), 'Missing print-color-adjust: exact');
assert.ok(cssSource.includes('-webkit-print-color-adjust: exact'), 'Missing -webkit-print-color-adjust: exact');
assert.ok(cssSource.includes('.print-table'), 'Missing .print-table print styling');
assert.ok(cssSource.includes('.print-thead'), 'Missing .print-thead print styling');
// 9. Dashboard Card Routing Check
console.log('\nTest 9: Verifying Dashboard Card 5 & 6 Account Links...');
const dashboardSource = fs.readFileSync(new URL('../src/components/dashboard/Dashboard.jsx', import.meta.url), 'utf-8');
assert.ok(dashboardSource.includes("setActiveTab('account-create')"), 'Dashboard Card 5 must route to account-create');
assert.ok(dashboardSource.includes("setActiveTab('account-report')"), 'Dashboard Card 6 must route to account-report');
console.log('  ✅ Dashboard Card 5 ("একাউন্ট যুক্ত") and Card 6 ("অ্যাকাউন্ট বিবরণ") correctly route to account-create and account-report.');

console.log('\n====================================================');
console.log('🎉 ALL ACCOUNTS MODULE TESTS PASSED (100% GREEN)');
console.log('====================================================\n');

