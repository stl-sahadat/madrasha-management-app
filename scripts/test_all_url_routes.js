import { spawn } from 'node:child_process';
import assert from 'node:assert';

async function testAllUrlRoutes() {
  console.log('🚀 Running Comprehensive URL Routing & Address Bar Sync Test...\n');

  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9234',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1600,900'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  let page;
  try {
    const listRes = await fetch('http://localhost:9234/json/new?http://localhost:3000/', { method: 'PUT' });
    page = await listRes.json();
  } catch (err) {
    console.error('Failed to connect to Chrome:', err.message);
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let msgId = 1;
  const pending = new Map();

  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.id && pending.has(d.id)) {
      pending.get(d.id)(d);
      pending.delete(d.id);
    }
  };

  await new Promise(r => ws.onopen = r);
  function send(m, p = {}) {
    return new Promise(res => {
      const id = msgId++;
      pending.set(id, res);
      ws.send(JSON.stringify({ id, method: m, params: p }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  const testCases = [
    { name: 'ড্যাশবোর্ড', selector: 'a[href="/dashboard"], a[href="#dashboard"]', expectedUrl: '/dashboard' },
    { name: 'ছাত্র/ছাত্রী', selector: 'a[href="#students"]', expectedUrl: '/student-list' },
    { name: 'শিক্ষক', selector: 'a[href="#teachers"]', expectedUrl: '/teacher-list' },
    { name: 'মাসিক চাঁদাদাতা', selector: 'a[href="#monthly-donors"]', expectedUrl: '/contributor-list' },
    { name: 'দানকারী', selector: 'a[href="#donors"]', expectedUrl: '/donor-list' },
    { name: 'যাকাত দাতা', selector: 'a[href="#zakat-donors"]', expectedUrl: '/zakat-donor-list' },
    { name: 'বাজার', selector: 'a[href="#market"]', expectedUrl: '/bazar-weekly-create' },
    { name: 'কমিটি', selector: 'a[href="#committee-list"]', expectedUrl: '/committee-list' },
    { name: 'হাজিরা', selector: 'a[href="#attendance"]', expectedUrl: '/attendance-student' },
    { name: 'রেজাল্ট', selector: 'a[href="#results"]', expectedUrl: '/result-create' },
    { name: 'জমা/খরচ হিসাব সমূহ', selector: 'a[href="#income-expense"]', expectedUrl: '/voucher-deposit' },
    { name: 'আইডি কার্ড', selector: 'a[href="#id-cards"]', expectedUrl: '/idcard-student' },
    { name: 'এসএমএস', selector: 'a[href="#sms"]', expectedUrl: '/sms-student' },
    { name: 'অ্যাকাউন্ট', selector: 'a[href="#accounts"]', expectedUrl: '/account-list' },
    { name: 'রিপোর্ট', selector: 'a[href="#reports"]', expectedUrl: '/report-deposit' },
    { name: 'সেটিং', selector: 'a[href="#settings"]', expectedUrl: '/settings-institute' }
  ];

  let passed = 0;
  for (const tc of testCases) {
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('${tc.selector}');
        if (!el) return { found: false };
        el.click();
        return { found: true };
      })()`,
      returnByValue: true
    });

    if (!res.result.result.value.found) {
      const debug = await send('Runtime.evaluate', {
        expression: `(() => {
          return {
            url: window.location.href,
            linksCount: document.querySelectorAll('a').length,
            sidebarExists: !!document.querySelector('nav.app-sidebar'),
            matchingHref: Array.from(document.querySelectorAll('a')).map(a => a.getAttribute('href')).filter(h => h && h.includes('donor'))
          };
        })()`,
        returnByValue: true
      });
      console.error(`❌ [${tc.name}] Selector ${tc.selector} not found. Debug:`, debug.result.result.value);
      continue;
    }

    await new Promise(r => setTimeout(r, 400));

    const urlRes = await send('Runtime.evaluate', {
      expression: 'window.location.pathname',
      returnByValue: true
    });

    const currentPath = urlRes.result.result.value;
    if (currentPath === tc.expectedUrl) {
      console.log(`✅ [${tc.name}] Address bar updated perfectly to: ${currentPath}`);
      passed++;
    } else {
      console.error(`❌ [${tc.name}] Expected URL ${tc.expectedUrl}, but got: ${currentPath}`);
    }
  }

  console.log(`\nResults: ${passed} / ${testCases.length} routes changed address bar URL perfectly!`);
  assert.strictEqual(passed, testCases.length);

  ws.close();
  chrome.kill();
}

testAllUrlRoutes().catch(e => {
  console.error('Test Failed:', e);
  process.exit(1);
});
