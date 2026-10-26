import { getDb } from '../db/database.js';
import { sanitizeString } from '../security.js';

export class VoucherModel {
  static getAll({ type, category, date, account } = {}) {
    const db = getDb();
    let sql = 'SELECT * FROM vouchers WHERE 1=1';
    const params = [];

    if (type && type !== 'all') {
      sql += ' AND type = ?';
      params.push(type);
    }
    if (category && category !== 'all') {
      sql += ' AND category LIKE ?';
      params.push(`%${category}%`);
    }
    if (date) {
      sql += ' AND date = ?';
      params.push(date);
    }
    if (account && account !== 'all') {
      sql += ' AND account LIKE ?';
      params.push(`%${account}%`);
    }

    sql += ' ORDER BY date DESC, created_at DESC';
    const rows = db.prepare(sql).all(...params);

    return rows.map(r => ({
      id: r.id,
      voucherNo: r.voucher_no,
      type: r.type,
      category: r.category,
      amount: Number(r.amount),
      totalAmount: Number(r.amount),
      items: [
        {
          category: r.category,
          description: r.description || '',
          amount: Number(r.amount)
        }
      ],
      date: r.date,
      account: r.account,
      receiver: r.receiver,
      description: r.description,
      donorId: r.donor_id,
      studentId: r.student_id,
      createdAt: r.created_at
    }));
  }

  static create(data) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM vouchers').get().c;
    const prefix = data.type === 'deposit' ? 'DEP' : 'EXP';
    const vchPrefix = data.type === 'deposit' ? 'JV' : 'EV';
    const year = new Date().getFullYear();
    const id = data.id || `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`;
    const voucherNo = data.voucherNo || `${vchPrefix}-${year}-${String(count + 1).padStart(3, '0')}`;
    const type = data.type === 'expense' ? 'expense' : 'deposit';
    const category = sanitizeString(data.category || (type === 'deposit' ? 'সাধারণ জমা' : 'সাধারণ খরচ'));
    const amount = Math.max(0, Number(data.amount || data.totalAmount || 0));
    const date = data.date || new Date().toISOString().split('T')[0];
    const account = sanitizeString(data.account || 'হাতে নগদ');
    const receiver = sanitizeString(data.receiver || 'মুহতামিম');
    const description = sanitizeString(data.description || data.note || '');
    const donorId = data.donorId || null;
    const studentId = data.studentId || null;
    const createdAt = new Date().toISOString();

    db.prepare(`
      INSERT INTO vouchers (id, voucher_no, type, category, amount, date, account, receiver, description, donor_id, student_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, voucherNo, type, category, amount, date, account, receiver, description, donorId, studentId, createdAt);

    // Update account balance
    const delta = type === 'deposit' ? amount : -amount;
    db.prepare(`
      UPDATE accounts
      SET balance = balance + ?
      WHERE name LIKE ? OR type LIKE ?
    `).run(delta, `%${account}%`, `%${account}%`);

    return {
      id,
      voucherNo,
      type,
      category,
      amount,
      date,
      account,
      receiver,
      description,
      donorId,
      studentId,
      createdAt
    };
  }

  static getSummary() {
    const db = getDb();
    const today = new Date().toISOString().split('T')[0];
    const curYearMonth = today.substring(0, 7); // YYYY-MM

    const todayDep = db.prepare("SELECT COALESCE(SUM(amount), 0) as s FROM vouchers WHERE type = 'deposit' AND date = ?").get(today).s;
    const monthDep = db.prepare("SELECT COALESCE(SUM(amount), 0) as s FROM vouchers WHERE type = 'deposit' AND date LIKE ?").get(`${curYearMonth}%`).s;
    const todayExp = db.prepare("SELECT COALESCE(SUM(amount), 0) as s FROM vouchers WHERE type = 'expense' AND date = ?").get(today).s;
    const monthExp = db.prepare("SELECT COALESCE(SUM(amount), 0) as s FROM vouchers WHERE type = 'expense' AND date LIKE ?").get(`${curYearMonth}%`).s;

    return {
      todayDeposit: Number(todayDep),
      monthlyDeposit: Number(monthDep),
      todayExpense: Number(todayExp),
      monthlyExpense: Number(monthExp),
      balance: Number(monthDep) - Number(monthExp)
    };
  }
}
