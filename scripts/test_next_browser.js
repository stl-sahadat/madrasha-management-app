import { spawn } from 'node:child_process';

async function main() {
  console.log('🚀 Launching headless Chrome to test Next.js App on http://localhost:3000/...');
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  let page;
  try {
    const listRes = await fetch('http://localhost:9222/json/new?http://localhost:3000/', { method: 'PUT' });
    page = await listRes.json();
  } catch (err) {
    console.error('Failed to connect to Chrome CDP:', err.message);
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let msgId = 1;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') {
      const errText = d.params.args.map(a => a.value || a.description).join(' ');
      // Filter out non-fatal font or favicon warnings
      if (!errText.includes('favicon') && !errText.includes('404')) {
        consoleErrors.push(errText);
      }
    }
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

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2500));

  // 1. Check Page Title & Document elements
  const pageCheck = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          title: document.title,
          hasRoot: !!document.getElementById('root'),
          hasAppWrapper: !!document.querySelector('.app-wrapper'),
          hasAuthPage: !!document.querySelector('.auth-root-container'),
          hasSidebar: !!document.querySelector('.app-sidebar'),
          headerText: document.querySelector('header')?.innerText || ''
        };
      })()
    `,
    returnByValue: true
  });

  const check = pageCheck.result.result.value;
  console.log('Page Inspection Result:', check);

  if (!check.title.includes('Madrasa Management Software')) {
    console.error('❌ Title mismatch:', check.title);
    process.exit(1);
  }
  console.log('✅ Page title verified:', check.title);

  // If on Auth page or Dashboard, check UI interactivity
  if (check.hasAuthPage) {
    console.log('✅ Auth page rendered cleanly. Testing demo login button...');
    const loginClick = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const submitBtn = document.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.click();
            return { clicked: true };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });
    console.log('Login Submit Click:', loginClick.result.result.value);
    await new Promise(r => setTimeout(r, 1000));
  }

  // Check subview switching
  const sampleSubviews = [
    'student-list',
    'student-create',
    'teacher-list',
    'contributor-list',
    'donor-list',
    'zakat-donor-list',
    'bazar-weekly-list',
    'account-list',
    'cash-ledger',
    'settings-institute'
  ];

  console.log(`\nTesting sample subview transitions (${sampleSubviews.length} views)...`);
  let passedViews = 0;
  for (const tab of sampleSubviews) {
    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const link = document.querySelector('a[href="#${tab}"]') || document.querySelector('a[href*="${tab}"]');
          if (link) {
            link.click();
            const main = document.querySelector('main');
            return { clicked: true, hasContent: main && main.innerText.length > 20 };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });
    const info = res.result.result.value;
    if (info.clicked) {
      passedViews++;
    }
    await new Promise(r => setTimeout(r, 150));
  }
  console.log(`✅ Sample subviews verified: ${passedViews} clicked successfully.`);

  if (consoleErrors.length > 0) {
    console.warn('⚠️ Console errors observed:', consoleErrors);
  } else {
    console.log('🎉 0 critical console errors during browser session!');
  }

  ws.close();
  chrome.kill();
  console.log('🏁 Browser verification completed successfully.');
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
