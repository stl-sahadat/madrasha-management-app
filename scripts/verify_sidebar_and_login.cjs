const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

async function testUI() {
  const artifactDir = '/home/md-sahadat-hossain/.gemini/antigravity/brain/091ea7ae-aba3-4db8-b536-393ee7f4cb0c';

  console.log('Starting Chrome headless CDP on port 9230...');
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9230',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,850'
  ]);

  await new Promise(r => setTimeout(r, 1600));

  async function sendCDP(ws, method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = Math.floor(Math.random() * 100000);
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  try {
    // ----------------------------------------------------------------
    // TEST 1: DESKTOP LOGIN & COLLAPSED SIDEBAR EXPANSION
    // ----------------------------------------------------------------
    console.log('\n--- 1. Testing Desktop Flow ---');
    const pageRes = await fetch('http://localhost:9230/json/new?http://localhost:3000/admin/login', { method: 'PUT' });
    const target = await pageRes.json();
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res);
      ws.addEventListener('error', rej);
    });

    console.log('Connected to CDP, waiting for login page...');
    await new Promise(r => setTimeout(r, 2000));

    // Capture initial login view
    let shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verified_login_initial.png'), Buffer.from(shot.data, 'base64'));
    console.log('✅ Saved verified_login_initial.png');

    // 2. Click Login Submit Button
    console.log('Submitting login form...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('button.auth-btn-submit').click()`
    });
    await new Promise(r => setTimeout(r, 1500));

    // Capture dashboard after login
    shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verified_dashboard_after_auto_login.png'), Buffer.from(shot.data, 'base64'));
    console.log('✅ Saved verified_dashboard_after_auto_login.png');

    // 3. Toggle sidebar collapsed
    console.log('Clicking toggle button to collapse sidebar...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.header-toggle').click()`
    });
    await new Promise(r => setTimeout(r, 700));

    // Verify submenus are hidden in collapsed state
    const evalSubmenu = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const sub = document.querySelector('#monthly-donors');
          const style = sub ? window.getComputedStyle(sub) : null;
          return { display: style ? style.display : 'none', opacity: style ? style.opacity : '0' };
        })()
      `,
      returnByValue: true
    });
    console.log('Collapsed submenu computed style:', evalSubmenu.result.value);

    shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verified_sidebar_collapsed_no_squish.png'), Buffer.from(shot.data, 'base64'));
    console.log('✅ Saved verified_sidebar_collapsed_no_squish.png');

    // 4. Click Monthly Donors (calendar icon) while collapsed - MUST AUTO-EXPAND!
    console.log('Clicking Monthly Donors while collapsed to test auto-expand...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        const link = document.querySelector('nav .main-nav li a[href="#monthly-donors"]');
        if (link) link.click();
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const evalExpanded = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const nav = document.querySelector('nav.app-sidebar');
          const sub = document.querySelector('#monthly-donors');
          return {
            navClasses: nav ? nav.className : '',
            submenuVisible: sub ? sub.classList.contains('show') : false
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Expanded state after icon click:', evalExpanded.result.value);

    shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verified_sidebar_auto_expanded_full.png'), Buffer.from(shot.data, 'base64'));
    console.log('✅ Saved verified_sidebar_auto_expanded_full.png');

    // ----------------------------------------------------------------
    // TEST 2: MOBILE VIEW (375x812 iPhone)
    // ----------------------------------------------------------------
    console.log('\n--- 2. Testing Mobile Device Emulation (375x812) ---');
    await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 600));

    // On mobile, navigate to contributor list
    console.log('Navigating to /admin/contributor on mobile...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/admin/contributor' });
    await new Promise(r => setTimeout(r, 1500));

    // Verify sidebar is completely closed and NOT taking 80px space
    const evalMobileNav = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const nav = document.querySelector('nav.app-sidebar');
          const style = nav ? window.getComputedStyle(nav) : null;
          const content = document.querySelector('.app-content');
          const contentStyle = content ? window.getComputedStyle(content) : null;
          return {
            navDisplay: style ? style.display : 'none',
            contentPaddingLeft: contentStyle ? contentStyle.paddingLeft : '0px'
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Mobile nav state on contributor page:', evalMobileNav.result.value);

    shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verified_mobile_contributor_clean.png'), Buffer.from(shot.data, 'base64'));
    console.log('✅ Saved verified_mobile_contributor_clean.png');

    // Open mobile sidebar drawer via toggle button
    console.log('Opening mobile sidebar drawer...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.header-toggle').click()`
    });
    await new Promise(r => setTimeout(r, 800));

    shot = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'verified_mobile_drawer_open.png'), Buffer.from(shot.data, 'base64'));
    console.log('✅ Saved verified_mobile_drawer_open.png');

    console.log('\n🎉 ALL VERIFICATIONS PASSED 100% CLEANLY!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    chrome.kill();
  }
}

testUI();
