import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentKhurakiEntry = () => {
  const { students, jamats, accounts, receivers, addKhurakiPayment, setSelectedReceiptForPrint } = useApp();

  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [searchName, setSearchName] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');

  const filteredStudents = React.useMemo(() => {
    let pool = selectedJamat === 'all' ? [...students] : students.filter(s => s.jamat === selectedJamat);
    if (!searchName.trim()) return pool;

    const q = searchName.trim().toLowerCase();
    return pool.sort((a, b) => {
      const aMatches = (a.name || '').toLowerCase().includes(q) || String(a.roll || a.admissionNumber || '').includes(q);
      const bMatches = (b.name || '').toLowerCase().includes(q) || String(b.roll || b.admissionNumber || '').includes(q);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [students, selectedJamat, searchName]);

  const currentStudent = students.find(s => s.id === selectedStudentId) || filteredStudents[0] || students[0];

  // 12 months rows state
  const defaultCharge = currentStudent?.khurakiFee || currentStudent?.food_bill || 2000;
  const [rows, setRows] = useState(() => {
    return MONTH_NAMES.map(month => ({
      month,
      date: new Date().toISOString().split('T')[0],
      bookNo: '01',
      receiptNo: Math.floor(100 + Math.random() * 900).toString(),
      amount: '',
      receiver: receivers[0]?.name || 'মাহমুদুল করিম',
      note: ''
    }));
  });

  const handleRowChange = (index, field, value) => {
    setRows(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const paidRows = rows.filter(r => parseFloat(r.amount) > 0);
    if (paidRows.length === 0) {
      alert('কমপক্ষে একটি মাসের টাকার পরিমাণ লিখুন');
      return;
    }

    let lastVoucher = null;
    paidRows.forEach(row => {
      const voucher = addKhurakiPayment({
        date: row.date,
        month: row.month,
        year: selectedYear,
        studentId: currentStudent.id,
        studentName: currentStudent.name,
        roll: currentStudent.roll || currentStudent.admissionNumber,
        jamat: currentStudent.jamat,
        amount: parseFloat(row.amount),
        account: selectedAccount,
        receiver: row.receiver,
        receiptNo: row.receiptNo,
        bookNo: row.bookNo,
        note: row.note || `ছাত্র খানার টাকা জমা (${row.month} ${selectedYear})`
      });
      lastVoucher = voucher;
    });

    alert('ছাত্র খানার টাকা সফলভাবে সংরক্ষণ করা হয়েছে!');
    if (lastVoucher) {
      setSelectedReceiptForPrint(lastVoucher);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Filter Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> ছাত্র খানার টাকা জমার এন্ট্রি সিস্টেম
          </h5>
        </div>

        <div className="card-body mb-3">
          <form onSubmit={(e) => e.preventDefault()} className="w-100">
            <div className="row g-3">
              {/* জামাত নির্বাচন */}
              <div className="col-md-3 col-12">
                <label htmlFor="jamat_select" className="form-label fw-bold">জামাত</label>
                <select
                  id="jamat_select"
                  className="form-select"
                  value={selectedJamat}
                  onChange={(e) => {
                    setSelectedJamat(e.target.value);
                    setSelectedStudentId('');
                  }}
                >
                  <option value="all">সকল জামাত</option>
                  {(jamats || []).map((j) => (
                    <option key={j.id || j.name} value={j.name}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* লাইভ নাম বা রোল সার্চ */}
              <div className="col-md-3 col-12">
                <label className="form-label fw-bold text-primary">
                  <i className="fas fa-search me-1"></i> ছাত্র-ছাত্রীর নাম দিয়ে খুঁজুন
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ছাত্র-ছাত্রীর নাম দিয়ে খুঁজুন"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    const q = e.target.value.trim().toLowerCase();
                    if (q) {
                      const pool = selectedJamat === 'all' ? students : students.filter(s => s.jamat === selectedJamat);
                      const match = pool.find(s =>
                        (s.name || '').toLowerCase().includes(q) ||
                        String(s.roll || s.admissionNumber || '').includes(q)
                      );
                      if (match) setSelectedStudentId(match.id);
                    }
                  }}
                />
              </div>

              {/* শিক্ষার্থী নির্বাচন */}
              <div className="col-md-3 col-12">
                <label className="form-label fw-bold">শিক্ষার্থী নির্বাচন (নাম সবার উপরে)</label>
                <select
                  name="student_id"
                  id="name_select"
                  className="form-select"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  required
                >
                  <option value="">শিক্ষার্থী নির্বাচন করুন</option>
                  {filteredStudents.map((s) => {
                    const adm = s.admissionNumber || s.admission_number || s.roll;
                    return (
                      <option key={s.id} value={s.id}>
                        {s.name} (রোল/ভর্তি: {adm})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Year Select */}
              <div className="col-md-3 col-12">
                <label htmlFor="year_select" className="form-label fw-bold">সাল</label>
                <select
                  name="year"
                  id="year_select"
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  required
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              {/* Deposit Category */}
              <div className="col-md-3 col-12">
                <label htmlFor="deposit_category_select" className="form-label fw-bold">
                  জমার ধরন
                </label>
                <select
                  name="deposit_category_id"
                  id="deposit_category_select"
                  className="form-select custom-select"
                  disabled
                >
                  <option value="22" selected>ছাএদের খানার টাকা</option>
                </select>
              </div>

              {/* Search button */}
              <div className="col-12 text-end mt-3">
                <button type="button" className="btn btn-info px-5 py-2 b-r-22">
                  <i className="fa-solid fa-search me-2"></i>ফলাফল দেখান
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Student Details & Payment Card */}
      {currentStudent && (
        <div className="card shadow b-t-4-secondary mb-4" id="StudentCard">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <p className="mb-2"><strong>ছাত্রের নামঃ</strong> <span id="name">{currentStudent.name}</span></p>
                <p className="mb-2"><strong>জামাতঃ</strong> <span id="jamat">{currentStudent.jamat}</span></p>
              </div>
              <div className="col-md-4">
                <p className="mb-2">
                  <strong>মাসিক ধার্যঃ</strong>{' '}
                  <span id="food_bill">৳ {currentStudent.khurakiFee || currentStudent.food_bill || defaultCharge}</span>
                </p>
                <p className="mb-2">
                  <strong>ভর্তি নংঃ</strong>{' '}
                  <span id="admission_number">{currentStudent.admissionNumber || currentStudent.admission_number || currentStudent.roll}</span>
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} id="paymentForm">
              <hr />

              <div className="row">
                <div className="col-md-4 col-sm-12 mb-4">
                  <label htmlFor="account" className="form-label fw-bold">এ্যাকাউন্ট</label>
                  <select
                    name="account_id"
                    id="account"
                    className="form-select custom-select"
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    required
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 col-sm-12 mb-4">
                  <label htmlFor="payment_method" className="form-label fw-bold">পেমেন্ট মেথড</label>
                  <select
                    name="payment_method_id"
                    id="payment_method"
                    className="form-select custom-select"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="cash">নগদ ক্যাশ (Cash)</option>
                    <option value="bkash">বিকাশ (bKash)</option>
                    <option value="nagad">নগদ (Nagad)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-success">
                    <tr>
                      <th>মাস</th>
                      <th>তারিখ</th>
                      <th>বই নং</th>
                      <th>রসিদ নং</th>
                      <th>টাঃ পরিমান</th>
                      <th style={{ width: '180px' }}>গ্রহণকারী</th>
                      <th>মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.month}>
                        <td className="fw-bold align-middle">{row.month}</td>
                        <td>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            value={row.date}
                            onChange={(e) => handleRowChange(index, 'date', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={row.bookNo}
                            placeholder="বই নং"
                            onChange={(e) => handleRowChange(index, 'bookNo', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={row.receiptNo}
                            placeholder="রসিদ নং"
                            onChange={(e) => handleRowChange(index, 'receiptNo', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="টাকার পরিমাণ"
                            value={row.amount}
                            onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={row.receiver}
                            onChange={(e) => handleRowChange(index, 'receiver', e.target.value)}
                          >
                            {receivers.map(r => (
                              <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="নোট/মন্তব্য লিখুন"
                            value={row.note}
                            onChange={(e) => handleRowChange(index, 'note', e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Submit Button */}
              <div className="text-end mt-4">
                <button type="submit" className="btn btn-primary btn-lg px-5">
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
