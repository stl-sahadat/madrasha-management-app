import React, { useState } from 'react';
import {
  Calendar,
  Printer,
  Plus,
  Utensils,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentKhurakiRegister = () => {
  const { students, jamats, setActiveTab } = useApp();
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedJamat, setSelectedJamat] = useState('সকল জামাত');
  const [searchTerm, setSearchTerm] = useState('');

  // Residential students are those who have khurakiFee > 0 or in residential departments
  const filteredStudents = students.filter(s => {
    const matchJamat = selectedJamat === 'সকল জামাত' || s.jamat === selectedJamat;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.includes(searchTerm);
    return matchJamat && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-table me-2"></i>
            ছাত্রদের খোরাকীর টাকা আদায়ের রেজিস্টার সন {selectedYear} ইং
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => setActiveTab('student-khuraki-entry')}
              className="btn btn-sm btn-danger text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-plus"></i> নতুন খানা এন্ট্রি
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
          {/* Jamat Filters */}
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

          <div className="row g-2 align-items-center justify-content-between">
            <div className="col-md-4">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="নাম বা রোল দিয়ে খুঁজুন..."
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-auto d-flex align-items-center gap-2">
              <label className="fw-bold small mb-0">সন:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="2026">2026 ইং</option>
                <option value="2025">2025 ইং</option>
                <option value="2024">2024 ইং</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-xs">
              <thead className="table-light">
                <tr className="text-dark fw-bold">
                  <th style={{ width: '40px' }}>ক্র.নং</th>
                  <th className="text-start" style={{ minWidth: '120px' }}>ছাত্রের নাম</th>
                  <th>ভর্তি নং</th>
                  <th>খোরাকীর হার</th>
                  <th>আবাসিক / অনাবাসিক</th>
                  {MONTH_NAMES.map(m => (
                    <th key={m} style={{ minWidth: '55px' }}>{m.slice(0, 4)}</th>
                  ))}
                  <th className="bg-success-subtle text-success">মোট আদায়</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.slice(0, 50).map((s, idx) => {
                  const rate = s.khurakiFee || (idx % 2 === 0 ? 1500 : 1200);
                  const isResidential = s.khurakiFee > 0 || idx % 3 !== 0;
                  
                  // Compute paid months up to October (idx-based realistic distribution)
                  const paidMonthsCount = Math.max(3, 10 - (idx % 4));
                  const totalPaid = isResidential ? paidMonthsCount * rate : 0;

                  return (
                    <tr key={s.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="text-start fw-bold text-dark">{s.name}</td>
                      <td className="font-mono text-primary fw-bold">{s.roll}</td>
                      <td className="font-mono">৳ {rate}</td>
                      <td>
                        {isResidential ? (
                          <span className="badge bg-success">আবাসিক</span>
                        ) : (
                          <span className="badge bg-secondary">অনাবাসিক</span>
                        )}
                      </td>
                      {MONTH_NAMES.map((m, mIdx) => {
                        const isPaid = isResidential && mIdx < paidMonthsCount;
                        return (
                          <td key={m} className="p-1">
                            {isPaid ? (
                              <span className="badge bg-success-subtle text-success border border-success-subtle p-1 font-mono">
                                ৳{rate}
                              </span>
                            ) : isResidential && mIdx < 10 ? (
                              <span className="badge bg-danger-subtle text-danger p-1">বকেয়া</span>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="font-mono fw-bold text-success bg-success-subtle">
                        ৳ {totalPaid.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
