import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Plus,
  Users,
  CheckCircle,
  Building,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionReport = () => {
  const { students, jamats, setActiveTab } = useApp();
  const [selectedYear, setSelectedYear] = useState('2026');

  // Compute stats per jamat dynamically
  const jamatStats = jamats.map(j => {
    const list = students.filter(s => s.jamat === j.name);
    const residential = list.filter(s => s.khurakiFee > 0).length;
    const nonResidential = list.length - residential;
    const selfKhuraki = Math.round(residential * 0.45);
    const halfFree = Math.round(residential * 0.35);
    const fullFree = residential - selfKhuraki - halfFree;

    return {
      name: j.name,
      count: list.length,
      residential,
      nonResidential,
      selfKhuraki: Math.max(0, selfKhuraki),
      halfFree: Math.max(0, halfFree),
      fullFree: Math.max(0, fullFree),
    };
  });

  const totals = jamatStats.reduce(
    (acc, curr) => ({
      count: acc.count + curr.count,
      residential: acc.residential + curr.residential,
      nonResidential: acc.nonResidential + curr.nonResidential,
      selfKhuraki: acc.selfKhuraki + curr.selfKhuraki,
      halfFree: acc.halfFree + curr.halfFree,
      fullFree: acc.fullFree + curr.fullFree,
    }),
    { count: 0, residential: 0, nonResidential: 0, selfKhuraki: 0, halfFree: 0, fullFree: 0 }
  );

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-chart-pie me-2"></i>
            এক নজরে ছাত্র ভর্তি প্রতিবেদন সন {selectedYear} ইং
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

        <div className="card-body py-3 bg-light">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label className="form-label fw-bold small mb-0">সন নির্বাচন করুন:</label>
            </div>
            <div className="col-auto">
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
            <div className="col text-end">
              <span className="badge bg-success-subtle text-success border border-success-subtle p-2">
                সর্বমোট শিক্ষার্থী: <strong>{totals.count} জন</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Report Header */}
      <div className="text-center d-none d-print-block mb-4">
        <h2 className="fw-bold mb-1">জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা</h2>
        <p className="mb-1 text-muted small">বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার।</p>
        <h5 className="fw-bold text-decoration-underline mt-2">এক নজরে ছাত্র ভর্তি প্রতিবেদন সন {selectedYear} ইং</h5>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0 text-center">
              <thead className="table-light">
                <tr className="text-dark fw-bold">
                  <th style={{ width: '60px' }}>নং</th>
                  <th className="text-start">জামাতের নাম</th>
                  <th>নিজ খোরাকি</th>
                  <th>হাফ ফ্রি</th>
                  <th>ফুল ফ্রি</th>
                  <th>আবাসিক</th>
                  <th>অনাবাসিক</th>
                  <th className="bg-primary-subtle text-primary">মোট শিক্ষার্থী</th>
                </tr>
              </thead>
              <tbody>
                {jamatStats.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-bold font-mono">{index + 1}</td>
                    <td className="text-start fw-semibold text-dark">
                      <i className="fa-solid fa-graduation-cap text-primary me-2"></i>
                      {item.name}
                    </td>
                    <td className="font-mono">{item.selfKhuraki}</td>
                    <td className="font-mono">{item.halfFree}</td>
                    <td className="font-mono">{item.fullFree}</td>
                    <td className="font-mono text-success fw-semibold">{item.residential}</td>
                    <td className="font-mono text-muted">{item.nonResidential}</td>
                    <td className="font-mono fw-bold bg-primary-subtle text-primary">{item.count}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-secondary fw-bold">
                <tr>
                  <td colSpan="2" className="text-center">সর্বমোট</td>
                  <td className="font-mono">{totals.selfKhuraki}</td>
                  <td className="font-mono">{totals.halfFree}</td>
                  <td className="font-mono">{totals.fullFree}</td>
                  <td className="font-mono text-success">{totals.residential}</td>
                  <td className="font-mono text-muted">{totals.nonResidential}</td>
                  <td className="font-mono text-primary fs-6">{totals.count} জন</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
