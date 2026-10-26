import React, { useState } from 'react';
import {
  Utensils,
  Search,
  CheckCircle,
  Printer,
  Calendar,
  CreditCard,
  User,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentKhurakiEntry = () => {
  const {
    students,
    accounts,
    receivers,
    addKhurakiPayment,
    setSelectedReceiptForPrint,
    setActiveTab
  } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [month, setMonth] = useState('অক্টোবর');
  const [year, setYear] = useState('2026');
  const [account, setAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [receiver, setReceiver] = useState(receivers[0]?.name || 'মাহমুদুল করিম');
  const [customAmount, setCustomAmount] = useState('');
  const [note, setNote] = useState('');

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const payableAmount = customAmount !== '' ? customAmount : (currentStudent?.khurakiFee || 1500);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = parseFloat(payableAmount);
    if (!finalAmount || finalAmount <= 0) {
      alert('সঠিক টাকার অংক উল্লেখ করুন');
      return;
    }

    const voucher = addKhurakiPayment({
      date,
      month,
      year,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      roll: currentStudent.roll,
      jamat: currentStudent.jamat,
      amount: finalAmount,
      account,
      receiver,
      note: note || `ছাত্র খানার টাকা জমা (${month} ${year})`
    });

    if (voucher) {
      setSelectedReceiptForPrint(voucher);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-utensils me-2"></i>
            ছাত্র খানার টাকা জমার এন্ট্রি সিস্টেম
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => setActiveTab('student-khuraki-list')}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-list"></i> জমার তালিকা দেখুন
            </button>
            <button
              onClick={() => setActiveTab('student-khuraki-register')}
              className="btn btn-sm btn-light text-primary fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-table"></i> খোরাকী রেজিস্টার
            </button>
          </div>
        </div>

        <div className="card-body bg-light py-3">
          <p className="small text-muted mb-0">
            আবাসিক ও লিল্লা বোডিংয়ের শিক্ষার্থীদের মাসিক খাদ্য ও খোরাকী ফি আদায়ের অফিসিয়াল ভাউচার এন্ট্রি ফরম
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Side: Student Selection & Info Card */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3 border-bottom">
              <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
                <i className="fa-solid fa-user-graduate text-primary me-2"></i>
                শিক্ষার্থী নির্বাচন করুন
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-bold small">ভর্তি নং দিয়ে খুঁজুন:</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => {
                    setSelectedStudentId(e.target.value);
                    setCustomAmount('');
                  }}
                  className="form-select"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.roll} - {s.name} ({s.jamat})
                    </option>
                  ))}
                </select>
              </div>

              {currentStudent && (
                <div className="bg-light p-3 rounded-3 border">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img
                      src={currentStudent.photo || '/students/FB_IMG_1791220812856.webp'}
                      alt={currentStudent.name}
                      className="rounded-circle border"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentStudent.name) + '&background=0f626a&color=fff';
                      }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{currentStudent.name}</h6>
                      <span className="badge bg-primary text-white me-1">রোল: {currentStudent.roll}</span>
                      <span className="badge bg-secondary text-white">{currentStudent.jamat}</span>
                    </div>
                  </div>

                  <hr className="my-2" />

                  <div className="small space-y-1">
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">পিতার নাম:</span>
                      <span className="fw-semibold">{currentStudent.fatherName}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">অভিভাবক ফোন:</span>
                      <span className="font-mono fw-semibold">{currentStudent.guardianPhone}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">রক্তের গ্রুপ:</span>
                      <span className="badge bg-danger-subtle text-danger">{currentStudent.bloodGroup || 'A+'}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span className="text-muted">মাসিক নির্ধারিত খোরাকী:</span>
                      <span className="font-mono fw-bold text-success fs-6">৳ {currentStudent.khurakiFee || 1500}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Fee Payment Form */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 border-bottom">
              <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
                <i className="fa-solid fa-receipt text-success me-2"></i>
                টাকা জমার বিবরণী
              </h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">তারিখ *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">কোন মাসে দিচ্ছে *</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="form-select"
                  >
                    {MONTH_NAMES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">সাল *</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-select"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">জমার ধরন *</label>
                  <input
                    type="text"
                    value="ছাএদের খানার টাকা (খোরাকী ফি)"
                    readOnly
                    className="form-control bg-light"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">জমার পরিমাণ (টাকা) *</label>
                  <div className="input-group">
                    <span className="input-group-text">৳</span>
                    <input
                      type="number"
                      value={payableAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="form-control font-mono fw-bold text-primary"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">কোন একাউন্টে জমা দিচ্ছেন *</label>
                  <select
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="form-select"
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.name}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">গ্রহণকারী *</label>
                  <select
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    className="form-select"
                  >
                    {receivers.map(r => (
                      <option key={r.id} value={r.name}>{r.name} ({r.designation})</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold small">মন্তব্য (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="নোট বা বিশেষ বিবরণ..."
                    className="form-control"
                  />
                </div>

                <div className="col-12 mt-4 pt-2 border-top text-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                  >
                    <i className="fa-solid fa-check-circle"></i>
                    সংরক্ষণ করুন ও রসিদ প্রিন্ট করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
