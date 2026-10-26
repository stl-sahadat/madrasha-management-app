import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  Award,
  Layers,
  Search,
  BookOpen,
  Users,
  FileSpreadsheet,
  Save,
  Check,
  AlertCircle,
  UserCheck,
  TrendingUp,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttendanceModule = ({ defaultMode = 'attendance-student' }) => {
  const { students, teachers, jamats, profile, showToast } = useApp();

  // Mode: 'attendance-student', 'attendance-student-report', 'attendance-teacher', 'attendance-teacher-report', 'result-create', 'result-sheet', 'result-student'
  const [activeMode, setActiveMode] = useState(defaultMode);

  // Common filters
  const [selectedJamat, setSelectedJamat] = useState(jamats[0]?.name || 'হিফজ বিভাগ');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState('অক্টোবর');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Exam filters
  const [selectedExam, setSelectedExam] = useState('বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬');
  const [selectedSubject, setSelectedSubject] = useState('কুরআন হিফজ ও তাজবীদ');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  // Student Attendance Records: { studentId: 'present' | 'absent' | 'late' }
  const [studentAttendance, setStudentAttendance] = useState(() => {
    return students.reduce((acc, s) => ({ ...acc, [s.id]: 'present' }), {});
  });

  // Teacher Attendance Records: { teacherId: { status: 'present' | 'absent' | 'leave', inTime: '08:30 AM', note: '' } }
  const [teacherAttendance, setTeacherAttendance] = useState(() => {
    return teachers.reduce((acc, t) => ({
      ...acc,
      [t.id]: { status: 'present', inTime: '08:30 AM', note: '' }
    }), {});
  });

  // Exam Marks Storage: { [studentId]: { marks: number, note: string } }
  const [examMarks, setExamMarks] = useState(() => {
    const initial = {};
    students.forEach((s, idx) => {
      // Deterministic realistic marks
      const base = 85 + (idx % 12);
      initial[s.id] = { marks: Math.min(base, 98), note: 'সন্তোষজনক' };
    });
    return initial;
  });

  // Filter students by selected Jamat
  const currentJamatStudents = students.filter(s => s.jamat === selectedJamat);
  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Handlers for Student Attendance
  const handleStudentStatusChange = (studentId, status) => {
    setStudentAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllStudentsPresent = () => {
    const updated = { ...studentAttendance };
    currentJamatStudents.forEach(s => {
      updated[s.id] = 'present';
    });
    setStudentAttendance(updated);
    showToast('নির্বাচিত জামাতের সকল ছাত্রকে উপস্থিত হিসেবে চিহ্নিত করা হয়েছে');
  };

  const handleSaveStudentAttendance = () => {
    showToast(`${selectedJamat}-এর ${date} তারিখের হাজিরা সফলভাবে সংরক্ষিত হয়েছে!`);
  };

  // Handlers for Teacher Attendance
  const handleTeacherStatusChange = (teacherId, status) => {
    setTeacherAttendance(prev => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], status }
    }));
  };

  const handleTeacherInTimeChange = (teacherId, inTime) => {
    setTeacherAttendance(prev => ({
      ...prev,
      [teacherId]: { ...prev[teacherId], inTime }
    }));
  };

  const handleMarkAllTeachersPresent = () => {
    const updated = { ...teacherAttendance };
    teachers.forEach(t => {
      updated[t.id] = { status: 'present', inTime: '08:30 AM', note: '' };
    });
    setTeacherAttendance(updated);
    showToast('সকল শিক্ষককে উপস্থিত চিহ্নিত করা হয়েছে');
  };

  const handleSaveTeacherAttendance = () => {
    showToast(`${date} তারিখের শিক্ষক হাজিরা রেজিস্টার সফলভাবে সংরক্ষিত হয়েছে!`);
  };

  // Handlers for Exam Marks
  const handleMarksChange = (studentId, marks) => {
    setExamMarks(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], marks: Number(marks) || 0 }
    }));
  };

  const handleSaveExamMarks = (e) => {
    e.preventDefault();
    showToast(`${selectedJamat}-এর ${selectedSubject} বিষয়ের নম্বর সফলভাবে সংরক্ষণ ও আপডেট করা হয়েছে!`);
  };

  // Helper for letter grade and points
  const getGradeInfo = (marks) => {
    if (marks >= 80) return { grade: 'মুমতাজ (A+)', gpa: '5.00', color: 'emerald' };
    if (marks >= 70) return { grade: 'জাইয়্যিদ জিদ্দান (A)', gpa: '4.00', color: 'blue' };
    if (marks >= 60) return { grade: 'জাইয়্যিদ (B)', gpa: '3.00', color: 'cyan' };
    if (marks >= 50) return { grade: 'মাকবুল (C)', gpa: '2.00', color: 'amber' };
    if (marks >= 33) return { grade: 'মাকবুল (D)', gpa: '1.00', color: 'orange' };
    return { grade: 'রাসিব (F)', gpa: '0.00', color: 'rose' };
  };

  // Student Attendance Stats
  const studentPresentCount = currentJamatStudents.filter(s => studentAttendance[s.id] === 'present').length;
  const studentAbsentCount = currentJamatStudents.filter(s => studentAttendance[s.id] === 'absent').length;
  const studentLateCount = currentJamatStudents.filter(s => studentAttendance[s.id] === 'late').length;

  // Teacher Attendance Stats
  const teacherPresentCount = teachers.filter(t => teacherAttendance[t.id]?.status === 'present').length;
  const teacherAbsentCount = teachers.filter(t => teacherAttendance[t.id]?.status === 'absent').length;
  const teacherLeaveCount = teachers.filter(t => teacherAttendance[t.id]?.status === 'leave').length;

  return (
    <div className="space-y-6">
      {/* Navigation Pills Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <CalendarCheck className="w-6 h-6 text-[#0f626a]" />
            <span>
              {activeMode.startsWith('attendance-student') && 'ছাত্র-ছাত্রী হাজিরা রেজিস্টার ও প্রতিবেদন'}
              {activeMode.startsWith('attendance-teacher') && 'শিক্ষক হাজিরা রেজিস্টার ও মাসিক প্রতিবেদন'}
              {activeMode.startsWith('result') && 'পরীক্ষা মূল্যায়ন, নম্বরপত্র ও মেধা তালিকা'}
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            দৈনিক উপস্থিতি ট্র্যাকিং, বার্ষিক ব্রডশিট এবং অফিশিয়াল ফলাফল মূল্যায়ন
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1.5 rounded-xl text-xs font-bold">
          {activeMode.startsWith('attendance') ? (
            <>
              <button
                onClick={() => setActiveMode('attendance-student')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'attendance-student' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                ছাত্র হাজিরা খাতা
              </button>
              <button
                onClick={() => setActiveMode('attendance-student-report')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'attendance-student-report' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                ছাত্র হাজিরা প্রতিবেদন
              </button>
              <button
                onClick={() => setActiveMode('attendance-teacher')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'attendance-teacher' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                শিক্ষক হাজিরা খাতা
              </button>
              <button
                onClick={() => setActiveMode('attendance-teacher-report')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'attendance-teacher-report' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                শিক্ষক হাজিরা রিপোর্ট
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveMode('result-create')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'result-create' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                মার্কস এন্ট্রি/আপডেট
              </button>
              <button
                onClick={() => setActiveMode('result-sheet')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'result-sheet' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                রেজাল্ট ব্রডশিট
              </button>
              <button
                onClick={() => setActiveMode('result-student')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeMode === 'result-student' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
                }`}
              >
                ছাত্রভিত্তিক নম্বরপত্র
              </button>
            </>
          )}
        </div>
      </div>

      {/* ---------------- 1. STUDENT DAILY ATTENDANCE ---------------- */}
      {activeMode === 'attendance-student' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">জামাত নির্বাচন:</label>
                <select
                  value={selectedJamat}
                  onChange={(e) => setSelectedJamat(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {jamats.map(j => (
                    <option key={j.id} value={j.name}>{j.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">হাজিরার তারিখ:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkAllStudentsPresent}
                className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold rounded-xl transition flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>সবাইকে উপস্থিত করুন</span>
              </button>
              <button
                onClick={handleSaveStudentAttendance}
                className="px-3.5 py-1.5 bg-[#0f626a] hover:bg-[#0c5259] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>হাজিরা সংরক্ষণ</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-center">
              <span className="text-xs font-semibold text-emerald-700">উপস্থিত ছাত্র</span>
              <p className="text-2xl font-bold font-mono text-emerald-800 mt-0.5">{studentPresentCount} জন</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl text-center">
              <span className="text-xs font-semibold text-rose-700">অনুপস্থিত ছাত্র</span>
              <p className="text-2xl font-bold font-mono text-rose-800 mt-0.5">{studentAbsentCount} জন</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-center">
              <span className="text-xs font-semibold text-amber-700">দেরি (Late)</span>
              <p className="text-2xl font-bold font-mono text-amber-800 mt-0.5">{studentLateCount} জন</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f0f9fa] text-gray-800 font-bold border-b border-[#e2e8f0]">
                  <tr>
                    <th className="py-3 px-4">রোল</th>
                    <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                    <th className="py-3 px-4">পিতার নাম</th>
                    <th className="py-3 px-4">অভিভাবক মোবাঃ</th>
                    <th className="py-3 px-4 text-center">উপস্থিতি স্থিতি</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentJamatStudents.map(student => {
                    const status = studentAttendance[student.id] || 'present';
                    return (
                      <tr key={student.id} className="hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-[#0f626a]">{student.roll}</td>
                        <td className="py-3 px-4 font-bold text-gray-800">{student.name}</td>
                        <td className="py-3 px-4 text-gray-600">{student.fatherName || 'মাওলানা ইউনুস'}</td>
                        <td className="py-3 px-4 font-mono text-gray-500">{student.guardianPhone}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => handleStudentStatusChange(student.id, 'present')}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                                status === 'present' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              উপস্থিত
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStudentStatusChange(student.id, 'absent')}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                                status === 'absent' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              অনুপস্থিত
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStudentStatusChange(student.id, 'late')}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                                status === 'late' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              দেরি
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. STUDENT ATTENDANCE REPORT ---------------- */}
      {activeMode === 'attendance-student-report' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">জামাত নির্বাচন:</label>
                <select
                  value={selectedJamat}
                  onChange={(e) => setSelectedJamat(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {jamats.map(j => (
                    <option key={j.id} value={j.name}>{j.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">মাস:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">সন:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold"
                >
                  <option value="2026">২০২৬</option>
                  <option value="2025">২০২৫</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>রিপোর্ট প্রিন্ট করুন</span>
              </button>
            </div>
          </div>

          {/* Report Summary Header */}
          <div className="bg-gradient-to-r from-[#0f626a] to-[#082f32] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-teal-200 text-xs font-semibold uppercase tracking-wider">মাসিক উপস্থিতি প্রতিবেদন</span>
              <h3 className="text-lg font-bold mt-0.5">{selectedJamat} - {selectedMonth} {selectedYear}</h3>
              <p className="text-xs text-teal-100">মোট শিক্ষার্থী: {currentJamatStudents.length} জন | মোট কার্যদিবস: ২৬ দিন</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/20 text-center">
                <span className="block text-[10px] text-teal-200">গড় উপস্থিতি</span>
                <span className="font-bold text-sm font-mono">৯২.৪%</span>
              </div>
              <div className="bg-white/10 px-3.5 py-2 rounded-xl border border-white/20 text-center">
                <span className="block text-[10px] text-teal-200">শতভাগ উপস্থিতি</span>
                <span className="font-bold text-sm font-mono">৮ জন</span>
              </div>
            </div>
          </div>

          {/* Monthly Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f0f9fa] text-gray-800 font-bold border-b border-[#e2e8f0]">
                  <tr>
                    <th className="py-3 px-4">ক্রমিক</th>
                    <th className="py-3 px-4">রোল</th>
                    <th className="py-3 px-4">শিক্ষার্থীর নাম</th>
                    <th className="py-3 px-4 text-center">মোট কার্যদিবস</th>
                    <th className="py-3 px-4 text-center">উপস্থিত দিন</th>
                    <th className="py-3 px-4 text-center">অনুপস্থিত দিন</th>
                    <th className="py-3 px-4 text-center">উপস্থিতি হার (%)</th>
                    <th className="py-3 px-4 text-center">মন্তব্য</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentJamatStudents.map((student, idx) => {
                    const workingDays = 26;
                    const absentDays = idx % 4;
                    const presentDays = workingDays - absentDays;
                    const rate = Math.round((presentDays / workingDays) * 100);
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-gray-500">{idx + 1}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#0f626a]">{student.roll}</td>
                        <td className="py-3 px-4 font-bold text-gray-800">{student.name}</td>
                        <td className="py-3 px-4 text-center font-mono">{workingDays}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">{presentDays}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-rose-600">{absentDays}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            rate >= 90 ? 'bg-emerald-100 text-emerald-800' :
                            rate >= 75 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {rate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {rate >= 90 ? <span className="text-emerald-700 font-semibold">নিয়মিত</span> : <span className="text-amber-700 font-semibold">সতর্কীকরণ</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. TEACHER DAILY ATTENDANCE ---------------- */}
      {activeMode === 'attendance-teacher' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">তারিখ নির্বাচন:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleMarkAllTeachersPresent}
                className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold rounded-xl transition flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>সকলকে উপস্থিত করুন</span>
              </button>
              <button
                onClick={handleSaveTeacherAttendance}
                className="px-3.5 py-1.5 bg-[#0f626a] hover:bg-[#0c5259] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>সংরক্ষণ করুন</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-center">
              <span className="text-xs font-semibold text-emerald-700">উপস্থিত শিক্ষক</span>
              <p className="text-2xl font-bold font-mono text-emerald-800 mt-0.5">{teacherPresentCount} জন</p>
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl text-center">
              <span className="text-xs font-semibold text-rose-700">অনুপস্থিত শিক্ষক</span>
              <p className="text-2xl font-bold font-mono text-rose-800 mt-0.5">{teacherAbsentCount} জন</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-center">
              <span className="text-xs font-semibold text-amber-700">ছুটি (Leave)</span>
              <p className="text-2xl font-bold font-mono text-amber-800 mt-0.5">{teacherLeaveCount} জন</p>
            </div>
          </div>

          {/* Teachers Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f0f9fa] text-gray-800 font-bold border-b border-[#e2e8f0]">
                  <tr>
                    <th className="py-3 px-4">শিক্ষকের নাম ও পদবি</th>
                    <th className="py-3 px-4">মোবাইল</th>
                    <th className="py-3 px-4">ইন-টাইম (আগমন)</th>
                    <th className="py-3 px-4 text-center">উপস্থিতি স্থিতি</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teachers.map(teacher => {
                    const record = teacherAttendance[teacher.id] || { status: 'present', inTime: '08:30 AM' };
                    return (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-800">{teacher.name}</div>
                          <div className="text-[11px] text-gray-500">{teacher.designation} • {teacher.department || 'সাধারণ বিভাগ'}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-600">{teacher.mobile}</td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={record.inTime}
                            onChange={(e) => handleTeacherInTimeChange(teacher.id, e.target.value)}
                            className="px-2.5 py-1 border rounded-lg text-xs font-mono w-28 bg-gray-50"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center space-x-1 bg-gray-100 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => handleTeacherStatusChange(teacher.id, 'present')}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                                record.status === 'present' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              উপস্থিত
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTeacherStatusChange(teacher.id, 'absent')}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                                record.status === 'absent' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              অনুপস্থিত
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTeacherStatusChange(teacher.id, 'leave')}
                              className={`px-3 py-1 rounded-lg font-bold text-xs transition ${
                                record.status === 'leave' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              ছুটি
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 4. TEACHER ATTENDANCE REPORT ---------------- */}
      {activeMode === 'attendance-teacher-report' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">মাস:</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">সন:</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold"
                >
                  <option value="2026">২০২৬</option>
                  <option value="2025">২০২৫</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>রিপোর্ট প্রিন্ট করুন</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#f0f9fa] border-b border-[#e2e8f0]">
              <h3 className="font-bold text-sm text-[#082f32]">শিক্ষকগণের মাসিক হাজিরা খতিয়ান - {selectedMonth} {selectedYear}</h3>
              <p className="text-xs text-gray-500">মোট শিক্ষক: {teachers.length} জন | মোট কার্যদিবস: ২৬ দিন</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-800 font-bold border-b">
                  <tr>
                    <th className="py-3 px-4">ক্রমিক</th>
                    <th className="py-3 px-4">শিক্ষকের নাম</th>
                    <th className="py-3 px-4">পদবি</th>
                    <th className="py-3 px-4 text-center">কার্যদিবস</th>
                    <th className="py-3 px-4 text-center">উপস্থিত দিন</th>
                    <th className="py-3 px-4 text-center">অনুপস্থিত</th>
                    <th className="py-3 px-4 text-center">ছুটি ভোগ</th>
                    <th className="py-3 px-4 text-center">উপস্থিতি হার (%)</th>
                    <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teachers.map((teacher, idx) => {
                    const workingDays = 26;
                    const leaveDays = idx % 2 === 0 ? 1 : 0;
                    const absentDays = idx % 3 === 0 ? 1 : 0;
                    const presentDays = workingDays - (leaveDays + absentDays);
                    const rate = Math.round((presentDays / workingDays) * 100);
                    return (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-gray-500">{idx + 1}</td>
                        <td className="py-3 px-4 font-bold text-gray-800">{teacher.name}</td>
                        <td className="py-3 px-4 text-gray-600">{teacher.designation}</td>
                        <td className="py-3 px-4 text-center font-mono">{workingDays}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">{presentDays}</td>
                        <td className="py-3 px-4 text-center font-mono text-rose-600 font-bold">{absentDays}</td>
                        <td className="py-3 px-4 text-center font-mono text-amber-600 font-bold">{leaveDays}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">
                            {rate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-emerald-700 font-bold">অনুমোদিত</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 5. EXAM MARKS ENTRY / UPDATE (result-create) ---------------- */}
      {activeMode === 'result-create' && (
        <form onSubmit={handleSaveExamMarks} className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b gap-3">
              <div>
                <h3 className="font-bold text-sm text-[#082f32]">পরীক্ষার নম্বর এন্ট্রি ও আপডেট ফরম</h3>
                <p className="text-xs text-gray-500 mt-0.5">জামাত ও বিষয় নির্বাচন করে প্রতিটি শিক্ষার্থীর প্রাপ্ত নম্বর লিপিবদ্ধ করুন</p>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0f626a] hover:bg-[#0c5259] text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1.5 self-start sm:self-auto"
              >
                <Save className="w-4 h-4" />
                <span>সকল নম্বর সংরক্ষণ করুন</span>
              </button>
            </div>

            {/* Selectors Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">পরীক্ষার নাম:</label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  <option value="বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬">বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬</option>
                  <option value="অর্ধবার্ষিক পরীক্ষা ২০২৬">অর্ধবার্ষিক পরীক্ষা ২০২৬</option>
                  <option value="১ম সাময়িক পরীক্ষা ২০২৬">১ম সাময়িক পরীক্ষা ২০২৬</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">জামাত নির্বাচন:</label>
                <select
                  value={selectedJamat}
                  onChange={(e) => setSelectedJamat(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {jamats.map(j => (
                    <option key={j.id} value={j.name}>{j.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">বিষয় নির্বাচন:</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  <option value="কুরআন হিফজ ও তাজবীদ">কুরআন হিফজ ও তাজবীদ</option>
                  <option value="হাদিস শরীফ ও দু'আ">হাদিস শরীফ ও দু'আ</option>
                  <option value="আকাইদ ও ফিকহ">আকাইদ ও ফিকহ</option>
                  <option value="আরবি ভাষা ও ব্যাকরণ">আরবি ভাষা ও ব্যাকরণ</option>
                  <option value="বাংলা ও সাহিত্য">বাংলা ও সাহিত্য</option>
                  <option value="ইংরেজি">ইংরেজি</option>
                  <option value="গণিত">গণিত</option>
                </select>
              </div>
            </div>
          </div>

          {/* Students Marks Input Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-3.5 bg-[#f0f9fa] border-b border-[#e2e8f0] flex items-center justify-between">
              <span className="font-bold text-xs text-[#082f32]">
                শিক্ষার্থী তালিকা ({currentJamatStudents.length} জন) • পূর্ণমান: ১০০
              </span>
              <span className="text-[11px] text-gray-500">পাস নম্বর: ৩৩</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-800 font-bold border-b">
                  <tr>
                    <th className="py-2.5 px-4">রোল</th>
                    <th className="py-2.5 px-4">শিক্ষার্থীর নাম</th>
                    <th className="py-2.5 px-4">অভিভাবক ফোন</th>
                    <th className="py-2.5 px-4 text-center">প্রাপ্ত নম্বর (১০০ এর মধ্যে)</th>
                    <th className="py-2.5 px-4 text-center">লেটার গ্রেড</th>
                    <th className="py-2.5 px-4 text-center">জিপিএ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentJamatStudents.map(student => {
                    const markData = examMarks[student.id] || { marks: 85 };
                    const gradeInfo = getGradeInfo(markData.marks);
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="py-2.5 px-4 font-mono font-bold text-[#0f626a]">{student.roll}</td>
                        <td className="py-2.5 px-4 font-bold text-gray-800">{student.name}</td>
                        <td className="py-2.5 px-4 font-mono text-gray-500">{student.guardianPhone}</td>
                        <td className="py-2.5 px-4 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={markData.marks}
                            onChange={(e) => handleMarksChange(student.id, e.target.value)}
                            className="w-20 px-3 py-1.5 border rounded-xl text-center font-mono font-bold text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                          />
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            gradeInfo.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                            gradeInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                            gradeInfo.color === 'cyan' ? 'bg-cyan-100 text-cyan-800' :
                            gradeInfo.color === 'amber' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {gradeInfo.grade}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center font-mono font-bold text-gray-700">
                          {gradeInfo.gpa}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      )}

      {/* ---------------- 6. RESULT BROADSHEET (result-sheet) ---------------- */}
      {activeMode === 'result-sheet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">পরীক্ষা নির্বাচন:</label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  <option value="বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬">বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬</option>
                  <option value="অর্ধবার্ষিক পরীক্ষা ২০২৬">অর্ধবার্ষিক পরীক্ষা ২০২৬</option>
                  <option value="১ম সাময়িক পরীক্ষা ২০২৬">১ম সাময়িক পরীক্ষা ২০২৬</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">জামাত নির্বাচন:</label>
                <select
                  value={selectedJamat}
                  onChange={(e) => setSelectedJamat(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {jamats.map(j => (
                    <option key={j.id} value={j.name}>{j.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>ব্রডশিট প্রিন্ট করুন</span>
              </button>
            </div>
          </div>

          {/* Broadsheet Container */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden p-6 space-y-4 print:p-0 print:border-none">
            {/* Broadsheet Header */}
            <div className="text-center pb-4 border-b border-[#e2e8f0]">
              <h2 className="text-xl font-bold text-[#082f32]">{profile.name}</h2>
              <p className="text-xs text-gray-600">{profile.address} • মোবাঃ {profile.phone1}</p>
              <div className="mt-2 inline-block bg-[#0f626a] text-white px-4 py-1 rounded-full text-xs font-bold">
                {selectedExam} - ফলাফল ব্রডশিট ও মেধা তালিকা (২০২৬)
              </div>
              <p className="text-xs font-bold text-gray-700 mt-1">জামাত: {selectedJamat} | মোট পরীক্ষার্থী: {currentJamatStudents.length} জন</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-collapse">
                <thead className="bg-[#f0f9fa]">
                  <tr className="border-b">
                    <th className="py-2.5 px-3 border-r text-center font-bold">মেধা</th>
                    <th className="py-2.5 px-3 border-r text-center font-bold">রোল</th>
                    <th className="py-2.5 px-3 border-r font-bold">শিক্ষার্থীর নাম</th>
                    <th className="py-2.5 px-2 border-r text-center font-bold">হিফজ (১০০)</th>
                    <th className="py-2.5 px-2 border-r text-center font-bold">হাদিস (১০০)</th>
                    <th className="py-2.5 px-2 border-r text-center font-bold">ফিকহ (১০০)</th>
                    <th className="py-2.5 px-2 border-r text-center font-bold">বাংলা (১০০)</th>
                    <th className="py-2.5 px-2 border-r text-center font-bold">গণিত (১০০)</th>
                    <th className="py-2.5 px-3 border-r text-center font-bold bg-amber-50">মোট নম্বর</th>
                    <th className="py-2.5 px-2 border-r text-center font-bold">জিপিএ</th>
                    <th className="py-2.5 px-3 text-center font-bold">সার্বিক গ্রেড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentJamatStudents.map((s, idx) => {
                    const m1 = 95 - (idx % 4) * 2;
                    const m2 = 92 - (idx % 5) * 2;
                    const m3 = 88 - (idx % 3) * 3;
                    const m4 = 84 - (idx % 6) * 2;
                    const m5 = 89 - (idx % 4) * 3;
                    const total = m1 + m2 + m3 + m4 + m5;
                    const avg = (total / 5).toFixed(1);
                    const gradeInfo = getGradeInfo(Number(avg));

                    return (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="py-2 px-3 border-r font-mono font-bold text-center text-[#0f626a]">{idx + 1}</td>
                        <td className="py-2 px-3 border-r font-mono text-center font-bold">{s.roll}</td>
                        <td className="py-2 px-3 border-r font-bold text-gray-800">{s.name}</td>
                        <td className="py-2 px-2 border-r font-mono text-center">{m1}</td>
                        <td className="py-2 px-2 border-r font-mono text-center">{m2}</td>
                        <td className="py-2 px-2 border-r font-mono text-center">{m3}</td>
                        <td className="py-2 px-2 border-r font-mono text-center">{m4}</td>
                        <td className="py-2 px-2 border-r font-mono text-center">{m5}</td>
                        <td className="py-2 px-3 border-r font-mono text-center font-bold text-emerald-800 bg-amber-50/50">
                          {total} / ৫০০
                        </td>
                        <td className="py-2 px-2 border-r font-mono text-center font-bold">{gradeInfo.gpa}</td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            gradeInfo.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                            gradeInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {gradeInfo.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Signature Area */}
            <div className="pt-12 grid grid-cols-3 text-center text-xs font-bold text-gray-700">
              <div>
                <div className="border-t border-gray-400 w-36 mx-auto pt-1">শ্রেণি শিক্ষকের স্বাক্ষর</div>
              </div>
              <div>
                <div className="border-t border-gray-400 w-36 mx-auto pt-1">পরীক্ষা নিয়ন্ত্রক</div>
              </div>
              <div>
                <div className="border-t border-gray-400 w-36 mx-auto pt-1">মুহতামিম / সভাপতি</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 7. INDIVIDUAL STUDENT RESULT / PROGRESS CARD (result-student) ---------------- */}
      {activeMode === 'result-student' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">শিক্ষার্থী নির্বাচন:</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (রোল: {s.roll} - {s.jamat})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">পরীক্ষার নাম:</label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  <option value="বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬">বার্ষিক মূল্যায়ন পরীক্ষা ২০২৬</option>
                  <option value="অর্ধবার্ষিক পরীক্ষা ২০২৬">অর্ধবার্ষিক পরীক্ষা ২০২৬</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>নম্বরপত্র প্রিন্ট করুন</span>
            </button>
          </div>

          {/* Student Official Marksheet Container */}
          <div className="bg-white rounded-2xl border-4 border-double border-[#0f626a] shadow-lg p-8 max-w-4xl mx-auto space-y-6 print:border-none print:shadow-none print:p-0">
            {/* Header */}
            <div className="text-center space-y-1 pb-4 border-b-2 border-[#0f626a]">
              <div className="flex justify-center mb-2">
                <img
                  src="/storage/institute/sidelogo/kZvKJCWGaUTdn3y6ZSjepGWQoM2vD9wRM6iBLrRl.png"
                  alt="Madrasah Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-extrabold text-[#082f32]">{profile.name}</h1>
              <p className="text-xs font-semibold text-gray-600">{profile.address}</p>
              <p className="text-xs text-gray-500 font-mono">মোবাইল: {profile.phone1} • স্থাপিত: {profile.establishedYear || '১৯৯০'}</p>
              <div className="pt-2">
                <span className="inline-block bg-[#0f626a] text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
                  শিক্ষার্থী মূল্যায়ন নম্বরপত্র ও অগ্রগতি বিবরণী (PROGRESS REPORT)
                </span>
              </div>
              <p className="text-xs font-bold text-gray-800 pt-1">{selectedExam}</p>
            </div>

            {/* Student Info Grid & Grading Scale */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="md:col-span-2 bg-[#f0f9fa] p-4 rounded-xl border border-[#e2e8f0] space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-500 text-[11px] block">শিক্ষার্থীর নাম:</span>
                    <span className="font-bold text-gray-800 text-sm">{selectedStudent?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[11px] block">পিতার নাম:</span>
                    <span className="font-bold text-gray-800">{selectedStudent?.fatherName || 'মাওলানা ইউনুস'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-200">
                  <div>
                    <span className="text-gray-500 text-[10px] block">জামাত / শ্রেণি:</span>
                    <span className="font-bold text-[#0f626a]">{selectedStudent?.jamat}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">রোল নম্বর:</span>
                    <span className="font-bold font-mono text-gray-800">{selectedStudent?.roll}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">শিক্ষাবর্ষ:</span>
                    <span className="font-bold font-mono text-gray-800">২০২৬</span>
                  </div>
                </div>
              </div>

              {/* Grading Legend */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[10px]">
                <h4 className="font-bold text-gray-700 mb-1 text-center border-b pb-1">গ্রেডিং পদ্ধতি (Grade Scale)</h4>
                <div className="space-y-1">
                  <div className="flex justify-between font-mono"><span>৮০ - ১০০</span><span className="font-bold text-emerald-700">মুমতাজ (A+) 5.0</span></div>
                  <div className="flex justify-between font-mono"><span>৭০ - ৭৯</span><span className="font-bold text-blue-700">জাইয়্যিদ জিদ্দান (A) 4.0</span></div>
                  <div className="flex justify-between font-mono"><span>৬০ - ৬৯</span><span className="font-bold text-cyan-700">জাইয়্যিদ (B) 3.0</span></div>
                  <div className="flex justify-between font-mono"><span>৩৩ - ৫৯</span><span className="font-bold text-amber-700">মাকবুল (C) 2.0</span></div>
                  <div className="flex justify-between font-mono"><span>০ - ৩২</span><span className="font-bold text-rose-700">রাসিব (F) 0.0</span></div>
                </div>
              </div>
            </div>

            {/* Subject-wise Marks Table */}
            <div className="border border-gray-300 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f0f9fa] border-b">
                  <tr>
                    <th className="py-2.5 px-3 border-r text-center font-bold">ক্রমিক</th>
                    <th className="py-2.5 px-3 border-r font-bold">পাঠ্য বিষয় (Subjects)</th>
                    <th className="py-2.5 px-3 border-r text-center font-bold">পূর্ণমান</th>
                    <th className="py-2.5 px-3 border-r text-center font-bold">পাস নম্বর</th>
                    <th className="py-2.5 px-3 border-r text-center font-bold">প্রাপ্ত নম্বর</th>
                    <th className="py-2.5 px-3 border-r text-center font-bold">লেটার গ্রেড</th>
                    <th className="py-2.5 px-3 text-center font-bold">গ্রেড পয়েন্ট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { sub: 'কুরআন মাজিদ হিফজ ও তাজবীদ', total: 100, pass: 33, obtained: 96 },
                    { sub: 'হাদিস শরীফ ও সুন্নাত আদব', total: 100, pass: 33, obtained: 92 },
                    { sub: 'আকাইদ ও ফিকাহুল ইসলাম', total: 100, pass: 33, obtained: 88 },
                    { sub: 'আরবি ভাষা ও ব্যাকরণ', total: 100, pass: 33, obtained: 85 },
                    { sub: 'বাংলা ব্যাকরণ ও সাহিত্য', total: 100, pass: 33, obtained: 82 },
                    { sub: 'সাধারণ গণিত', total: 100, pass: 33, obtained: 90 },
                  ].map((row, idx) => {
                    const gradeInfo = getGradeInfo(row.obtained);
                    return (
                      <tr key={idx} className="hover:bg-gray-50 font-mono">
                        <td className="py-2 px-3 border-r text-center">{idx + 1}</td>
                        <td className="py-2 px-3 border-r font-sans font-bold text-gray-800">{row.sub}</td>
                        <td className="py-2 px-3 border-r text-center">{row.total}</td>
                        <td className="py-2 px-3 border-r text-center">{row.pass}</td>
                        <td className="py-2 px-3 border-r text-center font-bold text-[#0f626a]">{row.obtained}</td>
                        <td className="py-2 px-3 border-r text-center font-bold font-sans">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">
                            {gradeInfo.grade}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center font-bold">{gradeInfo.gpa}</td>
                      </tr>
                    );
                  })}
                  {/* Total Row */}
                  <tr className="bg-amber-50/60 font-bold border-t-2 border-gray-300">
                    <td colSpan={2} className="py-2.5 px-3 border-r text-right font-sans">সর্বমোট ও ফলাফল:</td>
                    <td className="py-2.5 px-3 border-r text-center font-mono">৬০০</td>
                    <td className="py-2.5 px-3 border-r text-center font-mono">১৯৮</td>
                    <td className="py-2.5 px-3 border-r text-center font-mono text-[#0f626a] text-sm">৫৩৩</td>
                    <td className="py-2.5 px-3 border-r text-center font-sans text-emerald-800">মুমতাজ (A+)</td>
                    <td className="py-2.5 px-3 text-center font-mono text-[#0f626a] text-sm">৫.০০</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Remarks and Signatures */}
            <div className="space-y-6 pt-2">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs">
                <span className="font-bold text-gray-700">শ্রেণি শিক্ষকের মন্তব্য: </span>
                <span className="text-gray-600">মাশাআল্লাহ, কুরআন হিফজ ও সাধারণ বিষয়ে অত্যন্ত প্রশংসনীয় মেধা প্রদর্শন করেছে। নিয়মিত মেহনত অব্যাহত থাকলে শীর্ষস্থান বজায় থাকবে।</span>
              </div>

              <div className="pt-10 grid grid-cols-3 text-center text-xs font-bold text-gray-800">
                <div>
                  <div className="border-t border-gray-500 w-40 mx-auto pt-1.5">শ্রেণি শিক্ষকের স্বাক্ষর</div>
                </div>
                <div>
                  <div className="border-t border-gray-500 w-40 mx-auto pt-1.5">অভিভাবকের স্বাক্ষর</div>
                </div>
                <div>
                  <div className="border-t border-gray-500 w-40 mx-auto pt-1.5">মুহতামিম / অধ্যক্ষের স্বাক্ষর ও সীল</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
