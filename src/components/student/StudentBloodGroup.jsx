import React, { useState } from 'react';
import {
  Droplet,
  Search,
  Printer,
  Phone,
  MessageSquare,
  Users,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentBloodGroup = () => {
  const { students, setActiveTab } = useApp();
  const [selectedBlood, setSelectedBlood] = useState('সকল গ্রুপ');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filteredStudents = students.filter(s => {
    const matchBlood = selectedBlood === 'সকল গ্রুপ' || s.bloodGroup === selectedBlood;
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.includes(searchTerm) ||
      s.guardianPhone.includes(searchTerm) ||
      s.jamat.toLowerCase().includes(searchTerm.toLowerCase());
    return matchBlood && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-droplet text-danger me-2"></i>
            রক্তের গ্রুপ অনুসারে ছাত্র/ছাত্রী
          </h5>
          <div className="d-flex gap-2">
            <div className="btn-group btn-group-sm">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`btn ${viewMode === 'cards' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
              >
                <i className="fa-solid fa-grid me-1"></i> কার্ড ভিউ
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`btn ${viewMode === 'table' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'}`}
              >
                <i className="fa-solid fa-list me-1"></i> টেবিল ভিউ
              </button>
            </div>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>

        <div className="card-body bg-light py-3">
          {/* Blood Group Pills */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-muted mb-2">গ্রুপ নির্বাচন করুন:</label>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedBlood('সকল গ্রুপ')}
                className={`btn btn-sm rounded-pill px-3 ${
                  selectedBlood === 'সকল গ্রুপ' ? 'btn-danger' : 'btn-outline-danger bg-white'
                }`}
              >
                সকল গ্রুপ ({students.length})
              </button>
              {bloodGroups.map(bg => {
                const count = students.filter(s => s.bloodGroup === bg).length;
                return (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setSelectedBlood(bg)}
                    className={`btn btn-sm rounded-pill px-3 ${
                      selectedBlood === bg ? 'btn-danger' : 'btn-outline-danger bg-white'
                    }`}
                  >
                    {bg} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div className="row g-2 align-items-center justify-content-between">
            <div className="col-md-5">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="নাম, রোল বা মোবাইল দিয়ে খুঁজুন..."
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-auto">
              <span className="badge bg-danger fs-6 px-3 py-2">
                রক্তদাতা শিক্ষার্থী: <strong>{filteredStudents.length} জন</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="row g-3">
          {filteredStudents.map((student) => (
            <div key={student.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border border-light-subtle rounded-3 hover-shadow transition">
                <div className="card-body p-3 text-center position-relative">
                  {/* Blood Group Badge Top Right */}
                  <span className="position-absolute top-0 end-0 m-2 badge bg-danger fs-6 fw-bold shadow-xs">
                    {student.bloodGroup || 'A+'}
                  </span>

                  {/* Student Avatar */}
                  <div className="mx-auto mb-2" style={{ width: '65px', height: '65px' }}>
                    <img
                      src={student.photo || '/students/FB_IMG_1791220812856.webp'}
                      alt={student.name}
                      className="rounded-circle img-fluid border border-2 border-primary object-cover w-100 h-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(student.name) + '&background=0f626a&color=fff';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <h6 className="card-title fw-bold text-dark mb-1 text-truncate" title={student.name}>
                    {student.name}
                  </h6>
                  <p className="card-text text-muted small mb-1">
                    রোল: <span className="font-mono fw-bold text-primary">{student.roll}</span> | {student.jamat}
                  </p>
                  <p className="card-text text-muted small mb-3">
                    পিতা: {student.fatherName}
                  </p>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-center gap-2">
                    <a
                      href={`tel:${student.guardianPhone}`}
                      className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                      title="অভিভাবককে কল করুন"
                    >
                      <i className="fa-solid fa-phone"></i>
                      <span className="small">{student.guardianPhone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0 text-center text-xs">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th className="text-start">শিক্ষার্থীর নাম</th>
                    <th>রোল</th>
                    <th>জামাত</th>
                    <th>রক্তের গ্রুপ</th>
                    <th>পিতার নাম</th>
                    <th>অভিভাবক মোবাইল</th>
                    <th>যোগাযোগ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, idx) => (
                    <tr key={s.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="text-start fw-bold text-dark">{s.name}</td>
                      <td className="font-mono text-primary fw-bold">{s.roll}</td>
                      <td><span className="badge bg-light text-dark border">{s.jamat}</span></td>
                      <td>
                        <span className="badge bg-danger fs-6">{s.bloodGroup || 'A+'}</span>
                      </td>
                      <td className="text-start">{s.fatherName}</td>
                      <td className="font-mono">{s.guardianPhone}</td>
                      <td>
                        <a href={`tel:${s.guardianPhone}`} className="btn btn-sm btn-success px-2 py-1">
                          <i className="fa-solid fa-phone me-1"></i> কল
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
