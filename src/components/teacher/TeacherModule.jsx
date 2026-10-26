import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const TeacherModule = ({ defaultTab = 'list' }) => {
  const {
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    accounts,
    receivers,
    teacherSalaryPayments,
    addTeacherSalaryPayment,
    updateTeacherSalaryPayment,
    deleteTeacherSalaryPayment,
    setSelectedReceiptForPrint,
    setActiveTab: navigateTab,
    depositCategories,
    expenseCategories,
    paymentMethods
  } = useApp();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedTeacherForModal, setSelectedTeacherForModal] = useState(null);
  const [isEditingTeacherModal, setIsEditingTeacherModal] = useState(false);
  const [teacherEditForm, setTeacherEditForm] = useState({});

  // Salary Edit Modal State (matches /admin/teacher/salary/{id}/edit)
  const [editingSalary, setEditingSalary] = useState(null);
  const [editingSalaryForm, setEditingSalaryForm] = useState({
    payment_date: '',
    deposit_category_id: 'মাসিক বেতন',
    account: '',
    payment_method_id: 'cash',
    expense_category_id: 'শিক্ষকগণের বেতন',
    amount: '',
    note: ''
  });

  // Teacher Create State matching /admin/teacher/create
  const [createForm, setCreateForm] = useState({
    designation: 'সহকারী প্রধান শিক্ষক',
    full_name: '',
    father_name: '',
    mother_name: '',
    email: '',
    teacher_id: Math.floor(100000 + Math.random() * 900000).toString(),
    subject: 'বাংলা ও কুরআন',
    gender: 'male',
    birth_date: '1990-01-01',
    national_id: '',
    blood_group: 'B+',
    marital_status: 'married',
    salary: '14000',
    phone_number: '',
    emergency_phone: '',
    parents_phone: '',
    joining_date: new Date().toISOString().split('T')[0],
    id_card_expiry_date: '2028-12-31',
    present_address: 'বদরখালী, চকরিয়া, কক্সবাজার',
    permanent_address: 'বদরখালী, চকরিয়া, কক্সবাজার',
    qualification: 'দাওরায়ে হাদিস ও কামিল',
    skills: 'হিফজ ও কিতাব পাঠদান',
    note: ''
  });

  // Salary Sheet Month Filter State (Bengali month or year)
  const [salaryMonth, setSalaryMonth] = useState('অক্টোবর');
  const [salaryYear, setSalaryYear] = useState('2026');

  // Teacher Salary Day (Disbursement Entry) State matching /admin/teacher/salary/day
  const [salaryDayForm, setSalaryDayForm] = useState({
    payment_date: new Date().toISOString().split('T')[0],
    salary_month: 'অক্টোবর',
    salary_year: '2026',
    deposit_category_id: depositCategories?.[0]?.name || 'মাসিক বেতন',
    account: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    expense_category_id: 'শিক্ষকগণের বেতন',
    payment_method_id: 'cash'
  });

  // Individual salary entries per teacher
  const [salaryAmounts, setSalaryAmounts] = useState(() => {
    const map = {};
    (teachers || []).forEach(t => {
      map[t.id] = { amount: t.salary || '14000', note: '' };
    });
    return map;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!createForm.full_name || !createForm.phone_number) {
      alert('শিক্ষকের পূর্ণ নাম এবং ফোন নম্বর পূরণ করা আবশ্যক।');
      return;
    }
    addTeacher({
      name: createForm.full_name,
      designation: createForm.designation,
      department: createForm.subject,
      mobile: createForm.phone_number,
      phone: createForm.phone_number,
      emergencyPhone: createForm.emergency_phone,
      email: createForm.email || `${createForm.teacher_id}@madrasha.edu`,
      salary: parseFloat(createForm.salary) || 14000,
      qualification: createForm.qualification,
      joiningDate: createForm.joining_date,
      address: createForm.present_address,
      bloodGroup: createForm.blood_group,
      teacherId: createForm.teacher_id,
      photo: '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg'
    });
    alert('শিক্ষক সফলভাবে যোগ করা হয়েছে!');
    setActiveTab('list');
  };

  const handleSalaryDaySubmit = (e) => {
    e.preventDefault();
    let count = 0;
    teachers.forEach(t => {
      const entry = salaryAmounts[t.id];
      const amount = parseFloat(entry?.amount);
      if (amount && amount > 0) {
        addTeacherSalaryPayment({
          teacherId: t.id,
          teacherName: t.name,
          month: salaryDayForm.salary_month,
          year: salaryDayForm.salary_year,
          date: salaryDayForm.payment_date,
          account: salaryDayForm.account,
          amount,
          note: entry?.note || `${salaryDayForm.salary_month} ${salaryDayForm.salary_year}-এর শিক্ষক বেতন`
        });
        count++;
      }
    });
    alert(`${count} জন শিক্ষকের বেতন সফলভাবে প্রদান করা হয়েছে!`);
    setActiveTab('salary-list');
  };

  const handleDeleteTeacher = (id) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই শিক্ষককে মুছে ফেলতে চান?')) {
      deleteTeacher(id);
    }
  };

  const handleOpenTeacherModal = (teacher, editMode = false) => {
    setSelectedTeacherForModal(teacher);
    setIsEditingTeacherModal(editMode);
    setTeacherEditForm({
      name: teacher.name || '',
      designation: teacher.designation || 'সহকারী শিক্ষক',
      department: teacher.department || 'সাধারণ',
      mobile: teacher.mobile || teacher.phone || '',
      emergencyPhone: teacher.emergencyPhone || '',
      email: teacher.email || '',
      salary: teacher.salary || 14000,
      bloodGroup: teacher.bloodGroup || 'B+',
      qualification: teacher.qualification || 'দাওরায়ে হাদিস',
      skills: teacher.skills || '',
      joiningDate: teacher.joiningDate || '2024-01-01',
      address: teacher.address || 'বদরখালী, চকরিয়া, কক্সবাজার',
      photo: teacher.photo || '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg'
    });
  };

  const handleSaveTeacherEdit = (e) => {
    e.preventDefault();
    if (!selectedTeacherForModal) return;
    const updated = {
      ...selectedTeacherForModal,
      ...teacherEditForm,
      salary: parseFloat(teacherEditForm.salary) || selectedTeacherForModal.salary
    };
    updateTeacher(selectedTeacherForModal.id, updated);
    setSelectedTeacherForModal(updated);
    setIsEditingTeacherModal(false);
  };

  const handleOpenEditSalary = (payment) => {
    setEditingSalary(payment);
    setEditingSalaryForm({
      payment_date: payment.date || new Date().toISOString().split('T')[0],
      deposit_category_id: payment.depositCategory || 'মাসিক বেতন',
      account: payment.account || accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
      payment_method_id: payment.paymentMethod || 'cash',
      expense_category_id: 'শিক্ষকগণের বেতন',
      amount: payment.amount || '',
      note: payment.note || ''
    });
  };

  const handleUpdateSalarySubmit = (e) => {
    e.preventDefault();
    if (!editingSalary) return;
    updateTeacherSalaryPayment(editingSalary.id, {
      ...editingSalary,
      date: editingSalaryForm.payment_date,
      depositCategory: editingSalaryForm.deposit_category_id,
      account: editingSalaryForm.account,
      paymentMethod: editingSalaryForm.payment_method_id,
      amount: parseFloat(editingSalaryForm.amount) || editingSalary.amount,
      note: editingSalaryForm.note
    });
    setEditingSalary(null);
  };

  return (
    <div className="container-fluid p-0">
      {/* ---------------- 1. TEACHER CREATE FORM (/admin/teacher/create) ---------------- */}
      {activeTab === 'create' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-gradient bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-white">
                  <i className="fa-solid fa-chalkboard-user me-2"></i> শিক্ষক যোগ করুন
                </h5>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="btn btn-light btn-sm text-primary fw-bold"
                >
                  <i className="fa-solid fa-list me-1"></i> শিক্ষকদের তালিকা
                </button>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleCreateSubmit} className="needs-validation">
                  {/* Row 1: Designation, Full Name */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="designation" className="form-label fw-semibold">পদবি</label>
                      <input
                        type="text"
                        id="designation"
                        className="form-control"
                        placeholder="শিক্ষকের পদবি লিখুন"
                        value={createForm.designation}
                        onChange={(e) => setCreateForm({ ...createForm, designation: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="full_name" className="form-label fw-semibold">
                        শিক্ষকের পূর্ণ নামঃ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        className="form-control"
                        placeholder="শিক্ষকের পূর্ণ নাম লিখুন"
                        value={createForm.full_name}
                        onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Father, Mother, Email */}
                  <div className="row g-3 mb-3">
                    <div className="col-lg-4 col-md-6">
                      <label htmlFor="father_name" className="form-label fw-semibold">বাবার নাম</label>
                      <input
                        type="text"
                        id="father_name"
                        className="form-control"
                        placeholder="শিক্ষকের বাবার নাম লিখুন"
                        value={createForm.father_name}
                        onChange={(e) => setCreateForm({ ...createForm, father_name: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label htmlFor="mother_name" className="form-label fw-semibold">মায়ের নাম</label>
                      <input
                        type="text"
                        id="mother_name"
                        className="form-control"
                        placeholder="শিক্ষকের মায়ের নাম লিখুন"
                        value={createForm.mother_name}
                        onChange={(e) => setCreateForm({ ...createForm, mother_name: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <label htmlFor="email" className="form-label fw-semibold">ইমেইল (লগইন ইউজারনেম)</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="শিক্ষকের ইমেইল লিখুন"
                        value={createForm.email}
                        onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 3: Teacher ID, Photo, Subject */}
                  <div className="row g-3 mb-3">
                    <div className="col-lg-4 col-md-6">
                      <label htmlFor="teacher_id" className="form-label fw-semibold">শিক্ষকের আইডি</label>
                      <input
                        type="text"
                        id="teacher_id"
                        className="form-control"
                        placeholder="শিক্ষকের আইডি লিখুন"
                        value={createForm.teacher_id}
                        onChange={(e) => setCreateForm({ ...createForm, teacher_id: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <label htmlFor="photo" className="form-label fw-semibold">শিক্ষকের ছবি</label>
                      <input type="file" id="photo" className="form-control" accept="image/*" />
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <label htmlFor="subject" className="form-label fw-semibold">যে বিষয়ে জন্য নিযুক্ত</label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        placeholder="বিষয়ের নাম লিখুন"
                        value={createForm.subject}
                        onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 4: Gender, Birth Date, National ID, Blood Group, Marital Status */}
                  <div className="row g-3 mb-3">
                    <div className="col-lg-3 col-md-6">
                      <label htmlFor="gender" className="form-label fw-semibold">পুরুষ / মহিলা</label>
                      <select
                        id="gender"
                        className="form-select"
                        value={createForm.gender}
                        onChange={(e) => setCreateForm({ ...createForm, gender: e.target.value })}
                      >
                        <option value="male">পুরুষ</option>
                        <option value="female">মহিলা</option>
                      </select>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label htmlFor="birth_date" className="form-label fw-semibold">জন্ম তারিখ</label>
                      <input
                        type="date"
                        id="birth_date"
                        className="form-control"
                        value={createForm.birth_date}
                        onChange={(e) => setCreateForm({ ...createForm, birth_date: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="national_id" className="form-label fw-semibold">জাতীয় পরিচয়পত্র নম্বর</label>
                      <input
                        type="text"
                        id="national_id"
                        className="form-control"
                        placeholder="NID নম্বর লিখুন"
                        value={createForm.national_id}
                        onChange={(e) => setCreateForm({ ...createForm, national_id: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="blood_group" className="form-label fw-semibold">রক্তের গ্রুপ</label>
                      <select
                        id="blood_group"
                        className="form-select"
                        value={createForm.blood_group}
                        onChange={(e) => setCreateForm({ ...createForm, blood_group: e.target.value })}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="marital_status" className="form-label fw-semibold">বৈবাহিক অবস্থা</label>
                      <select
                        id="marital_status"
                        className="form-select"
                        value={createForm.marital_status}
                        onChange={(e) => setCreateForm({ ...createForm, marital_status: e.target.value })}
                      >
                        <option value="single">অবিবাহিত</option>
                        <option value="married">বিবাহিত</option>
                        <option value="widow">বিধবা</option>
                        <option value="divorced">বিচ্ছিন্ন</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Salary, Phone, Emergency Phone, Parents Phone, Joining Date, ID Expiry */}
                  <div className="row g-3 mb-3">
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="salary" className="form-label fw-semibold">শিক্ষকের বেতন</label>
                      <input
                        type="number"
                        id="salary"
                        className="form-control"
                        placeholder="বেতন লিখুন"
                        value={createForm.salary}
                        onChange={(e) => setCreateForm({ ...createForm, salary: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="phone_number" className="form-label fw-semibold">
                        ফোন নম্বর <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="phone_number"
                        className="form-control"
                        placeholder="017xxxxxxxx"
                        value={createForm.phone_number}
                        onChange={(e) => setCreateForm({ ...createForm, phone_number: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="emergency_phone" className="form-label fw-semibold">জরুরী ফোন</label>
                      <input
                        type="text"
                        id="emergency_phone"
                        className="form-control"
                        placeholder="জরুরী ফোন নম্বর"
                        value={createForm.emergency_phone}
                        onChange={(e) => setCreateForm({ ...createForm, emergency_phone: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="parents_phone" className="form-label fw-semibold">অভিভাবকের ফোন</label>
                      <input
                        type="text"
                        id="parents_phone"
                        className="form-control"
                        placeholder="অভিভাবকের ফোন নম্বর"
                        value={createForm.parents_phone}
                        onChange={(e) => setCreateForm({ ...createForm, parents_phone: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="joining_date" className="form-label fw-semibold">যোগদানের তারিখ</label>
                      <input
                        type="date"
                        id="joining_date"
                        className="form-control"
                        value={createForm.joining_date}
                        onChange={(e) => setCreateForm({ ...createForm, joining_date: e.target.value })}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6">
                      <label htmlFor="id_card_expiry_date" className="form-label fw-semibold">কার্ডের মেয়াদ</label>
                      <input
                        type="date"
                        id="id_card_expiry_date"
                        className="form-control"
                        value={createForm.id_card_expiry_date}
                        onChange={(e) => setCreateForm({ ...createForm, id_card_expiry_date: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 6: Addresses */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="present_address" className="form-label fw-semibold">বর্তমান ঠিকানা</label>
                      <textarea
                        id="present_address"
                        className="form-control"
                        rows="2"
                        placeholder="বর্তমান ঠিকানা লিখুন"
                        value={createForm.present_address}
                        onChange={(e) => setCreateForm({ ...createForm, present_address: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="permanent_address" className="form-label fw-semibold">স্থায়ী ঠিকানা</label>
                      <textarea
                        id="permanent_address"
                        className="form-control"
                        rows="2"
                        placeholder="স্থায়ী ঠিকানা লিখুন"
                        value={createForm.permanent_address}
                        onChange={(e) => setCreateForm({ ...createForm, permanent_address: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  {/* Row 7: Qualification, Skills, Note */}
                  <div className="row g-3 mb-4">
                    <div className="col-lg-4 col-md-12">
                      <label htmlFor="qualification" className="form-label fw-semibold">যোগ্যতা</label>
                      <textarea
                        id="qualification"
                        className="form-control"
                        rows="2"
                        placeholder="শিক্ষকের শিক্ষাগত যোগ্যতা লিখুন"
                        value={createForm.qualification}
                        onChange={(e) => setCreateForm({ ...createForm, qualification: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <label htmlFor="skills" className="form-label fw-semibold">কর্মদক্ষতা</label>
                      <textarea
                        id="skills"
                        className="form-control"
                        rows="2"
                        placeholder="কর্মদক্ষতা লিখুন"
                        value={createForm.skills}
                        onChange={(e) => setCreateForm({ ...createForm, skills: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <label htmlFor="note" className="form-label fw-semibold">মন্তব্য</label>
                      <textarea
                        id="note"
                        className="form-control"
                        rows="2"
                        placeholder="মন্তব্য (ঐচ্ছিক)"
                        value={createForm.note}
                        onChange={(e) => setCreateForm({ ...createForm, note: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary px-4 py-2 fw-bold">
                      <i className="fa-solid fa-save me-1"></i> সংরক্ষণ করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. TEACHER LIST (/admin/teacher) ---------------- */}
      {activeTab === 'list' && (
        <div>
          {/* Top Button */}
          <div className="text-md-end text-start mb-3 mx-2">
            <button
              onClick={() => setActiveTab('create')}
              className="btn btn-danger text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন শিক্ষক যুক্ত করুন
            </button>
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
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>শিক্ষকদের তালিকা</h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th style={{ width: '7%' }} className="text-center align-middle">ক্রমিক নং</th>
                      <th style={{ width: '130px' }} className="align-middle text-center">ছবি</th>
                      <th className="align-middle">নাম ও বিস্তারিত</th>
                      <th className="align-middle text-center" style={{ width: '170px' }}>কর্ম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher, index) => (
                      <tr key={teacher.id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center">
                            <div className="text-center">
                              <img
                                src={teacher.photo || (index % 2 === 0 ? '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg' : '/storage/teachers/eXUAuPhreXk0tOWTeviLX2y8J6SwvMJJnSh4Mj85.jpg')}
                                alt="Teacher Photo"
                                className="img-thumbnail mb-2"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                              />
                              <label className="btn btn-warning btn-sm w-100" style={{ cursor: 'pointer', fontSize: '11px' }}>
                                <i className="fa-solid fa-upload me-1"></i> ছবি
                                <input
                                  type="file"
                                  className="d-none"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        updateTeacher(teacher.id, { photo: ev.target.result });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="mb-1">আইডিঃ <strong>{teacher.id || teacher.teacherId || '2020' + (index + 1)}</strong></p>
                          <p className="mb-1">পদবিঃ <strong>{teacher.designation || 'সহকারী শিক্ষক'}</strong></p>
                          <p className="mb-1">নামঃ <strong>{teacher.name}</strong></p>
                          <p className="mb-1">মোবাইল নম্বরঃ <strong>{teacher.mobile || teacher.phone || '01711000000'}</strong></p>
                          <p className="mb-1">জরুরী যোগাযোগ নম্বরঃ <strong>{teacher.emergencyPhone || ''}</strong></p>
                          <p className="mb-1">বিভাগঃ <strong>{teacher.department || 'সাধারণ'}</strong></p>
                          <p className="mb-0">যোগদানের তারিখঃ <strong>{teacher.joiningDate || '2024-01-01'}</strong></p>
                        </td>
                        <td className="text-center align-middle">
                          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                            <button
                              onClick={() => handleOpenTeacherModal(teacher, false)}
                              className="btn btn-secondary btn-sm p-1 px-3 w-100"
                              title="বিস্তারিত"
                            >
                              <i className="fa-solid fa-eye me-1"></i> বিস্তারিত
                            </button>
                            <button
                              onClick={() => handleOpenTeacherModal(teacher, true)}
                              className="btn btn-primary btn-sm p-1 px-3 w-100"
                              title="সম্পাদনা"
                            >
                              <i className="fa-solid fa-pen-to-square me-1"></i> এডিট
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="btn btn-danger btn-sm p-1 px-3 w-100 delete-btn"
                              title="মুছে ফেলুন"
                            >
                              <i className="fa-solid fa-trash me-1"></i> মুছে ফেলুন
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button onClick={() => window.print()} className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. TEACHER NUMBER (/admin/teacher/number) ---------------- */}
      {activeTab === 'number' && (
        <div>
          <div className="text-md-end text-start mb-3 mx-2">
            <button
              onClick={() => setActiveTab('create')}
              className="btn btn-danger text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন শিক্ষক যুক্ত করুন
            </button>
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
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>শিক্ষকগণের মোবাইল নম্বর</h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th className="text-center align-middle" style={{ width: '10%' }}>নং</th>
                      <th>নাম</th>
                      <th className="text-center align-middle">পদবী</th>
                      <th className="text-center align-middle">মোবাইল নাম্বার</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, idx) => (
                      <tr key={t.id}>
                        <td className="text-center align-middle">{idx + 1}</td>
                        <td className="fw-bold">{t.name}</td>
                        <td className="text-center align-middle">{t.designation || 'সহকারী শিক্ষক'}</td>
                        <td className="text-center align-middle font-monospace fw-bold">
                          {t.mobile || t.phone || '01711000000'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="m-3 d-flex justify-content-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 4. TEACHER SALARY SHEET (/admin/teacher/salary/sheet) ---------------- */}
      {activeTab === 'salary-sheet' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-chalkboard-user me-2"></i> শিক্ষকগণের বেতন তালিকা
              </h5>
            </div>

            <div className="card-body mb-3">
              <div className="row align-items-end">
                <div className="col-md-6 d-flex gap-3 align-items-end">
                  <div className="flex-grow-1">
                    <label htmlFor="salary-month-select" className="form-label fw-semibold">বেতনের মাস</label>
                    <select
                      id="salary-month-select"
                      className="form-select"
                      value={salaryMonth}
                      onChange={(e) => setSalaryMonth(e.target.value)}
                    >
                      <option value="জানুয়ারি">জানুয়ারি</option>
                      <option value="ফেব্রুয়ারি">ফেব্রুয়ারি</option>
                      <option value="মার্চ">মার্চ</option>
                      <option value="এপ্রিল">এপ্রিল</option>
                      <option value="মে">মে</option>
                      <option value="জুন">জুন</option>
                      <option value="জুলাই">জুলাই</option>
                      <option value="অগাস্ট">অগাস্ট</option>
                      <option value="সেপ্টেম্বর">সেপ্টেম্বর</option>
                      <option value="অক্টোবর">অক্টোবর</option>
                      <option value="নভেম্বর">নভেম্বর</option>
                      <option value="ডিসেম্বর">ডিসেম্বর</option>
                    </select>
                  </div>
                  <div className="w-25">
                    <label htmlFor="salary-year-select" className="form-label fw-semibold">সাল</label>
                    <select
                      id="salary-year-select"
                      className="form-select"
                      value={salaryYear}
                      onChange={(e) => setSalaryYear(e.target.value)}
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="btn btn-info px-4 text-white fw-bold"
                  >
                    দেখুন
                  </button>
                </div>

                <div className="col-md-6 text-md-end text-start mt-3">
                  <button
                    onClick={() => setActiveTab('create')}
                    className="btn btn-danger text-white fw-bold me-2"
                  >
                    <i className="fa-solid fa-plus me-1"></i> নতুন শিক্ষক যুক্ত করুন
                  </button>
                  <button
                    onClick={() => setActiveTab('salary-day')}
                    className="btn btn-success text-white fw-bold"
                  >
                    <i className="fa-solid fa-money-bill me-1"></i> বেতন প্রদান
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
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>শিক্ষকগণের মাসিক বেতন বিবরণী</h5>
                  <p className="text-muted small">মাসঃ {salaryMonth} {salaryYear}</p>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন {salaryYear} ইং</p>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th className="text-center" style={{ width: '50px' }}>নং</th>
                      <th>শিক্ষকের নাম</th>
                      <th>পদবী</th>
                      <th className="text-end">নির্ধারিত বেতন</th>
                      <th className="text-end">প্রদত্ত বেতন</th>
                      <th className="text-center">স্ট্যাটাস</th>
                      <th className="text-center no-print" style={{ width: '200px' }}>কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, idx) => {
                      const payment = teacherSalaryPayments.find(p =>
                        (p.teacherId === t.id || p.teacherName === t.name) &&
                        (p.month === salaryMonth || (p.date && p.date.includes(salaryMonth))) &&
                        (!p.year || p.year === salaryYear || (p.date && p.date.startsWith(salaryYear)))
                      );
                      const isPaid = !!payment;
                      return (
                        <tr key={t.id}>
                          <td className="text-center">{idx + 1}</td>
                          <td className="fw-bold">{t.name}</td>
                          <td>{t.designation || 'সহকারী শিক্ষক'}</td>
                          <td className="text-end font-monospace">৳ {parseFloat(t.salary || 14000).toLocaleString('en-IN')}</td>
                          <td className="text-end font-monospace fw-bold text-success">
                            {isPaid ? `৳ ${parseFloat(payment.amount || t.salary).toLocaleString('en-IN')}` : <span className="text-muted">-</span>}
                          </td>
                          <td className="text-center">
                            {isPaid ? (
                              <span className="badge bg-success">পরিশোধিত</span>
                            ) : (
                              <span className="badge bg-warning text-dark">অপরিশোধিত</span>
                            )}
                          </td>
                          <td className="text-center no-print">
                            {isPaid ? (
                              <div className="d-flex justify-content-center gap-1">
                                <button
                                  onClick={() => setSelectedReceiptForPrint(payment)}
                                  className="btn btn-sm btn-info text-white"
                                  title="স্লিপ প্রিন্ট"
                                >
                                  <i className="fa-solid fa-print"></i>
                                </button>
                                <button
                                  onClick={() => handleOpenEditSalary(payment)}
                                  className="btn btn-sm btn-primary"
                                  title="এডিট"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('আপনি কি নিশ্চিতভাবে এই বেতন প্রদানের রেকর্ড মুছে ফেলতে চান?')) {
                                      deleteTeacherSalaryPayment(payment.id);
                                    }
                                  }}
                                  className="btn btn-sm btn-danger delete-btn"
                                  title="মুছে ফেলুন"
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            ) : (
                              <div className="d-flex justify-content-center gap-1">
                                <button
                                  onClick={() => {
                                    setSalaryDayForm(prev => ({ ...prev, salary_month: salaryMonth, salary_year: salaryYear }));
                                    setActiveTab('salary-day');
                                  }}
                                  className="btn btn-sm btn-success px-2 py-1"
                                  title="বেতন দিন"
                                >
                                  <i className="fa-solid fa-money-bill me-1"></i> বেতন দিন
                                </button>
                                <button
                                  onClick={() => handleOpenTeacherModal(t, true)}
                                  className="btn btn-sm btn-outline-secondary"
                                  title="স্কেল এডিট"
                                >
                                  <i className="fa-solid fa-gear"></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 d-flex justify-content-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 5. TEACHER SALARY DAY (/admin/teacher/salary/day) ---------------- */}
      {activeTab === 'salary-day' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-chalkboard-user me-2"></i> শিক্ষকগণের বেতন দিন
            </h5>
          </div>

          <form onSubmit={handleSalaryDaySubmit} id="salaryForm">
            <div className="card-body mb-3">
              <div className="row align-items-end mb-3">
                {/* Date */}
                <div className="col-md-3 mb-2">
                  <label htmlFor="today-day" className="form-label fw-semibold">তারিখ</label>
                  <input
                    name="payment_date"
                    type="date"
                    id="today-day"
                    className="form-control"
                    value={salaryDayForm.payment_date}
                    onChange={(e) => setSalaryDayForm({ ...salaryDayForm, payment_date: e.target.value })}
                    required
                  />
                </div>

                {/* Salary Month */}
                <div className="col-md-3 mb-2">
                  <label htmlFor="salay-month" className="form-label fw-semibold">কোন মাসে দিচ্ছে</label>
                  <select
                    name="salary_month"
                    id="salay-month"
                    className="form-select"
                    value={salaryDayForm.salary_month}
                    onChange={(e) => setSalaryDayForm({ ...salaryDayForm, salary_month: e.target.value })}
                    required
                  >
                    <option value="জানুয়ারি">জানুয়ারি</option>
                    <option value="ফেব্রুয়ারি">ফেব্রুয়ারি</option>
                    <option value="মার্চ">মার্চ</option>
                    <option value="এপ্রিল">এপ্রিল</option>
                    <option value="মে">মে</option>
                    <option value="জুন">জুন</option>
                    <option value="জুলাই">জুলাই</option>
                    <option value="অগাস্ট">অগাস্ট</option>
                    <option value="সেপ্টেম্বর">সেপ্টেম্বর</option>
                    <option value="অক্টোবর">অক্টোবর</option>
                    <option value="নভেম্বর">নভেম্বর</option>
                    <option value="ডিসেম্বর">ডিসেম্বর</option>
                  </select>
                </div>

                {/* Deposit Category */}
                <div className="col-md-3 mb-2">
                  <label htmlFor="deposit_category" className="form-label fw-semibold">কোন খাত থেকে</label>
                  <select
                    name="deposit_category_id"
                    id="deposit_category"
                    className="form-select custom-select"
                    value={salaryDayForm.deposit_category_id}
                    onChange={(e) => setSalaryDayForm({ ...salaryDayForm, deposit_category_id: e.target.value })}
                    required
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="মাসিক বেতন">মাসিক বেতন</option>
                    <option value="মাসিক চাঁদা">মাসিক চাঁদা</option>
                    <option value="ভর্তি ফি">ভর্তি ফি</option>
                    <option value="ছাএদের খানার টাকা">ছাএদের খানার টাকা</option>
                    <option value="দান">দান</option>
                    <option value="যাকাত">যাকাত</option>
                    <option value="এতিমখানার">এতিমখানার</option>
                    <option value="বিবিধ">বিবিধ</option>
                  </select>
                </div>

                {/* Account */}
                <div className="col-md-3 mb-2">
                  <label htmlFor="account" className="form-label fw-semibold">এ্যাকাউন্ট</label>
                  <select
                    name="account"
                    id="account"
                    className="form-select"
                    value={salaryDayForm.account}
                    onChange={(e) => setSalaryDayForm({ ...salaryDayForm, account: e.target.value })}
                    required
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                    ))}
                  </select>
                </div>

                {/* Expense Category */}
                <div className="col-md-3 mb-2 col-12">
                  <label htmlFor="expense_category" className="form-label fw-semibold">
                    খরচের খাত <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="expense_category"
                    className="form-control"
                    value="শিক্ষকগণের বেতন"
                    readOnly
                  />
                </div>

                {/* Payment Method */}
                <div className="col-md-3 mb-2 col-sm-12">
                  <label htmlFor="payment_method" className="form-label fw-bold">পেমেন্ট মেথড</label>
                  <select
                    name="payment_method_id"
                    id="payment_method"
                    className="form-select custom-select"
                    value={salaryDayForm.payment_method_id}
                    onChange={(e) => setSalaryDayForm({ ...salaryDayForm, payment_method_id: e.target.value })}
                    required
                  >
                    <option value="cash">নগদ (Cash)</option>
                    <option value="bkash">বিকাশ (Bkash)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                  </select>
                </div>
              </div>

              {/* Table of Teachers for Salary */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th className="text-center" style={{ width: '60px' }}>নং</th>
                      <th>নাম</th>
                      <th className="text-center" style={{ width: '220px' }}>বেতন</th>
                      <th className="text-center" style={{ width: '220px' }}>মন্তব্য</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher, idx) => {
                      const entry = salaryAmounts[teacher.id] || { amount: teacher.salary || '14000', note: '' };
                      return (
                        <tr key={teacher.id}>
                          <td className="text-center">{idx + 1}</td>
                          <td className="fw-bold">
                            {teacher.name}
                            <span className="text-muted small d-block">({teacher.designation || 'সহকারী শিক্ষক'})</span>
                          </td>
                          <td className="text-center">
                            <input
                              type="number"
                              className="form-control salary-amount text-end font-monospace"
                              value={entry.amount}
                              onChange={(e) => setSalaryAmounts({
                                ...salaryAmounts,
                                [teacher.id]: { ...entry, amount: e.target.value }
                              })}
                              step="1"
                              required
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="text"
                              placeholder="মন্তব্য লিখুন"
                              className="form-control"
                              value={entry.note}
                              onChange={(e) => setSalaryAmounts({
                                ...salaryAmounts,
                                [teacher.id]: { ...entry, note: e.target.value }
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
                  <i className="fa-solid fa-save me-2"></i> বেতন সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- 6. TEACHER SALARY LIST (/admin/teacher/salary/list) ---------------- */}
      {activeTab === 'salary-list' && (
        <div className="container-fluid p-0">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0 text-white">
                <i className="fas fa-list-alt me-2"></i>শিক্ষকের বেতন প্রদানের লিস্ট
              </h4>
              <button
                onClick={() => setActiveTab('salary-day')}
                className="btn btn-success btn-sm fw-bold"
              >
                <i className="fas fa-plus me-1"></i> নতুন যুক্ত করুন
              </button>
            </div>

            <div className="table-responsive card-body">
              <table className="table table-striped table-hover align-middle" id="teacher-salaries-datatable">
                <thead className="table-light">
                  <tr>
                    <th title="নং" style={{ width: '50px' }}>নং</th>
                    <th title="ভাউচার নং">ভাউচার নং</th>
                    <th title="শিক্ষকের নাম">শিক্ষকের নাম</th>
                    <th title="বেতনের মাস">বেতনের মাস</th>
                    <th title="পরিশোধের তারিখ">পরিশোধের তারিখ</th>
                    <th title="বেতনের পরিমাণ" className="text-end">বেতনের পরিমাণ</th>
                    <th title="মন্তব্য">মন্তব্য</th>
                    <th title="স্লিপ" className="text-center">স্লিপ</th>
                    <th title="কার্যক্রম" className="text-center">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherSalaryPayments.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center text-muted py-4">
                        কোন বেতন প্রদানের তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    teacherSalaryPayments.map((p, idx) => (
                      <tr key={p.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-monospace fw-bold text-primary">{p.voucherNo || `TSAL-${1000 + idx}`}</td>
                        <td className="fw-bold">{p.teacherName}</td>
                        <td>{p.month} {p.year}</td>
                        <td>{p.date}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(p.amount || 0).toLocaleString('en-IN')}</td>
                        <td>{p.note || '-'}</td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(p)}
                            className="btn btn-sm btn-info text-white"
                            title="স্লিপ"
                          >
                            <i className="fa-solid fa-print me-1"></i> স্লিপ
                          </button>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              onClick={() => handleOpenEditSalary(p)}
                              className="btn btn-sm btn-primary"
                              title="এডিট"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('আপনি কি নিশ্চিতভাবে এই বেতন প্রদানের রেকর্ড মুছে ফেলতে চান?')) {
                                  deleteTeacherSalaryPayment(p.id);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="মুছে ফেলুন"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="m-3 d-flex justify-content-end no-print">
              <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Salary Modal matching /admin/teacher/salary/{id}/edit */}
      {editingSalary && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <form onSubmit={handleUpdateSalarySubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-pen-to-square me-2"></i>বেতন প্রদান তথ্য আপডেট করুন
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditingSalary(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="alert alert-light border mb-4">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <strong>ভাউচার নং:</strong> <span className="font-monospace text-primary fw-bold">{editingSalary.voucherNo || 'TSAL-001'}</span>
                    </div>
                    <div className="col-md-4">
                      <strong>শিক্ষকের নাম:</strong> <span className="fw-bold">{editingSalary.teacherName}</span>
                    </div>
                    <div className="col-md-4">
                      <strong>বেতনের মাস:</strong> <span className="badge bg-info">{editingSalary.month} {editingSalary.year || ''}</span>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">তারিখ <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      value={editingSalaryForm.payment_date}
                      onChange={(e) => setEditingSalaryForm({ ...editingSalaryForm, payment_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">কোন খাত থেকে</label>
                    <select
                      className="form-select"
                      value={editingSalaryForm.deposit_category_id}
                      onChange={(e) => setEditingSalaryForm({ ...editingSalaryForm, deposit_category_id: e.target.value })}
                      required
                    >
                      <option value="মাসিক বেতন">মাসিক বেতন</option>
                      <option value="মাসিক চাঁদা">মাসিক চাঁদা</option>
                      <option value="ভর্তি ফি">ভর্তি ফি</option>
                      <option value="ছাএদের খানার টাকা">ছাএদের খানার টাকা</option>
                      <option value="দান">দান</option>
                      <option value="যাকাত">যাকাত</option>
                      <option value="এতিমখানার">এতিমখানার</option>
                      <option value="বিবিধ">বিবিধ</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">এ্যাকাউন্ট <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={editingSalaryForm.account}
                      onChange={(e) => setEditingSalaryForm({ ...editingSalaryForm, account: e.target.value })}
                      required
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">খরচের খাত</label>
                    <input
                      type="text"
                      className="form-control"
                      value="শিক্ষকগণের বেতন"
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">পেমেন্ট মেথড <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={editingSalaryForm.payment_method_id}
                      onChange={(e) => setEditingSalaryForm({ ...editingSalaryForm, payment_method_id: e.target.value })}
                      required
                    >
                      <option value="cash">নগদ (Cash)</option>
                      <option value="bkash">বিকাশ (Bkash)</option>
                      <option value="bank">ব্যাংক (Bank)</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">বেতনের পরিমাণ <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control font-monospace fw-bold"
                      value={editingSalaryForm.amount}
                      onChange={(e) => setEditingSalaryForm({ ...editingSalaryForm, amount: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">মন্তব্য</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={editingSalaryForm.note}
                      onChange={(e) => setEditingSalaryForm({ ...editingSalaryForm, note: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingSalary(null)}
                >
                  বাতিল করুন
                </button>
                <button type="submit" className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-save me-1"></i> আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Details & Edit Modal */}
      {selectedTeacherForModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className={`fa-solid ${isEditingTeacherModal ? 'fa-user-pen' : 'fa-user-tie'} me-2`}></i>
                  {isEditingTeacherModal ? 'শিক্ষকের তথ্য সম্পাদনা' : 'শিক্ষকের বিস্তারিত তথ্য'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setSelectedTeacherForModal(null);
                    setIsEditingTeacherModal(false);
                  }}
                ></button>
              </div>

              {isEditingTeacherModal ? (
                <form onSubmit={handleSaveTeacherEdit}>
                  <div className="modal-body p-4">
                    <div className="text-center mb-4">
                      <img
                        src={teacherEditForm.photo || '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg'}
                        alt="Teacher"
                        className="img-thumbnail rounded-circle mb-2"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <div>
                        <label className="btn btn-sm btn-outline-primary">
                          <i className="fa-solid fa-camera me-1"></i> ছবি পরিবর্তন
                          <input
                            type="file"
                            className="d-none"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  setTeacherEditForm({ ...teacherEditForm, photo: ev.target.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">শিক্ষকের নাম <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.name}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">পদবি</label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.designation}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, designation: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">বিভাগ</label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.department}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, department: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">মোবাইল নম্বর <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.mobile}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, mobile: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">জরুরী যোগাযোগ নম্বর</label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.emergencyPhone}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, emergencyPhone: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">ইমেইল</label>
                        <input
                          type="email"
                          className="form-control"
                          value={teacherEditForm.email}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, email: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">বেতন (টাকা) <span className="text-danger">*</span></label>
                        <input
                          type="number"
                          className="form-control font-monospace"
                          value={teacherEditForm.salary}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, salary: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">রক্তের গ্রুপ</label>
                        <select
                          className="form-select"
                          value={teacherEditForm.bloodGroup}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, bloodGroup: e.target.value })}
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">শিক্ষাগত যোগ্যতা</label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.qualification}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, qualification: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">যোগদানের তারিখ</label>
                        <input
                          type="date"
                          className="form-control"
                          value={teacherEditForm.joiningDate}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, joiningDate: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">ঠিকানা</label>
                        <input
                          type="text"
                          className="form-control"
                          value={teacherEditForm.address}
                          onChange={(e) => setTeacherEditForm({ ...teacherEditForm, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsEditingTeacherModal(false)}
                    >
                      বাতিল
                    </button>
                    <button type="submit" className="btn btn-primary fw-bold">
                      <i className="fa-solid fa-save me-1"></i> সংরক্ষণ করুন
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="modal-body p-4">
                    <div className="text-center mb-4">
                      <img
                        src={selectedTeacherForModal.photo || '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg'}
                        alt="Teacher Photo"
                        className="img-thumbnail rounded-circle"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                      <h4 className="mt-2 mb-0 fw-bold">{selectedTeacherForModal.name}</h4>
                      <p className="text-muted">{selectedTeacherForModal.designation || 'সহকারী শিক্ষক'}</p>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <p className="mb-2"><strong>আইডিঃ</strong> {selectedTeacherForModal.id}</p>
                        <p className="mb-2"><strong>মোবাইল নম্বরঃ</strong> {selectedTeacherForModal.mobile || selectedTeacherForModal.phone}</p>
                        <p className="mb-2"><strong>জরুরী যোগাযোগঃ</strong> {selectedTeacherForModal.emergencyPhone || '-'}</p>
                        <p className="mb-2"><strong>ইমেইলঃ</strong> {selectedTeacherForModal.email || '-'}</p>
                        <p className="mb-2"><strong>বিভাগঃ</strong> {selectedTeacherForModal.department || 'সাধারণ'}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-2"><strong>বেতনঃ</strong> ৳ {parseFloat(selectedTeacherForModal.salary || 14000).toLocaleString('en-IN')}</p>
                        <p className="mb-2"><strong>রক্তের গ্রুপঃ</strong> {selectedTeacherForModal.bloodGroup || 'B+'}</p>
                        <p className="mb-2"><strong>যোগ্যতাঃ</strong> {selectedTeacherForModal.qualification || 'দাওরায়ে হাদিস'}</p>
                        <p className="mb-2"><strong>যোগদানের তারিখঃ</strong> {selectedTeacherForModal.joiningDate || '2024-01-01'}</p>
                        <p className="mb-2"><strong>ঠিকানাঃ</strong> {selectedTeacherForModal.address || 'বদরখালী, চকরিয়া, কক্সবাজার'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleOpenTeacherModal(selectedTeacherForModal, true)}
                    >
                      <i className="fa-solid fa-pen-to-square me-1"></i> সম্পাদনা করুন
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setSelectedTeacherForModal(null);
                        setIsEditingTeacherModal(false);
                      }}
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
