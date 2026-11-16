import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentSalaryList = () => {
  const { students, jamats, studentSalaryPayments = [], setSelectedReceiptForPrint } = useApp();

  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [searchName, setSearchName] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');

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
            {/* জামাত নির্বাচন */}
            <div className="col-12 col-md-3">
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

            {/* লাইভ সার্চ ইনপুট */}
            <div className="col-12 col-md-3">
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

            <div className="col-12 col-md-4">
              <label className="form-label fw-bold">শিক্ষার্থী নির্বাচন (নাম সবার উপরে)</label>
              <select
                name="student_id"
                id="name_select"
                className="form-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="">শিক্ষার্থী নির্বাচন করুন</option>
                {filteredStudents.map((s) => {
                  const adm = s.admissionNumber || s.admission_number || s.roll;
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name} (রোল/ভর্তি: {adm}) - {s.jamat}
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
