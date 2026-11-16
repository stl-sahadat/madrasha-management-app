import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const AttendanceModule = ({ defaultMode = 'attendance-student' }) => {
  const { students, teachers, jamats, showToast } = useApp();

  const [activeMode, setActiveMode] = useState(defaultMode);

  // Filters
  const [selectedJamat, setSelectedJamat] = useState(jamats?.[0]?.name || 'হিফজ বিভাগ');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState('10');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Exam Filters
  const [examName, setExamName] = useState('বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬');
  const [examSubject, setExamSubject] = useState('কুরআন হিফজ ও তাজবীদ');
  const [selectedResultJamat, setSelectedResultJamat] = useState('all');
  const [individualStudentId, setIndividualStudentId] = useState(students?.[0]?.id || '');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');

  const filteredResultStudents = React.useMemo(() => {
    if (selectedResultJamat === 'all') return students;
    return students.filter(s => s.jamat === selectedResultJamat);
  }, [students, selectedResultJamat]);

  // Student Attendance: { [studentId]: { status: 'present' | 'absent' | 'sick' | 'leave', note: '' } }
  const [studentStatus, setStudentStatus] = useState(() => {
    const map = {};
    (students || []).forEach(s => {
      map[s.id] = { status: 'present', note: '' };
    });
    return map;
  });

  // Teacher Attendance: { [teacherId]: { status: 'present' | 'absent' | 'sick' | 'leave', note: '' } }
  const [teacherStatus, setTeacherStatus] = useState(() => {
    const map = {};
    (teachers || []).forEach(t => {
      map[t.id] = { status: 'present', note: '' };
    });
    return map;
  });

  // Filtered Students with Search Support
  const currentJamatStudents = React.useMemo(() => {
    let list = students.filter(s => s.jamat === selectedJamat);
    if (!studentSearchQuery.trim()) return list;
    const q = studentSearchQuery.trim().toLowerCase();
    return list.filter(s =>
      (s.name || '').toLowerCase().includes(q) ||
      String(s.roll || s.admissionNumber || '').includes(q)
    ).sort((a, b) => {
      const aMatches = (a.name || '').toLowerCase().includes(q);
      const bMatches = (b.name || '').toLowerCase().includes(q);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [students, selectedJamat, studentSearchQuery]);

  const handleMarkAllStudentsPresent = () => {
    const updated = { ...studentStatus };
    currentJamatStudents.forEach(s => {
      updated[s.id] = { ...(updated[s.id] || {}), status: 'present' };
    });
    setStudentStatus(updated);
    if (showToast) showToast('সকল শিক্ষার্থীকে উপস্থিত হিসেবে চিহ্নিত করা হয়েছে');
  };

  const handleMarkAllTeachersPresent = () => {
    const updated = { ...teacherStatus };
    teachers.forEach(t => {
      updated[t.id] = { ...(updated[t.id] || {}), status: 'present' };
    });
    setTeacherStatus(updated);
    if (showToast) showToast('সকল শিক্ষককে উপস্থিত হিসেবে চিহ্নিত করা হয়েছে');
  };

  // Marks: { [studentId]: { marks: 85, note: 'সন্তোষজনক' } }
  const [studentMarks, setStudentMarks] = useState(() => {
    const map = {};
    (students || []).forEach((s, idx) => {
      map[s.id] = { marks: (80 + (idx % 18)).toString(), note: 'উত্তম' };
    });
    return map;
  });
  const targetStudent = students.find(s => s.id === individualStudentId) || students[0];

  const handleSaveStudentAttendance = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast(`${selectedJamat}-এর ${selectedDate} তারিখের উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে!`);
    } else {
      alert(`${selectedJamat}-এর ${selectedDate} তারিখের উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে!`);
    }
  };

  const handleSaveTeacherAttendance = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast(`শিক্ষকদের ${selectedDate} তারিখের উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে!`);
    } else {
      alert(`শিক্ষকদের ${selectedDate} তারিখের উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে!`);
    }
  };

  const handleSaveMarks = (e) => {
    e.preventDefault();
    alert(`${selectedJamat}-এর ${examSubject} বিষয়ের মার্কস সফলভাবে সংরক্ষিত হয়েছে!`);
  };

  return (
    <div className="container-fluid p-0">
      {/* ---------------- 1. STUDENT ATTENDANCE (/admin/attendance/student) ---------------- */}
      {activeMode === 'attendance-student' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-users me-2"></i> ছাত্র-ছাত্রী উপস্থিতি
            </h5>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveStudentAttendance}>
              <div className="row g-3 align-items-end mb-4">
                {/* Jamat List */}
                <div className="col-md-3 col-12">
                  <label htmlFor="jamat_select" className="form-label fw-bold">জামাত লিস্ট</label>
                  <select
                    id="jamat_select"
                    className="form-select"
                    value={selectedJamat}
                    onChange={(e) => setSelectedJamat(e.target.value)}
                    required
                  >
                    {jamats.map(j => (
                      <option key={j.id} value={j.name}>{j.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="col-md-3 col-12">
                  <label htmlFor="attendance_date" className="form-label fw-bold">তারিখ নির্বাচন করুন</label>
                  <input
                    type="date"
                    id="attendance_date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>

                {/* Live Student Search */}
                <div className="col-md-3 col-12">
                  <label htmlFor="attendance_search" className="form-label fw-bold text-primary">
                    <i className="fas fa-search me-1"></i> নাম বা রোল দিয়ে খুঁজুন
                  </label>
                  <input
                    type="text"
                    id="attendance_search"
                    className="form-control"
                    placeholder="নাম বা রোল লিখুন..."
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                  />
                </div>

                {/* Submit Filter & Quick Action */}
                <div className="col-md-3 col-12 d-flex gap-2">
                  <button
                    type="button"
                    onClick={handleMarkAllStudentsPresent}
                    className="btn btn-outline-primary fw-bold flex-grow-1"
                    title="এক ক্লিকে সকল শিক্ষার্থীকে উপস্থিত করুন"
                  >
                    <i className="fa-solid fa-check-double me-1"></i> সবাইকে উপস্থিত
                  </button>
                </div>
              </div>

              {/* Student Attendance Table (1:1 with madrasha.hostzonebd.com) */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '80px' }}>আইডি</th>
                      <th className="text-start">ছাত্রের নাম</th>
                      <th style={{ width: '380px' }}>উপস্থিতি</th>
                      <th>মন্তব্য করুন</th>
                      <th style={{ width: '160px' }}>অভিভাবকের ফোন নম্বর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJamatStudents.map((s, idx) => {
                      const entry = studentStatus[s.id] || { status: 'present', note: '' };
                      return (
                        <tr key={s.id}>
                          <td className="font-monospace fw-bold">{s.admissionNumber || s.roll || s.id}</td>
                          <td className="text-start fw-bold text-dark">{s.name}</td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-success fw-semibold">
                                <input
                                  type="radio"
                                  name={`status_${s.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'present'}
                                  onChange={() => setStudentStatus({
                                    ...studentStatus,
                                    [s.id]: { ...entry, status: 'present' }
                                  })}
                                />
                                উপস্থিত
                              </label>
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-danger fw-semibold">
                                <input
                                  type="radio"
                                  name={`status_${s.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'absent'}
                                  onChange={() => setStudentStatus({
                                    ...studentStatus,
                                    [s.id]: { ...entry, status: 'absent' }
                                  })}
                                />
                                অনুপস্থিত
                              </label>
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-warning fw-semibold">
                                <input
                                  type="radio"
                                  name={`status_${s.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'sick'}
                                  onChange={() => setStudentStatus({
                                    ...studentStatus,
                                    [s.id]: { ...entry, status: 'sick' }
                                  })}
                                />
                                অসুস্থ
                              </label>
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-secondary fw-semibold">
                                <input
                                  type="radio"
                                  name={`status_${s.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'leave'}
                                  onChange={() => setStudentStatus({
                                    ...studentStatus,
                                    [s.id]: { ...entry, status: 'leave' }
                                  })}
                                />
                                ছুটি
                              </label>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="মন্তব্য (ঐচ্ছিক)"
                              value={entry.note}
                              onChange={(e) => setStudentStatus({
                                ...studentStatus,
                                [s.id]: { ...entry, note: e.target.value }
                              })}
                            />
                          </td>
                          <td className="font-monospace text-muted">
                            {s.phone || s.guardianPhone || s.parentNumber || '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold shadow-sm">
                  <i className="fa-solid fa-save me-2"></i> উপস্থিতি সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- 2. STUDENT ATTENDANCE REPORT (/admin/attendance/student/report) ---------------- */}
      {activeMode === 'attendance-student-report' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-users me-2"></i> ছাত্র-ছাত্রী হাজিরা প্রতিবেদন
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-end g-3">
                <div className="col-md-4">
                  <label htmlFor="report_jamat_select" className="form-label fw-bold">জামাত লিস্ট</label>
                  <select
                    id="report_jamat_select"
                    className="form-select"
                    value={selectedJamat}
                    onChange={(e) => setSelectedJamat(e.target.value)}
                  >
                    {jamats.map(j => (
                      <option key={j.id} value={j.name}>{j.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="report_date_input" className="form-label fw-bold">তারিখ নির্বাচন করুন</label>
                  <input
                    type="date"
                    id="report_date_input"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-eye me-1"></i> ছাত্র/ছাত্রী দেখান
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                    ছাত্র-ছাত্রী হাজিরা প্রতিবেদন: {selectedJamat} ({selectedDate})
                  </h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>

              {/* Summary Table 1:1 with live site */}
              <div className="table-responsive mt-3 mb-4">
                <table className="table table-bordered text-center align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fw-bold">মোট ছাত্র</th>
                      <th className="fw-bold text-success">উপস্থিত</th>
                      <th className="fw-bold text-danger">অনুপস্থিত</th>
                      <th className="fw-bold text-warning">অসুস্থ</th>
                      <th className="fw-bold text-secondary">ছুটি</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fw-bold font-monospace fs-5">
                      <td>{currentJamatStudents.length}</td>
                      <td className="text-success">{currentJamatStudents.length}</td>
                      <td className="text-danger">০</td>
                      <td className="text-warning">০</td>
                      <td className="text-secondary">০</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Detailed Student Attendance Table */}
              <div className="table-responsive mt-2">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '80px' }}>আইডি</th>
                      <th className="text-start">ছাত্রের নাম</th>
                      <th style={{ width: '120px' }}>উপস্থিতি</th>
                      <th>মন্তব্য</th>
                      <th style={{ width: '160px' }}>অভিভাবকের ফোন নম্বর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJamatStudents.map((s) => {
                      const entry = studentStatus[s.id] || { status: 'present', note: '' };
                      return (
                        <tr key={s.id}>
                          <td className="font-monospace fw-bold">{s.admissionNumber || s.roll || s.id}</td>
                          <td className="text-start fw-bold text-dark">{s.name}</td>
                          <td>
                            {entry.status === 'present' && <span className="badge bg-success">উপস্থিত</span>}
                            {entry.status === 'absent' && <span className="badge bg-danger">অনুপস্থিত</span>}
                            {entry.status === 'sick' && <span className="badge bg-warning text-dark">অসুস্থ</span>}
                            {entry.status === 'leave' && <span className="badge bg-secondary">ছুটি</span>}
                          </td>
                          <td className="text-muted">{entry.note || '—'}</td>
                          <td className="font-monospace text-muted">
                            {s.phone || s.guardianPhone || s.parentNumber || '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button className="btn btn-primary fw-bold px-4" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. TEACHER ATTENDANCE (/admin/attendance/teacher) ---------------- */}
      {activeMode === 'attendance-teacher' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-users me-2"></i> শিক্ষকের উপস্থিতি
            </h5>
          </div>

          <div className="card-body">
            <form onSubmit={handleSaveTeacherAttendance}>
              <div className="row align-items-end mb-4">
                <div className="col-md-4 mb-3 mb-md-0">
                  <label htmlFor="attendance_date" className="form-label fw-bold">তারিখ নির্বাচন করুন</label>
                  <input
                    type="date"
                    id="attendance_date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4 d-flex gap-2">
                  <button type="button" className="btn btn-success fw-bold flex-grow-1">
                    <i className="fa-solid fa-eye me-1"></i> শিক্ষকদের দেখান
                  </button>
                  <button
                    type="button"
                    onClick={handleMarkAllTeachersPresent}
                    className="btn btn-outline-primary fw-bold"
                    title="এক ক্লিকে সকল শিক্ষককে উপস্থিত করুন"
                  >
                    <i className="fa-solid fa-check-double me-1"></i> সবাইকে উপস্থিত
                  </button>
                </div>
              </div>

              {/* Teacher Attendance Table (1:1 with madrasha.hostzonebd.com) */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '80px' }}>আইডি</th>
                      <th className="text-start">শিক্ষকের নাম</th>
                      <th style={{ width: '380px' }}>উপস্থিতি</th>
                      <th>মন্তব্য করুন</th>
                      <th style={{ width: '160px' }}>ফোন নম্বর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, idx) => {
                      const entry = teacherStatus[t.id] || { status: 'present', note: '' };
                      return (
                        <tr key={t.id}>
                          <td className="font-monospace fw-bold">{t.id}</td>
                          <td className="text-start fw-bold text-dark">
                            {t.name}
                            <span className="text-muted small d-block">{t.designation || 'সহকারী শিক্ষক'}</span>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-success fw-semibold">
                                <input
                                  type="radio"
                                  name={`tstatus_${t.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'present'}
                                  onChange={() => setTeacherStatus({
                                    ...teacherStatus,
                                    [t.id]: { ...entry, status: 'present' }
                                  })}
                                />
                                উপস্থিত
                              </label>
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-danger fw-semibold">
                                <input
                                  type="radio"
                                  name={`tstatus_${t.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'absent'}
                                  onChange={() => setTeacherStatus({
                                    ...teacherStatus,
                                    [t.id]: { ...entry, status: 'absent' }
                                  })}
                                />
                                অনুপস্থিত
                              </label>
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-warning fw-semibold">
                                <input
                                  type="radio"
                                  name={`tstatus_${t.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'sick'}
                                  onChange={() => setTeacherStatus({
                                    ...teacherStatus,
                                    [t.id]: { ...entry, status: 'sick' }
                                  })}
                                />
                                অসুস্থ
                              </label>
                              <label className="form-check-label d-flex align-items-center gap-1 cursor-pointer text-secondary fw-semibold">
                                <input
                                  type="radio"
                                  name={`tstatus_${t.id}`}
                                  className="form-check-input"
                                  checked={entry.status === 'leave'}
                                  onChange={() => setTeacherStatus({
                                    ...teacherStatus,
                                    [t.id]: { ...entry, status: 'leave' }
                                  })}
                                />
                                ছুটি
                              </label>
                            </div>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="মন্তব্য লিখুন"
                              value={entry.note}
                              onChange={(e) => setTeacherStatus({
                                ...teacherStatus,
                                [t.id]: { ...entry, note: e.target.value }
                              })}
                            />
                          </td>
                          <td className="font-monospace text-muted">
                            {t.phone || t.mobile || '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <button type="submit" className="btn btn-primary btn-lg px-5 fw-bold shadow-sm">
                  <i className="fa-solid fa-save me-2"></i> উপস্থিতি সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- 4. TEACHER ATTENDANCE REPORT (/admin/attendance/teacher/report) ---------------- */}
      {activeMode === 'attendance-teacher-report' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-users me-2"></i> শিক্ষক হাজিরা প্রতিবেদন
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-end g-3">
                <div className="col-md-8">
                  <label htmlFor="teacher_report_date" className="form-label fw-bold">তারিখ নির্বাচন করুন</label>
                  <input
                    type="date"
                    id="teacher_report_date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-search me-1"></i> প্রতিবেদন দেখান
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                    শিক্ষক হাজিরা প্রতিবেদন ({selectedDate})
                  </h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '60px' }}>নং</th>
                      <th className="text-start">শিক্ষকের নাম</th>
                      <th>উপস্থিত</th>
                      <th>অনুপস্থিত</th>
                      <th>অসুস্থ</th>
                      <th>ছুটি</th>
                      <th style={{ width: '200px' }}>মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, idx) => {
                      const entry = teacherStatus[t.id] || { status: 'present', note: '' };
                      return (
                        <tr key={t.id}>
                          <td>{idx + 1}</td>
                          <td className="text-start fw-bold text-dark">
                            {t.name}
                            <span className="text-muted small d-block">{t.designation || 'সহকারী শিক্ষক'}</span>
                          </td>
                          <td className="text-success fw-bold font-monospace">{entry.status === 'present' ? '১' : '০'}</td>
                          <td className="text-danger fw-bold font-monospace">{entry.status === 'absent' ? '১' : '০'}</td>
                          <td className="text-warning fw-bold font-monospace">{entry.status === 'sick' ? '১' : '০'}</td>
                          <td className="text-secondary fw-bold font-monospace">{entry.status === 'leave' ? '১' : '০'}</td>
                          <td className="text-muted">{entry.note || '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button className="btn btn-primary fw-bold px-4" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 5. RESULT CREATE / MARK ENTRY (/admin/result/create) ---------------- */}
      {activeMode === 'result-create' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-clipboard-list me-2"></i> মার্কস এন্ট্রি/আপডেট
            </h5>
          </div>

          <form onSubmit={handleSaveMarks}>
            <div className="card-body">
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <label className="form-label fw-bold">জামাত নির্বাচন</label>
                  <select
                    className="form-select"
                    value={selectedJamat}
                    onChange={(e) => setSelectedJamat(e.target.value)}
                  >
                    {jamats.map(j => (
                      <option key={j.id} value={j.name}>{j.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">পরীক্ষার নাম</label>
                  <select
                    className="form-select"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                  >
                    <option value="বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬">বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬</option>
                    <option value="অর্ধ-বার্ষিক পরীক্ষা ২০২৬">অর্ধ-বার্ষিক পরীক্ষা ২০২৬</option>
                    <option value="১ম সাময়িক পরীক্ষা ২০২৬">১ম সাময়িক পরীক্ষা ২০২৬</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-bold">বিষয়</label>
                  <input
                    type="text"
                    className="form-control"
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value)}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '60px' }}>নং</th>
                      <th style={{ width: '120px' }}>রোল নম্বর</th>
                      <th className="text-start">ছাত্রের নাম</th>
                      <th style={{ width: '160px' }}>প্রাপ্ত নম্বর (১০০)</th>
                      <th style={{ width: '220px' }}>মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJamatStudents.map((s, idx) => {
                      const entry = studentMarks[s.id] || { marks: '85', note: 'উত্তম' };
                      return (
                        <tr key={s.id}>
                          <td>{idx + 1}</td>
                          <td className="font-monospace">{s.roll || s.admissionNumber || s.id}</td>
                          <td className="text-start fw-bold">{s.name}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control text-center font-monospace"
                              value={entry.marks}
                              onChange={(e) => setStudentMarks({
                                ...studentMarks,
                                [s.id]: { ...entry, marks: e.target.value }
                              })}
                              max="100"
                              min="0"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={entry.note}
                              onChange={(e) => setStudentMarks({
                                ...studentMarks,
                                [s.id]: { ...entry, note: e.target.value }
                              })}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-success btn-lg px-4 fw-bold">
                  <i className="fa-solid fa-save me-2"></i> মার্কস সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- 6. RESULT SHEET (/admin/result/result/sheet) ---------------- */}
      {activeMode === 'result-sheet' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-file-invoice me-2"></i> রেজাল্ট শীট (ব্রডশীট)
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-end g-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">জামাত</label>
                  <select
                    className="form-select"
                    value={selectedJamat}
                    onChange={(e) => setSelectedJamat(e.target.value)}
                  >
                    {jamats.map(j => (
                      <option key={j.id} value={j.name}>{j.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">পরীক্ষা</label>
                  <select
                    className="form-select"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                  >
                    <option value="বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬">বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬</option>
                    <option value="অর্ধ-বার্ষিক পরীক্ষা ২০২৬">অর্ধ-বার্ষিক পরীক্ষা ২০২৬</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-search me-1"></i> শীট দেখুন
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                    {examName} - ব্রডশীট ফলাফল ({selectedJamat})
                  </h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '50px' }}>মেধাক্রম</th>
                      <th style={{ width: '80px' }}>রোল</th>
                      <th className="text-start">ছাত্রের নাম</th>
                      <th>কুরআন হিফজ</th>
                      <th>তাজবীদ</th>
                      <th>হাদিস ও দুআ</th>
                      <th>মোট নম্বর</th>
                      <th>জিপিএ</th>
                      <th>গ্রেড</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJamatStudents.map((s, idx) => {
                      const total = 260 + (idx % 35);
                      return (
                        <tr key={s.id}>
                          <td className="fw-bold">{idx + 1}</td>
                          <td className="font-monospace">{s.roll || s.admissionNumber || s.id}</td>
                          <td className="text-start fw-bold">{s.name}</td>
                          <td className="font-monospace">৯২</td>
                          <td className="font-monospace">৮৮</td>
                          <td className="font-monospace">৮৫</td>
                          <td className="font-monospace fw-bold text-primary">{total}</td>
                          <td className="font-monospace fw-bold text-success">৫.০০</td>
                          <td><span className="badge bg-success">A+</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 7. RESULT STUDENT (/admin/result/result/student) ---------------- */}
      {activeMode === 'result-student' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-user-graduate me-2"></i> ছাত্র-ছাত্রী ভিত্তিক রেজাল্ট
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-end g-3">
                <div className="col-md-4">
                  <label htmlFor="result_jamat_select" className="form-label fw-bold">জামাত</label>
                  <select
                    id="result_jamat_select"
                    className="form-select"
                    value={selectedResultJamat}
                    onChange={(e) => {
                      setSelectedResultJamat(e.target.value);
                      const firstOfJamat = students.find(s => e.target.value === 'all' || s.jamat === e.target.value);
                      if (firstOfJamat) setIndividualStudentId(firstOfJamat.id);
                    }}
                  >
                    <option value="all">সকল জামাত</option>
                    {(jamats || []).map(j => (
                      <option key={j.id || j.name} value={j.name}>{j.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-5">
                  <label className="form-label fw-bold">ছাত্র নির্বাচন করুন</label>
                  <select
                    className="form-select"
                    value={individualStudentId}
                    onChange={(e) => setIndividualStudentId(e.target.value)}
                  >
                    {filteredResultStudents.map(s => (
                      <option key={s.id} value={s.id}>{s.name} - রোল: {s.roll || s.admissionNumber || s.id}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 text-end">
                  <button type="button" className="btn btn-success fw-bold px-4 w-100">
                    <i className="fa-solid fa-eye me-1"></i> নম্বরপত্র দেখুন
                  </button>
                </div>
              </div>
            </div>
          </div>

          {targetStudent && (
            <div className="card border-0 shadow-sm mb-4" id="printContent">
              <div className="card-body py-4">
                <img
                  src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                  alt="Banner"
                  className="w-100 img-fluid rounded"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="text-center mt-3">
                  <h4 className="fw-bold" style={{ color: '#2c5f2d' }}>একাডেমিক নম্বরপত্র (TRANSCRIPT)</h4>
                  <p className="text-muted">{examName}</p>
                </div>

                <div className="bg-light p-3 rounded mb-3">
                  <div className="row g-2">
                    <div className="col-md-6">
                      <p className="mb-1"><strong>শিক্ষার্থীর নাম:</strong> {targetStudent.name}</p>
                      <p className="mb-1"><strong>পিতার নাম:</strong> {targetStudent.fatherName || 'আব্দুল করিম'}</p>
                      <p className="mb-0"><strong>জামাত:</strong> {targetStudent.jamat}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>ভর্তি / রোল নং:</strong> {targetStudent.roll || targetStudent.admissionNumber || targetStudent.id}</p>
                      <p className="mb-1"><strong>শাখা:</strong> ক</p>
                      <p className="mb-0"><strong>শিক্ষাবর্ষ:</strong> ২০২৬ ইং</p>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered table-striped align-middle mb-0 text-center">
                    <thead className="bg-primary print-thead text-white">
                      <tr>
                        <th>নং</th>
                        <th className="text-start">বিষয়</th>
                        <th>পূর্ণমান</th>
                        <th>প্রাপ্ত নম্বর</th>
                        <th>গ্রেড পয়েন্ট</th>
                        <th>লেটার গ্রেড</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>১</td>
                        <td className="text-start fw-bold">কুরআন হিফজ ও তাজবীদ</td>
                        <td>১০০</td>
                        <td className="font-monospace fw-bold">৯৫</td>
                        <td className="font-monospace">৫.০০</td>
                        <td><span className="badge bg-success">A+</span></td>
                      </tr>
                      <tr>
                        <td>২</td>
                        <td className="text-start fw-bold">মাসআলা ও আহকাম</td>
                        <td>১০০</td>
                        <td className="font-monospace fw-bold">৮৮</td>
                        <td className="font-monospace">৪.০০</td>
                        <td><span className="badge bg-success">A</span></td>
                      </tr>
                      <tr>
                        <td>৩</td>
                        <td className="text-start fw-bold">আরবি ভাষা ও ব্যাকরণ</td>
                        <td>১০০</td>
                        <td className="font-monospace fw-bold">৯২</td>
                        <td className="font-monospace">৫.০০</td>
                        <td><span className="badge bg-success">A+</span></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-light fw-bold">
                        <td colSpan="3" className="text-end">সর্বমোট জিপিএ:</td>
                        <td colSpan="3" className="text-start font-monospace text-success fs-5">৫.০০ (A+) - উত্তীর্ণ</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-5 pt-4 d-flex justify-content-between text-center">
                  <div>
                    <hr style={{ width: '150px' }} />
                    <p className="mb-0 fw-semibold">অভিভাবকের স্বাক্ষর</p>
                  </div>
                  <div>
                    <hr style={{ width: '150px' }} />
                    <p className="mb-0 fw-semibold">শ্রেণি শিক্ষকের স্বাক্ষর</p>
                  </div>
                  <div>
                    <hr style={{ width: '150px' }} />
                    <p className="mb-0 fw-semibold">মুহতামিম / অধ্যক্ষ</p>
                  </div>
                </div>

                <div className="mt-4 text-end no-print">
                  <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                    <i className="fa-solid fa-print me-1"></i> নম্বরপত্র প্রিন্ট করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
