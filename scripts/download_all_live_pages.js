import fs from 'node:fs';
import path from 'node:path';

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

  console.log('1. Logging in to live site...');
  const res1 = await fetch('https://madrasha.hostzonebd.com/dashboard', {
    headers: { 'User-Agent': userAgent }
  });
  parseCookies(res1);
  const html1 = await res1.text();
  const csrfMatch = html1.match(/name="_token"\s+value="([^"]+)"/);
  const csrfToken = csrfMatch ? csrfMatch[1] : null;

  const res2 = await fetch('https://madrasha.hostzonebd.com/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': getCookieHeader(),
      'User-Agent': userAgent,
      'Referer': 'https://madrasha.hostzonebd.com/admin/login',
      'Origin': 'https://madrasha.hostzonebd.com'
    },
    body: new URLSearchParams({
      _token: csrfToken,
      email: 'admin@gmail.com',
      password: 'admin1234'
    }).toString(),
    redirect: 'manual'
  });
  parseCookies(res2);

  const outDir = '/tmp/live_pages';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const targetRoutes = [
    { url: 'https://madrasha.hostzonebd.com/admin/weeklymarket/create', file: 'weeklymarket_create.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/weeklymarket', file: 'weeklymarket_report.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/weeklymarket/list', file: 'weeklymarket_list.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/monthlymarket/create', file: 'monthlymarket_create.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/monthlymarket', file: 'monthlymarket_report.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/monthlymarket/list', file: 'monthlymarket_list.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/committee-member', file: 'committee_member.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/attendance/student', file: 'attendance_student.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/attendance/student/report', file: 'attendance_student_report.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/attendance/teacher', file: 'attendance_teacher.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/attendance/teacher/report', file: 'attendance_teacher_report.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/cash/add/deposit', file: 'cash_add_deposit.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/cash/deposit/list', file: 'cash_deposit_list.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/cash/add/expense', file: 'cash_add_expense.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/cash/expense/list', file: 'cash_expense_list.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/id-card', file: 'id_card_student.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/id-card/teacher', file: 'id_card_teacher.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/result/create', file: 'result_create.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/result/result/sheet', file: 'result_sheet.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/result/result/student', file: 'result_student.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/contributor', file: 'contributor_create.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/doner', file: 'doner_create.html' },
    { url: 'https://madrasha.hostzonebd.com/admin/zakatdoner', file: 'zakatdoner_create.html' }
  ];

  for (const item of targetRoutes) {
    try {
      const res = await fetch(item.url, {
        headers: {
          'Cookie': getCookieHeader(),
          'User-Agent': userAgent,
          'Referer': 'https://madrasha.hostzonebd.com/dashboard'
        }
      });
      const html = await res.text();
      fs.writeFileSync(path.join(outDir, item.file), html);
      console.log(`Saved ${item.file} (${html.length} bytes, status ${res.status})`);
    } catch (e) {
      console.error(`Failed ${item.url}:`, e.message);
    }
  }
}

main().catch(console.error);
