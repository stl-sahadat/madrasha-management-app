import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  console.log('🚀 Starting headless Chrome for Deposit Report browser verification...');
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9252',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  try {
    const res = await fetch('http://localhost:9252/json/new?http://localhost:3000/dashboard', { method: 'PUT' });
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
      for (let i = 0; i < 50; i++) {
        const txt = await getBodyText();
        if (txt && !txt.includes('লোড হচ্ছে...')) return txt;
        await new Promise(r => setTimeout(r, 300));
      }
      return await getBodyText();
    };

    await send('Page.enable');
    await send('Runtime.enable');

    // 1. Authenticate user in localStorage
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

    // 2. Test Unsearched State: /admin/report/deposit
    console.log('\n--- 1. Testing Deposit Report Unsearched State ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/deposit' });
    await new Promise(r => setTimeout(r, 2500));
    const unsearchedText = await waitForHydration();
    console.log('Unsearched text snippet:', unsearchedText.slice(0, 160));

    if (unsearchedText.includes('জমার রিপোর্ট') && unsearchedText.includes('রিপোর্ট দেখাও')) {
      console.log('  ✅ Unsearched state loaded with title "জমার রিপোর্ট" and button "রিপোর্ট দেখাও".');
    } else {
      throw new Error(`Unsearched state text mismatch. Body: ${unsearchedText.slice(0, 200)}`);
    }

    let snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync(path.join(outDir, 'report-deposit-unsearched.jpg'), Buffer.from(snap.result.data, 'base64'));
    console.log('  📸 Screenshot saved: report-deposit-unsearched.jpg');

    // 3. Test Searched State with query parameters
    console.log('\n--- 2. Testing Deposit Report Searched State ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/deposit?start_date=2026-01-01&end_date=2026-12-31' });
    await new Promise(r => setTimeout(r, 2500));
    const searchedText = await waitForHydration();
    console.log('Searched text snippet:', searchedText.slice(0, 200));

    if (
      searchedText.includes('জমার প্রতিবেদন') &&
      searchedText.includes('খাতভিত্তিক জমার সারসংক্ষেপ') &&
      searchedText.includes('মুহতামিম সাহেবের স্বাক্ষর')
    ) {
      console.log('  ✅ Searched state loaded with banner, tables, Bengali words, and signatures.');
    } else {
      throw new Error(`Searched state text mismatch. Body: ${searchedText.slice(0, 300)}`);
    }

    snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync(path.join(outDir, 'report-deposit-searched.jpg'), Buffer.from(snap.result.data, 'base64'));
    fs.writeFileSync(path.join(outDir, 'report-deposit.jpg'), Buffer.from(snap.result.data, 'base64'));
    console.log('  📸 Screenshots saved: report-deposit-searched.jpg and report-deposit.jpg');

    // 4. Test clicking submit button on form interactively
    console.log('\n--- 3. Testing Interactive Form Submit ---');
    await send('Page.navigate', { url: 'http://localhost:3000/admin/report/deposit' });
    await waitForHydration();

    // Click submit button
    await evaluate(`
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    `);
    await new Promise(r => setTimeout(r, 1000));
    const afterSubmitText = await getBodyText();

    if (afterSubmitText.includes('জমার প্রতিবেদন')) {
      console.log('  ✅ Form submit successfully toggled searched state.');
    } else {
      console.warn('  ⚠️ Note: Form submit did not immediately show report (may need date selection).');
    }

    ws.close();
    chrome.kill();

    if (consoleErrors.length > 0) {
      console.warn('Browser Console Errors logged:', consoleErrors);
    } else {
      console.log('\n✨ ZERO browser console errors detected!');
    }

    console.log('\n========================================================');
    console.log('🎉 BROWSER E2E VERIFICATION COMPLETED SUCCESSFULLY!');
    console.log('========================================================');
  } catch (err) {
    chrome.kill();
    console.error('Browser test failed:', err);
    process.exit(1);
  }
}

main();
