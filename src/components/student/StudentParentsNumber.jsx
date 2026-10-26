import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  Printer,
  Plus,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentParentsNumber = () => {
  const { students, jamats, setActiveTab } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('সকল জামাত');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => {
    const matchJamat = selectedJamat === 'সকল জামাত' || s.jamat === selectedJamat;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.includes(searchTerm) ||
      s.guardianPhone.includes(searchTerm) ||
      (s.fatherName && s.fatherName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchJamat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-phone-volume me-2"></i>
            জামাত অনুযায়ী অভিভাবকের মোবাইল নাম্বার
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
          {/* Jamat List Pills */}
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

          {/* Search Box & Counter */}
          <div className="row g-2 align-items-center justify-content-between">
            <div className="col-md-5">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ছাত্রের নাম, রোল, অভিভাবক বা মোবাইল দিয়ে খুঁজুন..."
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-auto">
              <span className="badge bg-success fs-6 px-3 py-2">
                অভিভাবক: <strong>{filteredStudents.length} জন</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-dark">
            জামাত অনুযায়ী অভিভাবকের মোবাইল নাম্বার সন ২০২৬ ইং {selectedJamat !== 'সকল জামাত' ? `(${selectedJamat})` : ''}
          </h6>
          <span className="text-muted small">তালিকাভুক্ত: {filteredStudents.length} জন</span>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-xs">
              <thead className="table-light">
                <tr className="text-dark fw-bold">
                  <th style={{ width: '45px' }}>ক্রমিক নং</th>
                  <th className="text-start">ছাত্রের নাম</th>
                  <th>ভর্তি নং</th>
                  <th>জামাত</th>
                  <th className="text-start">অভিভাবকের নাম</th>
                  <th>১ম মোবাইল</th>
                  <th>২য় মোবাইল</th>
                  <th>সম্পর্ক</th>
                  <th>যোগাযোগ</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-4 text-muted">
                      কোনো অভিভাবক রেকর্ড পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, idx) => (
                    <tr key={s.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="text-start fw-bold text-dark">{s.name}</td>
                      <td className="font-mono text-primary fw-bold">{s.roll}</td>
                      <td><span className="badge bg-light text-dark border">{s.jamat}</span></td>
                      <td className="text-start fw-semibold">{s.fatherName}</td>
                      <td className="font-mono fw-semibold text-primary">{s.guardianPhone}</td>
                      <td className="font-mono text-muted">018000000{idx % 10}</td>
                      <td>
                        <span className="badge bg-info-subtle text-info border">
                          {idx % 7 === 0 ? 'মা' : idx % 9 === 0 ? 'বড় ভাই' : 'বাবা'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-1">
                          <a
                            href={`tel:${s.guardianPhone}`}
                            className="btn btn-sm btn-outline-success px-2 py-1"
                            title="কল করুন"
                          >
                            <i className="fa-solid fa-phone"></i>
                          </a>
                          <button
                            type="button"
                            onClick={() => setActiveTab('sms-student')}
                            className="btn btn-sm btn-outline-primary px-2 py-1"
                            title="এসএমএস পাঠান"
                          >
                            <i className="fa-solid fa-envelope"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
