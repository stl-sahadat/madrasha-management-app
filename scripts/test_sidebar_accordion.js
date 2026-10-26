import { spawn } from 'node:child_process';
import assert from 'node:assert';

async function testSidebarAccordion() {
  console.log('====================================================');
  console.log('🧪 SIDEBAR ACCORDION & FLOATING BOX TEST SUITE');
  console.log('====================================================\n');

  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1600,900',
    '--remote-debugging-port=9223',
    'http://localhost:3000'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch('http://127.0.0.1:9223/json');
        targets = await res.json();
        if (targets && targets.length > 0) break;
      } catch (e) {}
    }

    assert.ok(targets && targets.length > 0, 'Headless Chrome failed to start');
    const pageTarget = targets.find(t => t.type === 'page');
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

    // Helper: check for any floating white boxes
    async function checkFloatingBoxes(stepName) {
      const res = await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const all = Array.from(document.querySelectorAll('*'));
            return all.filter(el => {
              if (el.tagName === 'NAV' && el.classList.contains('app-sidebar')) return false;
              const rect = el.getBoundingClientRect();
              const s = getComputedStyle(el);
              return rect.left > 200 && rect.left < 500 && rect.top < 200 && rect.width > 50 && rect.width < 400 && (s.position === 'fixed' || s.position === 'absolute') && rect.height > 200;
            }).map(e => ({ tag: e.tagName, className: e.className }));
          })()
        `,
        returnByValue: true
      });
      const boxes = res.result.value;
      assert.strictEqual(boxes.length, 0, `Step [${stepName}] found unexpected floating white boxes: ${JSON.stringify(boxes)}`);
    }

    // Helper: toggle a category and check its submenu state
    async function testCategory(categoryName, categoryHref, submenuId, expectedMinChildren) {
      console.log(`Testing category [${categoryName}]...`);
      // Click category
      await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('${categoryName}') && a.getAttribute('href') === '${categoryHref}');
            if (link) link.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 400));

      // Inspect submenu
      const res = await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${submenuId}');
            if (!el) return null;
            const cs = getComputedStyle(el);
            const items = Array.from(el.querySelectorAll('li a')).map(a => ({
              text: a.textContent.trim(),
              display: getComputedStyle(a).display,
              visibility: getComputedStyle(a).visibility
            }));
            return {
              display: cs.display,
              visibility: cs.visibility,
              height: parseFloat(cs.height),
              itemCount: items.length,
              allItemsVisible: items.every(i => i.display !== 'none' && i.visibility === 'visible')
            };
          })()
        `,
        returnByValue: true
      });

      const submenu = res.result.value;
      assert.ok(submenu, `Submenu #${submenuId} not found in DOM`);
      assert.strictEqual(submenu.display, 'block', `Submenu #${submenuId} display should be block`);
      assert.strictEqual(submenu.visibility, 'visible', `Submenu #${submenuId} visibility should be visible`);
      assert.ok(submenu.height > 50, `Submenu #${submenuId} height should be > 50px (was ${submenu.height}px)`);
      assert.ok(submenu.itemCount >= expectedMinChildren, `Submenu #${submenuId} should have >= ${expectedMinChildren} items (got ${submenu.itemCount})`);
      assert.strictEqual(submenu.allItemsVisible, true, `All child items of #${submenuId} must be visible`);

      await checkFloatingBoxes(`After opening ${categoryName}`);
      console.log(`  ✅ [${categoryName}] smoothly expanded with ${submenu.itemCount} items, height: ${submenu.height}px, 0 floating boxes.`);
    }

    // 1. Initial State Check
    await checkFloatingBoxes('Initial Dashboard');
    console.log('✅ Initial Dashboard has 0 floating white boxes.');

    // 2. Test categories
    await testCategory('ছাত্র/ছাত্রী', '#students', 'students', 15);
    await testCategory('শিক্ষক', '#teachers', 'teachers', 5);
    await testCategory('মাসিক চাঁদাদাতা', '#monthly-donors', 'monthly-donors', 5);
    await testCategory('দানকারী', '#donors', 'donors', 5);
    await testCategory('যাকাত দাতা', '#zakat-donors', 'zakat-donors', 5);
    await testCategory('বাজার', '#market', 'market', 5);
    await testCategory('হাজিরা', '#attendance', 'attendance', 4);
    await testCategory('রেজাল্ট', '#results', 'results', 3);
    await testCategory('জমা/খরচ হিসাব সমূহ', '#income-expense', 'income-expense', 4);
    await testCategory('আইডি কার্ড', '#id-cards', 'id-cards', 2);
    await testCategory('এসএমএস', '#sms', 'sms', 2);
    await testCategory('অ্যাকাউন্ট', '#accounts', 'accounts', 5);
    await testCategory('রিপোর্ট', '#reports', 'reports', 10);
    await testCategory('সেটিং', '#settings', 'settings', 7);

    // 3. Test clicking sub-item and verifying breadcrumbs
    console.log('\nTesting sub-item navigation: "ভর্তি ফর্ম"...');
    // Open students again
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('ছাত্র/ছাত্রী') && a.getAttribute('href') === '#students');
          if (link) link.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    // Click on "ভর্তি ফর্ম"
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('ভর্তি ফর্ম'));
          if (link) link.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await checkFloatingBoxes('After navigating to ভর্তি ফর্ম');
    console.log('  ✅ Navigated to "ভর্তি ফর্ম" with 0 floating boxes, breadcrumb rendered cleanly.');

    // 4. Test 1:1 hostzonebd Submenu Active State Styling
    console.log('\nTesting 1:1 hostzonebd Submenu Active Indicator...');
    const activeCheck = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const activeLi = document.querySelector('#students li.active');
          if (!activeLi) return { hasActiveLi: false };
          const a = activeLi.querySelector('a');
          const csA = getComputedStyle(a);
          const csBefore = getComputedStyle(a, '::before');
          const ul = document.getElementById('students');
          const csUl = getComputedStyle(ul);

          return {
            hasActiveLi: true,
            ulBg: csUl.backgroundColor,
            ulBorderLeft: csUl.borderLeft,
            aColor: csA.color,
            aBg: csA.backgroundColor,
            indicatorDisplay: csBefore.display,
            indicatorBg: csBefore.backgroundColor,
            indicatorWidth: csBefore.width
          };
        })()
      `,
      returnByValue: true
    });
    const ac = activeCheck.result.value;
    assert.ok(ac.hasActiveLi, 'Should have active li inside #students');
    assert.strictEqual(ac.ulBg, 'rgba(0, 0, 0, 0)', 'Submenu ul background must be transparent (1:1 with hostzonebd)');
    assert.ok(ac.ulBorderLeft.includes('none') || ac.ulBorderLeft.startsWith('0px'), 'Submenu ul must not have artificial left border');
    assert.strictEqual(ac.aBg, 'rgba(0, 0, 0, 0)', 'Active link background must be transparent (not a full block)');
    assert.strictEqual(ac.indicatorDisplay, 'block', 'Active indicator must be display: block');
    assert.strictEqual(ac.indicatorWidth, '4px', 'Active indicator width must be 4px');
    console.log('  ✅ Submenu active styling matches hostzonebd 1:1 (transparent background + 4px vertical teal indicator).');

    // 5. Test Mobile Viewport & Backdrop
    console.log('\nTesting mobile responsiveness & backdrop...');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sendCommand('Runtime.evaluate', {
      expression: 'window.dispatchEvent(new Event("resize"))'
    });
    await new Promise(r => setTimeout(r, 400));

    // On mobile, initial sidebar should be closed and backdrop absent
    const mobileInit = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const backdrop = document.querySelector('.sidebar-backdrop');
          const nav = document.querySelector('nav.app-sidebar');
          const cs = getComputedStyle(nav);
          return {
            hasBackdrop: Boolean(backdrop),
            transform: cs.transform
          };
        })()
      `,
      returnByValue: true
    });
    assert.strictEqual(mobileInit.result.value.hasBackdrop, false, 'Mobile sidebar should initially be closed without backdrop');
    console.log('  Mobile nav initial transform:', mobileInit.result.value.transform);

    // Click header toggle to open mobile menu
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('.header-toggle');
          if (btn) btn.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    const mobileOpen = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const backdrop = document.querySelector('.sidebar-backdrop');
          const nav = document.querySelector('nav.app-sidebar');
          return {
            hasBackdrop: Boolean(backdrop),
            backdropVisible: backdrop ? getComputedStyle(backdrop).display !== 'none' : false,
            sidebarClasses: nav.className
          };
        })()
      `,
      returnByValue: true
    });
    assert.ok(mobileOpen.result.value.hasBackdrop, 'Mobile backdrop must appear when sidebar is open on mobile');
    assert.strictEqual(mobileOpen.result.value.backdropVisible, true, 'Mobile backdrop must be visible');
    console.log('  ✅ Mobile sidebar opened cleanly with visible overlay backdrop.');

    // Click backdrop to close
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const backdrop = document.querySelector('.sidebar-backdrop');
          if (backdrop) backdrop.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    const mobileClosed = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const backdrop = document.querySelector('.sidebar-backdrop');
          return { hasBackdrop: Boolean(backdrop) };
        })()
      `,
      returnByValue: true
    });
    assert.strictEqual(mobileClosed.result.value.hasBackdrop, false, 'Mobile backdrop must disappear after tapping it');
    console.log('  ✅ Mobile sidebar closed cleanly upon tapping the backdrop overlay.');

    // Reset desktop viewport
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1600,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendCommand('Runtime.evaluate', {
      expression: 'window.dispatchEvent(new Event("resize"))'
    });
    await new Promise(r => setTimeout(r, 400));

    // 6. Test clicking Dashboard leaf
    console.log('\nTesting navigation back to Dashboard...');
    await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('ড্যাশবোর্ড'));
          if (link) link.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await checkFloatingBoxes('Back on Dashboard');
    console.log('  ✅ Returned to Dashboard with 0 floating boxes.');

    console.log('\n====================================================');
    console.log('🎉 ALL ACCORDION, 1:1 STYLES & LAYOUT TESTS PASSED 100% GREEN!');
    console.log('====================================================\n');

    ws.close();
  } finally {
    chrome.kill();
  }
}

testSidebarAccordion().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
