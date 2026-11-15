import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import {
  MADRASHA_PROFILE,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CONTRIBUTORS,
  INITIAL_DONORS,
  INITIAL_ZAKAT_DONORS,
  INITIAL_TRANSACTIONS,
  ACCOUNTS
} from '../../data/initialData';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_PATH = path.join(DATA_DIR, 'madrasha.db');
const USERS_JSON_PATH = path.join(DATA_DIR, 'users.json');

let dbInstance = null;

/**
 * Initialize and get the singleton SQLite database instance
 * Armed with WAL mode, foreign keys, prepared statement security, and indexes.
 */
export function getDb() {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);

  // Enterprise Performance & Integrity Pragmas
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA synchronous = NORMAL;');
  db.exec('PRAGMA temp_store = MEMORY;');

  initSchema(db);
  seedInitialData(db);

  dbInstance = db;
  return dbInstance;
}

function initSchema(db) {
  db.exec(`
    -- 1. Users Table (Bcrypt Hashed, Anti-Tamper)
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      phone TEXT,
      role TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      status TEXT DEFAULT 'Active',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

    -- 2. Students Table (197 Students across 5 Jamats)
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      roll TEXT NOT NULL,
      name TEXT NOT NULL,
      jamat TEXT NOT NULL,
      phone TEXT,
      father_name TEXT,
      mother_name TEXT,
      blood_group TEXT,
      admission_date TEXT,
      status TEXT DEFAULT 'নিয়মিত',
      address TEXT,
      photo TEXT,
      fees_matrix TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_students_jamat ON students(jamat);
    CREATE INDEX IF NOT EXISTS idx_students_roll ON students(roll);
    CREATE INDEX IF NOT EXISTS idx_students_phone ON students(phone);

    -- 3. Teachers Table
    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      phone TEXT,
      nid TEXT,
      salary REAL NOT NULL,
      joining_date TEXT,
      status TEXT DEFAULT 'Active',
      created_at TEXT NOT NULL
    );

    -- 4. Donors Table (Monthly Contributors, General Donors, Zakat Donors)
    CREATE TABLE IF NOT EXISTS donors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      type TEXT NOT NULL, -- 'monthly', 'general', 'zakat'
      monthly_pledge REAL DEFAULT 0,
      status TEXT DEFAULT 'সক্রিয়',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_donors_type ON donors(type);

    -- 5. Vouchers / Transactions (Deposit & Expense Cash Ledger)
    CREATE TABLE IF NOT EXISTS vouchers (
      id TEXT PRIMARY KEY,
      voucher_no TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL, -- 'deposit', 'expense'
      category TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      account TEXT NOT NULL,
      receiver TEXT,
      description TEXT,
      donor_id TEXT,
      student_id TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_vouchers_type ON vouchers(type);
    CREATE INDEX IF NOT EXISTS idx_vouchers_date ON vouchers(date);
    CREATE INDEX IF NOT EXISTS idx_vouchers_category ON vouchers(category);

    -- 6. Bazar Items Table (Weekly & Monthly itemized purchases)
    CREATE TABLE IF NOT EXISTS bazar_items (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL, -- 'weekly', 'monthly'
      date TEXT NOT NULL,
      item_name TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      price REAL NOT NULL,
      total REAL NOT NULL,
      voucher_id TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_bazar_date ON bazar_items(date);
    CREATE INDEX IF NOT EXISTS idx_bazar_type ON bazar_items(type);

    -- 7. Attendance Records Table
    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      entity_type TEXT NOT NULL, -- 'student', 'teacher'
      entity_id TEXT NOT NULL,
      status TEXT NOT NULL, -- 'present', 'absent', 'late'
      note TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_att_date_entity ON attendance(date, entity_type, entity_id);

    -- 8. Results / Exam Marksheets Table
    CREATE TABLE IF NOT EXISTS results (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      roll TEXT NOT NULL,
      jamat TEXT NOT NULL,
      exam_type TEXT NOT NULL,
      year TEXT NOT NULL,
      marks_data TEXT NOT NULL,
      total REAL NOT NULL,
      gpa REAL NOT NULL,
      grade TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_results_jamat_exam ON results(jamat, exam_type, year);

    -- 9. Accounts Table (Bkash, Cash in Hand, Bank)
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      account_number TEXT,
      type TEXT NOT NULL,
      balance REAL NOT NULL,
      created_at TEXT NOT NULL
    );

    -- 10. SMS Logs Table
    CREATE TABLE IF NOT EXISTS sms_logs (
      id TEXT PRIMARY KEY,
      recipient_type TEXT NOT NULL,
      recipient_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'Sent',
      sent_at TEXT NOT NULL
    );

    -- 11. Settings & Institute Profile Key-Value Table
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

function seedInitialData(db) {
  // Check if users exist
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    let seedUsers = [];
    if (fs.existsSync(USERS_JSON_PATH)) {
      try {
        const fileData = fs.readFileSync(USERS_JSON_PATH, 'utf8');
        seedUsers = JSON.parse(fileData);
      } catch (e) {
        console.warn('Could not read users.json for SQLite seed:', e.message);
      }
    }

    if (!seedUsers || seedUsers.length === 0) {
      seedUsers = [
        {
          id: 'USR-001',
          name: 'মুহতামিম / সুপার এডমিন',
          email: 'admin@gmail.com',
          username: 'admin',
          phone: '01820050095',
          role: 'Super Admin',
          passwordHash: '$2b$10$6RkoWl8A3gG5pBonHOiBk.wAXpE1ui.ZR/H8S9en4TvnMXppCTpru',
          status: 'Active',
          createdAt: '2026-01-01'
        }
      ];
    }

    const insertUser = db.prepare(`
      INSERT OR REPLACE INTO users (id, name, email, username, phone, role, password_hash, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const u of seedUsers) {
      insertUser.run(
        u.id,
        u.name,
        u.email.toLowerCase(),
        (u.username || u.email.split('@')[0]).toLowerCase(),
        u.phone || '01820050095',
        u.role || 'Super Admin',
        u.passwordHash || '$2b$10$6RkoWl8A3gG5pBonHOiBk.wAXpE1ui.ZR/H8S9en4TvnMXppCTpru',
        u.status || 'Active',
        u.createdAt || new Date().toISOString()
      );
    }
  }

  // Check if students exist
  const studentCount = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
  if (studentCount === 0 && Array.isArray(INITIAL_STUDENTS) && INITIAL_STUDENTS.length > 0) {
    const insertStudent = db.prepare(`
      INSERT INTO students (id, roll, name, jamat, phone, father_name, mother_name, blood_group, admission_date, status, address, photo, fees_matrix, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN TRANSACTION;');
    for (const s of INITIAL_STUDENTS) {
      insertStudent.run(
        s.id,
        String(s.roll || ''),
        s.name,
        s.jamat,
        s.phone || '',
        s.fatherName || '',
        s.motherName || '',
        s.bloodGroup || '',
        s.admissionDate || '2026-01-01',
        s.status || 'নিয়মিত',
        s.address || 'চকরিয়া, কক্সবাজার',
        s.photo || '',
        JSON.stringify(s.feesMatrix || {}),
        '2026-01-01'
      );
    }
    db.exec('COMMIT;');
  }

  // Check if teachers exist
  const teacherCount = db.prepare('SELECT COUNT(*) as count FROM teachers').get().count;
  if (teacherCount === 0 && Array.isArray(INITIAL_TEACHERS)) {
    const insertTeacher = db.prepare(`
      INSERT INTO teachers (id, name, designation, phone, nid, salary, joining_date, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN TRANSACTION;');
    for (const t of INITIAL_TEACHERS) {
      insertTeacher.run(
        t.id,
        t.name,
        t.designation || 'সহকারী শিক্ষক',
        t.phone || '',
        t.nid || '',
        Number(t.salary || 10000),
        t.joiningDate || '2024-01-01',
        t.status || 'Active',
        '2024-01-01'
      );
    }
    db.exec('COMMIT;');
  }

  // Check if donors exist
  const donorCount = db.prepare('SELECT COUNT(*) as count FROM donors').get().count;
  if (donorCount === 0) {
    const insertDonor = db.prepare(`
      INSERT INTO donors (id, name, phone, address, type, monthly_pledge, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN TRANSACTION;');
    if (Array.isArray(INITIAL_CONTRIBUTORS)) {
      for (const d of INITIAL_CONTRIBUTORS) {
        insertDonor.run(d.id, d.name, d.phone || '', d.address || '', 'monthly', Number(d.amount || d.monthlyAmount || 500), d.status || 'সক্রিয়', '2026-01-01');
      }
    }
    if (Array.isArray(INITIAL_DONORS)) {
      for (const d of INITIAL_DONORS) {
        insertDonor.run(d.id, d.name, d.phone || '', d.address || '', 'general', 0, d.status || 'সক্রিয়', '2026-01-01');
      }
    }
    if (Array.isArray(INITIAL_ZAKAT_DONORS)) {
      for (const d of INITIAL_ZAKAT_DONORS) {
        insertDonor.run(d.id, d.name, d.phone || '', d.address || '', 'zakat', 0, d.status || 'সক্রিয়', '2026-01-01');
      }
    }
    db.exec('COMMIT;');
  }

  // Check if accounts exist
  const accountCount = db.prepare('SELECT COUNT(*) as count FROM accounts').get().count;
  if (accountCount === 0 && Array.isArray(ACCOUNTS)) {
    const insertAccount = db.prepare(`
      INSERT INTO accounts (id, name, account_number, type, balance, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN TRANSACTION;');
    for (const a of ACCOUNTS) {
      insertAccount.run(
        a.id,
        a.name,
        a.accountNumber || a.account_number || '',
        a.type || 'Cash',
        Number(a.balance || 0),
        '2026-01-01'
      );
    }
    db.exec('COMMIT;');
  }

  // Check if initial vouchers exist
  const voucherCount = db.prepare('SELECT COUNT(*) as count FROM vouchers').get().count;
  if (voucherCount === 0 && Array.isArray(INITIAL_TRANSACTIONS)) {
    const insertVoucher = db.prepare(`
      INSERT INTO vouchers (id, voucher_no, type, category, amount, date, account, receiver, description, donor_id, student_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec('BEGIN TRANSACTION;');
    for (const v of INITIAL_TRANSACTIONS) {
      const cat = v.category || (v.items && v.items.length > 0 ? v.items.map(i => i.category).join(', ') : 'সাধারণ');
      const amt = Number(v.totalAmount || v.amount || 0);
      insertVoucher.run(
        v.id,
        v.voucherNo || `VCH-${v.id}`,
        v.type,
        cat,
        amt,
        v.date || '2026-10-25',
        v.account || 'হাতে নগদ',
        v.receiver || 'মুহতামিম',
        v.description || v.note || '',
        v.donorId || null,
        v.studentId || null,
        new Date().toISOString()
      );
    }
    db.exec('COMMIT;');
  }

  // Check if settings exist
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get().count;
  if (settingsCount === 0) {
    const insertSetting = db.prepare(`
      INSERT INTO settings (key, value, updated_at)
      VALUES (?, ?, ?)
    `);

    db.exec('BEGIN TRANSACTION;');
    insertSetting.run('profile', JSON.stringify(MADRASHA_PROFILE), new Date().toISOString());
    insertSetting.run('sms_balance', String(MADRASHA_PROFILE.smsBalance || 0), new Date().toISOString());
    db.exec('COMMIT;');
  }
}
