import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  showSuccessAlert,
  showWarningAlert,
  showConfirmDialog
} from '../../utils/swal';

import { countBengaliCharacters } from '../../utils/smsUtils';
export { countBengaliCharacters };

// Helper to format clean WhatsApp numbers (Bangladesh +880 format)
export const formatWhatsAppNumber = (phone) => {
  if (!phone) return '';
  let clean = String(phone).replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = '88' + clean;
  } else if (clean.length === 11 && clean.startsWith('1')) {
    clean = '880' + clean;
  } else if (clean.length === 10 && !clean.startsWith('88')) {
    clean = '880' + clean;
  }
  return clean;
};

// Helper to generate direct WhatsApp web / app link
export const getWhatsAppLink = (phone, text) => {
  const clean = formatWhatsAppNumber(phone);
  if (!clean) return '';
  return `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(text || '')}`;
};

export const SmsModule = ({
  defaultView = 'compose',
  defaultRecipientTarget = 'all_students',
  initialType = 'client'
}) => {
  const {
    students,
    teachers,
    jamats,
    sendSms,
    smsLogs,
    showToast
  } = useApp();

  // Determine current mode: 'client' (ছাত্র/ছাত্রী) or 'teacher' (শিক্ষক)
  const isTeacherMode = initialType === 'teacher' || defaultRecipientTarget === 'all_teachers';
  const pageTitle = isTeacherMode ? 'শিক্ষককে WhatsApp মেসেজ পাঠান' : 'ছাত্র ছাত্রীকে WhatsApp মেসেজ পাঠান';

  // Form states
  const [messageBody, setMessageBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [remainingCharacters, setRemainingCharacters] = useState(500); // WhatsApp has generous length limit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick search filter for dropdown selection
  const [quickSearch, setQuickSearch] = useState('');

  // Client recipient states
  const [studentSelectionMode, setStudentSelectionMode] = useState('send_to_all');
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [studentSearchText, setStudentSearchText] = useState('');

  // Teacher recipient states
  const [teacherSelectionMode, setTeacherSelectionMode] = useState('send_to_all');
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const [teacherSearchText, setTeacherSearchText] = useState('');

  // Modals
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchRecipients, setBatchRecipients] = useState([]);

  // Sync initial student selection to all students
  useEffect(() => {
    if (students && students.length > 0) {
      setSelectedStudentIds(students.map(s => String(s.id)));
    }
  }, [students]);

  // Sync initial teacher selection to all teachers
  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setSelectedTeacherIds(teachers.map(t => String(t.id)));
    }
  }, [teachers]);

  // Message change handler
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessageBody(text);
    const count = countBengaliCharacters(text);
    setCharacterCount(count);
    const remaining = 500 - count;
    setRemainingCharacters(remaining);
  };

  // Filtered students for Client mode
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchJamat = selectedJamat === 'all' || s.jamat === selectedJamat;
      const matchSearch = !studentSearchText ||
        (s.name && s.name.toLowerCase().includes(studentSearchText.toLowerCase())) ||
        (s.roll && String(s.roll).includes(studentSearchText)) ||
        (s.admissionNo && String(s.admissionNo).includes(studentSearchText)) ||
        (s.guardianPhone && String(s.guardianPhone).includes(studentSearchText));
      return matchJamat && matchSearch;
    });
  }, [students, selectedJamat, studentSearchText]);

  // Filtered teachers for Teacher mode
  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchSearch = !teacherSearchText ||
        (t.name && t.name.toLowerCase().includes(teacherSearchText.toLowerCase())) ||
        (t.designation && t.designation.toLowerCase().includes(teacherSearchText.toLowerCase())) ||
        (t.mobile && String(t.mobile).includes(teacherSearchText));
      return matchSearch;
    });
  }, [teachers, teacherSearchText]);

  // Filtered and Search-Sorted Dropdown students
  const dropdownStudents = useMemo(() => {
    let pool = selectedJamat === 'all' ? [...students] : students.filter(s => s.jamat === selectedJamat);
    if (!quickSearch.trim()) return pool;

    const query = quickSearch.trim().toLowerCase();
    // Sort matching students to the very top
    return pool.sort((a, b) => {
      const aName = (a.name || '').toLowerCase();
      const bName = (b.name || '').toLowerCase();
      const aRoll = String(a.roll || a.admissionNo || '');
      const bRoll = String(b.roll || b.admissionNo || '');
      const aPhone = String(a.guardianPhone || '');
      const bPhone = String(b.guardianPhone || '');

      const aMatches = aName.includes(query) || aRoll.includes(query) || aPhone.includes(query);
      const bMatches = bName.includes(query) || bRoll.includes(query) || bPhone.includes(query);

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [students, selectedJamat, quickSearch]);

  // Filtered and Search-Sorted Dropdown teachers
  const dropdownTeachers = useMemo(() => {
    if (!quickSearch.trim()) return teachers;
    const query = quickSearch.trim().toLowerCase();
    return [...teachers].sort((a, b) => {
      const aName = (a.name || '').toLowerCase();
      const bName = (b.name || '').toLowerCase();
      const aDesig = (a.designation || '').toLowerCase();
      const bDesig = (b.designation || '').toLowerCase();
      const aPhone = String(a.mobile || '');
      const bPhone = String(b.mobile || '');

      const aMatches = aName.includes(query) || aDesig.includes(query) || aPhone.includes(query);
      const bMatches = bName.includes(query) || bDesig.includes(query) || bPhone.includes(query);

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [teachers, quickSearch]);

  // Calculated target recipients with details for WhatsApp
  const targetRecipientDetails = useMemo(() => {
    if (isTeacherMode) {
      if (teacherSelectionMode === 'send_to_all') {
        return teachers.map(t => ({ id: t.id, name: t.name, role: t.designation, phone: t.mobile })).filter(r => Boolean(r.phone));
      } else if (teacherSelectionMode.startsWith('teacher_')) {
        const tId = teacherSelectionMode.replace('teacher_', '');
        const target = teachers.find(t => String(t.id) === String(tId));
        return target && target.mobile ? [{ id: target.id, name: target.name, role: target.designation, phone: target.mobile }] : [];
      } else {
        return teachers
          .filter(t => selectedTeacherIds.includes(String(t.id)))
          .map(t => ({ id: t.id, name: t.name, role: t.designation, phone: t.mobile }))
          .filter(r => Boolean(r.phone));
      }
    } else {
      if (studentSelectionMode === 'send_to_all') {
        const pool = selectedJamat === 'all' ? students : students.filter(s => s.jamat === selectedJamat);
        return pool.map(s => ({ id: s.id, name: s.name, role: s.jamat, phone: s.guardianPhone || s.phone })).filter(r => Boolean(r.phone));
      } else if (studentSelectionMode.startsWith('student_')) {
        const sId = studentSelectionMode.replace('student_', '');
        const target = students.find(s => String(s.id) === String(sId));
        return target && (target.guardianPhone || target.phone)
          ? [{ id: target.id, name: target.name, role: target.jamat, phone: target.guardianPhone || target.phone }]
          : [];
      } else {
        return students
          .filter(s => selectedJamat === 'all' || s.jamat === selectedJamat)
          .filter(s => selectedStudentIds.includes(String(s.id)))
          .map(s => ({ id: s.id, name: s.name, role: s.jamat, phone: s.guardianPhone || s.phone }))
          .filter(r => Boolean(r.phone));
      }
    }
  }, [
    isTeacherMode,
    teacherSelectionMode,
    teachers,
    selectedTeacherIds,
    studentSelectionMode,
    students,
    selectedStudentIds,
    selectedJamat
  ]);

  const recipientNumbers = useMemo(() => {
    return targetRecipientDetails.map(r => r.phone).filter(Boolean);
  }, [targetRecipientDetails]);

  // Select all / Deselect all handlers for students
  const handleToggleSelectAllStudents = (e) => {
    if (e.target.checked) {
      const allIds = filteredStudents.map(s => String(s.id));
      setSelectedStudentIds(prev => Array.from(new Set([...prev, ...allIds])));
    } else {
      const filteredIds = new Set(filteredStudents.map(s => String(s.id)));
      setSelectedStudentIds(prev => prev.filter(id => !filteredIds.has(id)));
    }
  };

  const isAllFilteredStudentsSelected = useMemo(() => {
    if (filteredStudents.length === 0) return false;
    return filteredStudents.every(s => selectedStudentIds.includes(String(s.id)));
  }, [filteredStudents, selectedStudentIds]);

  // Select all / Deselect all handlers for teachers
  const handleToggleSelectAllTeachers = (e) => {
    if (e.target.checked) {
      setSelectedTeacherIds(filteredTeachers.map(t => String(t.id)));
    } else {
      setSelectedTeacherIds([]);
    }
  };

  const isAllFilteredTeachersSelected = useMemo(() => {
    if (filteredTeachers.length === 0) return false;
    return filteredTeachers.every(t => selectedTeacherIds.includes(String(t.id)));
  }, [filteredTeachers, selectedTeacherIds]);

  // Direct single WhatsApp sender
  const openDirectWhatsApp = (phone, text = messageBody) => {
    const link = getWhatsAppLink(phone, text);
    if (!link) {
      showWarningAlert('সতর্কতা', 'সঠিক মোবাইল নম্বর পাওয়া যায়নি!');
      return;
    }
    window.open(link, '_blank');
  };

  // Form submission with Direct WhatsApp messaging
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!messageBody.trim()) {
      await showWarningAlert('সতর্কতা', 'WhatsApp বার্তার বিষয়বস্তু লিখুন!');
      return;
    }

    if (targetRecipientDetails.length === 0) {
      await showWarningAlert('প্রাপক পাওয়া যায়নি', 'অন্তত একজন প্রাপক নির্বাচন করুন যাদের মোবাইল নম্বর আছে!');
      return;
    }

    // Single Recipient Case: Direct Launch
    if (targetRecipientDetails.length === 1) {
      const single = targetRecipientDetails[0];
      const link = getWhatsAppLink(single.phone, messageBody);

      // Confirm dialog
      const confirmResult = await showConfirmDialog(
        'WhatsApp মেসেজ পাঠাতে চান?',
        `প্রাপক: <b>${single.name}</b> (${single.role || ''})<br>` +
        `WhatsApp নম্বর: <b class="text-success">${single.phone}</b><br>` +
        `<span class="badge bg-success-subtle text-success border border-success mt-2">সম্পূর্ণ ফ্রি WhatsApp বার্তা (কোনো চার্জ নেই)</span><br><br>` +
        `<div class="p-2 bg-light rounded text-start text-dark small font-monospace">"${messageBody.slice(0, 100)}${messageBody.length > 100 ? '...' : ''}"</div>`,
        'হ্যাঁ, WhatsApp খুলুন',
        'বাতিল'
      );

      if (!confirmResult.isConfirmed) return;

      setIsSubmitting(true);
      try {
        window.open(link, '_blank');
        sendSms([single.phone], messageBody);
        await showSuccessAlert(
          'WhatsApp চ্যাট খোলা হয়েছে!',
          `${single.name}-এর (${single.phone}) নম্বরে WhatsApp বার্তা পাঠানোর জন্য চ্যাট উইন্ডো সফলভাবে ওপেন করা হয়েছে।`
        );
        setMessageBody('');
        setCharacterCount(0);
        setRemainingCharacters(500);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Multiple Recipients Case: Batch Dispatcher Hub
    const confirmResult = await showConfirmDialog(
      'WhatsApp মেসেজ পাঠাতে চান?',
      `প্রাপক সংখ্যা: <b>${targetRecipientDetails.length} জন</b><br>` +
      `<span class="badge bg-success-subtle text-success border border-success mt-2">সম্পূর্ণ ফ্রি WhatsApp বার্তা (কোনো খরচ নেই)</span><br><br>` +
      `<p class="small text-muted mb-0">কনফার্ম করলে প্রেরক হাব ওপেন হবে এবং ১ম প্রাপকের WhatsApp সরাসরি ওপেন হবে।</p>`,
      'হ্যাঁ, মেসেজ প্রেরণ হাব খুলুন',
      'বাতিল'
    );

    if (!confirmResult.isConfirmed) return;

    setIsSubmitting(true);
    try {
      sendSms(recipientNumbers, messageBody);
      setBatchRecipients([...targetRecipientDetails]);
      setShowBatchModal(true);

      // Auto open the first recipient's WhatsApp in a new tab
      if (targetRecipientDetails[0]?.phone) {
        window.open(getWhatsAppLink(targetRecipientDetails[0].phone, messageBody), '_blank');
      }

      if (showToast) {
        showToast(`WhatsApp মেসেজ হাব চালু হয়েছে! মোট ${targetRecipientDetails.length} জন প্রাপক।`, 'success');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !messageBody.trim() ||
    targetRecipientDetails.length === 0 ||
    isSubmitting;

  return (
    <div className="container-fluid p-0">
      <div className="main-content-body">
        <div className="row row-sm">
          <div className="card shadow-lg border-0">
            {/* Header */}
            <div className="card-header bg-gradient border-0 py-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <i className="fa-brands fa-whatsapp me-2 text-success" style={{ fontSize: '1.4rem' }}></i>
                  {pageTitle}
                </h5>

                {/* Free WhatsApp Indicator Badge */}
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success-subtle text-success border border-success px-3 py-2 fs-6 shadow-sm">
                    <i className="fa-brands fa-whatsapp text-success me-1"></i>
                    সম্পূর্ণ ফ্রি WhatsApp মেসেজিং (কোনো রিচার্জ লাগবে না)
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row g-4">
                      {/* Message Body */}
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control shadow-sm"
                            name="message_body"
                            id="messageBody"
                            style={{ height: '180px', resize: 'none' }}
                            placeholder="এখানে আপনার WhatsApp বার্তা লিখুন..."
                            value={messageBody}
                            onChange={handleMessageChange}
                          ></textarea>
                          <label htmlFor="messageBody">
                            <i className="fa-brands fa-whatsapp me-2 text-success"></i>WhatsApp বার্তার বিষয়বস্তু
                          </label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2 px-2">
                          <small className="text-muted">
                            <i className="fas fa-check-circle text-success me-1"></i>সরাসরি অভিভাবক/শিক্ষকের WhatsApp অ্যাপে পৌঁছে যাবে
                          </small>
                          <div>
                            <span className="badge bg-success mt-2 fs-6" id="characterCountBadge">
                              ক্যারেক্টার:{' '}
                              <span id="characterCount" className="fw-bold">
                                {characterCount}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recipient Selection for Client / Student Mode */}
                      {!isTeacherMode && (
                        <div className="col-12">
                          <div className="row g-3">
                            {/* ১. জামাত নির্বাচন ড্রপডাউন */}
                            <div className="col-md-5 col-12">
                              <label htmlFor="jamat_select" className="form-label fw-semibold mb-2">
                                <i className="fas fa-layer-group me-2 text-primary"></i>
                                জামাত নির্বাচন করুন
                              </label>
                              <select
                                id="jamat_select"
                                className="form-control form-select shadow-sm"
                                value={selectedJamat}
                                onChange={(e) => {
                                  setSelectedJamat(e.target.value);
                                  setStudentSelectionMode('send_to_all');
                                }}
                              >
                                <option value="all">সকল জামাত</option>
                                {jamats.map((j) => (
                                  <option key={j.id || j.name} value={j.name}>
                                    {j.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* ২. ছাত্র নির্বাচন ড্রপডাউন (দ্রুত নাম সার্চ সহ) */}
                            <div className="col-md-7 col-12">
                              <label htmlFor="student_id" className="form-label fw-semibold mb-2 d-flex justify-content-between align-items-center">
                                <span>
                                  <i className="fas fa-user-graduate me-2 text-primary"></i>
                                  ছাত্র নির্বাচন করুন
                                </span>
                                {quickSearch && (
                                  <span className="badge bg-light text-primary border small">
                                    ফিল্টার সক্রিয়
                                  </span>
                                )}
                              </label>

                              {/* Search Input for Quick Student Search */}
                              <div className="input-group input-group-sm mb-2 shadow-sm">
                                <span className="input-group-text bg-white border-end-0">
                                  <i className="fas fa-search text-muted"></i>
                                </span>
                                <input
                                  type="text"
                                  className="form-control border-start-0"
                                  placeholder="🔍 নাম, রোল বা মোবাইল লিখে খুঁজুন (নাম সবার উপরে আসবে)..."
                                  value={quickSearch}
                                  onChange={(e) => {
                                    setQuickSearch(e.target.value);
                                    if (e.target.value.trim() && dropdownStudents.length > 0) {
                                      // If user is searching, preselect the top matching student for easy 1-click send
                                      const topMatch = dropdownStudents[0];
                                      setStudentSelectionMode(`student_${topMatch.id}`);
                                    }
                                  }}
                                />
                                {quickSearch && (
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary border-start-0"
                                    onClick={() => setQuickSearch('')}
                                    title="সার্চ মুছুন"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                )}
                              </div>

                              <div className="row g-2">
                                <div className="col-9">
                                  <select
                                    name="student_id"
                                    id="student_id"
                                    className="form-control form-select student_id shadow-sm"
                                    value={studentSelectionMode}
                                    onChange={(e) => setStudentSelectionMode(e.target.value)}
                                  >
                                    <option value="send_to_all">
                                      {selectedJamat === 'all' ? 'সবাইকে পাঠান (সকল ছাত্র/ছাত্রী)' : `${selectedJamat} - সবাইকে পাঠান`}
                                    </option>
                                    <optgroup label={quickSearch ? `অনুসন্ধানের ফলাফল (${dropdownStudents.length} জন)` : "একক ছাত্র/ছাত্রী নির্বাচন"}>
                                      {dropdownStudents.map((s) => (
                                        <option key={s.id} value={`student_${s.id}`}>
                                          {s.roll || s.admissionNo ? `[রোল: ${s.roll || s.admissionNo}] ` : ''}{s.name} - 📱 {s.guardianPhone || 'মোবাইল নেই'}
                                        </option>
                                      ))}
                                    </optgroup>
                                  </select>
                                </div>
                                <div className="col-3">
                                  <button
                                    id="clientAddModalBtn"
                                    className="btn btn-success w-100 shadow-sm text-nowrap d-flex align-items-center justify-content-center"
                                    style={{ whiteSpace: 'nowrap' }}
                                    type="button"
                                    onClick={() => setShowRecipientModal(true)}
                                    title="বিস্তারিত প্রাপক তালিকা ও WhatsApp তালিকা"
                                  >
                                    <i className="fas fa-users me-1"></i>তালিকা
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Recipient summary indicator */}
                          <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                            <small className="text-muted">
                              <i className="fa-brands fa-whatsapp text-success me-1"></i>
                              প্রাপক সংখ্যা: <b className="text-dark">{targetRecipientDetails.length} জন</b>
                            </small>
                            <small className="text-success fw-bold">
                              <i className="fas fa-gift me-1"></i>খরচ: ৳ ০.০০ (সম্পূর্ণ ফ্রি)
                            </small>
                          </div>
                        </div>
                      )}

                      {/* Recipient Selection for Teacher Mode */}
                      {isTeacherMode && (
                        <div className="col-12">
                          <label htmlFor="teacher_id" className="form-label fw-semibold mb-2 d-flex justify-content-between align-items-center">
                            <span>
                              <i className="fas fa-chalkboard-user me-2 text-primary"></i>
                              শিক্ষক নির্বাচন করুন
                            </span>
                            {quickSearch && (
                              <span className="badge bg-light text-primary border small">
                                ফিল্টার সক্রিয়
                              </span>
                            )}
                          </label>

                          {/* Search Input for Quick Teacher Search */}
                          <div className="input-group input-group-sm mb-2 shadow-sm">
                            <span className="input-group-text bg-white border-end-0">
                              <i className="fas fa-search text-muted"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control border-start-0"
                              placeholder="🔍 শিক্ষকের নাম বা মোবাইল লিখে খুঁজুন (নাম সবার উপরে আসবে)..."
                              value={quickSearch}
                              onChange={(e) => {
                                setQuickSearch(e.target.value);
                                if (e.target.value.trim() && dropdownTeachers.length > 0) {
                                  const topMatch = dropdownTeachers[0];
                                  setTeacherSelectionMode(`teacher_${topMatch.id}`);
                                }
                              }}
                            />
                            {quickSearch && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary border-start-0"
                                onClick={() => setQuickSearch('')}
                                title="সার্চ মুছুন"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            )}
                          </div>

                          <div className="row g-2">
                            <div className="col-9">
                              <select
                                name="teacher_id"
                                id="teacher_id"
                                className="form-control form-select teacher_id shadow-sm"
                                value={teacherSelectionMode}
                                onChange={(e) => setTeacherSelectionMode(e.target.value)}
                              >
                                <option value="send_to_all">সকল শিক্ষক ({teachers.length} জন)</option>
                                <optgroup label={quickSearch ? `অনুসন্ধানের ফলাফল (${dropdownTeachers.length} জন)` : "একক শিক্ষক নির্বাচন"}>
                                  {dropdownTeachers.map((t) => (
                                    <option key={t.id} value={`teacher_${t.id}`}>
                                      {t.name} ({t.designation}) - 📱 {t.mobile || 'মোবাইল নেই'}
                                    </option>
                                  ))}
                                </optgroup>
                              </select>
                            </div>
                            <div className="col-3">
                              <button
                                id="supplierAddModalBtn"
                                className="btn btn-success w-100 shadow-sm"
                                type="button"
                                onClick={() => setShowRecipientModal(true)}
                                title="শিক্ষকদের তালিকা দেখুন ও ফিল্টার করুন"
                              >
                                <i className="fas fa-users me-1"></i>তালিকা
                              </button>
                            </div>
                          </div>

                          {/* Live summary indicator */}
                          <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                            <small className="text-muted">
                              <i className="fa-brands fa-whatsapp text-success me-1"></i>
                              প্রাপক শিক্ষক: <b className="text-dark">{targetRecipientDetails.length} জন</b>
                            </small>
                            <small className="text-success fw-bold">
                              <i className="fas fa-gift me-1"></i>খরচ: ৳ ০.০০ (সম্পূর্ণ ফ্রি)
                            </small>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="col-12 mt-4">
                        <div className="d-grid">
                          <button
                            type="submit"
                            id="submitButton"
                            className="btn btn-success btn-lg rounded-pill shadow-sm fw-bold py-3"
                            disabled={isSubmitDisabled}
                          >
                            <i className="fa-brands fa-whatsapp me-2" style={{ fontSize: '1.25rem' }}></i>
                            {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'WhatsApp এ বার্তা পাঠান'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient Selection & Filter Modal */}
      {showRecipientModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-gradient text-dark border-bottom py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fa-brands fa-whatsapp text-success me-2"></i>
                  {isTeacherMode ? 'শিক্ষক প্রাপক তালিকা ও সরাসরি WhatsApp' : 'ছাত্র/ছাত্রী প্রাপক তালিকা ও সরাসরি WhatsApp'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRecipientModal(false)}
                ></button>
              </div>

              <div className="modal-body p-3">
                {/* Search & Filters */}
                <div className="row g-2 mb-3">
                  {!isTeacherMode && (
                    <div className="col-md-5">
                      <label className="form-label small fw-bold text-muted mb-1">জামাত ফিল্টার:</label>
                      <select
                        className="form-select form-select-sm"
                        value={selectedJamat}
                        onChange={(e) => setSelectedJamat(e.target.value)}
                      >
                        <option value="all">সকল জামাত</option>
                        {jamats.map(j => (
                          <option key={j.id || j.name} value={j.name}>
                            {j.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className={isTeacherMode ? 'col-12' : 'col-md-7'}>
                    <label className="form-label small fw-bold text-muted mb-1">অনুসন্ধান করুন:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder={isTeacherMode ? 'শিক্ষকের নাম, পদবি বা মোবাইল নম্বর লিখুন...' : 'নাম, রোল বা মোবাইল নম্বর লিখুন...'}
                      value={isTeacherMode ? teacherSearchText : studentSearchText}
                      onChange={(e) => isTeacherMode ? setTeacherSearchText(e.target.value) : setStudentSearchText(e.target.value)}
                    />
                  </div>
                </div>

                {/* Table for Client / Student mode */}
                {!isTeacherMode && (
                  <div className="table-responsive border rounded-3" style={{ maxHeight: '350px' }}>
                    <table className="table table-hover table-striped table-sm align-middle mb-0">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th style={{ width: '40px' }} className="text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isAllFilteredStudentsSelected}
                              onChange={handleToggleSelectAllStudents}
                              title="সবাইকে নির্বাচন / বাতিল করুন"
                            />
                          </th>
                          <th>ভর্তি/রোল</th>
                          <th>ছাত্র/ছাত্রীর নাম</th>
                          <th>জামাত</th>
                          <th>WhatsApp নম্বর</th>
                          <th className="text-center">সরাসরি বার্তা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                              কোনো ছাত্র/ছাত্রী পাওয়া যায়নি
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map(s => {
                            const isChecked = selectedStudentIds.includes(String(s.id));
                            const phone = s.guardianPhone || s.phone;
                            return (
                              <tr
                                key={s.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedStudentIds(prev =>
                                    isChecked ? prev.filter(id => id !== String(s.id)) : [...prev, String(s.id)]
                                  );
                                }}
                              >
                                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setSelectedStudentIds(prev =>
                                        checked ? [...prev, String(s.id)] : prev.filter(id => id !== String(s.id))
                                      );
                                    }}
                                  />
                                </td>
                                <td className="font-monospace">{s.roll || s.admissionNo || '-'}</td>
                                <td className="fw-semibold text-dark">{s.name}</td>
                                <td><span className="badge bg-light text-dark border">{s.jamat}</span></td>
                                <td className="font-monospace text-primary">
                                  {phone ? (
                                    <span><i className="fa-brands fa-whatsapp text-success me-1"></i>{phone}</span>
                                  ) : (
                                    <span className="text-danger small">মোবাইল নেই</span>
                                  )}
                                </td>
                                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                  {phone ? (
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-success px-2 py-0.5 rounded-pill"
                                      onClick={() => openDirectWhatsApp(phone)}
                                      title="সরাসরি WhatsApp চ্যাট খুলুন"
                                    >
                                      <i className="fa-brands fa-whatsapp me-1"></i>চ্যাট
                                    </button>
                                  ) : (
                                    <span className="text-muted small">-</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Table for Teacher mode */}
                {isTeacherMode && (
                  <div className="table-responsive border rounded-3" style={{ maxHeight: '350px' }}>
                    <table className="table table-hover table-striped table-sm align-middle mb-0">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th style={{ width: '40px' }} className="text-center">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={isAllFilteredTeachersSelected}
                              onChange={handleToggleSelectAllTeachers}
                              title="সবাইকে নির্বাচন / বাতিল করুন"
                            />
                          </th>
                          <th>শিক্ষকের নাম</th>
                          <th>পদবি</th>
                          <th>WhatsApp নম্বর</th>
                          <th className="text-center">সরাসরি বার্তা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTeachers.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">
                              কোনো শিক্ষক পাওয়া যায়নি
                            </td>
                          </tr>
                        ) : (
                          filteredTeachers.map(t => {
                            const isChecked = selectedTeacherIds.includes(String(t.id));
                            return (
                              <tr
                                key={t.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setSelectedTeacherIds(prev =>
                                    isChecked ? prev.filter(id => id !== String(t.id)) : [...prev, String(t.id)]
                                  );
                                }}
                              >
                                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setSelectedTeacherIds(prev =>
                                        checked ? [...prev, String(t.id)] : prev.filter(id => id !== String(t.id))
                                      );
                                    }}
                                  />
                                </td>
                                <td className="fw-semibold text-dark">{t.name}</td>
                                <td><span className="badge bg-light text-dark border">{t.designation}</span></td>
                                <td className="font-monospace text-primary">
                                  {t.mobile ? (
                                    <span><i className="fa-brands fa-whatsapp text-success me-1"></i>{t.mobile}</span>
                                  ) : (
                                    <span className="text-danger small">মোবাইল নেই</span>
                                  )}
                                </td>
                                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                  {t.mobile ? (
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-success px-2 py-0.5 rounded-pill"
                                      onClick={() => openDirectWhatsApp(t.mobile)}
                                      title="সরাসরি WhatsApp চ্যাট খুলুন"
                                    >
                                      <i className="fa-brands fa-whatsapp me-1"></i>চ্যাট
                                    </button>
                                  ) : (
                                    <span className="text-muted small">-</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="modal-footer bg-light py-2 px-3 d-flex justify-content-between align-items-center">
                <div className="small text-muted">
                  মোট নির্বাচিত: <b className="text-dark">{isTeacherMode ? selectedTeacherIds.length : selectedStudentIds.length} জন</b> (বৈধ WhatsApp নম্বর: <b className="text-success">{recipientNumbers.length} টি</b>)
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-sm px-4 rounded-pill fw-bold"
                  onClick={() => setShowRecipientModal(false)}
                >
                  <i className="fas fa-check me-1"></i>ঠিক আছে
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Batch Dispatcher Hub Modal (when multiple recipients are messaged) */}
      {showBatchModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-success text-white py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fa-brands fa-whatsapp me-2"></i>
                  WhatsApp বার্তা প্রেরণ হাব ({batchRecipients.length} জন প্রাপক)
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowBatchModal(false)}
                ></button>
              </div>

              <div className="modal-body p-3">
                <div className="alert alert-success d-flex align-items-center py-2 px-3 mb-3 small">
                  <i className="fa-brands fa-whatsapp fs-4 me-2"></i>
                  <div>
                    <b>১ম প্রাপকের চ্যাট স্বয়ংক্রিয়ভাবে ওপেন করা হয়েছে!</b> নিচের তালিকা থেকে প্রতি জনের পাশে <b>"WhatsApp ওপেন"</b> বাটনে ক্লিক করে খুব সহজে দ্রুত মেসেজ সেন্ড করুন। কোনো রিচার্জ বা টাকা কাটার ভয় নেই!
                  </div>
                </div>

                <div className="table-responsive border rounded-3" style={{ maxHeight: '350px' }}>
                  <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th style={{ width: '50px' }}>#</th>
                        <th>নাম</th>
                        <th>বিভাগ / পদবি</th>
                        <th>WhatsApp নম্বর</th>
                        <th className="text-center" style={{ width: '160px' }}>অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchRecipients.map((r, idx) => (
                        <tr key={r.id || idx}>
                          <td className="font-monospace text-muted">{idx + 1}</td>
                          <td className="fw-bold text-dark">{r.name}</td>
                          <td><span className="badge bg-light text-dark border">{r.role || '-'}</span></td>
                          <td className="font-monospace text-success fw-semibold">
                            <i className="fa-brands fa-whatsapp me-1"></i>{r.phone}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-success px-3 py-1 rounded-pill shadow-sm fw-bold"
                              onClick={() => openDirectWhatsApp(r.phone)}
                            >
                              <i className="fa-brands fa-whatsapp me-1"></i> WhatsApp ওপেন
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="modal-footer bg-light py-2 px-3">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm px-4 rounded-pill"
                  onClick={() => {
                    setShowBatchModal(false);
                    setMessageBody('');
                    setCharacterCount(0);
                    setRemainingCharacters(500);
                  }}
                >
                  সম্পন্ন হয়েছে
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message History / Logs (when defaultView === 'logs') */}
      {defaultView === 'logs' && (
        <div className="card shadow-lg border-0 mt-4">
          <div className="card-header bg-gradient border-0 py-3">
            <h5 className="card-title mb-0 fw-bold text-dark">
              <i className="fa-brands fa-whatsapp me-2 text-success"></i>
              WhatsApp বার্তা প্রেরণের ইতিহাস
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th>তারিখ ও সময়</th>
                    <th>প্রাপক সংখ্যা</th>
                    <th>বার্তার বিবরণ</th>
                    <th>খরচ</th>
                    <th>স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody>
                  {smsLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        কোনো WhatsApp প্রেরণের রেকর্ড পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    smsLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="font-monospace small">{log.date}</td>
                        <td>
                          <span className="badge bg-secondary font-monospace">
                            {log.count || (Array.isArray(log.recipients) ? log.recipients.length : 1)} টি
                          </span>
                        </td>
                        <td>{log.message}</td>
                        <td className="font-monospace text-success fw-bold">ফ্রি (৳ ০.০০)</td>
                        <td>
                          <span className="badge bg-success">
                            <i className="fa-brands fa-whatsapp me-1"></i>সফল (WhatsApp)
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
