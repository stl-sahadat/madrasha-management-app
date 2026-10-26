import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const screenshotDir = path.resolve('public/screenshots_audit');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9240',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  const res = await fetch('http://localhost:9240/json/new?http://localhost:3000/', { method: 'PUT' });
  const page = await res.json();
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const p = new Map();
  const consoleErrors = [];

  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
      const err = d.params.args.map(a => a.value || a.description).join(' ');
      consoleErrors.push(err);
      console.error('BROWSER ERROR:', err);
    }
    if (d.method === 'Runtime.exceptionThrown') {
      const ex = d.params.exceptionDetails.text + ' ' + (d.params.exceptionDetails.exception?.description || '');
      consoleErrors.push(ex);
      console.error('BROWSER EXCEPTION:', ex);
    }
    if (d.id && p.has(d.id)) { p.get(d.id)(d); p.delete(d.id); }
  };
  await new Promise(r => ws.onopen = r);
  const send = (m, params={}) => new Promise(res => { const i = id++; p.set(i, res); ws.send(JSON.stringify({id: i, method: m, params})); });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  const allModuleTabs = [
    // Teacher Views
    { id: 'teacher-create', name: 'শিক্ষক তৈরি', checkSelector: 'form, input[name="name"]' },
    { id: 'teacher-list', name: 'শিক্ষক তালিকা', checkSelector: 'table, .table-responsive' },
    { id: 'teacher-number', name: 'শিক্ষকগণের মোবাইল নম্বর', checkSelector: 'table, .table-responsive' },
    { id: 'teacher-salary-sheet', name: 'শিক্ষকগণের বেতন তালিকা', checkSelector: 'table, select' },
    { id: 'teacher-salary-day', name: 'শিক্ষকগণের বেতন দিন', checkSelector: 'form, input[type="number"]' },
    { id: 'teacher-salary-list', name: 'শিক্ষকের বেতন প্রদানের লিস্ট', checkSelector: 'table, .table-responsive' },

    // Contributor Views
    { id: 'contributor-create', name: 'মাসিক চাঁদাদাতার তালিকা', checkSelector: 'table, .table-responsive' },
    { id: 'contributor-add', name: 'মাসিক চাঁদা গ্রহণ', checkSelector: 'form, select' },
    { id: 'contributor-individual', name: 'মাসিক চাঁদাদাতার তালিকা (একক ভাবে)', checkSelector: 'form, select' },
    { id: 'contributor-all', name: 'মাসিক চাঁদাদাতাদের তালিকা (সকল)', checkSelector: 'table, .table-responsive' },
    { id: 'contributor-history', name: 'মাসিক চাঁদা গ্রহণের লিস্ট', checkSelector: 'table, .table-responsive' },

    // Donor Views
    { id: 'donor-create', name: 'দানকারীর তালিকা', checkSelector: 'table, .table-responsive' },
    { id: 'donation-create', name: 'দান গ্রহণ', checkSelector: 'form, select' },
    { id: 'donor-individual', name: 'দানকারীর তালিকা (একক ভাবে)', checkSelector: 'form, select' },
    { id: 'donor-all', name: 'দানকারীর তালিকা (সকল)', checkSelector: 'table, .table-responsive' },
    { id: 'donation-history', name: 'দান গ্রহণের লিস্ট', checkSelector: 'table, .table-responsive' },

    // Zakat Views
    { id: 'zakat-donor-create', name: 'যাকাত দাতার তালিকা', checkSelector: 'table, .table-responsive' },
    { id: 'zakat-donation-create', name: 'যাকাত গ্রহণ', checkSelector: 'form, select' },
    { id: 'zakat-donor-individual', name: 'যাকাত দাতার তালিকা (একক ভাবে)', checkSelector: 'form, select' },
    { id: 'zakat-donor-all', name: 'যাকাত দাতার তালিকা (সকল)', checkSelector: 'table, .table-responsive' },
    { id: 'zakat-donation-history', name: 'যাকাত গ্রহণের লিস্ট', checkSelector: 'table, .table-responsive' },

    // Bazar Views
    { id: 'bazar-weekly-create', name: 'সাপ্তাহিক বাজার এন্ট্রি', checkSelector: 'form, input' },
    { id: 'bazar-weekly-report', name: 'সাপ্তাহিক বাজার রিপোর্ট', checkSelector: 'table, .table-responsive' },
    { id: 'bazar-weekly-list', name: 'সাপ্তাহিক বাজার লিস্ট', checkSelector: 'table, .table-responsive' },
    { id: 'bazar-monthly-create', name: 'মাসিক বাজার এন্ট্রি', checkSelector: 'form, input' },
    { id: 'bazar-monthly-report', name: 'মাসিক বাজার রিপোর্ট', checkSelector: 'table, .table-responsive' },
    { id: 'bazar-monthly-list', name: 'মাসিক বাজার লিস্ট', checkSelector: 'table, .table-responsive' },

    // Committee
    { id: 'committee-list', name: 'কমিটি সদস্য', checkSelector: 'table, .card' },

    // Attendance & Results
    { id: 'attendance-student', name: 'ছাত্র-ছাত্রী হাজিরা', checkSelector: 'form, table, select' },
    { id: 'attendance-student-report', name: 'ছাত্র-ছাত্রী হাজিরা প্রতিবেদন', checkSelector: 'form, table, select' },
    { id: 'attendance-teacher', name: 'শিক্ষক হাজিরা', checkSelector: 'table, form' },
    { id: 'attendance-teacher-report', name: 'শিক্ষক হাজিরা রিপোর্ট', checkSelector: 'table, form' },
    { id: 'result-create', name: 'মার্কস এনট্রি/আপডেট', checkSelector: 'form, select' },
    { id: 'result-sheet', name: 'রেজাল্ট শীট', checkSelector: 'table, select' },
    { id: 'result-student', name: 'ছাত্র-ছাত্রী ভিত্তিক রেজাল্ট', checkSelector: 'table, select' },

    // Vouchers & Accounts
    { id: 'voucher-deposit', name: 'নতুন অর্থ জমা করুন', checkSelector: 'form, input' },
    { id: 'deposit-list', name: 'জমার লিস্ট', checkSelector: 'table, .table-responsive' },
    { id: 'voucher-expense', name: 'নতুন খরচ', checkSelector: 'form, input' },
    { id: 'expense-list', name: 'খরচের লিস্ট', checkSelector: 'table, .table-responsive' },
    { id: 'cash-ledger', name: 'ক্যাশ লেজার', checkSelector: 'table, .card' },

    // ID Cards
    { id: 'idcard-student', name: 'ছাএ-ছাএীর আইডি কার্ড', checkSelector: '.card-wrapper, .id-card, select' },
    { id: 'idcard-teacher', name: 'শিক্ষকদের আইডি কার্ড', checkSelector: '.card-wrapper, .id-card, select' },

    // SMS
    { id: 'sms-student', name: 'ছাত্র/ছাত্রী SMS', checkSelector: 'textarea, button, form' },
    { id: 'sms-teacher', name: 'শিক্ষক SMS', checkSelector: 'textarea, button, form' },

    // Accounts
    { id: 'account-create', name: 'নতুন অ্যাকাউন্ট তৈরি', checkSelector: 'form, input[name="name"]' },
    { id: 'account-list', name: 'অ্যাকাউন্ট তালিকা', checkSelector: 'table, .table-responsive' },
    { id: 'account-report', name: 'অ্যাকাউন্ট বিবরণী', checkSelector: 'form, .card' },
    { id: 'accounts-transfer', name: 'ব্যলেন্স ট্রান্সফার', checkSelector: 'form, select, table' },
    { id: 'balancesheet', name: 'ব্যলেন্স সিট', checkSelector: 'table, .card' },

    // Settings
    { id: 'settings-institute', name: 'প্রতিষ্ঠানের তথ্য', checkSelector: 'form, input' },
    { id: 'settings-jamat', name: 'জামাত তৈরি', checkSelector: 'table, button' },
    { id: 'settings-payment', name: 'পেমেন্ট মাধ্যম তৈরি', checkSelector: 'table, button' },
    { id: 'settings-deposit-cat', name: 'জমার খাত', checkSelector: 'table, button' },
    { id: 'settings-expense-cat', name: 'খরচের খাত', checkSelector: 'table, button' },
    { id: 'settings-receiver', name: 'গ্রহণকারী', checkSelector: 'table, button' },
    { id: 'settings-role', name: 'রোল (Role)', checkSelector: 'table, button' },
    { id: 'settings-user', name: 'ইউজার', checkSelector: 'table, button' }
  ];

  console.log(`Auditing ${allModuleTabs.length} non-student sub-menu views...`);

  let passed = 0;
  let failed = 0;

  for (const tab of allModuleTabs) {
    const clickRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          let el = document.querySelector('a[href="#${tab.id}"]');
          if (!el) {
            const allLinks = Array.from(document.querySelectorAll('a'));
            el = allLinks.find(a => a.getAttribute('href') === '#${tab.id}');
          }
          if (el) {
            const parentCollapse = el.closest('.collapse');
            if (parentCollapse && !parentCollapse.classList.contains('show')) {
              parentCollapse.classList.add('show');
            }
            el.click();
            return { found: true, text: el.innerText.trim() };
          }
          window.location.hash = '#${tab.id}';
          return { found: true, fallback: true };
        })()
      `,
      returnByValue: true
    });

    await new Promise(r => setTimeout(r, 350));

    const verifyRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const main = document.querySelector('main');
          if (!main) return { ok: false, error: 'no-main' };
          const matchedTarget = !!document.querySelector('${tab.checkSelector}');
          const textLength = main.innerText.trim().length;
          const heading = main.querySelector('h1, h2, h3, h4, h5, .card-header')?.innerText?.trim() || '';
          return {
            ok: matchedTarget && textLength > 20,
            textLength,
            heading,
            matchedTarget
          };
        })()
      `,
      returnByValue: true
    });

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 });
    if (shot.result && shot.result.data) {
      fs.writeFileSync(path.join(screenshotDir, `${tab.id}.jpg`), Buffer.from(shot.result.data, 'base64'));
    }

    const verifyVal = verifyRes.result?.result?.value;
    if (verifyVal && verifyVal.ok) {
      console.log(`  ✅ [${tab.id}] "${tab.name}" -> Heading: "${verifyVal.heading.replace(/\\n/g, ' ').slice(0, 40)}..." (${verifyVal.textLength} chars)`);
      passed++;
    } else {
      console.error(`  ❌ [${tab.id}] "${tab.name}" failed verification:`, verifyVal);
      failed++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`All Modules Audited: Passed ${passed} / ${allModuleTabs.length}, Failed: ${failed}`);
  console.log(`Browser Console Errors: ${consoleErrors.length}`);
  console.log(`======================================================\n`);

  ws.close();
  chrome.kill();

  if (failed > 0 || consoleErrors.length > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Audit exception:', err);
  process.exit(1);
});
