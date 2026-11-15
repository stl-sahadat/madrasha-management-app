import { getDb } from '../db/database';
import { sanitizeString } from '../security';

export class TeacherModel {
  static getAll() {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM teachers ORDER BY created_at ASC').all();
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      designation: r.designation,
      phone: r.phone,
      nid: r.nid,
      salary: Number(r.salary),
      joiningDate: r.joining_date,
      status: r.status,
      createdAt: r.created_at
    }));
  }

  static getById(id) {
    const db = getDb();
    const r = db.prepare('SELECT * FROM teachers WHERE id = ?').get(id);
    if (!r) return null;
    return {
      id: r.id,
      name: r.name,
      designation: r.designation,
      phone: r.phone,
      nid: r.nid,
      salary: Number(r.salary),
      joiningDate: r.joining_date,
      status: r.status,
      createdAt: r.created_at
    };
  }

  static create(data) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM teachers').get().c;
    const id = data.id || `TCH-${String(count + 1).padStart(3, '0')}`;
    const name = sanitizeString(data.name || '');
    const designation = sanitizeString(data.designation || 'সহকারী শিক্ষক');
    const phone = sanitizeString(data.phone || '');
    const nid = sanitizeString(data.nid || '');
    const salary = Number(data.salary || 10000);
    const joiningDate = data.joiningDate || new Date().toISOString().split('T')[0];
    const status = data.status || 'Active';
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO teachers (id, name, designation, phone, nid, salary, joining_date, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, designation, phone, nid, salary, joiningDate, status, createdAt);

    return this.getById(id);
  }
}

export class DonorModel {
  static getAll(type) {
    const db = getDb();
    let sql = 'SELECT * FROM donors WHERE 1=1';
    const params = [];
    if (type && type !== 'all') {
      sql += ' AND type = ?';
      params.push(type);
    }
    sql += ' ORDER BY created_at ASC';
    const rows = db.prepare(sql).all(...params);
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      address: r.address,
      type: r.type,
      monthlyPledge: Number(r.monthly_pledge),
      status: r.status,
      createdAt: r.created_at
    }));
  }

  static create(data) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM donors').get().c;
    const prefix = data.type === 'monthly' ? 'MON' : (data.type === 'zakat' ? 'ZAK' : 'DON');
    const id = data.id || `${prefix}-${String(count + 1).padStart(3, '0')}`;
    const name = sanitizeString(data.name || '');
    const phone = sanitizeString(data.phone || '');
    const address = sanitizeString(data.address || '');
    const type = data.type || 'general';
    const monthlyPledge = Number(data.monthlyPledge || data.amount || 0);
    const status = data.status || 'সক্রিয়';
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO donors (id, name, phone, address, type, monthly_pledge, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, phone, address, type, monthlyPledge, status, createdAt);

    return { id, name, phone, address, type, monthlyPledge, status, createdAt };
  }
}

export class BazarModel {
  static getAll(type = 'weekly') {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM bazar_items WHERE type = ? ORDER BY date DESC, created_at DESC').all(type);
    return rows.map(r => ({
      id: r.id,
      type: r.type,
      date: r.date,
      itemName: r.item_name,
      quantity: Number(r.quantity),
      unit: r.unit,
      price: Number(r.price),
      total: Number(r.total),
      voucherId: r.voucher_id,
      createdAt: r.created_at
    }));
  }

  static create(data) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM bazar_items').get().c;
    const id = data.id || `BAZ-${String(count + 1).padStart(3, '0')}`;
    const type = data.type || 'weekly';
    const date = data.date || new Date().toISOString().split('T')[0];
    const itemName = sanitizeString(data.itemName || data.item_name || 'নিত্য বাজার');
    const quantity = Number(data.quantity || 1);
    const unit = sanitizeString(data.unit || 'কেজি');
    const price = Number(data.price || 0);
    const total = quantity * price;
    const voucherId = data.voucherId || null;
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO bazar_items (id, type, date, item_name, quantity, unit, price, total, voucher_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, type, date, itemName, quantity, unit, price, total, voucherId, createdAt);

    return { id, type, date, itemName, quantity, unit, price, total, voucherId, createdAt };
  }
}

export class AccountModel {
  static getAll() {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM accounts ORDER BY created_at ASC').all();
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      accountNumber: r.account_number,
      type: r.type,
      balance: Number(r.balance),
      createdAt: r.created_at
    }));
  }

  static transfer(fromId, toId, amount, note = '') {
    const db = getDb();
    const amt = Math.max(0, Number(amount));
    if (amt <= 0) return { success: false, message: 'স্থানান্তরের পরিমাণ অবশ্যই ০ এর বেশি হতে হবে।' };

    const fromAcc = db.prepare('SELECT * FROM accounts WHERE id = ?').get(fromId);
    const toAcc = db.prepare('SELECT * FROM accounts WHERE id = ?').get(toId);
    if (!fromAcc || !toAcc) return { success: false, message: 'অ্যাকাউন্ট পাওয়া যায়নি।' };
    if (fromAcc.balance < amt) return { success: false, message: 'প্রেরক অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই।' };

    db.exec('BEGIN TRANSACTION;');
    try {
      db.prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?').run(amt, fromId);
      db.prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?').run(amt, toId);
      db.exec('COMMIT;');
      return { success: true, message: 'সফলভাবে ব্যালেন্স স্থানান্তর করা হয়েছে।' };
    } catch (e) {
      db.exec('ROLLBACK;');
      return { success: false, message: e.message };
    }
  }
}
