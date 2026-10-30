'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  numberToBengaliWords,
  formatMoney,
  formatDateDDMMYYYY,
  toStandardDateStr
} from '../../utils/bengaliWords';

export const StudentDepositReport = () => {
  const { profile, students, transactions, activeTab, setSelectedVoucherForReceipt, setIsReceiptModalOpen } = useApp();

  const currentYear = new Date().getFullYear().toString();

  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sId = params.get('student_id') || '';
      const yr = params.get('year') || currentYear;
      return {
        studentId: sId,
        year: yr,
        hasSearched: Boolean(sId)
      };
    }
    return {
      studentId: '',
      year: currentYear,
      hasSearched: false
    };
  };

  const initial = getInitialParams();
  const [selectedStudentId, setSelectedStudentId] = useState(initial.studentId);
  const [selectedYear, setSelectedYear] = useState(initial.year);
  const [appliedFilter, setAppliedFilter] = useState(initial);

  useEffect(() => {
    const handlePopState = () => {
      const p = getInitialParams();
      setSelectedStudentId(p.studentId);
      setSelectedYear(p.year);
      setAppliedFilter(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const p = getInitialParams();
    setSelectedStudentId(p.studentId);
    setSelectedYear(p.year);
    setAppliedFilter(p);
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      alert('অনুগ্রহ করে শিক্ষার্থী নির্বাচন করুন');
      return;
    }
    const filterObj = {
      studentId: selectedStudentId,
      year: selectedYear,
      hasSearched: true
    };
    setAppliedFilter(filterObj);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('student_id', selectedStudentId);
      url.searchParams.set('year', selectedYear);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Find student details
  const currentStudent = students.find(
    (s) => String(s.id) === String(appliedFilter.studentId) || String(s.roll) === String(appliedFilter.studentId)
  );

  // Filter food/khuraki deposits for this student
  const studentPayments = transactions.filter((t) => {
    if (!appliedFilter.hasSearched || t.type !== 'deposit') return false;
    const stdDate = toStandardDateStr(t.date);
    if (!stdDate.startsWith(appliedFilter.year)) return false;
    const isStudentMatch =
      t.studentId === currentStudent?.id ||
      t.donorOrStudent?.includes(currentStudent?.name) ||
      t.note?.includes(currentStudent?.name) ||
      t.note?.includes(currentStudent?.roll);
    const isKhuraki =
      t.category === 'ছাএদের খানার টাকা' ||
      t.category === 'খোরাকী' ||
      t.note?.includes('খানা') ||
      t.note?.includes('খোরাকী');
    return isStudentMatch && isKhuraki;
  });

  const totalAmount = studentPayments.reduce((s, v) => s + (parseFloat(v.totalAmount) || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  const openReceipt = (v) => {
    if (setSelectedVoucherForReceipt && setIsReceiptModalOpen) {
      setSelectedVoucherForReceipt(v);
      setIsReceiptModalOpen(true);
    }
  };

  return (
    <div className="container-fluid py-2">
      {/* Search Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> ছাত্র খানার টাকা জমার তালিকা
          </h5>
        </div>
        <div className="card-body mb-3">
          <form onSubmit={handleSubmit} id="depositForm" className="w-100">
            <div className="row g-3 align-items-end">
              <div className="col-12 col-md-5">
                <label className="form-label fw-bold">ভর্তি নং দিয়ে খুঁজুন</label>
                <select
                  name="student_id"
                  id="name_select"
                  className="form-select"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  required
                >
                  <option value="">ভর্তি নং নির্বাচন করুন</option>
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.roll} - {st.name} ({st.jamat})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label fw-bold">সন নির্বাচন করুন</label>
                <select
                  name="year"
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  required
                >
                  <option value="">সন নির্বাচন করুন</option>
                  {['2026', '2025', '2024', '2023', '2022'].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-success fw-bold px-4 w-100">
                  <i className="fa-solid fa-search me-1"></i> খুঁজুন
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Searched View */}
      {appliedFilter.hasSearched && currentStudent && (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-header pt-4 bg-transparent border-0">
            {profile?.banner ? (
              <img
                src={profile.banner}
                alt="Banner"
                className="w-100 img-fluid mb-2"
                style={{ maxHeight: '160px', objectFit: 'cover' }}
              />
            ) : (
              <div className="text-center mb-3">
                <h3 className="fw-bold mb-1" style={{ color: '#2c5f2d' }}>
                  {profile?.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}
                </h3>
                <p className="text-muted mb-0">{profile?.address}</p>
              </div>
            )}

            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                  ছাত্র খানার টাকা জমার তালিকা
                </h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">সন {appliedFilter.year} ইং</p>
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            {/* Student Profile Card */}
            <div className="row bg-light p-3 rounded mb-4 border mx-0">
              <div className="col-md-6 mb-2 mb-md-0">
                <p className="mb-1">
                  <strong>ছাত্রের নামঃ</strong> {currentStudent.name}
                </p>
                <p className="mb-0">
                  <strong>জামাতঃ</strong> {currentStudent.jamat}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb-1">
                  <strong>মাসিক ধার্য (খানা):</strong> {currentStudent.foodFee || 1500} ৳
                </p>
                <p className="mb-0">
                  <strong>ভর্তি নংঃ</strong> {currentStudent.roll}
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                <thead className="bg-primary text-white print-thead">
                  <tr className="text-center">
                    <th style={{ width: '110px' }}>ভাউচার নং</th>
                    <th style={{ width: '120px' }}>মাস</th>
                    <th style={{ width: '120px' }}>পেমেন্ট তারিখ</th>
                    <th style={{ width: '130px' }}>টাকার পরিমাণ</th>
                    <th style={{ width: '90px' }}>বুক নং</th>
                    <th style={{ width: '90px' }}>রশিদ নং</th>
                    <th>গ্রহণকারী</th>
                    <th>মন্তব্য</th>
                    <th className="no-print" style={{ width: '100px' }}>একশন</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPayments.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        এই শিক্ষার্থীর কোন খানার জমার তথ্য পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    studentPayments.map((v, idx) => (
                      <tr key={v.id || idx}>
                        <td className="fw-semibold">{v.voucherNo || `V-${idx + 1}`}</td>
                        <td>{v.month || 'চলতি মাস'}</td>
                        <td>{formatDateDDMMYYYY(v.date)}</td>
                        <td className="text-end fw-bold text-success">{formatMoney(v.totalAmount)} ৳</td>
                        <td>{v.bookNo || '-'}</td>
                        <td>{v.receiptNo || '-'}</td>
                        <td>{v.receiver || 'মাহমুদুল করিম'}</td>
                        <td>{v.note || '-'}</td>
                        <td className="no-print text-center">
                          <button
                            onClick={() => openReceipt(v)}
                            className="btn btn-sm btn-outline-primary"
                            title="রসিদ দেখুন"
                          >
                            <i className="fa-solid fa-receipt me-1"></i> রসিদ
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {studentPayments.length > 0 && (
                  <tfoot className="table-light fw-bold">
                    <tr>
                      <td colSpan="3" className="text-end">সর্বমোট আদায়ঃ</td>
                      <td className="text-end text-success">{formatMoney(totalAmount)} ৳</td>
                      <td colSpan="5"></td>
                    </tr>
                    <tr>
                      <td colSpan="9" className="text-start ps-3 fw-semibold text-muted">
                        কথায়: <span className="text-dark fw-bold">({numberToBengaliWords(totalAmount)} টাকা মাত্র)</span>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* Signatures */}
            <div className="row mt-5 pt-4 text-center">
              <div className="col-4">
                <div style={{ borderTop: '1px dashed #666', width: '160px', margin: '0 auto' }}></div>
                <p className="mt-2 mb-0 fw-semibold">হিসাব রক্ষক</p>
              </div>
              <div className="col-4"></div>
              <div className="col-4">
                <div style={{ borderTop: '1px dashed #666', width: '160px', margin: '0 auto' }}></div>
                <p className="mt-2 mb-0 fw-semibold">মুহতামিম</p>
              </div>
            </div>

            {/* Print Button */}
            <div className="text-end mt-4 no-print">
              <button onClick={handlePrint} className="btn btn-secondary px-4 fw-semibold">
                <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
