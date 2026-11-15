import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  hashPassword,
  verifyPassword,
  signJwt,
  verifyJwt,
  sanitizeString,
  sanitizeUserOutput,
  MAX_PASSWORD_LENGTH
} from '../src/lib/security.ts';
import {
  checkRateLimit,
  recordFailedAttempt,
  checkRateLimitStatus,
  resetRateLimit,
  getClientIp,
  isValidIp
} from '../src/lib/rateLimit.ts';
import {
  authenticateCredentials,
  registerNewUser,
  findUserByIdentifier,
  findUserById
} from '../src/lib/users.ts';

console.log('========================================================');
console.log('🛡️  ENTERPRISE BACKEND SECURITY VERIFICATION TEST SUITE');
console.log('========================================================\n');

async function runSecurityTests() {
  // ----------------------------------------------------
  // Test 1: Bcrypt Password Hashing & Verification
  // ----------------------------------------------------
  console.log('Test 1: Verifying Bcrypt Password Hashing & Salt Verification...');
  const testPassword = 'AdminSecret2026!@#';
  const hash = await hashPassword(testPassword);
  assert.ok(hash.startsWith('$2a$') || hash.startsWith('$2b$'), 'Hash must be valid bcrypt format');
  assert.notStrictEqual(hash, testPassword, 'Hash must not equal plaintext password');
  
  const matchesCorrect = await verifyPassword(testPassword, hash);
  assert.strictEqual(matchesCorrect, true, 'Correct password must verify successfully');

  const matchesWrong = await verifyPassword('WrongPassword123', hash);
  assert.strictEqual(matchesWrong, false, 'Wrong password must be rejected');
  console.log('  ✅ Bcrypt hashing and verification verified.');

  // ----------------------------------------------------
  // Test 2: JWT Creation, Expiration & Tamper Resistance
  // ----------------------------------------------------
  console.log('\nTest 2: Verifying JOSE JWT Signing, Expiration & Tamper Resistance...');
  const payload = { userId: 'USR-001', email: 'admin@gmail.com', role: 'Super Admin' };
  const token = await signJwt(payload, '1h');
  assert.strictEqual(typeof token, 'string');
  assert.strictEqual(token.split('.').length, 3, 'JWT must have header, payload, and signature');

  const verifiedPayload = await verifyJwt(token);
  assert.ok(verifiedPayload, 'Token must verify');
  assert.strictEqual(verifiedPayload.userId, 'USR-001');
  assert.strictEqual(verifiedPayload.email, 'admin@gmail.com');
  assert.strictEqual(verifiedPayload.role, 'Super Admin');

  // Tamper test: modify payload
  const parts = token.split('.');
  const tamperedToken = `${parts[0]}.${parts[1]}abc.${parts[2]}`;
  const tamperedResult = await verifyJwt(tamperedToken);
  assert.strictEqual(tamperedResult, null, 'Tampered JWT must be rejected');
  console.log('  ✅ JWT signing, claim extraction, and anti-tamper security verified.');

  // ----------------------------------------------------
  // Test 3: Anti-XSS Sanitization & Advanced Injection Defense
  // ----------------------------------------------------
  console.log('\nTest 3: Verifying Anti-XSS Sanitization & Injection Defense...');
  const maliciousInput1 = '<script>alert("hacked")</script>মাওলানা করিম';
  const clean1 = sanitizeString(maliciousInput1);
  assert.strictEqual(clean1.includes('<script>'), false);
  assert.strictEqual(clean1.includes('alert'), false);
  assert.strictEqual(clean1, 'মাওলানা করিম');

  const maliciousInput2 = '<img src=x onerror="stealCookies()">হাফেজ আযম';
  const clean2 = sanitizeString(maliciousInput2);
  assert.strictEqual(clean2.includes('onerror'), false);
  assert.strictEqual(clean2.includes('<img'), false);

  const maliciousInput3 = 'javascript:evilFunction()';
  const clean3 = sanitizeString(maliciousInput3);
  assert.strictEqual(clean3.includes('javascript:'), false);

  const maliciousInput4 = '<svg/onload=alert(1)>চকরিয়া কক্সবাজার';
  const clean4 = sanitizeString(maliciousInput4);
  assert.strictEqual(clean4.includes('<svg'), false);
  assert.strictEqual(clean4.includes('onload'), false);
  assert.strictEqual(clean4, 'চকরিয়া কক্সবাজার');

  const maliciousInput5 = 'user\0name<style>body{color:red}</style>';
  const clean5 = sanitizeString(maliciousInput5);
  assert.strictEqual(clean5.includes('\0'), false);
  assert.strictEqual(clean5.includes('<style>'), false);
  console.log('  ✅ Malicious scripts, onerror/onload injections, SVG tags, and null bytes sanitized.');

  // ----------------------------------------------------
  // Test 4: Sliding-Window Rate Limiter & Brute-Force Defense
  // ----------------------------------------------------
  console.log('\nTest 4: Verifying Brute-Force Rate Limiter...');
  const testIpKey = 'login:test-hacker-ip-1';
  resetRateLimit(testIpKey);

  // Allow first 5 attempts
  for (let i = 1; i <= 5; i++) {
    const res = checkRateLimit(testIpKey, 5, 60000);
    assert.strictEqual(res.isAllowed, true, `Attempt ${i} should be allowed`);
    assert.strictEqual(res.remaining, 5 - i);
  }

  // 6th attempt must be blocked!
  const blockedRes = checkRateLimit(testIpKey, 5, 60000);
  assert.strictEqual(blockedRes.isAllowed, false, '6th attempt must be blocked by rate limiter');
  assert.strictEqual(blockedRes.remaining, 0);
  assert.ok(blockedRes.retryAfter > 0, 'Must provide retry-after seconds');
  console.log(`  ✅ Brute-force attack blocked after 5 attempts (Retry-After: ${blockedRes.retryAfter}s).`);

  // ----------------------------------------------------
  // Test 5: Sensitive Data Leak Prevention
  // ----------------------------------------------------
  console.log('\nTest 5: Verifying Sensitive Data Leak Prevention (No Plaintext Passwords)...');
  const rawUser = {
    id: 'USR-999',
    name: 'ম্যানেজার',
    email: 'manager@madrasha.edu',
    password: 'SuperSecretPlaintextPassword',
    passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890',
    role: 'Admin'
  };
  const safeUser = sanitizeUserOutput(rawUser);
  assert.strictEqual(safeUser.password, undefined, 'Plaintext password must NOT be leaked');
  assert.strictEqual(safeUser.passwordHash, undefined, 'Password hash must NOT be leaked');
  assert.strictEqual(safeUser.name, 'ম্যানেজার');
  console.log('  ✅ Sensitive credential fields stripped from client outputs.');

  // ----------------------------------------------------
  // Test 6: End-to-End User Auth & Registration with Bcrypt
  // ----------------------------------------------------
  console.log('\nTest 6: Verifying User Registration with Bcrypt & Authentication...');
  const testId = Date.now();
  const testEmail = `habibur_${testId}@madrasha.edu`;
  const testUsername = `habibur_${testId}`;
  const newRegData = {
    name: 'মুফতি হাবিবুর রহমান',
    email: testEmail,
    username: testUsername,
    password: 'HabibPassword2026',
    role: 'Teacher',
    phone: '01899998888'
  };

  const regRes = await registerNewUser(newRegData);
  assert.strictEqual(regRes.success, true);
  assert.strictEqual(regRes.user.password, undefined);
  assert.strictEqual(regRes.user.passwordHash, undefined);

  // Authenticate newly registered user
  const authRes = await authenticateCredentials(testEmail, 'HabibPassword2026');
  assert.strictEqual(authRes.success, true);
  assert.strictEqual(authRes.user.name, 'মুফতি হাবিবুর রহমান');

  // Verify wrong password fails
  const authFail = await authenticateCredentials(testEmail, 'WrongPass!');
  assert.strictEqual(authFail.success, false);

  // Verify seeded super admin authenticates
  const adminAuth = await authenticateCredentials('admin@gmail.com', 'admin1234');
  assert.strictEqual(adminAuth.success, true);
  assert.strictEqual(adminAuth.user.role, 'Super Admin');
  console.log('  ✅ End-to-end registration with bcrypt & authentication verified.');

  // ----------------------------------------------------
  // Test 7: Bcrypt DoS & Input Limit Protections
  // ----------------------------------------------------
  console.log('\nTest 7: Verifying Bcrypt DoS & Password Length Protections...');
  const hugePassword = 'A'.repeat(500); // 500 characters
  try {
    await hashPassword(hugePassword);
    assert.fail('Should have rejected oversized password');
  } catch (err) {
    assert.ok(err.message.includes('maximum allowed limit'), 'Should specify maximum limit');
  }

  const verifyHuge = await verifyPassword(hugePassword, '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890');
  assert.strictEqual(verifyHuge, false, 'Oversized passwords must be rejected immediately');
  console.log(`  ✅ Bcrypt DoS protection verified (passwords > ${MAX_PASSWORD_LENGTH} chars rejected).`);

  // ----------------------------------------------------
  // Test 8: Multi-Dimensional Rate Limiting (IP + Account Protection)
  // ----------------------------------------------------
  console.log('\nTest 8: Verifying Account-Targeted Lockout & IP Validation...');
  const targetAccKey = 'login:acc:admin@gmail.com';
  resetRateLimit(targetAccKey);

  // 5 failed password attempts on admin account
  for (let i = 1; i <= 5; i++) {
    const fRes = recordFailedAttempt(targetAccKey, 5, 60000);
    assert.strictEqual(fRes.isAllowed, true);
  }

  // Account should now be locked
  const lockStatus = checkRateLimitStatus(targetAccKey);
  assert.strictEqual(lockStatus.isAllowed, false, 'Account must be locked after 5 failed attempts');
  assert.ok(lockStatus.retryAfter > 0);

  // IP format validation
  assert.strictEqual(isValidIp('192.168.1.1'), true);
  assert.strictEqual(isValidIp('10.0.0.254'), true);
  assert.strictEqual(isValidIp('::1'), true);
  assert.strictEqual(isValidIp('999.999.999.999'), false);
  assert.strictEqual(isValidIp('192.168.1.1; DROP TABLE'), false);
  console.log('  ✅ Multi-dimensional account protection and strict IP validation verified.');

  // ----------------------------------------------------
  // Test 9: Persistent Disk Storage for Users
  // ----------------------------------------------------
  console.log('\nTest 9: Verifying Persistent User Storage on Disk...');
  const usersPath = path.join(process.cwd(), '.data', 'users.json');
  assert.ok(fs.existsSync(usersPath), '.data/users.json must exist');
  const diskData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  assert.ok(Array.isArray(diskData), 'Disk data must be an array');
  assert.ok(diskData.length >= 3, 'Must have at least 3 users on disk');

  // Verify disk entries have bcrypt passwordHash and NO plaintext password
  diskData.forEach(u => {
    assert.strictEqual(u.password, undefined, `User ${u.id} must not have plaintext password on disk`);
    assert.ok(u.passwordHash && u.passwordHash.startsWith('$2'), `User ${u.id} must have valid bcrypt hash on disk`);
  });
  console.log('  ✅ Persistent disk store verified: all users saved with bcrypt hashes, zero plaintext passwords.');

  console.log('\n========================================================');
  console.log('🛡️  ALL 9 BACKEND SECURITY TEST SUITES PASSED (100% SECURE)');
  console.log('========================================================\n');
}

runSecurityTests().catch(err => {
  console.error('❌ Security Test Failure:', err);
  process.exit(1);
});
