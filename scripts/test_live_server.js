import assert from 'node:assert';

const BASE_URL = 'http://localhost:3000';

async function testLiveServer() {
  console.log('🚀 Starting Deep Live Verification on http://localhost:3000...\n');

  // 1. Health & Headers Check
  console.log('Step 1: Testing /api/health and Security HTTP Headers...');
  const healthRes = await fetch(`${BASE_URL}/api/health`);
  assert.strictEqual(healthRes.status, 200);
  const healthJson = await healthRes.json();
  assert.strictEqual(healthJson.status, 'ok');
  
  // Headers audit
  const headers = healthRes.headers;
  assert.strictEqual(headers.get('x-content-type-options'), 'nosniff');
  assert.strictEqual(headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.strictEqual(headers.get('x-xss-protection'), '1; mode=block');
  assert.ok(headers.get('content-security-policy'), 'CSP header must be present');
  assert.ok(headers.get('strict-transport-security'), 'HSTS header must be present');
  console.log('  ✅ Enterprise Security Headers and /api/health verified 100%.');

  // 2. Multi-dimensional Account-Targeted Brute-Force Rate Limiting
  console.log('\nStep 2: Testing Multi-Dimensional Brute-Force Protection & Account Lockout...');
  const targetEmail = `brute_victim_${Date.now()}@madrasha.edu`;

  // First 5 failed attempts from different spoofed IPs
  for (let i = 1; i <= 5; i++) {
    const failRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': `10.200.0.${i}`
      },
      body: JSON.stringify({ emailOrUsername: targetEmail, password: 'WrongPassword!' })
    });
    assert.strictEqual(failRes.status, 401, `Attempt ${i} should be 401 Unauthorized`);
    const failJson = await failRes.json();
    assert.strictEqual(failJson.success, false);
    assert.strictEqual(failJson.remainingAttempts, 5 - i);
  }

  // 6th attempt from yet another IP (10.200.0.99) MUST BE BLOCKED BY ACCOUNT LOCKOUT!
  const blockedRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-For': '10.200.0.99'
    },
    body: JSON.stringify({ emailOrUsername: targetEmail, password: 'WrongPassword!' })
  });
  assert.strictEqual(blockedRes.status, 429, '6th attempt must return HTTP 429 Too Many Requests');
  const blockedJson = await blockedRes.json();
  assert.strictEqual(blockedJson.success, false);
  assert.ok(blockedJson.retryAfter > 0, 'Retry-after must be positive');
  assert.ok(blockedJson.message.includes('স্থগিত') || blockedJson.message.includes('সুরক্ষিত'), 'Lockout message returned');
  console.log(`  ✅ Account lockout verified: 6th attempt across spoofed IPs successfully BLOCKED (HTTP 429, Retry-After: ${blockedJson.retryAfter}s).`);

  // 3. Super Admin Successful Login & HttpOnly Cookie Issuance
  console.log('\nStep 3: Testing Super Admin Successful Authentication...');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrUsername: 'admin@gmail.com', password: 'admin1234', remember: true })
  });
  assert.strictEqual(loginRes.status, 200);
  const loginJson = await loginRes.json();
  assert.strictEqual(loginJson.success, true);
  assert.strictEqual(loginJson.user.email, 'admin@gmail.com');
  assert.strictEqual(loginJson.user.role, 'Super Admin');
  assert.strictEqual(loginJson.user.password, undefined, 'Plaintext password must not be returned');
  assert.strictEqual(loginJson.user.passwordHash, undefined, 'Password hash must not be returned');

  // Verify Set-Cookie header contains HttpOnly madrasha_auth_token
  const setCookie = loginRes.headers.get('set-cookie');
  assert.ok(setCookie, 'Set-Cookie header must be present');
  assert.ok(setCookie.includes('madrasha_auth_token='), 'Cookie name must match');
  assert.ok(setCookie.toLowerCase().includes('httponly'), 'Cookie must be HttpOnly');
  assert.ok(setCookie.toLowerCase().includes('samesite=lax'), 'Cookie must have SameSite=lax');
  const tokenCookieVal = setCookie.split(';')[0];
  console.log('  ✅ Login successful: HttpOnly cookie issued and sensitive password fields stripped.');

  // 4. Testing /api/auth/me session resolution with cookie
  console.log('\nStep 4: Testing /api/auth/me with HttpOnly Session Cookie...');
  const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { 'Cookie': tokenCookieVal }
  });
  assert.strictEqual(meRes.status, 200);
  const meJson = await meRes.json();
  assert.strictEqual(meJson.success, true);
  assert.strictEqual(meJson.user.email, 'admin@gmail.com');
  assert.strictEqual(meJson.user.name, 'মুহতামিম / সুপার এডমিন');
  console.log('  ✅ /api/auth/me verified: Authenticated user profile resolved flawlessly.');

  // 5. Testing Registration of New User via API
  console.log('\nStep 5: Testing User Registration & Persistence...');
  const uniqueUser = `teacher_${Date.now()}`;
  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'মাওলানা আব্দুল হক নদভী',
      username: uniqueUser,
      email: `${uniqueUser}@madrasha.edu`,
      phone: '01812345678',
      role: 'Teacher',
      password: 'StrongTeacherPass2026!'
    })
  });
  assert.strictEqual(regRes.status, 201);
  const regJson = await regRes.json();
  assert.strictEqual(regJson.success, true);
  assert.strictEqual(regJson.user.username, uniqueUser);
  assert.strictEqual(regJson.user.password, undefined);
  assert.strictEqual(regJson.user.passwordHash, undefined);

  // Authenticate newly registered user with their password
  const newLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      emailOrUsername: uniqueUser,
      password: 'StrongTeacherPass2026!'
    })
  });
  assert.strictEqual(newLoginRes.status, 200);
  const newLoginJson = await newLoginRes.json();
  assert.strictEqual(newLoginJson.success, true);
  assert.strictEqual(newLoginJson.user.name, 'মাওলানা আব্দুল হক নদভী');
  console.log('  ✅ Registration & immediate authentication verified with 0 credentials leaked.');

  // 6. Testing Logout
  console.log('\nStep 6: Testing /api/auth/logout Cookie Invalidation...');
  const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, { method: 'POST' });
  assert.strictEqual(logoutRes.status, 200);
  const logoutCookie = logoutRes.headers.get('set-cookie');
  assert.ok(logoutCookie.includes('Max-Age=0') || logoutCookie.includes('expires='), 'Cookie must be expired');
  console.log('  ✅ Logout successfully cleared HttpOnly auth cookie.');

  console.log('\n========================================================');
  console.log('🎉 ALL LIVE SERVER SECURITY TESTS PASSED (100% GREEN)');
  console.log('========================================================\n');
}

testLiveServer().catch(err => {
  console.error('❌ Live Server Test Failure:', err);
  process.exit(1);
});
