import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentSalaryRegister = () => {
  const { students, jamats } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('');
  const [searchName, setSearchName] = useState('');

  const filteredStudents = useMemo(() => {
    let list = selectedJamat ? students.filter(s => s.jamat === selectedJamat) : students;
    if (searchName.trim()) {
      const q = searchName.trim().toLowerCase();
      list = list.filter(s =>
        (s.name || '').toLowerCase().includes(q) ||
        (s.nameEn || '').toLowerCase().includes(q) ||
        String(s.roll || '').includes(q) ||
        String(s.admissionNumber || s.admission_number || '').includes(q)
      );
      list.sort((a, b) => {
        const aMatches = (a.name || '').toLowerCase().includes(q);
        const bMatches = (b.name || '').toLowerCase().includes(q);
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }
    return list;
  }, [students, selectedJamat, searchName]);

  return (
    <div className="container-fluid p-0">
      {/* Top Filter Bar (no-print) */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-table me-2"></i> বেতনের টাকা আদায়ের রেজিস্টার
          </h5>
        </div>
        <div className="card-body py-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-4 col-12">
              <label className="form-label fw-bold">জামাত নির্বাচন করুন:</label>
              <select
                className="form-select"
                value={selectedJamat}
                onChange={(e) => setSelectedJamat(e.target.value)}
              >
                <option value="">সকল জামাত</option>
                {jamats.map(j => (
                  <option key={j.id || j.name} value={j.name}>{j.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-5 col-12">
              <label className="form-label fw-bold text-primary">
                <i className="fas fa-search me-1"></i> ছাত্রের নাম বা রোল দিয়ে খুঁজুন:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="নাম বা রোল লিখুন..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                {searchName && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setSearchName('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-3 col-12 text-md-end text-start">
              <p className="mb-0 fw-semibold text-muted">
                মোট শিক্ষার্থী: {filteredStudents.length} জন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Register Card */}
      <div className="card border-0 shadow-sm mb-4" id="printContent">
        <div className="card-body py-4">
          <img
            src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
            alt="Banner"
            className="w-100 img-fluid"
          />
          <div className="row mt-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                বেতনের টাকা আদায়ের রেজিস্টার
              </h5>
              {selectedJamat && <p className="mb-0 text-muted">জামাত: <strong>{selectedJamat}</strong></p>}
            </div>
            <div className="col-md-2 text-end">
              <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
            </div>
          </div>
        </div>

        <div className="table-responsive card-body p-0">
          <table className="table table-bordered table-striped align-middle mb-0 print-table text-center" style={{ fontSize: '11px' }}>
            <thead className="bg-primary print-thead text-white">
              <tr className="text-center align-middle">
                <th>ক্রমিক নং</th>
                <th style={{ minWidth: '120px' }}>ছাত্রের নাম</th>
                <th>ভর্তি নং</th>
                <th>বেতন</th>
                {MONTH_NAMES.map(m => (
                  <th key={m} style={{ minWidth: '55px' }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="16" className="text-center py-4 text-muted">
                    কোন রেকর্ড পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const admissionNo = student.admissionNumber || student.admission_number || student.roll || idx + 101;
                  const fee = student.coursefee !== undefined ? student.coursefee : (student.monthlyFee !== undefined ? student.monthlyFee : 800);

                  return (
                    <tr key={student.id}>
                      <td>{idx + 1}</td>
                      <td className="text-start ps-2 fw-semibold">{student.name}</td>
                      <td>{admissionNo}</td>
                      <td>{fee}৳</td>
                      {MONTH_NAMES.map((m, mIdx) => {
                        const monthFee = student.fees?.[m];
                        const isPaid = monthFee ? (monthFee.paid && (monthFee.tuition > 0 || monthFee.khuraki === undefined)) : (mIdx < 4 && fee > 0);
                        const amountPaid = monthFee?.tuition || (isPaid ? fee : 0);
                        return (
                          <td key={m} className={isPaid && amountPaid > 0 ? 'fw-bold text-dark font-monospace' : 'text-muted'}>
                            {isPaid && amountPaid > 0 ? `${amountPaid.toLocaleString('en-IN')}` : <span className="text-muted">-</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

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
