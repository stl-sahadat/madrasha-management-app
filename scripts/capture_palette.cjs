const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

async function captureScreenshots() {
  const artifactDir = '/home/md-sahadat-hossain/.gemini/antigravity/brain/091ea7ae-aba3-4db8-b536-393ee7f4cb0c';

  console.log('Launching Chrome CDP on port 9226...');
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9226',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  let page;
  try {
    const listRes = await fetch('http://localhost:9226/json/new?http://localhost:3000/login', { method: 'PUT' });
    page = await listRes.json();
  } catch (err) {
    console.error('Failed to connect to Chrome CDP:', err.message);
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const cur = id++;
      pending.set(cur, { resolve, reject });
      ws.send(JSON.stringify({ id: cur, method, params }));
    });
  }

  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.id && pending.has(d.id)) {
      const { resolve, reject } = pending.get(d.id);
      pending.delete(d.id);
      if (d.error) reject(d.error);
      else resolve(d.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');

  async function takeShot(url, filename, isMobile = false) {
    if (isMobile) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        mobile: true
      });
    } else {
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });
    }

    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 1800));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const targetPath = path.join(artifactDir, filename);
    fs.writeFileSync(targetPath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${filename}`);
  }

  try {
    // 1. Login Desktop
    await takeShot('http://localhost:3000/login', 'forest_slate_login.png', false);

    // 2. Dashboard Desktop
    await takeShot('http://localhost:3000/dashboard', 'forest_slate_dashboard.png', false);

    // 3. Student List Desktop
    await takeShot('http://localhost:3000/student-list', 'forest_slate_students.png', false);

    // 4. Donation Desktop
    await takeShot('http://localhost:3000/donation-zakat', 'forest_slate_donation.png', false);

    // 5. Reports Desktop
    await takeShot('http://localhost:3000/reports', 'forest_slate_reports.png', false);

    // 6. Mobile Dashboard
    await takeShot('http://localhost:3000/dashboard', 'forest_slate_mobile_dashboard.png', true);

    // 7. Mobile Login
    await takeShot('http://localhost:3000/login', 'forest_slate_mobile_login.png', true);

    console.log('All screenshots captured successfully!');
  } finally {
    ws.close();
    chrome.kill();
  }
}

captureScreenshots().catch(console.error);
