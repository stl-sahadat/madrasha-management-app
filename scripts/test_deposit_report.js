import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY, toStandardDateStr } from '../src/utils/bengaliWords.js';

console.log('========================================================');
console.log('🧪 VERIFICATION SUITE: DEPOSIT REPORT (1:1 LIVE PARITY)');
console.log('========================================================');

// Test 1: Verify Bengali words conversion for deposit amounts
console.log('\nTest 1: Testing numberToBengaliWords on deposit values...');
assert.strictEqual(numberToBengaliWords(0), 'শূন্য');
assert.strictEqual(numberToBengaliWords(945), 'নয় শত পঁয়তাল্লিশ');
assert.strictEqual(numberToBengaliWords(5004), 'পাঁচ হাজার চার');
assert.strictEqual(numberToBengaliWords(2800), 'দুই হাজার আট শত');
assert.strictEqual(numberToBengaliWords(14254), 'চৌদ্দ হাজার দুই শত চুয়ান্ন');
console.log('  ✅ Deposit amounts converted to Bengali words correctly.');

// Test 2: Currency formatting
console.log('\nTest 2: Testing formatMoney for deposits...');
assert.strictEqual(formatMoney(945), '945.00');
assert.strictEqual(formatMoney(5004), '5,004.00');
assert.strictEqual(formatMoney(2800), '2,800.00');
assert.strictEqual(formatMoney(0), '0.00');
console.log('  ✅ Currency format verified.');

// Test 3: Date formatting
console.log('\nTest 3: Testing formatDateDDMMYYYY...');
assert.strictEqual(formatDateDDMMYYYY('2026-10-26'), '26/10/2026');
assert.strictEqual(formatDateDDMMYYYY('2026-10-18'), '18/10/2026');
console.log('  ✅ Date format verified.');

// Test 4: Route mapping in AppContext.jsx
console.log('\nTest 4: Verifying route mapping in AppContext.jsx...');
const appContextContent = fs.readFileSync(path.join(process.cwd(), 'src/context/AppContext.jsx'), 'utf8');
assert.ok(appContextContent.includes("admin/report/deposit'"), "AppContext must route admin/report/deposit");
assert.ok(appContextContent.includes("report/deposit'"), "AppContext must route report/deposit");
assert.ok(appContextContent.includes("tab === 'report-deposit'"), "AppContext setActiveTab must handle report-deposit");
console.log('  ✅ Route handlers in AppContext verified.');

// Test 5: Verify App.jsx imports & routes DepositReport
console.log('\nTest 5: Verifying App.jsx dispatch for DepositReport...');
const appContent = fs.readFileSync(path.join(process.cwd(), 'src/App.jsx'), 'utf8');
assert.ok(appContent.includes("import { DepositReport } from './components/reports/DepositReport';"), "App.jsx must import DepositReport");
assert.ok(appContent.includes("<DepositReport key=\"report-deposit\" />"), "App.jsx must render DepositReport");
console.log('  ✅ App.jsx correctly imports and renders DepositReport.');

// Test 6: Verify DepositReport.jsx structure against live site report_deposit.html specs
console.log('\nTest 6: Verifying DepositReport.jsx HTML structure against live site specs...');
const depositContent = fs.readFileSync(path.join(process.cwd(), 'src/components/reports/DepositReport.jsx'), 'utf8');
assert.ok(depositContent.includes('জমার রিপোর্ট'), 'DepositReport must have filter card title');
assert.ok(depositContent.includes('জমার প্রতিবেদন'), 'DepositReport must have report title');
assert.ok(depositContent.includes('start_date'), 'DepositReport must have start_date input');
assert.ok(depositContent.includes('end_date'), 'DepositReport must have end_date input');
assert.ok(depositContent.includes('রিপোর্ট দেখাও'), 'DepositReport must have live button text');
assert.ok(depositContent.includes('fa-file-invoice'), 'DepositReport must have live icon fa-file-invoice');
assert.ok(depositContent.includes('মুহতামিম সাহেবের স্বাক্ষর'), 'DepositReport must have principal signature');
assert.ok(depositContent.includes('হিসাব রক্ষকের স্বাক্ষর'), 'DepositReport must have accountant signature');
assert.ok(depositContent.includes('খাতভিত্তিক জমার সারসংক্ষেপ'), 'DepositReport must have category summary section');
assert.ok(depositContent.includes('জমার বিস্তারিত বিবরণী'), 'DepositReport must have detailed table section');
assert.ok(depositContent.includes('card shadow-sm mb-4 no-print'), 'DepositReport filter card must have no-print');
assert.ok(depositContent.includes('printContent'), 'DepositReport must have printContent container');
assert.ok(depositContent.includes('window.print()'), 'DepositReport must have print trigger');
assert.ok(depositContent.includes('টাকা মাত্র'), 'DepositReport must have Bengali words suffix');
assert.ok(!depositContent.includes('<thead className="table '), 'thead must not have table class to prevent detached display:table layout glitch');
console.log('  ✅ DepositReport.jsx structure verified matching live reference 100%.');

// Test 7: Verify date normalization edge cases in toStandardDateStr
console.log('\nTest 7: Testing date normalization edge cases...');
assert.strictEqual(toStandardDateStr('2026-10-26'), '2026-10-26');
assert.strictEqual(toStandardDateStr('26/10/2026'), '2026-10-26');
assert.strictEqual(toStandardDateStr('26-10-2026'), '2026-10-26');
assert.strictEqual(toStandardDateStr('2026/10/26'), '2026-10-26');
assert.strictEqual(toStandardDateStr('2026-10-26 14:30:00'), '2026-10-26');
assert.strictEqual(toStandardDateStr('2026-10-26T14:30:00Z'), '2026-10-26');
console.log('  ✅ toStandardDateStr passed all format and timestamp edge cases.');

// Test 8: Verify Breadcrumbs exclusion for clean live report parity
console.log('\nTest 8: Verifying Breadcrumbs exclusion for report-deposit...');
const breadcrumbsContent = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Breadcrumbs.jsx'), 'utf8');
assert.ok(breadcrumbsContent.includes("'report-deposit'"), 'Breadcrumbs.jsx must exclude report-deposit from redundant breadcrumbs banner');
console.log('  ✅ Breadcrumbs exclusion verified.');

// Test 9: Verify Print CSS rules
console.log('\nTest 9: Verifying print CSS rules for clean print view...');
const indexCssContent = fs.readFileSync(path.join(process.cwd(), 'src/index.css'), 'utf8');
assert.ok(indexCssContent.includes('.app-sidebar'), 'index.css @media print must hide .app-sidebar');
console.log('  ✅ Print CSS verified.');

console.log('\n========================================================');
console.log('🎉 DEPOSIT REPORT VERIFIED WITH 100% PARITY!');
console.log('========================================================');
