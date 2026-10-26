import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

async function runBrowserTests() {
  console.log('🚀 Starting headless Chrome for comprehensive report testing...');
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9240',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  try {
    const res = await fetch('http://localhost:9240/json/new?http://localhost:3000/dashboard', { method: 'PUT' });
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
    const send = (m, params = {}) => new Promise(res => { const i = id++; p.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params })); });

    const evaluate = async (expr) => {
      const r = await send('Runtime.evaluate', { expression: expr });
      return r?.result?.result?.value ?? r?.result?.value;
    };

    const getBodyText = async () => {
      const val = await evaluate('document.body.innerText');
      return String(val || '');
    };

    const waitForHydration = async () => {
      for (let i = 0; i < 30; i++) {
        const txt = await getBodyText();
        if (txt && !txt.includes('লোড হচ্ছে...')) return txt;
        await new Promise(r => setTimeout(r, 200));
      }
      return await getBodyText();
    };

    await send('Page.enable');
    await send('Runtime.enable');

    // Set demo auth user
    await send('Page.navigate', { url: 'http://localhost:3000/dashboard' });
    await new Promise(r => setTimeout(r, 2000));
    await evaluate(`
      localStorage.setItem('madrasha_auth_user', JSON.stringify({
        id: 'usr_superadmin',
        name: 'মুহতামিম সাহেব',
        email: 'admin@gmail.com',
        role: 'superadmin'
      }));
      localStorage.setItem('madrasha_is_authenticated', 'true');
    `);

    const outDir = path.join(process.cwd(), 'public/screenshots_audit');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // 1. Test Daily Report
    console.log('\n--- 1. Testing Daily Report ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/daily/deposit-expense' });
    const dailyText = await waitForHydration();
    console.log('Daily Page snippet:', dailyText.slice(0, 150));
    if (dailyText.includes('দৈনিক জমা ও খরচের প্রতিবেদন') && dailyText.includes('দৈনিক জমা ও খরচের বিবরণী')) {
      console.log('  ✅ Daily Report loaded with header, banner, and tables.');
    } else {
      throw new Error(`Daily Report text mismatch: got "${dailyText.slice(0, 100)}"`);
    }

    let snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(path.join(outDir, 'report-daily-verified.jpg'), Buffer.from(snap.result.data, 'base64'));
    console.log('  📸 Screenshot saved: report-daily-verified.jpg');

    // 2. Test Yearly Report Initial State (Unsearched)
    console.log('\n--- 2. Testing Yearly Report Initial Unsearched State ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/yearly/deposit-expense' });
    const yearlyUnsearched = await waitForHydration();
    console.log('Yearly Unsearched snippet:', yearlyUnsearched.slice(0, 150));
    if (yearlyUnsearched.includes('তারিখ নির্বাচন করে রিপোর্ট দেখান')) {
      console.log('  ✅ Yearly Report initially shows exact live unsearched prompt card ("তারিখ নির্বাচন করে রিপোর্ট দেখান")');
    } else {
      throw new Error(`Yearly Report initial prompt card not found: got "${yearlyUnsearched.slice(0, 100)}"`);
    }

    snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(path.join(outDir, 'report-yearly-unsearched.jpg'), Buffer.from(snap.result.data, 'base64'));

    // Test Yearly Report with Date Search (Query URL)
    console.log('\n--- 2b. Testing Yearly Report with Search Query URL ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/yearly/deposit-expense?year=2026&start_date=2026-01-01&end_date=2026-12-31' });
    const yearlySearched = await waitForHydration();
    console.log('Yearly Searched snippet:', yearlySearched.slice(0, 150));
    if (yearlySearched.includes('বার্ষিক জমা ও খরচের বিবরণী') && yearlySearched.includes('অবশিষ্ট তহবিল')) {
      console.log('  ✅ Yearly Report with dates loaded report tables and "অবশিষ্ট তহবিল"');
    } else {
      throw new Error(`Yearly Report queried table mismatch: got "${yearlySearched.slice(0, 100)}"`);
    }

    snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(path.join(outDir, 'report-yearly-searched.jpg'), Buffer.from(snap.result.data, 'base64'));
    console.log('  📸 Screenshot saved: report-yearly-searched.jpg');

    // 3. Test Bank Report Initial State (Unsubmitted)
    console.log('\n--- 3. Testing Bank Report Initial Unsubmitted State ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/bank' });
    const bankUnsearched = await waitForHydration();
    console.log('Bank Unsearched snippet:', bankUnsearched.slice(0, 150));
    const hasTable = await evaluate('Boolean(document.querySelector("table"))');
    if (hasTable === false) {
      console.log('  ✅ Bank Report initially displays NO table, matching live site.');
    } else {
      throw new Error('Bank Report should not display table before account selection and submit');
    }

    snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(path.join(outDir, 'report-bank-unsearched.jpg'), Buffer.from(snap.result.data, 'base64'));

    // Test Bank Report Queried
    console.log('\n--- 3b. Testing Bank Report with Search Query URL ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/bank?bank_account_id=bkash&start_date=2026-01-01&end_date=2026-12-31' });
    const bankSearched = await waitForHydration();
    console.log('Bank Searched snippet:', bankSearched.slice(0, 150));
    if (bankSearched.includes('ব্যাংক হিসাব প্রতিবেদন') && bankSearched.includes('ব্যালেন্স ( ব্যালেন্স ট্রান্সফার বাদে ):')) {
      console.log('  ✅ Bank Report queried loaded with ledger and balance calculations');
    } else {
      throw new Error(`Bank Report queried text mismatch: got "${bankSearched.slice(0, 100)}"`);
    }

    snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync(path.join(outDir, 'report-bank-searched.jpg'), Buffer.from(snap.result.data, 'base64'));
    console.log('  📸 Screenshot saved: report-bank-searched.jpg');

    ws.close();
    chrome.kill();

    if (consoleErrors.length > 0) {
      console.error(`\n❌ Found ${consoleErrors.length} browser errors:`, consoleErrors);
      process.exit(1);
    } else {
      console.log('\n🎉 ALL 3 REPORT VIEWS AND ALL STATES VERIFIED IN CHROME WITH ZERO CONSOLE ERRORS!');
    }
  } catch (err) {
    chrome.kill();
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

runBrowserTests();
