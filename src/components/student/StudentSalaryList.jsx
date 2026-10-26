import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentSalaryList = () => {
  const { students, studentSalaryPayments = [], setSelectedReceiptForPrint } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedYear, setSelectedYear] = useState('2026');

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Payments for current student
  const studentPayments = (studentSalaryPayments || []).filter(
    p => p.studentId === currentStudent?.id || p.studentName === currentStudent?.name
  );

  return (
    <div className="container-fluid p-0">
      {/* Top Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> বেতনের টাকা জমার প্রতিবেদন
          </h5>
        </div>

        <div className="card-body mb-3">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label fw-bold">ভর্তি নং দিয়ে খুঁজুন</label>
              <select
                name="student_id"
                id="name_select"
                className="form-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="">ভর্তি নং নির্বাচন করুন</option>
                {students.map((s) => {
                  const adm = s.admissionNumber || s.admission_number || s.roll;
                  return (
                    <option key={s.id} value={s.id}>
                      {adm} - {s.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="year_select" className="form-label fw-bold">
                সন নির্বাচন করুন
              </label>
              <select
                name="year"
                id="year_select"
                className="form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2026">2026 ইং</option>
                <option value="2025">2025 ইং</option>
                <option value="2024">2024 ইং</option>
              </select>
            </div>

            <div className="col-12 col-md-4 text-center text-md-start">
              <button type="button" className="btn btn-info b-r-22 px-5 mt-2">
                <i className="fas fa-search me-1"></i> ফলাফল দেখান
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Card */}
      {currentStudent && (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-header bg-white pt-4 border-0">
            <img
              src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
              alt="Banner"
              className="w-100 img-fluid"
            />
            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                  বেতনের টাকা জমার প্রতিবেদন
                </h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">সন {selectedYear} ইং</p>
              </div>
            </div>
          </div>

          <div className="card-body">
            {/* Student Info */}
            <div className="row mb-3 bg-light p-3 rounded">
              <div className="col-md-4 mb-2 mb-md-0">
                <p className="mb-1"><strong>ছাত্রের নামঃ</strong> <span>{currentStudent.name}</span></p>
                <p className="mb-0"><strong>জামাতঃ</strong> <span>{currentStudent.jamat}</span></p>
              </div>
              <div className="col-md-4">
                <p className="mb-1">
                  <strong>বেতনঃ</strong>{' '}
                  <span>৳ {currentStudent.coursefee || currentStudent.monthlyFee || 800} টাকা</span>
                </p>
                <p className="mb-0">
                  <strong>ভর্তি নংঃ</strong>{' '}
                  <span>{currentStudent.admissionNumber || currentStudent.admission_number || currentStudent.roll}</span>
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table id="salary-payment-table" className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                <thead className="bg-primary print-thead text-white">
                  <tr>
                    <th>ভাউচার নং</th>
                    <th>মাস</th>
                    <th>পেমেন্ট তারিখ</th>
                    <th>টাকার পরিমাণ</th>
                    <th>বুক নং</th>
                    <th>রশিদ নং</th>
                    <th>গ্রহণকারী</th>
                    <th>মন্তব্য</th>
                    <th className="no-print">একশন</th>
                  </tr>
                </thead>
                <tbody>
                  {studentPayments.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        এই সনে এই ছাত্রের কোন বেতন জমার রেকর্ড পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    studentPayments.map((p, idx) => (
                      <tr key={p.id || idx}>
                        <td className="fw-bold">{p.voucherNo || `V-S${100 + idx}`}</td>
                        <td>{p.month}</td>
                        <td>{p.date}</td>
                        <td className="fw-bold">৳ {Number(p.amount).toLocaleString('bn-BD')}</td>
                        <td>{p.bookNo || '01'}</td>
                        <td>{p.receiptNo || '245'}</td>
                        <td>{p.receiver || 'মাহমুদুল করিম'}</td>
                        <td>{p.note || '-'}</td>
                        <td className="no-print">
                          <button
                            className="btn btn-sm btn-info text-white"
                            onClick={() => setSelectedReceiptForPrint(p)}
                            title="রশিদ প্রিন্ট"
                          >
                            <i className="fa-solid fa-receipt me-1"></i> রশিদ
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Print Button */}
      <div className="row mb-3 no-print">
        <div className="col-12 d-flex justify-content-center">
          <button onClick={() => window.print()} className="btn btn-primary px-4 py-2">
            <i className="fas fa-print me-2"></i> প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};
