import { getDb } from '../db/database';
import { sanitizeString } from '../security';

export class StudentModel {
  static getAll({ jamat, search, bloodGroup } = {}) {
    const db = getDb();
    let sql = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (jamat && jamat !== 'all' && jamat !== '') {
      sql += ' AND jamat = ?';
      params.push(jamat);
    }

    if (bloodGroup && bloodGroup !== 'all' && bloodGroup !== '') {
      sql += ' AND blood_group = ?';
      params.push(bloodGroup);
    }

    if (search && search.trim() !== '') {
      sql += ' AND (name LIKE ? OR roll LIKE ? OR phone LIKE ? OR father_name LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term);
    }

    sql += ' ORDER BY CAST(roll AS INTEGER) ASC, roll ASC';
    const rows = db.prepare(sql).all(...params);

    return rows.map(r => ({
      id: r.id,
      roll: r.roll,
      name: r.name,
      jamat: r.jamat,
      phone: r.phone,
      fatherName: r.father_name,
      motherName: r.mother_name,
      bloodGroup: r.blood_group,
      admissionDate: r.admission_date,
      status: r.status,
      address: r.address,
      photo: r.photo,
      feesMatrix: r.fees_matrix ? JSON.parse(r.fees_matrix) : {},
      createdAt: r.created_at
    }));
  }

  static getById(id) {
    const db = getDb();
    const r = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
    if (!r) return null;
    return {
      id: r.id,
      roll: r.roll,
      name: r.name,
      jamat: r.jamat,
      phone: r.phone,
      fatherName: r.father_name,
      motherName: r.mother_name,
      bloodGroup: r.blood_group,
      admissionDate: r.admission_date,
      status: r.status,
      address: r.address,
      photo: r.photo,
      feesMatrix: r.fees_matrix ? JSON.parse(r.fees_matrix) : {},
      createdAt: r.created_at
    };
  }

  static create(studentData) {
    const db = getDb();
    const count = db.prepare('SELECT COUNT(*) as c FROM students').get().c;
    const id = studentData.id || `STU-${String(count + 1).padStart(3, '0')}`;
    const roll = String(studentData.roll || count + 1);
    const name = sanitizeString(studentData.name || '');
    const jamat = sanitizeString(studentData.jamat || 'হিফজ বিভাগ');
    const phone = sanitizeString(studentData.phone || '');
    const fatherName = sanitizeString(studentData.fatherName || studentData.father_name || '');
    const motherName = sanitizeString(studentData.motherName || studentData.mother_name || '');
    const bloodGroup = sanitizeString(studentData.bloodGroup || studentData.blood_group || 'O+');
    const admissionDate = studentData.admissionDate || new Date().toISOString().split('T')[0];
    const status = studentData.status || 'নিয়মিত';
    const address = sanitizeString(studentData.address || 'চকরিয়া, কক্সবাজার');
    const photo = studentData.photo || '';
    const feesMatrix = studentData.feesMatrix ? JSON.stringify(studentData.feesMatrix) : '{}';
    const createdAt = new Date().toISOString().split('T')[0];

    db.prepare(`
      INSERT INTO students (id, roll, name, jamat, phone, father_name, mother_name, blood_group, admission_date, status, address, photo, fees_matrix, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, roll, name, jamat, phone, fatherName, motherName, bloodGroup, admissionDate, status, address, photo, feesMatrix, createdAt);

    return this.getById(id);
  }

  static update(id, updates) {
    const db = getDb();
    const existing = this.getById(id);
    if (!existing) return null;

    const name = updates.name !== undefined ? sanitizeString(updates.name) : existing.name;
    const roll = updates.roll !== undefined ? String(updates.roll) : existing.roll;
    const jamat = updates.jamat !== undefined ? sanitizeString(updates.jamat) : existing.jamat;
    const phone = updates.phone !== undefined ? sanitizeString(updates.phone) : existing.phone;
    const fatherName = updates.fatherName !== undefined ? sanitizeString(updates.fatherName) : existing.fatherName;
    const motherName = updates.motherName !== undefined ? sanitizeString(updates.motherName) : existing.motherName;
    const bloodGroup = updates.bloodGroup !== undefined ? sanitizeString(updates.bloodGroup) : existing.bloodGroup;
    const status = updates.status !== undefined ? updates.status : existing.status;
    const address = updates.address !== undefined ? sanitizeString(updates.address) : existing.address;
    const feesMatrix = updates.feesMatrix !== undefined ? JSON.stringify(updates.feesMatrix) : JSON.stringify(existing.feesMatrix);

    db.prepare(`
      UPDATE students
      SET name = ?, roll = ?, jamat = ?, phone = ?, father_name = ?, mother_name = ?, blood_group = ?, status = ?, address = ?, fees_matrix = ?
      WHERE id = ?
    `).run(name, roll, jamat, phone, fatherName, motherName, bloodGroup, status, address, feesMatrix, id);

    return this.getById(id);
  }

  static updateFeePayment(id, month, feeType, isPaid, amount = 0) {
    const student = this.getById(id);
    if (!student) return null;

    const fees = student.feesMatrix || {};
    if (!fees[month]) fees[month] = {};
    fees[month][feeType] = isPaid;
    if (amount) fees[month][`${feeType}Amount`] = amount;

    return this.update(id, { feesMatrix: fees });
  }

  static delete(id) {
    const db = getDb();
    const res = db.prepare('DELETE FROM students WHERE id = ?').run(id);
    return res.changes > 0;
  }
}
