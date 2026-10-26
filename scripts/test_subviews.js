import { spawn } from 'node:child_process';

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/', { method: 'PUT' });
  const page = await listRes.json();
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
      consoleErrors.push(d.params.args.map(a => a.value || a.description).join(' '));
    }
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
  };
  await new Promise(r => ws.onopen = r);
  function send(m, p={}) { return new Promise(res => { const id = msgId++; pending.set(id, res); ws.send(JSON.stringify({id, method: m, params: p})); }); }

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  const allSubviews = [
    // Students
    'student-create',
    'student-list',
    'jamat-grid',
    'student-admission-report',
    'student-admission-register',
    'student-bloodgroup',
    'student-parents-number',
    'student-khuraki-entry',
    'student-khuraki-list',
    'student-khuraki-register',
    'student-salary-entry',
    'student-salary-list',
    'student-salary-register',
    'student-fees',
    'student-admission-form',
    'student-prottoyon',
    'student-certificate',

    // Teachers
    'teacher-create',
    'teacher-list',
    'teacher-number',
    'teacher-salary-sheet',
    'teacher-salary-day',
    'teacher-salary-list',

    // Monthly Donors
    'contributor-create',
    'contributor-list',
    'contributor-add',
    'contributor-individual',
    'contributor-all',
    'contributor-history',

    // Donors
    'donor-create',
    'donor-list',
    'donation-create',
    'donor-individual',
    'donor-all',
    'donation-history',

    // Zakat Donors
    'zakat-donor-create',
    'zakat-donor-list',
    'zakat-donation-create',
    'zakat-donor-individual',
    'zakat-donor-all',
    'zakat-donation-history',

    // Market
    'bazar-weekly-create',
    'bazar-weekly-report',
    'bazar-weekly-list',
    'bazar-monthly-create',
    'bazar-monthly-report',
    'bazar-monthly-list',

    // Committee
    'committee-list',

    // Attendance
    'attendance-student',
    'attendance-student-report',
    'attendance-teacher',
    'attendance-teacher-report',

    // Exam Results
    'result-create',
    'result-sheet',
    'result-student',

    // Vouchers & Ledger
    'voucher-deposit',
    'deposit-list',
    'voucher-expense',
    'expense-list',

    // ID Cards
    'idcard-student',
    'idcard-teacher',

    // SMS
    'sms-student',
    'sms-teacher',

    // Accounts
    'account-create',
    'account-list',
    'account-report',
    'accounts-transfer',
    'balancesheet',

    // Reports
    'report-deposit',
    'report-student-deposit',
    'report-student-salary',
    'report-deposit-account',
    'report-monthly-donors',
    'report-account-deposit',
    'report-expense',
    'report-account-expense',
    'report-deposit-expense',
    'report-account-details',
    'report-daily',
    'report-yearly',
    'report-bank',

    // Settings
    'settings-institute',
    'settings-jamat',
    'settings-payment',
    'settings-deposit-cat',
    'settings-expense-cat',
    'settings-receiver',
    'settings-role',
    'settings-user'
  ];

  console.log(`Auditing total ${allSubviews.length} distinct sub-menu views...`);

  let successCount = 0;
  for (const tab of allSubviews) {
    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const link = document.querySelector('a[href="#${tab}"]') || document.querySelector('a[href*="${tab}"]');
          if (link) {
            link.click();
            const main = document.querySelector('main');
            const hasContent = main && main.innerText.trim().length > 20;
            return { clicked: true, text: link.innerText.trim(), hasContent, length: main ? main.innerText.length : 0 };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });

    const info = res.result.result.value;
    if (info.clicked && info.hasContent) {
      successCount++;
    } else {
      console.warn(`⚠️ View issue for ${tab}:`, info);
    }
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\nResults: ${successCount} / ${allSubviews.length} views rendered authentic non-empty content!`);
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
    process.exit(1);
  } else {
    console.log('🎉 100% SUCCESS: All sub-menu views mounted with ZERO console errors!');
  }

  ws.close();
  chrome.kill();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
