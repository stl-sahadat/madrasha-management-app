import http from 'node:http';

const TARGET_PORT = 3000;
const PROXY_PORT = 5173;

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', err => {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('মাদরাসা অ্যাপ লোড হচ্ছে, অনুগ্রহ করে কয়েক সেকেন্ড পর রিফ্রেশ করুন...');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`📡 Dual-port bridge active: http://localhost:${PROXY_PORT} -> http://localhost:${TARGET_PORT}`);
});
