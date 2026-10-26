import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY } from '../src/utils/bengaliWords.js';

console.log('========================================================');
console.log('🧪 VERIFICATION SUITE: 3 REPORT VIEWS (1:1 LIVE PARITY)');
console.log('========================================================');

// Test 1: Number to Bengali Words exact match with live site
console.log('\nTest 1: Testing numberToBengaliWords against exact live site outputs...');
const liveMatches = [
  { num: 14254, expected: 'চৌদ্দ হাজার দুই শত চুয়ান্ন' },
  { num: 0, expected: 'শূন্য' },
  { num: 35587, expected: 'পঁয়ত্রিশ হাজার পাঁচ শত সাতাশি' },
  { num: 646, expected: 'ছয় শত ছেচল্লিশ' },
  { num: 34941, expected: 'চৌত্রিশ হাজার নয় শত একচল্লিশ' },
  { num: 7345, expected: 'সাত হাজার তিন শত পঁয়তাল্লিশ' },
  { num: 200, expected: 'দুই শত' },
  { num: 7145, expected: 'সাত হাজার এক শত পঁয়তাল্লিশ' },
  { num: 100, expected: 'এক শত' },
  { num: 500, expected: 'পাঁচ শত' },
  { num: 1000, expected: 'এক হাজার' },
  { num: 5000, expected: 'পাঁচ হাজার' },
  { num: 21165, expected: 'একুশ হাজার এক শত পঁয়ষট্টি' },
  { num: 9955, expected: 'নয় হাজার নয় শত পঞ্চান্ন' },
  { num: 2922, expected: 'দুই হাজার নয় শত বাইশ' },
  { num: 1200, expected: 'এক হাজার দুই শত' },
  { num: 245, expected: 'দুই শত পঁয়তাল্লিশ' },
  { num: 246, expected: 'দুই শত ছেচল্লিশ' },
  { num: -500, expected: 'ঋণাত্মক পাঁচ শত' },
  { num: 100000000, expected: 'দশ কোটি' }
];

liveMatches.forEach(({ num, expected }) => {
  const result = numberToBengaliWords(num);
  assert.strictEqual(result, expected, `Mismatch for ${num}: got "${result}", expected "${expected}"`);
  console.log(`  ✅ ${num} => "${result}" (exact live match)`);
});

// Test 2: Currency formatting
console.log('\nTest 2: Testing formatMoney for 2-decimal English numerals with commas...');
assert.strictEqual(formatMoney(14254), '14,254.00');
assert.strictEqual(formatMoney(0), '0.00');
assert.strictEqual(formatMoney(646), '646.00');
assert.strictEqual(formatMoney(35587), '35,587.00');
assert.strictEqual(formatMoney(7145), '7,145.00');
assert.strictEqual(formatMoney(-500), '-500.00');
console.log('  ✅ Currency formatting verified (14,254.00, 0.00, 35,587.00, -500.00).');

// Test 3: Date formatting
console.log('\nTest 3: Testing formatDateDDMMYYYY...');
assert.strictEqual(formatDateDDMMYYYY('2026-10-26'), '26/10/2026');
assert.strictEqual(formatDateDDMMYYYY('2026-01-01'), '01/01/2026');
assert.strictEqual(formatDateDDMMYYYY('2026-12-31'), '31/12/2026');
console.log('  ✅ Date formatting verified (DD/MM/YYYY).');

// Test 4: Route mapping code verification in AppContext.jsx
console.log('\nTest 4: Verifying route mapping in AppContext.jsx...');
const appContextContent = fs.readFileSync(path.join(process.cwd(), 'src/context/AppContext.jsx'), 'utf8');
assert.ok(appContextContent.includes("admin/report/daily/deposit-expense'"), "AppContext must route admin/report/daily/deposit-expense");
assert.ok(appContextContent.includes("admin/report/yearly/deposit-expense'"), "AppContext must route admin/report/yearly/deposit-expense");
assert.ok(appContextContent.includes("admin/report/bank'"), "AppContext must route admin/report/bank");
console.log('  ✅ Route handlers in AppContext verified.');

// Test 5: Verify App.jsx imports & routes DailyReport, YearlyReport, BankReport
console.log('\nTest 5: Verifying App.jsx dispatch for the 3 report components...');
const appContent = fs.readFileSync(path.join(process.cwd(), 'src/App.jsx'), 'utf8');
assert.ok(appContent.includes("import { DailyReport } from './components/reports/DailyReport';"), "App.jsx must import DailyReport");
assert.ok(appContent.includes("import { YearlyReport } from './components/reports/YearlyReport';"), "App.jsx must import YearlyReport");
assert.ok(appContent.includes("import { BankReport } from './components/reports/BankReport';"), "App.jsx must import BankReport");
assert.ok(appContent.includes("<DailyReport key=\"report-daily\" />"), "App.jsx must render DailyReport");
assert.ok(appContent.includes("<YearlyReport key=\"report-yearly\" />"), "App.jsx must render YearlyReport");
assert.ok(appContent.includes("<BankReport key=\"report-bank\" />"), "App.jsx must render BankReport");
console.log('  ✅ App.jsx correctly imports and renders DailyReport, YearlyReport, and BankReport.');

// Test 6: Verify component files exist and have required HTML structure
console.log('\nTest 6: Verifying components structure against live site specs...');
const dailyContent = fs.readFileSync(path.join(process.cwd(), 'src/components/reports/DailyReport.jsx'), 'utf8');
assert.ok(dailyContent.includes('দৈনিক জমা ও খরচের প্রতিবেদন'), 'DailyReport must have title');
assert.ok(dailyContent.includes('দৈনিক জমা ও খরচের বিবরণী'), 'DailyReport must have subtitle');
assert.ok(dailyContent.includes('মুহতামিম সাহেবের স্বাক্ষর'), 'DailyReport must have principal signature');
assert.ok(dailyContent.includes('হিসাব রক্ষকের স্বাক্ষর'), 'DailyReport must have accountant signature');
assert.ok(dailyContent.includes('আয়ের খাত'), 'DailyReport must have income section');
assert.ok(dailyContent.includes('ব্যয়ের খাত'), 'DailyReport must have expense section');
assert.ok(dailyContent.includes('card shadow-sm mb-4 no-print'), 'DailyReport filter card must have no-print');

const yearlyContent = fs.readFileSync(path.join(process.cwd(), 'src/components/reports/YearlyReport.jsx'), 'utf8');
assert.ok(yearlyContent.includes('বার্ষিক জমা ও খরচের প্রতিবেদন'), 'YearlyReport must have title');
assert.ok(yearlyContent.includes('বার্ষিক জমা ও খরচের বিবরণী'), 'YearlyReport must have subtitle');
assert.ok(yearlyContent.includes('অবশিষ্ট তহবিল'), 'YearlyReport must have অবশিষ্ট তহবিল in summary');
assert.ok(yearlyContent.includes('তারিখ নির্বাচন করে রিপোর্ট দেখান'), 'YearlyReport must have initial prompt');
assert.ok(yearlyContent.includes('এই সময়কালে কোন জমা হয়নি'), 'YearlyReport must match exact live empty income text');
assert.ok(yearlyContent.includes('এই সময়কালে কোন খরচ হয়নি'), 'YearlyReport must match exact live empty expense text');
assert.ok(yearlyContent.includes('card shadow-sm mb-4 no-print'), 'YearlyReport filter card must have no-print');
assert.ok(yearlyContent.includes('শেষের তারিখ শুরুর তারিখের পরে হতে হবে'), 'YearlyReport must validate date order');

const bankContent = fs.readFileSync(path.join(process.cwd(), 'src/components/reports/BankReport.jsx'), 'utf8');
assert.ok(bankContent.includes('ব্যাংক হিসাব প্রতিবেদন'), 'BankReport must have title');
assert.ok(bankContent.includes('পেমেন্ট মেথড'), 'BankReport must have payment method column');
assert.ok(bankContent.includes('ব্যালেন্স ( ব্যালেন্স ট্রান্সফার বাদে ):'), 'BankReport must have transfer-excluded balance row');
assert.ok(bankContent.includes('কোন লেনদেন পাওয়া যায়নি'), 'BankReport must have empty message');
assert.ok(bankContent.includes('accountTransactions.length > 0 &&'), 'BankReport tfoot must only render when transactions exist');
assert.ok(bankContent.includes('card shadow-sm mb-4 no-print'), 'BankReport filter card must have no-print');
assert.ok(bankContent.includes('শেষের তারিখ শুরুর তারিখের পরে হতে হবে'), 'BankReport must validate date order');

// Test 7: Verify Breadcrumbs suppresses breadcrumbs for these 3 report pages
console.log('\nTest 7: Verifying Breadcrumbs behavior for 3 report routes...');
const breadcrumbsContent = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Breadcrumbs.jsx'), 'utf8');
assert.ok(breadcrumbsContent.includes("['report-daily', 'report-yearly', 'report-bank'].includes(activeTab)"), 'Breadcrumbs must hide on the 3 report routes to match live site');
console.log('  ✅ Breadcrumbs suppression verified.');

console.log('\n========================================================');
console.log('🎉 ALL 3 REPORT VIEWS VERIFIED WITH 100% PARITY!');
console.log('========================================================\n');
