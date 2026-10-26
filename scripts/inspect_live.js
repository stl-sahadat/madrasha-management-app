import { spawn } from 'node:child_process';
import fs from 'node:fs';

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const listRes = await fetch('http://localhost:9222/json/new?https://madrasha.hostzonebd.com/dashboard', { method: 'PUT' });
  const page = await listRes.json();
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();
  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
  };
  await new Promise(r => ws.onopen = r);
  function send(m, p={}) { return new Promise(res => { const id = msgId++; pending.set(id, res); ws.send(JSON.stringify({id, method: m, params: p})); }); }

  await send('Network.enable');
  await send('Page.enable');

  const cookieJar = JSON.parse(fs.readFileSync('/tmp/cookies.json', 'utf8'));
  for (const [name, value] of Object.entries(cookieJar)) {
    await send('Network.setCookie', { name, value, domain: 'madrasha.hostzonebd.com', path: '/' });
  }

  await send('Page.navigate', { url: 'https://madrasha.hostzonebd.com/dashboard' });
  await new Promise(r => setTimeout(r, 3500));

  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const toggle = document.querySelector('.header-toggle');
        if (!toggle) return { toggle: null };
        const cs = window.getComputedStyle(toggle);
        return {
          width: cs.width,
          height: cs.height,
          backgroundColor: cs.backgroundColor,
          borderRadius: cs.borderRadius,
          display: cs.display,
          alignItems: cs.alignItems,
          justifyContent: cs.justifyContent,
          color: cs.color
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Live Header Toggle:', evalRes.result.result.value);

  ws.close();
  chrome.kill();
}

main().catch(console.error);
