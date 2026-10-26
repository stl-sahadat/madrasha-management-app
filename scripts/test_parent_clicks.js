import { spawn } from 'node:child_process';

async function testParentClicks() {
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

  const parentSections = [
    { name: 'students', selector: 'a[href="#students"]', expectedWord: 'ছাত্র' },
    { name: 'teachers', selector: 'a[href="#teachers"]', expectedWord: 'শিক্ষক' },
    { name: 'monthly-donors', selector: 'a[href="#monthly-donors"]', expectedWord: 'চাঁদাদাতা' },
    { name: 'donors', selector: 'a[href="#donors"]', expectedWord: 'দানকারী' },
    { name: 'zakat-donors', selector: 'a[href="#zakat-donors"]', expectedWord: 'যাকাত' },
    { name: 'market', selector: 'a[href="#market"]', expectedWord: 'বাজার' },
    { name: 'attendance', selector: 'a[href="#attendance"]', expectedWord: 'হাজিরা' },
    { name: 'results', selector: 'a[href="#results"]', expectedWord: 'রেজাল্ট' },
    { name: 'income-expense', selector: 'a[href="#income-expense"]', expectedWord: 'জমা' },
    { name: 'id-cards', selector: 'a[href="#id-cards"]', expectedWord: 'কার্ড' },
    { name: 'sms', selector: 'a[href="#sms"]', expectedWord: 'এসএমএস' },
    { name: 'accounts', selector: 'a[href="#accounts"]', expectedWord: 'অ্যাকাউন্ট' },
    { name: 'reports', selector: 'a[href="#reports"]', expectedWord: 'রিপোর্ট' },
    { name: 'settings', selector: 'a[href="#settings"]', expectedWord: 'প্রতিষ্ঠানের' }
  ];

  console.log(`Auditing ${parentSections.length} parent accordion clicks...`);
  let passed = 0;

  for (const s of parentSections) {
    // First navigate to dashboard
    await send('Runtime.evaluate', {
      expression: `(document.querySelector('a[href="/dashboard"]') || document.querySelector('a[href="#dashboard"]'))?.click()`
    });
    await new Promise(r => setTimeout(r, 200));

    // Click parent accordion item
    const clickRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${s.selector}');
          if (!el) return { found: false };
          el.click();
          return { found: true };
        })()
      `,
      returnByValue: true
    });

    if (!clickRes.result.result.value.found) {
      console.error(`❌ [${s.name}] Selector ${s.selector} not found`);
      continue;
    }

    // Wait for React to re-render the view
    await new Promise(r => setTimeout(r, 600));

    // Evaluate the rendered main content and breadcrumbs
    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const main = document.querySelector('main');
          const breadcrumb = document.querySelector('.breadcrumb');
          return {
            length: main ? main.innerText.length : 0,
            hasWord: main ? main.innerText.includes('${s.expectedWord}') : false,
            hasBreadcrumb: Boolean(breadcrumb && breadcrumb.innerText.length > 5),
            mainSnippet: main ? main.innerText.substring(0, 100).replace(/\\s+/g, ' ') : '',
            breadcrumbSnippet: breadcrumb ? breadcrumb.innerText.replace(/\\s+/g, ' ') : ''
          };
        })()
      `,
      returnByValue: true
    });

    const info = evalRes.result.result.value;
    if (info.length > 50 && info.hasWord && info.hasBreadcrumb) {
      console.log(`✅ [${s.name}] Parent click loaded default view: breadcrumb="${info.breadcrumbSnippet}"`);
      passed++;
    } else {
      console.error(`❌ [${s.name}] FAILED parent click:`, info);
      if (consoleErrors.length > 0) {
        console.error('Console errors:', consoleErrors);
      }
    }
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\nParent Click Results: ${passed} / ${parentSections.length} passed perfectly!`);
  ws.close();
  chrome.kill();
  process.exit(passed === parentSections.length ? 0 : 1);
}

testParentClicks().catch(e => { console.error(e); process.exit(1); });
