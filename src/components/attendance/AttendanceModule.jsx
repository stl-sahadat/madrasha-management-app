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
  const [individualStudentId, setIndividualStudentId] = useState(students?.[0]?.id || '');

  // Student Attendance: { [studentId]: 'present' | 'absent' | 'leave' }
  const [studentStatus, setStudentStatus] = useState(() => {
    const map = {};
    (students || []).forEach(s => {
      map[s.id] = { status: 'present', note: '' };
    });
    return map;
  });

  // Teacher Attendance: { [teacherId]: { status: 'present' | 'absent' | 'leave', inTime: '08:30 AM', outTime: '04:30 PM', note: '' } }
  const [teacherStatus, setTeacherStatus] = useState(() => {
    const map = {};
    (teachers || []).forEach(t => {
      map[t.id] = { status: 'present', inTime: '08:30 AM', outTime: '04:30 PM', note: '' };
    });
    return map;
  });

  // Marks: { [studentId]: { marks: 85, note: 'সন্তোষজনক' } }
  const [studentMarks, setStudentMarks] = useState(() => {
    const map = {};
    (students || []).forEach((s, idx) => {
      map[s.id] = { marks: (80 + (idx % 18)).toString(), note: 'উত্তম' };
    });
    return map;
  });

  // Filtered Students
  const currentJamatStudents = students.filter(s => s.jamat === selectedJamat);
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
              <div className="row align-items-end mb-4">
                {/* Jamat List */}
                <div className="col-md-4 mb-3 mb-md-0">
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

                {/* Submit Filter */}
                <div className="col-md-4">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-eye me-1"></i> ছাত্র/ছাত্রী দেখান ({currentJamatStudents.length} জন)
                  </button>
                </div>
              </div>

              {/* Student Attendance Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '60px' }}>নং</th>
                      <th style={{ width: '100px' }}>রোল / আইডি</th>
                      <th className="text-start">ছাত্রের নাম</th>
                      <th style={{ width: '100px' }}>উপস্থিত</th>
                      <th style={{ width: '100px' }}>অনুপস্থিত</th>
                      <th style={{ width: '100px' }}>ছুটি</th>
                      <th style={{ width: '220px' }}>মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJamatStudents.map((s, idx) => {
                      const entry = studentStatus[s.id] || { status: 'present', note: '' };
                      return (
                        <tr key={s.id}>
                          <td>{idx + 1}</td>
                          <td className="font-monospace">{s.roll || s.admissionNumber || s.id}</td>
                          <td className="text-start fw-bold">{s.name}</td>
                          <td>
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
                          </td>
                          <td>
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
                          </td>
                          <td>
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
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="মন্তব্য (ঐচ্ছিক)"
                              value={entry.note}
                              onChange={(e) => setStudentStatus({
                                ...studentStatus,
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
                <button type="submit" className="btn btn-primary btn-lg px-4 fw-bold">
                  <i className="fa-solid fa-save me-2"></i> হাজিরা সংরক্ষণ করুন
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
                <div className="col-md-3">
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
                <div className="col-md-3">
                  <label className="form-label fw-bold">মাস</label>
                  <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={(idx + 1).toString()}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-bold">সাল</label>
                  <select
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখুন
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
                    ছাত্র-ছাত্রী মাসিক হাজিরা প্রতিবেদন: {selectedJamat} (মাসঃ অক্টোবর ২০২৬)
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
                      <th style={{ width: '50px' }}>নং</th>
                      <th>রোল</th>
                      <th className="text-start">নাম</th>
                      <th>মোট কর্মদিবস</th>
                      <th>উপস্থিতি</th>
                      <th>অনুপস্থিতি</th>
                      <th>ছুটি</th>
                      <th>শতকরা হার</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJamatStudents.map((s, idx) => (
                      <tr key={s.id}>
                        <td>{idx + 1}</td>
                        <td className="font-monospace">{s.roll || s.admissionNumber || s.id}</td>
                        <td className="text-start fw-bold">{s.name}</td>
                        <td>২৬ দিন</td>
                        <td className="text-success fw-bold font-monospace">২৪ দিন</td>
                        <td className="text-danger font-monospace">২ দিন</td>
                        <td className="text-muted font-monospace">০ দিন</td>
                        <td className="fw-bold font-monospace text-primary">৯২.৩%</td>
                      </tr>
                    ))}
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

                <div className="col-md-4">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-eye me-1"></i> শিক্ষকদের দেখান ({teachers.length} জন)
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '60px' }}>নং</th>
                      <th className="text-start">শিক্ষকের নাম ও পদবি</th>
                      <th style={{ width: '100px' }}>উপস্থিত</th>
                      <th style={{ width: '100px' }}>অনুপস্থিত</th>
                      <th style={{ width: '100px' }}>ছুটি</th>
                      <th style={{ width: '140px' }}>আসার সময়</th>
                      <th style={{ width: '140px' }}>যাওয়ার সময়</th>
                      <th style={{ width: '200px' }}>মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, idx) => {
                      const entry = teacherStatus[t.id] || { status: 'present', inTime: '08:30 AM', outTime: '04:30 PM', note: '' };
                      return (
                        <tr key={t.id}>
                          <td>{idx + 1}</td>
                          <td className="text-start fw-bold">
                            {t.name}
                            <span className="text-muted small d-block">{t.designation || 'সহকারী শিক্ষক'}</span>
                          </td>
                          <td>
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
                          </td>
                          <td>
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
                          </td>
                          <td>
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
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center"
                              value={entry.inTime}
                              onChange={(e) => setTeacherStatus({
                                ...teacherStatus,
                                [t.id]: { ...entry, inTime: e.target.value }
                              })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center"
                              value={entry.outTime}
                              onChange={(e) => setTeacherStatus({
                                ...teacherStatus,
                                [t.id]: { ...entry, outTime: e.target.value }
                              })}
                            />
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary btn-lg px-4 fw-bold">
                  <i className="fa-solid fa-save me-2"></i> শিক্ষক হাজিরা সংরক্ষণ করুন
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
                <i className="fa-solid fa-users me-2"></i> শিক্ষক হাজিরা রিপোর্ট
              </h5>
            </div>
            <div className="card-body">
              <div className="row align-items-end g-3">
                <div className="col-md-4">
                  <label className="form-label fw-bold">মাস</label>
                  <select
                    className="form-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={(idx + 1).toString()}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">সাল</label>
                  <select
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখুন
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
                    শিক্ষকগণের মাসিক হাজিরা ও সময়সূচী প্রতিবেদন (অক্টোবর ২০২৬)
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
                      <th style={{ width: '50px' }}>নং</th>
                      <th className="text-start">নাম</th>
                      <th>পদবী</th>
                      <th>মোট কার্যদিবস</th>
                      <th>উপস্থিতি</th>
                      <th>অনুপস্থিতি</th>
                      <th>দেরীতে আগমন</th>
                      <th>গড় উপস্থিতির হার</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, idx) => (
                      <tr key={t.id}>
                        <td>{idx + 1}</td>
                        <td className="text-start fw-bold">{t.name}</td>
                        <td>{t.designation || 'সহকারী শিক্ষক'}</td>
                        <td>২৬ দিন</td>
                        <td className="text-success fw-bold">২৬ দিন</td>
                        <td className="text-muted">০ দিন</td>
                        <td className="text-warning">১ দিন</td>
                        <td className="fw-bold text-primary font-monospace">১০০%</td>
                      </tr>
                    ))}
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
                <div className="col-md-6">
                  <label className="form-label fw-bold">ছাত্র নির্বাচন করুন</label>
                  <select
                    className="form-select"
                    value={individualStudentId}
                    onChange={(e) => setIndividualStudentId(e.target.value)}
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (রোল: {s.roll || s.admissionNumber || s.id}, জামাত: {s.jamat})</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 text-end">
                  <button type="button" className="btn btn-success fw-bold px-4">
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
