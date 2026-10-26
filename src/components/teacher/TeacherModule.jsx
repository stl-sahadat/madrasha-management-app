import React, { useState } from 'react';
import {
  Users,
  Plus,
  Phone,
  Printer,
  Calendar,
  CreditCard,
  FileSpreadsheet,
  CheckCircle,
  Eye,
  Search,
  MessageSquare,
  Award,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const TeacherModule = ({ defaultTab = 'list' }) => {
  const {
    teachers,
    addTeacher,
    accounts,
    receivers,
    teacherSalaryPayments,
    addTeacherSalaryPayment,
    setSelectedReceiptForPrint
  } = useApp();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchTerm, setSearchTerm] = useState('');

  // Salary Sheet Month Filter
  const [selectedMonth, setSelectedMonth] = useState('সেপ্টেম্বর');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Teacher Salary Day (Disbursement Entry Form) State
  const [salaryForm, setSalaryForm] = useState({
    teacherId: teachers[0]?.id || '',
    month: 'অক্টোবর',
    year: '2026',
    date: new Date().toISOString().split('T')[0],
    account: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    amount: '',
    note: ''
  });

  // New Teacher Registration Form State
  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
    designation: 'সহকারী শিক্ষক',
    department: 'হিফজ বিভাগ',
    mobile: '',
    email: '',
    salary: '14000',
    qualification: 'দাওরায়ে হাদিস',
    joiningDate: new Date().toISOString().split('T')[0],
    address: 'বদরখালী, কক্সবাজার'
  });

  // Attendance State
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [teacherAttendance, setTeacherAttendance] = useState(() => {
    return teachers.reduce((acc, t) => ({ ...acc, [t.id]: 'উপস্থিত' }), {});
  });

  // Handle Add Teacher Submit
  const handleAddTeacherSubmit = (e) => {
    e.preventDefault();
    if (!newTeacherData.name || !newTeacherData.mobile) {
      alert('শিক্ষকের নাম ও মোবাইল নম্বর পূরণ করুন');
      return;
    }
    addTeacher({
      ...newTeacherData,
      salary: parseFloat(newTeacherData.salary) || 0
    });
    setActiveTab('list');
    setNewTeacherData({
      name: '',
      designation: 'সহকারী শিক্ষক',
      department: 'হিফজ বিভাগ',
      mobile: '',
      email: '',
      salary: '14000',
      qualification: 'দাওরায়ে হাদিস',
      joiningDate: new Date().toISOString().split('T')[0],
      address: 'বদরখালী, কক্সবাজার'
    });
  };

  // Handle Salary Disbursement Submit
  const handleSalaryDisburseSubmit = (e) => {
    e.preventDefault();
    const targetTeacher = teachers.find(t => t.id === salaryForm.teacherId) || teachers[0];
    const amount = parseFloat(salaryForm.amount) || parseFloat(targetTeacher?.salary) || 0;

    if (!amount || amount <= 0) {
      alert('সঠিক টাকার অংক উল্লেখ করুন');
      return;
    }

    const vch = addTeacherSalaryPayment({
      teacherId: targetTeacher.id,
      teacherName: targetTeacher.name,
      designation: targetTeacher.designation,
      month: salaryForm.month,
      year: salaryForm.year,
      date: salaryForm.date,
      account: salaryForm.account,
      amount,
      note: salaryForm.note || `${salaryForm.month} ${salaryForm.year} শিক্ষক বেতন পরিশোধ`
    });

    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  // Attendance helpers
  const handleAttendanceChange = (teacherId, status) => {
    setTeacherAttendance(prev => ({ ...prev, [teacherId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated = {};
    teachers.forEach(t => {
      updated[t.id] = 'উপস্থিত';
    });
    setTeacherAttendance(updated);
  };

  const presentCount = teachers.filter(t => (teacherAttendance[t.id] || 'উপস্থিত') === 'উপস্থিত').length;
  const absentCount = teachers.length - presentCount;

  // Filter teachers for phone/list
  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.mobile.includes(searchTerm) ||
    t.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-chalkboard-user me-2"></i>
            শিক্ষক ও উস্তাদবৃন্দ ব্যবস্থাপনা (Teacher Management)
          </h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('create')}
              className={`btn btn-sm ${activeTab === 'create' ? 'btn-danger text-white' : 'btn-light text-primary'} fw-bold d-flex align-items-center gap-1`}
            >
              <i className="fa-solid fa-user-plus"></i> নতুন শিক্ষক ফর্ম
            </button>
            <button
              onClick={() => setActiveTab('salary-day')}
              className={`btn btn-sm ${activeTab === 'salary-day' ? 'btn-danger text-white' : 'btn-light text-success'} fw-bold d-flex align-items-center gap-1`}
            >
              <i className="fa-solid fa-money-bill-wave"></i> বেতন প্রদান
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> প্রিন্ট
            </button>
          </div>
        </div>

        {/* Sub-Navigation Pills */}
        <div className="card-body bg-light py-2 border-bottom">
          <div className="d-flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'list' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-users me-1"></i> শিক্ষক তালিকা ({teachers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('number')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'number' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-phone me-1"></i> মোবাইল নম্বর
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('salary-sheet')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'salary-sheet' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-file-invoice-dollar me-1"></i> বেতন বিল শিট
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('salary-day')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'salary-day' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-hand-holding-dollar me-1"></i> বেতন দিন
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('salary-list')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'salary-list' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-receipt me-1"></i> বেতনের তালিকা
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('attendance')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'attendance' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-user-check me-1"></i> শিক্ষক হাজিরা
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('attendance-report')}
              className={`btn btn-sm rounded-pill px-3 ${activeTab === 'attendance-report' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-chart-line me-1"></i> হাজিরা রিপোর্ট
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: Teacher Create Form */}
      {activeTab === 'create' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-user-plus text-primary me-2"></i>
              নতুন শিক্ষক যোগ করুন (Teacher Registration Form)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddTeacherSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">শিক্ষকের পূর্ণ নাম *</label>
                <input
                  type="text"
                  value={newTeacherData.name}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, name: e.target.value })}
                  placeholder="উদা: মাওলানা আব্দুল্লাহ"
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">পদবী *</label>
                <select
                  value={newTeacherData.designation}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, designation: e.target.value })}
                  className="form-select"
                >
                  <option value="মুহতামিম / প্রধান শিক্ষক">মুহতামিম / প্রধান শিক্ষক</option>
                  <option value="সহকারী প্রধান ও ক্যাশিয়ার">সহকারী প্রধান ও ক্যাশিয়ার</option>
                  <option value="সিনিয়র শিক্ষক">সিনিয়র শিক্ষক</option>
                  <option value="সহকারী শিক্ষক">সহকারী শিক্ষক</option>
                  <option value="ক্বারী ও মুয়াল্লিম">ক্বারী ও মুয়াল্লিম</option>
                  <option value="হিফজ শিক্ষক">হিফজ শিক্ষক</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">বিভাগ / জামাত *</label>
                <select
                  value={newTeacherData.department}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, department: e.target.value })}
                  className="form-select"
                >
                  <option value="হিফজ বিভাগ">হিফজ বিভাগ</option>
                  <option value="নাজেরা ও কায়দা">নাজেরা ও কায়দা</option>
                  <option value="কিতাব বিভাগ">কিতাব বিভাগ</option>
                  <option value="ইবতিদাইয়্যাহ (১ম-৫ম)">ইবতিদাইয়্যাহ (১ম-৫ম)</option>
                  <option value="প্রশাসন ও হিসাব">প্রশাসন ও হিসাব</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">মোবাইল নম্বর *</label>
                <input
                  type="text"
                  value={newTeacherData.mobile}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, mobile: e.target.value })}
                  placeholder="018XXXXXXXX"
                  className="form-control font-mono"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={newTeacherData.email}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, email: e.target.value })}
                  placeholder="teacher@madrasha.com"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">মাসিক মূল বেতন (টাকা) *</label>
                <div className="input-group">
                  <span className="input-group-text">৳</span>
                  <input
                    type="number"
                    value={newTeacherData.salary}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, salary: e.target.value })}
                    className="form-control font-mono fw-bold text-success"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">শিক্ষাগত যোগ্যতা *</label>
                <input
                  type="text"
                  value={newTeacherData.qualification}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, qualification: e.target.value })}
                  placeholder="উদা: দাওরায়ে হাদিস / কামিল"
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">যোগদানের তারিখ *</label>
                <input
                  type="date"
                  value={newTeacherData.joiningDate}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, joiningDate: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold small">স্থায়ী ঠিকানা</label>
                <input
                  type="text"
                  value={newTeacherData.address}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, address: e.target.value })}
                  placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা..."
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-save"></i>
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 2: Teacher List (Cards) */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-body py-2">
              <div className="row g-2 align-items-center justify-content-between">
                <div className="col-md-4">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="নাম, পদবী বা মোবাইল দিয়ে খুঁজুন..."
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <span className="badge bg-primary fs-6 px-3 py-2">
                    মোট শিক্ষক: <strong>{filteredTeachers.length} জন</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border rounded-3 p-3 hover-shadow transition">
                  <div className="d-flex align-items-center gap-3 pb-3 border-bottom">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-5"
                      style={{ width: '55px', height: '55px', minWidth: '55px' }}
                    >
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{teacher.name}</h6>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle small">
                        {teacher.designation}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 small space-y-1">
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">বিভাগ:</span>
                      <span className="fw-semibold">{teacher.department}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">শিক্ষাগত যোগ্যতা:</span>
                      <span className="fw-semibold">{teacher.qualification}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">মোবাইল:</span>
                      <span className="font-mono fw-bold text-dark">{teacher.mobile}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">নির্ধারিত বেতন:</span>
                      <span className="font-mono fw-bold text-success">৳ {teacher.salary}</span>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span className="text-muted">যোগদান:</span>
                      <span className="font-mono text-muted">{teacher.joiningDate}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">{teacher.status || 'কর্মরত'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSalaryForm(prev => ({
                          ...prev,
                          teacherId: teacher.id,
                          amount: teacher.salary
                        }));
                        setActiveTab('salary-day');
                      }}
                      className="btn btn-sm btn-outline-success d-inline-flex align-items-center gap-1"
                    >
                      <i className="fa-solid fa-money-bill-wave"></i> বেতন দিন
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: Teacher Phone Directory (মোবাইল নম্বর) */}
      {activeTab === 'number' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-phone text-success me-2"></i>
              শিক্ষকগণের মোবাইল নম্বর তালিকা
            </h6>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '50px' }}>নং</th>
                    <th className="text-start">নাম</th>
                    <th>পদবী</th>
                    <th>বিভাগ</th>
                    <th>মোবাইল নাম্বার</th>
                    <th>ইমেইল</th>
                    <th>যোগাযোগ</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, idx) => (
                    <tr key={t.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="text-start fw-bold text-dark">{t.name}</td>
                      <td><span className="badge bg-light text-dark border">{t.designation}</span></td>
                      <td>{t.department}</td>
                      <td className="font-mono fw-bold text-primary">{t.mobile}</td>
                      <td className="font-mono small text-muted">{t.email || '-'}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-1">
                          <a
                            href={`tel:${t.mobile}`}
                            className="btn btn-sm btn-success px-2 py-1"
                            title="কল করুন"
                          >
                            <i className="fa-solid fa-phone"></i>
                          </a>
                          <a
                            href={`https://wa.me/88${t.mobile}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-success px-2 py-1"
                            title="হোয়াটসঅ্যাপ"
                          >
                            <i className="fa-brands fa-whatsapp"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: Teacher Salary Sheet (বেতন তালিকা) */}
      {activeTab === 'salary-sheet' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <form className="row g-3 align-items-end no-print" onSubmit={(e) => e.preventDefault()}>
              <div className="col-md-4">
                <label className="form-label fw-bold small">বেতনের মাস নির্বাচন করুন</label>
                <div className="d-flex gap-2">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="form-select form-select-sm"
                  >
                    {MONTH_NAMES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>

              <div className="col text-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('salary-day')}
                  className="btn btn-sm btn-danger text-white fw-bold me-2"
                >
                  <i className="fa-solid fa-plus me-1"></i> বেতন প্রদান করুন
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-sm btn-info text-white fw-bold"
                >
                  <i className="fa-solid fa-print me-1"></i> শিট প্রিন্ট করুন
                </button>
              </div>
            </form>
          </div>

          <div className="card-body p-0">
            <div className="text-center p-3 border-bottom bg-light">
              <h5 className="fw-bold mb-1">শিক্ষক-কর্মচারীগণের মাসিক বেতন বিল শিট</h5>
              <p className="text-muted small mb-0">মাস: {selectedMonth} {selectedYear} ইং</p>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>ক্র.নং</th>
                    <th className="text-start">শিক্ষকের নাম</th>
                    <th>পদবী</th>
                    <th className="text-end">মূল বেতন</th>
                    <th className="text-end">ভাতা</th>
                    <th className="text-end">কর্তন</th>
                    <th className="text-end bg-success-subtle text-success">নিট প্রদেয়</th>
                    <th>পরিশোধের স্থিতি</th>
                    <th className="no-print">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, idx) => {
                    const basic = t.salary;
                    const allowance = 1000;
                    const deduction = 0;
                    const net = basic + allowance - deduction;
                    const paymentRecord = teacherSalaryPayments.find(
                      p => p.teacherId === t.id && p.month === selectedMonth && p.year === selectedYear
                    );

                    return (
                      <tr key={t.id}>
                        <td className="font-mono fw-bold">{idx + 1}</td>
                        <td className="text-start fw-bold text-dark">{t.name}</td>
                        <td><span className="badge bg-light text-dark border">{t.designation}</span></td>
                        <td className="text-end font-mono">৳ {basic.toLocaleString('en-IN')}</td>
                        <td className="text-end font-mono text-muted">৳ {allowance}</td>
                        <td className="text-end font-mono text-muted">৳ {deduction}</td>
                        <td className="text-end font-mono fw-bold text-success bg-success-subtle">
                          ৳ {net.toLocaleString('en-IN')}
                        </td>
                        <td>
                          {paymentRecord ? (
                            <span className="badge bg-success">পরিশোধিত</span>
                          ) : (
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                              অপরিশোধিত
                            </span>
                          )}
                        </td>
                        <td className="no-print">
                          {!paymentRecord ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSalaryForm(prev => ({
                                  ...prev,
                                  teacherId: t.id,
                                  month: selectedMonth,
                                  year: selectedYear,
                                  amount: net
                                }));
                                setActiveTab('salary-day');
                              }}
                              className="btn btn-sm btn-primary py-0 px-2"
                            >
                              পরিশোধ
                            </button>
                          ) : (
                            <span className="small text-success fw-bold">✓ কমপ্লিট</span>
                          )}
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

      {/* VIEW 5: Teacher Salary Day (বেতন দিন Form) */}
      {activeTab === 'salary-day' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-hand-holding-dollar text-success me-2"></i>
              শিক্ষকগণের বেতন প্রদান ফরম (Salary Disbursement)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSalaryDisburseSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">শিক্ষক নির্বাচন করুন *</label>
                <select
                  value={salaryForm.teacherId}
                  onChange={(e) => {
                    const selId = e.target.value;
                    const found = teachers.find(t => t.id === selId);
                    setSalaryForm({
                      ...salaryForm,
                      teacherId: selId,
                      amount: found ? found.salary : ''
                    });
                  }}
                  className="form-select"
                  required
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.designation} - ৳{t.salary})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">বেতনের মাস *</label>
                <select
                  value={salaryForm.month}
                  onChange={(e) => setSalaryForm({ ...salaryForm, month: e.target.value })}
                  className="form-select"
                >
                  {MONTH_NAMES.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">সাল *</label>
                <select
                  value={salaryForm.year}
                  onChange={(e) => setSalaryForm({ ...salaryForm, year: e.target.value })}
                  className="form-select"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">পরিশোধের তারিখ *</label>
                <input
                  type="date"
                  value={salaryForm.date}
                  onChange={(e) => setSalaryForm({ ...salaryForm, date: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">কোন খাত থেকে *</label>
                <input
                  type="text"
                  value="শিক্ষক-কর্মচারী বেতন"
                  readOnly
                  className="form-control bg-light"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">পেমেন্ট একাউন্ট *</label>
                <select
                  value={salaryForm.account}
                  onChange={(e) => setSalaryForm({ ...salaryForm, account: e.target.value })}
                  className="form-select"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">বেতনের পরিমাণ (টাকা) *</label>
                <div className="input-group">
                  <span className="input-group-text">৳</span>
                  <input
                    type="number"
                    value={salaryForm.amount || (teachers.find(t => t.id === salaryForm.teacherId)?.salary || 14000)}
                    onChange={(e) => setSalaryForm({ ...salaryForm, amount: e.target.value })}
                    className="form-control font-mono fw-bold text-success fs-6"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">মন্তব্য (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={salaryForm.note}
                  onChange={(e) => setSalaryForm({ ...salaryForm, note: e.target.value })}
                  placeholder="উদা: সেপ্টেম্বর মাসের বেতন পরিশোধ"
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-success px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  বেতন প্রদান করুন ও ভাউচার প্রিন্ট
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 6: Teacher Salary List (Disbursement Vouchers) */}
      {activeTab === 'salary-list' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-receipt text-primary me-2"></i>
              শিক্ষকের বেতন প্রদানের হিস্ট্রি ও ভাউচার তালিকা
            </h6>
            <button
              onClick={() => setActiveTab('salary-day')}
              className="btn btn-sm btn-primary text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন বেতন দিন
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th className="text-start">শিক্ষকের নাম</th>
                    <th>পদবী</th>
                    <th>বেতনের মাস</th>
                    <th>পরিশোধের তারিখ</th>
                    <th className="text-end">বেতনের পরিমাণ</th>
                    <th>মন্তব্য</th>
                    <th>স্লিপ</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherSalaryPayments.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="font-mono text-primary fw-bold">{p.voucherNo}</td>
                      <td className="text-start fw-bold text-dark">{p.teacherName}</td>
                      <td><span className="badge bg-light text-dark border">{p.designation}</span></td>
                      <td><span className="badge bg-info-subtle text-info">{p.month} {p.year}</span></td>
                      <td className="font-mono">{p.date}</td>
                      <td className="text-end font-mono fw-bold text-success">৳ {p.amount.toLocaleString('en-IN')}</td>
                      <td className="small text-muted">{p.note || 'বেতন পরিশোধ'}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReceiptForPrint({
                              id: p.id,
                              type: 'expense',
                              voucherNo: p.voucherNo,
                              date: p.date,
                              receiver: p.teacherName,
                              account: p.account || 'নগদ ক্যাশ (Hand Cash)',
                              donorOrStudent: `${p.teacherName} (${p.designation})`,
                              items: [{
                                category: 'শিক্ষক-কর্মচারী বেতন',
                                description: `${p.teacherName} - ${p.month} ${p.year} বেতন`,
                                amount: p.amount
                              }],
                              totalAmount: p.amount,
                              note: p.note
                            });
                          }}
                          className="btn btn-sm btn-outline-primary px-2 py-1"
                          title="ভাউচার প্রিন্ট"
                        >
                          <i className="fa-solid fa-receipt me-1"></i> রসিদ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: Attendance Entry */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          <div className="card shadow-sm border-0 no-print">
            <div className="card-body py-3 bg-light">
              <div className="row g-3 align-items-center justify-content-between">
                <div className="col-auto d-flex align-items-center gap-2">
                  <label className="fw-bold small mb-0">তারিখ:</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-auto d-flex gap-2">
                  <button
                    onClick={handleMarkAllPresent}
                    className="btn btn-sm btn-success text-white fw-bold"
                  >
                    সবাইকে উপস্থিত করুন
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn btn-sm btn-secondary text-white fw-bold"
                  >
                    <i className="fa-solid fa-print me-1"></i> প্রিন্ট
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-6">
              <div className="card bg-success-subtle border-success-subtle p-3 text-center">
                <span className="small text-success fw-bold">উপস্থিত শিক্ষক</span>
                <h4 className="fw-bold font-mono text-success mb-0 mt-1">{presentCount} জন</h4>
              </div>
            </div>
            <div className="col-6">
              <div className="card bg-danger-subtle border-danger-subtle p-3 text-center">
                <span className="small text-danger fw-bold">অনুপস্থিত শিক্ষক</span>
                <h4 className="fw-bold font-mono text-danger mb-0 mt-1">{absentCount} জন</h4>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0 text-center text-sm">
                  <thead className="table-light">
                    <tr className="fw-bold">
                      <th style={{ width: '45px' }}>আইডি</th>
                      <th className="text-start">শিক্ষকের নাম</th>
                      <th>পদবী ও বিভাগ</th>
                      <th>মোবাইল</th>
                      <th>হাজিরা স্থিতি</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map(t => (
                      <tr key={t.id}>
                        <td className="font-mono fw-bold">{t.id}</td>
                        <td className="text-start fw-bold text-dark">{t.name}</td>
                        <td>{t.designation} ({t.department})</td>
                        <td className="font-mono">{t.mobile}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              type="button"
                              onClick={() => handleAttendanceChange(t.id, 'উপস্থিত')}
                              className={`btn ${
                                (teacherAttendance[t.id] || 'উপস্থিত') === 'উপস্থিত'
                                  ? 'btn-success'
                                  : 'btn-outline-secondary'
                              }`}
                            >
                              উপস্থিত
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAttendanceChange(t.id, 'অনুপস্থিত')}
                              className={`btn ${
                                teacherAttendance[t.id] === 'অনুপস্থিত'
                                  ? 'btn-danger'
                                  : 'btn-outline-secondary'
                              }`}
                            >
                              অনুপস্থিত
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 8: Attendance Report */}
      {activeTab === 'attendance-report' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark">
              শিক্ষক হাজিরা মাসিক প্রতিবেদন সন ২০২৬ ইং
            </h6>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold"
            >
              <i className="fa-solid fa-print me-1"></i> প্রিন্ট রিপোর্ট
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th className="text-start">শিক্ষকের নাম</th>
                    <th>পদবী</th>
                    <th>মোট কার্যদিবস</th>
                    <th>উপস্থিতি</th>
                    <th>ছুটি</th>
                    <th>অনুপস্থিত</th>
                    <th>উপস্থিতির হার (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, idx) => (
                    <tr key={t.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="text-start fw-bold text-dark">{t.name}</td>
                      <td>{t.designation}</td>
                      <td className="font-mono">২৬ দিন</td>
                      <td className="font-mono fw-bold text-success">{25 - (idx % 2)} দিন</td>
                      <td className="font-mono text-muted">{idx % 2} দিন</td>
                      <td className="font-mono text-muted">০ দিন</td>
                      <td>
                        <span className="badge bg-success font-mono fs-6">
                          {96 - idx * 2}%
                        </span>
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
