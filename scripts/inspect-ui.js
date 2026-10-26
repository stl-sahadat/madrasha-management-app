import { spawn } from 'node:child_process';
import fs from 'node:fs';

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1600,900',
    '--remote-debugging-port=9222',
    'http://localhost:5173'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch('http://127.0.0.1:9222/json');
        targets = await res.json();
        if (targets && targets.length > 0) break;
      } catch (e) {}
    }

    const pageTarget = targets.find(t => t.type === 'page');
    console.log('Connected to target:', pageTarget.url);

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            if (data.error) reject(data.error);
            else resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');
    await new Promise(r => setTimeout(r, 1500));

    // Capture initial screenshot
    const shot0 = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/tmp/screen_0_initial.png', Buffer.from(shot0.data, 'base64'));

    // Check initial state
    const evalInitial = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const nav = document.querySelector('nav');
          const studentUl = document.getElementById('students');
          return {
            navClass: nav?.className,
            studentUlDisplay: studentUl ? getComputedStyle(studentUl).display : null,
            studentUlVisibility: studentUl ? getComputedStyle(studentUl).visibility : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Initial state:', evalInitial.result.value);

    // Click on "ছাত্র/ছাত্রী"
    console.log('Clicking on ছাত্র/ছাত্রী category header...');
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const studentLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('ছাত্র/ছাত্রী') && a.getAttribute('href') === '#students');
          if (studentLink) studentLink.click();
        })()
      `
    });

    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot after clicking ছাত্র/ছাত্রী
    const shot1 = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/tmp/screen_1_students_expanded.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved /tmp/screen_1_students_expanded.png');

    // Evaluate state after expanding ছাত্র/ছাত্রী
    const evalAfterStudents = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('students');
          const nav = document.querySelector('nav');
          const whiteBoxes = Array.from(document.querySelectorAll('*')).filter(el => {
            const rect = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            // Looking for floating unexpected boxes: left > 200, width > 50, fixed or absolute or high z-index
            return rect.left > 200 && rect.left < 500 && rect.top < 200 && rect.width > 50 && rect.width < 400 && (s.position === 'fixed' || s.position === 'absolute') && rect.height > 200;
          }).map(e => ({
            tag: e.tagName,
            className: e.className,
            rect: e.getBoundingClientRect(),
            position: getComputedStyle(e).position,
            zIndex: getComputedStyle(e).zIndex
          }));

          const subItems = Array.from(el?.querySelectorAll('li a') || []).map(a => ({
            text: a.textContent.trim(),
            display: getComputedStyle(a).display,
            visibility: getComputedStyle(a).visibility,
            rect: a.getBoundingClientRect()
          }));

          return {
            studentsUl: {
              className: el?.className,
              display: el ? getComputedStyle(el).display : null,
              visibility: el ? getComputedStyle(el).visibility : null,
              height: el ? getComputedStyle(el).height : null,
              width: el ? getComputedStyle(el).width : null,
              childCount: subItems.length,
              subItemsSample: subItems.slice(0, 5)
            },
            unexpectedFloatingBoxes: whiteBoxes
          };
        })()
      `,
      returnByValue: true
    });
    console.log('AFTER STUDENTS CLICK:', JSON.stringify(evalAfterStudents.result.value, null, 2));

    // Now click on a sub-item: "ছাত্র/ছাত্রী লিস্ট"
    console.log('Clicking on sub-item "ছাত্র/ছাত্রী লিস্ট"...');
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const listLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('ছাত্র/ছাত্রী লিস্ট'));
          if (listLink) listLink.click();
        })()
      `
    });

    await new Promise(r => setTimeout(r, 600));

    // Capture screenshot after navigating to student-list
    const shot2 = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/tmp/screen_2_student_list_page.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved /tmp/screen_2_student_list_page.png');

    const evalAfterNav = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const whiteBoxes = Array.from(document.querySelectorAll('*')).filter(el => {
            const rect = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return rect.left > 200 && rect.left < 500 && rect.top < 200 && rect.width > 50 && rect.width < 400 && (s.position === 'fixed' || s.position === 'absolute') && rect.height > 200;
          }).map(e => ({
            tag: e.tagName,
            className: e.className,
            rect: e.getBoundingClientRect(),
            position: getComputedStyle(e).position,
            zIndex: getComputedStyle(e).zIndex
          }));

          const breadcrumb = document.querySelector('.breadcrumb-nav') || document.querySelector('[aria-label="breadcrumb"]');

          return {
            unexpectedFloatingBoxes: whiteBoxes,
            breadcrumbComputed: breadcrumb ? {
              tag: breadcrumb.tagName,
              className: breadcrumb.className,
              position: getComputedStyle(breadcrumb).position,
              width: getComputedStyle(breadcrumb).width,
              height: getComputedStyle(breadcrumb).height,
              rect: breadcrumb.getBoundingClientRect()
            } : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('AFTER NAV TO STUDENT LIST:', JSON.stringify(evalAfterNav.result.value, null, 2));

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(console.error);
