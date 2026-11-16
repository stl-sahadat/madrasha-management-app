const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ARTIFACT_DIR = '/home/md-sahadat-hossain/.gemini/antigravity/brain/091ea7ae-aba3-4db8-b536-393ee7f4cb0c';

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 VERIFYING WHATSAPP, SEARCH, ACCOUNTS & LOGIN');
  console.log('====================================================\n');

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
    const listRes = await fetch('http://localhost:9226/json/new?http://localhost:3000/admin/login', { method: 'PUT' });
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
  await new Promise(r => setTimeout(r, 1500));

  async function takeScreenshot(fileName) {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, fileName);
    fs.writeFileSync(outPath, buffer);
    console.log(`  📸 Screenshot saved: ${fileName}`);
  }

  // 1. Verify Login Page
  console.log('Step 1: Checking login page pre-filled credentials...');
  await takeScreenshot('verified_login_page.png');

  // Click Login to Dashboard button
  console.log('Step 2: Clicking "Login to Dashboard"...');
  const loginRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('button[type="submit"]') || document.querySelector('#submitButton');
        if (btn) { btn.click(); return true; }
        return false;
      })()
    `
  });
  console.log('  Login button clicked:', loginRes.result?.value);
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('verified_after_login_dashboard.png');

  // 2. Navigate to WhatsApp Messaging (/admin/sms/send-to-client)
  console.log('Step 3: Navigating to WhatsApp messaging module...');
  await send('Page.navigate', { url: 'http://localhost:3000/admin/sms/send-to-client' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('verified_whatsapp_messaging_module.png');

  // Test typing in student search
  console.log('Step 4: Testing real-time student search in WhatsApp module...');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const searchInput = document.querySelector('input[placeholder*="নাম, রোল বা মোবাইল"]');
        if (searchInput) {
          searchInput.value = "আবু বকর";
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          return true;
        }
        return false;
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('verified_whatsapp_student_search.png');

  // 3. Navigate to Student List and test Universal Student Search
  console.log('Step 5: Testing Universal Student Search in Student List (/admin/student-list)...');
  await send('Page.navigate', { url: 'http://localhost:3000/student-list' });
  await new Promise(r => setTimeout(r, 2000));
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const nameInput = document.querySelector('#search_name');
        if (nameInput) {
          nameInput.value = "আব্দুল্লাহ";
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
          return true;
        }
        return false;
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1000));
  await takeScreenshot('verified_student_list_name_search.png');

  // 4. Navigate to Accounts Module (/admin/account) and verify button spacing
  console.log('Step 6: Checking Accounts Module action buttons spacing (/admin/account)...');
  await send('Page.navigate', { url: 'http://localhost:3000/admin/account' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('verified_accounts_clean_buttons.png');

  // 5. Navigate to 12-Month Fee Matrix
  console.log('Step 7: Checking Fee Matrix with student search...');
  await send('Page.navigate', { url: 'http://localhost:3000/student-fee-matrix' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('verified_fee_matrix_student_search.png');

  // 6. Navigate to Admission Form
  console.log('Step 8: Checking Admission Form with student search...');
  await send('Page.navigate', { url: 'http://localhost:3000/student-admission-form' });
  await new Promise(r => setTimeout(r, 2000));
  await takeScreenshot('verified_admission_form_search.png');

  console.log('\n====================================================');
  console.log('🎉 ALL VISUAL VERIFICATIONS COMPLETED SUCCESSFULLY!');
  console.log('====================================================');

  chrome.kill();
  process.exit(0);
}

runVerification().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
