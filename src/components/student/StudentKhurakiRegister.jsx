import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentKhurakiRegister = () => {
  const { students, jamats } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('');

  const filteredStudents = selectedJamat
    ? students.filter(s => s.jamat === selectedJamat)
    : students;

  return (
    <div className="container-fluid p-0">
      {/* Top Filter Bar (no-print) */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-table me-2"></i> ছাত্রদের খোরাকীর টাকা আদায়ের রেজিস্টার
          </h5>
        </div>
        <div className="card-body py-3">
          <div className="row align-items-center">
            <div className="col-md-4">
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
            <div className="col-md-8 text-end">
              <p className="mb-0 fw-semibold text-muted">
                মোট শিক্ষার্থী: {filteredStudents.length} জন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Register Card */}
      <div className="card border-0 shadow-sm mb-4" id="printContent">
        <div className="card-body py-3">
          <img
            src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
            alt="Banner"
            className="w-100 img-fluid"
          />
          <div className="row mt-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                ছাত্রদের খোরাকীর টাকা আদায়ের রেজিস্টার
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
                <th>খোরাকীর হার</th>
                <th>আবাসিক / অনাবাসিক</th>
                {MONTH_NAMES.map(m => (
                  <th key={m} style={{ minWidth: '55px' }}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="17" className="text-center py-4 text-muted">
                    কোন রেকর্ড পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const admissionNo = student.admissionNumber || student.admission_number || student.roll || idx + 101;
                  const rate = student.khurakiFee || student.food_bill || 2000;
                  const res = (student.khurakiFee || student.food_bill || 0) > 0 || student.residential === 'আবাসিক' ? 'আবাসিক' : 'অনাবাসিক';

                  return (
                    <tr key={student.id}>
                      <td>{idx + 1}</td>
                      <td className="text-start ps-2 fw-semibold">{student.name}</td>
                      <td>{admissionNo}</td>
                      <td>৳ {rate}</td>
                      <td>{res}</td>
                      {MONTH_NAMES.map((m, mIdx) => {
                        // Demo paid marks for previous months
                        const isPaid = mIdx < 3 || (student.fees && student.fees[m]?.paid);
                        return (
                          <td key={m} className={isPaid ? 'text-success fw-bold' : 'text-muted'}>
                            {isPaid ? '✓' : '-'}
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
