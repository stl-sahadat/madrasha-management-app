import fs from 'node:fs';
import path from 'node:path';
import { INITIAL_USERS } from '../data/initialData.js';
import { getDb } from './db/database.js';
import {
  hashPassword,
  verifyPassword,
  sanitizeUserOutput,
  sanitizeString,
  MAX_PASSWORD_LENGTH,
  MAX_INPUT_LENGTH
} from './security.js';

// Pre-computed bcrypt hash for seed users' password "admin1234"
const SEED_BCRYPT_HASH = '$2b$10$6RkoWl8A3gG5pBonHOiBk.wAXpE1ui.ZR/H8S9en4TvnMXppCTpru';

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

/**
 * Initialize default users with bcrypt hashes
 */
function createDefaultUsers() {
  return INITIAL_USERS.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email.toLowerCase(),
    username: u.username ? u.username.toLowerCase() : u.email.split('@')[0].toLowerCase(),
    phone: u.phone || '018XXXXXXXX',
    role: u.role || 'Super Admin',
    passwordHash: SEED_BCRYPT_HASH,
    status: u.status || 'Active',
    createdAt: u.createdAt || '2026-01-01'
  }));
}

/**
 * In-memory cache backed by persistent file storage
 */
let usersStore = null;

function loadUsersFromDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Users Store] Could not read users from disk, using in-memory store:', err.message);
  }

  const defaults = createDefaultUsers();
  saveUsersToDisk(defaults);
  return defaults;
}

function saveUsersToDisk(users) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    // Atomic write using temporary file
    const tempFile = `${USERS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(users, null, 2), 'utf8');
    fs.renameSync(tempFile, USERS_FILE);
  } catch (err) {
    console.warn('[Users Store] Could not persist users to disk:', err.message);
  }
}

function getUsers() {
  if (!usersStore) {
    usersStore = loadUsersFromDisk();
  }
  return usersStore;
}

/**
 * Retrieve user by email or username (case-insensitive)
 * @param {string} identifier 
 * @returns {object|null}
 */
export function findUserByIdentifier(identifier) {
  if (!identifier || typeof identifier !== 'string') return null;
  const clean = sanitizeString(identifier).trim().toLowerCase();

  try {
    const db = getDb();
    const row = db.prepare('SELECT * FROM users WHERE email = ? OR username = ?').get(clean, clean);
    if (row) {
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        username: row.username,
        phone: row.phone,
        role: row.role,
        passwordHash: row.password_hash,
        status: row.status,
        createdAt: row.created_at
      };
    }
  } catch (err) {
    // Fallback if db is busy
  }

  const users = getUsers();
  return users.find(u =>
    u.email.toLowerCase() === clean ||
    (u.username && u.username.toLowerCase() === clean)
  ) || null;
}

/**
 * Find user by ID
 * @param {string} id 
 * @returns {object|null}
 */
export function findUserById(id) {
  if (!id) return null;

  try {
    const db = getDb();
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (row) {
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        username: row.username,
        phone: row.phone,
        role: row.role,
        passwordHash: row.password_hash,
        status: row.status,
        createdAt: row.created_at
      };
    }
  } catch (err) {}

  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

/**
 * Authenticate credentials against user store with bcrypt verification
 * @param {string} emailOrUsername 
 * @param {string} plainPassword 
 * @returns {Promise<{ success: boolean, message?: string, user?: object }>}
 */
export async function authenticateCredentials(emailOrUsername, plainPassword) {
  if (!emailOrUsername || !plainPassword) {
    return {
      success: false,
      message: 'অনুগ্রহ করে ইমেইল/ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।'
    };
  }

  if (typeof plainPassword !== 'string' || plainPassword.length > MAX_PASSWORD_LENGTH) {
    return {
      success: false,
      message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
    };
  }

  const cleanIdentifier = sanitizeString(emailOrUsername).trim().toLowerCase();
  if (cleanIdentifier.length > MAX_INPUT_LENGTH) {
    return {
      success: false,
      message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
    };
  }

  const user = findUserByIdentifier(cleanIdentifier);
  if (!user) {
    return {
      success: false,
      message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
    };
  }

  const storedHashOrPlain = user.passwordHash || user.password;
  const isValid = await verifyPassword(plainPassword, storedHashOrPlain);

  if (!isValid) {
    return {
      success: false,
      message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
    };
  }

  // Transparent password upgrade to bcrypt if stored as legacy plaintext
  if (!user.passwordHash || !user.passwordHash.startsWith('$2')) {
    user.passwordHash = await hashPassword(plainPassword);
    delete user.password;
    saveUsersToDisk(getUsers());
  }

  return {
    success: true,
    user: sanitizeUserOutput(user)
  };
}

/**
 * Register a new user in the system with bulletproof bcrypt hashing and persistence
 * @param {object} userData 
 * @returns {Promise<{ success: boolean, message?: string, user?: object }>}
 */
export async function registerNewUser(userData) {
  if (!userData || typeof userData !== 'object') {
    return { success: false, message: 'অবৈধ তথ্য প্রদান করা হয়েছে।' };
  }

  const rawEmail = (userData.email || '').trim().toLowerCase();
  const cleanEmail = sanitizeString(rawEmail);
  if (!cleanEmail || !cleanEmail.includes('@') || cleanEmail.length > MAX_INPUT_LENGTH) {
    return {
      success: false,
      message: 'অনুগ্রহ করে একটি সঠিক ইমেইল প্রদান করুন।'
    };
  }

  const rawUsername = userData.username?.trim() || cleanEmail.split('@')[0];
  const cleanUsername = sanitizeString(rawUsername).toLowerCase().replace(/\s+/g, '');
  if (!cleanUsername || cleanUsername.length > 50) {
    return {
      success: false,
      message: 'অনুগ্রহ করে একটি সঠিক ইউজারনেম নির্বাচন করুন।'
    };
  }

  if (findUserByIdentifier(cleanEmail)) {
    return {
      success: false,
      message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট নিবন্ধিত আছে।'
    };
  }

  if (findUserByIdentifier(cleanUsername)) {
    return {
      success: false,
      message: `এই ইউজারনেম ("${cleanUsername}") ইতিমধ্যে ব্যবহৃত হয়েছে। অন্য একটি ইউজারনেম নির্বাচন করুন।`
    };
  }

  if (!userData.password || typeof userData.password !== 'string' || userData.password.length < 6) {
    return {
      success: false,
      message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।'
    };
  }

  if (userData.password.length > MAX_PASSWORD_LENGTH) {
    return {
      success: false,
      message: `পাসওয়ার্ড ${MAX_PASSWORD_LENGTH} অক্ষরের বেশি হতে পারবে না।`
    };
  }

  const passwordHash = await hashPassword(userData.password);
  const users = getUsers();

  const newUser = {
    id: `USR-${String(users.length + 1).padStart(3, '0')}`,
    name: sanitizeString(userData.name || '').trim().substring(0, MAX_INPUT_LENGTH) || cleanUsername,
    email: cleanEmail,
    username: cleanUsername,
    phone: sanitizeString(userData.phone || '018XXXXXXXX').trim().substring(0, 30),
    role: sanitizeString(userData.role || 'Super Admin').trim().substring(0, 50),
    passwordHash,
    status: 'Active',
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  saveUsersToDisk(users);

  try {
    const db = getDb();
    db.prepare(`
      INSERT OR REPLACE INTO users (id, name, email, username, phone, role, password_hash, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newUser.id, newUser.name, newUser.email, newUser.username, newUser.phone, newUser.role, newUser.passwordHash, newUser.status, newUser.createdAt);
  } catch (err) {}

  return {
    success: true,
    user: sanitizeUserOutput(newUser)
  };
}

/**
 * Return all users without credentials
 */
export function getAllSafeUsers() {
  return getUsers().map(sanitizeUserOutput);
}
