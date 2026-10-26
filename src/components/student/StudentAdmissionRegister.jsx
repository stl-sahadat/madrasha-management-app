import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionRegister = () => {
  const { students, jamats, setActiveTab } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('সকল জামাত');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => {
    const matchJamat = selectedJamat === 'সকল জামাত' || s.jamat === selectedJamat;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.includes(searchTerm) ||
      (s.fatherName && s.fatherName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchJamat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Page Title & Action Bar */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-address-book me-2"></i>
            জামাত অনুসারে ভর্তি রেজিষ্টার
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => setActiveTab('student-create')}
              className="btn btn-sm btn-danger text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-plus"></i> নতুন ছাত্র/ছাত্রী যুক্ত করুন
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>

        <div className="card-body bg-light py-3">
          {/* Jamat Selection Filter Pills */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-muted mb-2">জামাত লিস্ট:</label>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedJamat('সকল জামাত')}
                className={`btn btn-sm rounded-pill px-3 ${
                  selectedJamat === 'সকল জামাত' ? 'btn-primary' : 'btn-outline-secondary bg-white'
                }`}
              >
                সকল জামাত
              </button>
              {jamats.map(j => (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => setSelectedJamat(j.name)}
                  className={`btn btn-sm rounded-pill px-3 ${
                    selectedJamat === j.name ? 'btn-primary' : 'btn-outline-secondary bg-white'
                  }`}
                >
                  {j.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box & Student Count Badge */}
          <div className="row g-2 align-items-center justify-content-between">
            <div className="col-md-5">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="নাম, ভর্তি নং বা পিতার নাম দিয়ে খুঁজুন..."
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-auto">
              <span className="badge bg-primary fs-6 px-3 py-2">
                ছাত্র/ছাত্রী: <strong>{filteredStudents.length} জন</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-dark">
            ছাত্র ভর্তি রেজিস্টার সন ২০২৬ ইং {selectedJamat !== 'সকল জামাত' ? `(${selectedJamat})` : ''}
          </h6>
          <span className="text-muted small">মোট রেকর্ড: {filteredStudents.length} টি</span>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-xs">
              <thead className="table-light">
                <tr className="text-dark fw-bold">
                  <th style={{ width: '45px' }}>নং</th>
                  <th className="text-start">ছাত্রের নাম</th>
                  <th>ভর্তি নং</th>
                  <th>ফরম নং</th>
                  <th>জামাত</th>
                  <th>পিতার নাম</th>
                  <th>মোবাইল</th>
                  <th>নিজ খোরাকি</th>
                  <th>হাফ ফি</th>
                  <th>ফুল ফি</th>
                  <th>আবাসিক</th>
                  <th>অনাবাসিক</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="py-4 text-muted">
                      কোনো শিক্ষার্থী পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, idx) => {
                    const isResidential = s.khurakiFee > 0;
                    const isSelfKhuraki = idx % 3 === 0;
                    const isHalfFee = idx % 3 === 1;
                    const isFullFee = idx % 3 === 2;

                    return (
                      <tr key={s.id}>
                        <td className="fw-bold font-mono">{idx + 1}</td>
                        <td className="text-start fw-bold text-dark">
                          {s.name}
                        </td>
                        <td className="font-mono text-primary fw-bold">{s.roll}</td>
                        <td className="font-mono text-muted">{1000 + idx}</td>
                        <td><span className="badge bg-light text-dark border">{s.jamat}</span></td>
                        <td className="text-start">{s.fatherName}</td>
                        <td className="font-mono">{s.guardianPhone}</td>
                        <td>
                          {isSelfKhuraki ? (
                            <span className="badge bg-success-subtle text-success">হ্যাঁ</span>
                          ) : (
                            <span className="text-muted">না</span>
                          )}
                        </td>
                        <td>
                          {isHalfFee ? (
                            <span className="badge bg-info-subtle text-info">হ্যাঁ</span>
                          ) : (
                            <span className="text-muted">না</span>
                          )}
                        </td>
                        <td>
                          {isFullFee ? (
                            <span className="badge bg-warning-subtle text-warning">হ্যাঁ</span>
                          ) : (
                            <span className="text-muted">না</span>
                          )}
                        </td>
                        <td>
                          {isResidential ? (
                            <span className="badge bg-success">আবাসিক</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td>
                          {!isResidential ? (
                            <span className="badge bg-secondary">অনাবাসিক</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
