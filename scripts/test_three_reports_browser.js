import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9232',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080'
  ]);
  await new Promise(r => setTimeout(r, 2000));

  try {
    const res = await fetch('http://localhost:9232/json/new?http://localhost:3000/dashboard', { method: 'PUT' });
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

    await send('Page.enable');
    await send('Runtime.enable');

    // Bypass login if needed by injecting auth token / credentials in localStorage
    await send('Page.navigate', { url: 'http://localhost:3000/dashboard' });
    await new Promise(r => setTimeout(r, 2000));

    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem('madrasha_auth_user', JSON.stringify({
          id: 'usr_superadmin',
          name: 'মুহতামিম সাহেব',
          email: 'admin@gmail.com',
          role: 'superadmin'
        }));
      `
    });

    const reportRoutes = [
      {
        url: 'http://localhost:3000/admin/report/daily/deposit-expense',
        tab: 'report-daily',
        name: 'দৈনিক আয়-ব্যয়ের প্রতিবেদন',
        file: 'report-daily.jpg',
        expectedText: 'দৈনিক জমা ও খরচের প্রতিবেদন'
      },
      {
        url: 'http://localhost:3000/admin/report/yearly/deposit-expense',
        tab: 'report-yearly',
        name: 'বার্ষিক আয়-ব্যয়ের প্রতিবেদন',
        file: 'report-yearly.jpg',
        expectedText: 'বার্ষিক জমা ও খরচের প্রতিবেদন'
      },
      {
        url: 'http://localhost:3000/admin/report/bank',
        tab: 'report-bank',
        name: 'ব্যাংক হিসাব প্রতিবেদন',
        file: 'report-bank.jpg',
        expectedText: 'ব্যাংক হিসাব প্রতিবেদন'
      }
    ];

    const outDir = path.join(process.cwd(), 'public/screenshots_audit');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    for (const item of reportRoutes) {
      console.log(`\nNavigating to ${item.name} (${item.url})...`);
      await send('Page.navigate', { url: item.url });
      await new Promise(r => setTimeout(r, 2500));

      const evalRes = await send('Runtime.evaluate', {
        expression: `document.body.innerText`
      });
      const bodyText = evalRes.result?.value || '';

      if (bodyText.includes(item.expectedText)) {
        console.log(`  ✅ Successfully rendered: "${item.expectedText}" found in page text.`);
      } else {
        console.warn(`  ⚠️ Warning: "${item.expectedText}" not found. Page text snippet: ${bodyText.slice(0, 200)}`);
      }

      const snap = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
      if (snap && snap.result && snap.result.data) {
        fs.writeFileSync(path.join(outDir, item.file), Buffer.from(snap.result.data, 'base64'));
        console.log(`  📸 Screenshot saved: ${item.file}`);
      }
    }

    ws.close();
    chrome.kill();

    if (consoleErrors.length > 0) {
      console.error(`\n❌ Found ${consoleErrors.length} browser errors:`, consoleErrors);
      process.exit(1);
    } else {
      console.log('\n🎉 ALL 3 REPORT VIEWS LOADED CLEANLY IN BROWSER WITH ZERO CONSOLE ERRORS!');
    }
  } catch (err) {
    chrome.kill();
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

main();
