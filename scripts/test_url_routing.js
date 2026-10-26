import { spawn } from 'node:child_process';
import assert from 'node:assert';

async function testUrlRouting() {
  console.log('🚀 Starting URL Routing & Navigation Verification Test...\n');

  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--no-sandbox'
  ]);
  await new Promise(r => setTimeout(r, 1500));

  let page;
  try {
    const listRes = await fetch('http://localhost:9225/json/new?http://localhost:3000/', { method: 'PUT' });
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

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 2000));

  // Step 1: Initial URL
  const initialUrl = await send('Runtime.evaluate', {
    expression: 'window.location.href',
    returnByValue: true
  });
  console.log('Step 1: Initial URL is:', initialUrl.result.result.value);

  // Step 2: Click on "ছাত্র/ছাত্রী" parent accordion
  console.log('\nStep 2: Clicking on "ছাত্র/ছাত্রী" in sidebar...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const parent = document.querySelector('a[href="#students"]') || document.querySelector('a[href="/student-list"]');
      if (parent) parent.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  const studentUrl = await send('Runtime.evaluate', {
    expression: 'window.location.pathname',
    returnByValue: true
  });
  console.log('  -> Current URL pathname:', studentUrl.result.result.value);
  assert.strictEqual(studentUrl.result.result.value, '/student-list', 'URL must change to /student-list');
  console.log('  ✅ Verified: Address bar changed to /student-list!');

  // Step 3: Click on "শিক্ষক"
  console.log('\nStep 3: Clicking on "শিক্ষক" in sidebar...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const parent = document.querySelector('a[href="#teachers"]');
      if (parent) parent.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  const teacherUrl = await send('Runtime.evaluate', {
    expression: 'window.location.pathname',
    returnByValue: true
  });
  console.log('  -> Current URL pathname:', teacherUrl.result.result.value);
  assert.strictEqual(teacherUrl.result.result.value, '/teacher-list', 'URL must change to /teacher-list');
  console.log('  ✅ Verified: Address bar changed to /teacher-list!');

  // Step 4: Click on "বাজার"
  console.log('\nStep 4: Clicking on "বাজার" in sidebar...');
  await send('Runtime.evaluate', {
    expression: `(() => {
      const parent = document.querySelector('a[href="#market"]');
      if (parent) parent.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 500));

  const marketUrl = await send('Runtime.evaluate', {
    expression: 'window.location.pathname',
    returnByValue: true
  });
  console.log('  -> Current URL pathname:', marketUrl.result.result.value);
  assert.strictEqual(marketUrl.result.result.value, '/bazar-weekly-create', 'URL must change to /bazar-weekly-create');
  console.log('  ✅ Verified: Address bar changed to /bazar-weekly-create!');

  // Step 5: Test Browser Back Button
  console.log('\nStep 5: Testing Browser Back Button navigation...');
  await send('Runtime.evaluate', {
    expression: 'window.history.back()'
  });
  await new Promise(r => setTimeout(r, 500));

  const backUrl = await send('Runtime.evaluate', {
    expression: 'window.location.pathname',
    returnByValue: true
  });
  console.log('  -> Back navigation URL pathname:', backUrl.result.result.value);
  assert.strictEqual(backUrl.result.result.value, '/teacher-list', 'Back navigation must restore /teacher-list');
  console.log('  ✅ Verified: Browser Back button successfully updated URL and view!');

  // Step 6: Direct URL Navigation / Refresh
  console.log('\nStep 6: Testing Direct URL loading (e.g. http://localhost:3000/student-create)...');
  await send('Page.navigate', { url: 'http://localhost:3000/student-create' });
  await new Promise(r => setTimeout(r, 2000));

  const directCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        url: window.location.pathname,
        breadcrumb: document.querySelector('.breadcrumb')?.innerText || '',
        hasForm: !!document.querySelector('form')
      };
    })()`,
    returnByValue: true
  });
  console.log('  -> Direct navigation result:', directCheck.result.result.value);
  assert.strictEqual(directCheck.result.result.value.url, '/student-create');
  assert.ok(directCheck.result.result.value.breadcrumb.includes('ছাত্র/ছাত্রী'), 'Breadcrumb must render student section');
  console.log('  ✅ Verified: Direct URL navigation loaded student admission form cleanly!');

  console.log('\n========================================================');
  console.log('🎉 ALL NEXT.JS URL ROUTING & NAVIGATION TESTS PASSED 100%!');
  console.log('========================================================\n');

  ws.close();
  chrome.kill();
}

testUrlRouting().catch(e => {
  console.error('Test Failed:', e);
  process.exit(1);
});
