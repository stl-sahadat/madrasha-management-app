import { spawn } from 'node:child_process';
import fs from 'node:fs';

async function main() {
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  // 1. Get cookies
  const cookieJar = {};
  function parseCookies(res) {
    let setCookies = [];
    if (res.headers.getSetCookie) setCookies = res.headers.getSetCookie();
    else if (res.headers.get('set-cookie')) setCookies = [res.headers.get('set-cookie')];
    for (const c of setCookies) {
      const [nameVal] = c.split(';');
      const idx = nameVal.indexOf('=');
      if (idx !== -1) {
        cookieJar[nameVal.slice(0, idx).trim()] = nameVal.slice(idx + 1).trim();
      }
    }
  }

  const res1 = await fetch('https://madrasha.hostzonebd.com/dashboard', { headers: { 'User-Agent': userAgent } });
  parseCookies(res1);
  const html1 = await res1.text();
  const csrfMatch = html1.match(/name="_token"\s+value="([^"]+)"/);
  const csrfToken = csrfMatch ? csrfMatch[1] : null;

  const body = new URLSearchParams({ _token: csrfToken, email: 'admin@gmail.com', password: 'admin1234' });
  const res2 = await fetch('https://madrasha.hostzonebd.com/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': Object.entries(cookieJar).map(([k, v]) => `${k}=${v}`).join('; '),
      'User-Agent': userAgent,
      'Referer': 'https://madrasha.hostzonebd.com/admin/login'
    },
    body: body.toString(),
    redirect: 'manual'
  });
  parseCookies(res2);

  console.log('Got live cookies:', cookieJar);

  fs.writeFileSync('/tmp/cookies.json', JSON.stringify(cookieJar));

  // 2. Start Chrome
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,2400'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const listRes = await fetch('http://localhost:9222/json/new?https://madrasha.hostzonebd.com/dashboard', { method: 'PUT' });
  const page = await listRes.json();
  const wsUrl = page.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Network.enable');
  await send('Page.enable');

  // Set cookies
  for (const [name, value] of Object.entries(cookieJar)) {
    await send('Network.setCookie', {
      name,
      value,
      domain: 'madrasha.hostzonebd.com',
      path: '/'
    });
  }

  console.log('Navigating to real live site...');
  await send('Page.navigate', { url: 'https://madrasha.hostzonebd.com/dashboard' });

  // Wait 4s for full load and apexcharts rendering
  await new Promise(r => setTimeout(r, 4000));

  console.log('Capturing real live screenshot...');
  const realShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('/tmp/real_live_full.png', Buffer.from(realShot.result.data, 'base64'));
  console.log('Saved /tmp/real_live_full.png');

  // Also navigate to localhost:5173
  console.log('Navigating to localhost:5173...');
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 3000));

  const localShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('/tmp/localhost_full.png', Buffer.from(localShot.result.data, 'base64'));
  console.log('Saved /tmp/localhost_full.png');

  ws.close();
  chrome.kill();
}

main().catch(console.error);
