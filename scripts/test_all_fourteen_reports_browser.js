import { spawn } from 'node:child_process';

const reports = [
  { tab: 'report-deposit', url: 'http://localhost:3000/admin/report/deposit', name: 'জমার রিপোর্ট' },
  { tab: 'report-expense', url: 'http://localhost:3000/admin/report/expense', name: 'খরচের রিপোর্ট' },
  { tab: 'report-deposit-account', url: 'http://localhost:3000/admin/report/deposit/account', name: 'জমা খাতের রিপোর্ট' },
  { tab: 'report-expense-account', url: 'http://localhost:3000/admin/report/expense/account', name: 'খরচের খাতের রিপোর্ট' },
  { tab: 'report-monthly-donors', url: 'http://localhost:3000/admin/report/monthly/donors', name: 'মাসিক চাদাদাতার রিপোর্ট' },
  { tab: 'report-account-deposit', url: 'http://localhost:3000/admin/report/account/deposit', name: 'এ্যাকাউন্টে জমার রিপোর্ট' },
  { tab: 'report-account-expense', url: 'http://localhost:3000/admin/report/account/expense', name: 'এ্যাকাউন্টে খরচের রিপোর্ট' },
  { tab: 'report-deposit-expense', url: 'http://localhost:3000/admin/report/deposit-expense', name: 'এ্যাকাউন্ট বিবরণ' },
  { tab: 'report-account-details', url: 'http://localhost:3000/admin/report/account/details', name: 'এ্যাকাউন্ট বিবরণি' },
  { tab: 'report-student-deposit', url: 'http://localhost:3000/admin/report/student/deposit', name: 'ছাত্র খানার টাকা জমার তালিকা' },
  { tab: 'report-student-salary', url: 'http://localhost:3000/admin/report/student/salary/deposit', name: 'বেতনের টাকা জমার প্রতিবেদন' },
  { tab: 'report-daily', url: 'http://localhost:3000/admin/report/daily/deposit-expense', name: 'দৈনিক আয়-ব্যয়ের প্রতিবেদন' },
  { tab: 'report-yearly', url: 'http://localhost:3000/admin/report/yearly/deposit-expense', name: 'তারিখ নির্বাচন করে রিপোর্ট দেখান' },
  { tab: 'report-bank', url: 'http://localhost:3000/admin/report/bank', name: 'ব্যাংক প্রতিবেদন' }
];

async function main() {
  console.log('🚀 Launching Chrome CDP for 14 Reports Browser Verification...\n');

  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9277',
    '--disable-gpu',
    '--no-sandbox'
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const res = await fetch('http://localhost:9277/json/new?http://localhost:3000/dashboard', { method: 'PUT' });
    const page = await res.json();
    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();
    const errors = [];

    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      if (d.method === 'Runtime.exceptionThrown') {
        errors.push(d.params.exceptionDetails);
      }
      if (d.id && callbacks.has(d.id)) {
        callbacks.get(d.id)(d);
        callbacks.delete(d.id);
      }
    };

    await new Promise((r) => (ws.onopen = r));

    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const i = id++;
        callbacks.set(i, resolve);
        ws.send(JSON.stringify({ id: i, method, params }));
      });

    await send('Page.enable');
    await send('Runtime.enable');

    // Authenticate
    await send('Page.navigate', { url: 'http://localhost:3000/dashboard' });
    await new Promise((r) => setTimeout(r, 1500));
    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem("madrasha_auth_user", JSON.stringify({
          id: "usr_superadmin", name: "মুহতামিম সাহেব", email: "admin@gmail.com", role: "superadmin"
        }));
        localStorage.setItem("madrasha_is_authenticated", "true");
      `
    });

    for (const rep of reports) {
      console.log(`Checking [${rep.tab}] -> ${rep.url} ...`);
      await send('Page.navigate', { url: rep.url });
      await new Promise((r) => setTimeout(r, 1200));

      const evalRes = await send('Runtime.evaluate', {
        expression: 'document.body.innerText',
        returnByValue: true
      });
      const text = evalRes?.result?.result?.value || evalRes?.result?.value || '';

      if (!text.includes(rep.name)) {
        throw new Error(`Report ${rep.tab} failed: Expected text "${rep.name}" not found in body text!`);
      }
      console.log(`  ✅ ${rep.tab} loaded successfully with keyword "${rep.name}".`);
    }

    if (errors.length > 0) {
      throw new Error(`Browser encountered ${errors.length} runtime exceptions!`);
    }

    console.log('\n========================================================');
    console.log('🎉 ALL 14 REPORT PAGES PASSED BROWSER VERIFICATION (0 ERRORS)');
    console.log('========================================================\n');

    ws.close();
    chrome.kill();
  } catch (err) {
    chrome.kill();
    console.error('❌ Browser verification error:', err);
    process.exit(1);
  }
}

main().catch(console.error);
