import fs from 'node:fs';

async function main() {
  const cookieJar = {};

  function parseCookies(res) {
    let setCookies = [];
    if (res.headers.getSetCookie) {
      setCookies = res.headers.getSetCookie();
    } else {
      const h = res.headers.get('set-cookie');
      if (h) setCookies = [h];
    }
    for (const c of setCookies) {
      const [nameVal] = c.split(';');
      const idx = nameVal.indexOf('=');
      if (idx !== -1) {
        const name = nameVal.slice(0, idx).trim();
        const val = nameVal.slice(idx + 1).trim();
        cookieJar[name] = val;
      }
    }
  }

  function getCookieHeader() {
    return Object.entries(cookieJar)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

  console.log('1. Fetching login page...');
  const res1 = await fetch('https://madrasha.hostzonebd.com/dashboard', {
    headers: { 'User-Agent': userAgent }
  });
  parseCookies(res1);
  const html1 = await res1.text();

  const csrfMatch = html1.match(/name="_token"\s+value="([^"]+)"/);
  const csrfToken = csrfMatch ? csrfMatch[1] : null;
  console.log('CSRF Token:', csrfToken);
  console.log('CookieJar after step 1:', cookieJar);

  console.log('2. Logging in...');
  const body = new URLSearchParams({
    _token: csrfToken,
    email: 'admin@gmail.com',
    password: 'admin1234'
  });

  const res2 = await fetch('https://madrasha.hostzonebd.com/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': getCookieHeader(),
      'User-Agent': userAgent,
      'Referer': 'https://madrasha.hostzonebd.com/admin/login',
      'Origin': 'https://madrasha.hostzonebd.com'
    },
    body: body.toString(),
    redirect: 'manual'
  });

  parseCookies(res2);
  console.log('Login status:', res2.status);
  const loc = res2.headers.get('location');
  console.log('Login redirect location:', loc);
  console.log('CookieJar after login:', cookieJar);

  console.log('3. Fetching dashboard with updated cookies...');
  const targetUrl = loc ? new URL(loc, 'https://madrasha.hostzonebd.com').toString() : 'https://madrasha.hostzonebd.com/dashboard';
  const res3 = await fetch(targetUrl, {
    headers: {
      'Cookie': getCookieHeader(),
      'User-Agent': userAgent,
      'Referer': 'https://madrasha.hostzonebd.com/admin/login'
    }
  });

  parseCookies(res3);
  console.log('Step 3 URL:', res3.url, 'Status:', res3.status);
  const finalHtml = await res3.text();
  console.log('Final HTML length:', finalHtml.length);
  fs.writeFileSync('/tmp/dashboard.html', finalHtml);

  // Check title
  const titleMatch = finalHtml.match(/<title>(.*?)<\/title>/i);
  console.log('Page Title:', titleMatch ? titleMatch[1] : 'No title');
}

main().catch(err => {
  console.error('Fatal error:', err);
});
