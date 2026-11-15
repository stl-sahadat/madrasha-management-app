import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  showSwal,
  showSuccessAlert,
  showErrorAlert,
  showWarningAlert,
  showConfirmDialog
} from '../../utils/swal';

import { countBengaliCharacters, calculateRemainingCharacters, SMS_COST_PER_MESSAGE } from '../../utils/smsUtils';
export { countBengaliCharacters };

export const SmsModule = ({
  defaultView = 'compose',
  defaultRecipientTarget = 'all_students',
  initialType = 'client'
}) => {
  const {
    profile,
    students,
    teachers,
    jamats,
    sendSms,
    smsLogs,
    rechargeSmsBalance,
    showToast
  } = useApp();

  // Determine current mode: 'client' (ছাত্র/ছাত্রী) or 'teacher' (শিক্ষক)
  const isTeacherMode = initialType === 'teacher' || defaultRecipientTarget === 'all_teachers';
  const pageTitle = isTeacherMode ? 'শিক্ষককে SMS দিন' : 'ছাত্র ছাত্রীকে SMS দিন';

  // Form states
  const [messageBody, setMessageBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [remainingCharacters, setRemainingCharacters] = useState(160);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [showGatewayModal, setShowGatewayModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('100');

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

  // Message change handler matching live site formula & behavior
  const handleMessageChange = (e) => {
    const text = e.target.value;
    setMessageBody(text);
    const count = countBengaliCharacters(text);
    setCharacterCount(count);
    const remaining = 160 - count;
    setRemainingCharacters(remaining);
  };

  // Character count badge class matching live site
  const badgeClass = useMemo(() => {
    if (remainingCharacters <= 0) return 'bg-danger';
    if (remainingCharacters <= 20) return 'bg-warning text-dark';
    return 'bg-primary';
  }, [remainingCharacters]);

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

  // Filtered dropdown students by selected Jamat (Rule: default 'all' shows all, selecting jamat filters to that jamat)
  const dropdownStudents = useMemo(() => {
    if (selectedJamat === 'all') return students;
    return students.filter(s => s.jamat === selectedJamat);
  }, [students, selectedJamat]);

  // Calculated target recipient numbers
  const recipientNumbers = useMemo(() => {
    if (isTeacherMode) {
      if (teacherSelectionMode === 'send_to_all') {
        return teachers.map(t => t.mobile).filter(Boolean);
      } else if (teacherSelectionMode.startsWith('teacher_')) {
        const tId = teacherSelectionMode.replace('teacher_', '');
        const target = teachers.find(t => String(t.id) === String(tId));
        return target && target.mobile ? [target.mobile] : [];
      } else {
        // Custom multi-selection
        return teachers
          .filter(t => selectedTeacherIds.includes(String(t.id)))
          .map(t => t.mobile)
          .filter(Boolean);
      }
    } else {
      // Client (student) mode
      if (studentSelectionMode === 'send_to_all') {
        const pool = selectedJamat === 'all' ? students : students.filter(s => s.jamat === selectedJamat);
        return pool.map(s => s.guardianPhone).filter(Boolean);
      } else if (studentSelectionMode.startsWith('student_')) {
        const sId = studentSelectionMode.replace('student_', '');
        const target = students.find(s => String(s.id) === String(sId));
        return target && target.guardianPhone ? [target.guardianPhone] : [];
      } else {
        return students
          .filter(s => selectedJamat === 'all' || s.jamat === selectedJamat)
          .filter(s => selectedStudentIds.includes(String(s.id)))
          .map(s => s.guardianPhone)
          .filter(Boolean);
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

  const costPerSms = 0.40;
  const estimatedCost = +(recipientNumbers.length * costPerSms).toFixed(2);
  const currentBalance = Number(profile?.smsBalance || 0);
  const isBalanceInsufficient = currentBalance < estimatedCost;

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

  // Form submission with SweetAlert2 notifications
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!messageBody.trim()) {
      await showWarningAlert('সতর্কতা', 'বার্তার বিষয়বস্তু লিখুন!');
      return;
    }

    if (remainingCharacters <= -1) {
      await showWarningAlert('দৈর্ঘ্য অতিরিক্ত', 'বার্তার দৈর্ঘ্য ১৬০ অক্ষরের বেশি হতে পারবে না!');
      return;
    }

    if (recipientNumbers.length === 0) {
      await showWarningAlert('প্রাপক পাওয়া যায়নি', 'অন্তত একজন প্রাপক নির্বাচন করুন!');
      return;
    }

    // Balance check
    if (isBalanceInsufficient) {
      await showErrorAlert(
        'অপর্যাপ্ত এসএমএস ব্যালেন্স!',
        null,
        `আপনার বর্তমান ব্যালেন্স: <b>৳ ${currentBalance.toFixed(2)}</b><br>` +
        `প্রয়োজনীয় ব্যালেন্স: <b>৳ ${estimatedCost.toFixed(2)}</b> (${recipientNumbers.length} টি এসএমএস × ৳ ০.৪০)<br>` +
        `<span class="text-danger fw-bold mt-2 d-block">অনুগ্রহ করে এসএমএস ব্যালেন্স রিচার্জ করুন।</span>`
      );
      setShowRechargeModal(true);
      return;
    }

    // Confirmation dialog before sending
    const confirmResult = await showConfirmDialog(
      'এসএমএস পাঠাতে চান?',
      `প্রাপক সংখ্যা: <b>${recipientNumbers.length} জন</b><br>` +
      `মোট ব্যয়: <b>৳ ${estimatedCost.toFixed(2)}</b><br><br>` +
      `<div class="p-2 bg-light rounded text-start text-dark small font-monospace">"${messageBody.slice(0, 100)}${messageBody.length > 100 ? '...' : ''}"</div>`,
      'হ্যাঁ, এসএমএস পাঠান',
      'বাতিল'
    );

    if (!confirmResult.isConfirmed) return;

    setIsSubmitting(true);
    try {
      const success = sendSms(recipientNumbers, messageBody);
      if (success) {
        await showSuccessAlert(
          'সফলভাবে পাঠানো হয়েছে!',
          `${recipientNumbers.length} টি নম্বরে এসএমএস সফলভাবে পাঠানো সম্পন্ন হয়েছে।`
        );
        setMessageBody('');
        setCharacterCount(0);
        setRemainingCharacters(160);
      } else {
        await showErrorAlert('ব্যর্থ হয়েছে!', 'এসএমএস প্রেরণ করা সম্ভব হয়নি। ব্যালেন্স চেক করুন।');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Recharge submit
  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(rechargeAmount);
    if (!amt || amt <= 0) return;
    rechargeSmsBalance(amt);
    setShowRechargeModal(false);
    showSuccessAlert('রিচার্জ সফল!', `৳ ${amt.toFixed(2)} এসএমএস ব্যালেন্স সফলভাবে যুক্ত হয়েছে।`);
  };

  // Submit button disabled state matching live site behavior
  const isSubmitDisabled =
    remainingCharacters <= -1 ||
    !messageBody.trim() ||
    recipientNumbers.length === 0 ||
    isSubmitting;

  return (
    <div className="container-fluid p-0">
      <div className="main-content-body">
        <div className="row row-sm">
          <div className="card shadow-lg border-0">
            {/* 1:1 Live site Header */}
            <div className="card-header bg-gradient border-0 py-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h5 className="card-title mb-0 fw-bold text-dark">
                  <i className="fas fa-sms me-2 text-primary"></i>
                  {pageTitle}
                </h5>

                {/* Live Balance & Gateway Quick Actions */}
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-light text-dark border px-3 py-2 fs-6">
                    <i className="fas fa-wallet text-success me-1"></i>
                    ব্যালেন্স: <b className="text-primary font-monospace">৳ {currentBalance.toFixed(2)}</b>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRechargeModal(true)}
                    className="btn btn-sm btn-outline-success rounded-pill"
                    title="এসএমএস ব্যালেন্স রিচার্জ করুন"
                  >
                    <i className="fas fa-plus-circle me-1"></i>রিচার্জ
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGatewayModal(true)}
                    className="btn btn-sm btn-outline-secondary rounded-pill"
                    title="এসএমএস গেটওয়ে সেটিংস"
                  >
                    <i className="fas fa-cog"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* 1:1 Live site Body */}
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row g-4">
                      {/* Message Body (Exact live site markup) */}
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control shadow-sm"
                            name="message_body"
                            id="messageBody"
                            style={{ height: '180px', resize: 'none' }}
                            placeholder="এখানে আপনার বার্তা লিখুন..."
                            value={messageBody}
                            onChange={handleMessageChange}
                          ></textarea>
                          <label htmlFor="messageBody">
                            <i className="fas fa-comment-dots me-2"></i>বার্তার বিষয়বস্তু
                          </label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2 px-2">
                          <small className="text-muted">
                            <i className="fas fa-info-circle me-1"></i>সর্বোচ্চ ১৬০ অক্ষর
                          </small>
                          <div>
                            <span className={`badge ${badgeClass} mt-2 fs-6`} id="characterCountBadge">
                              অবশিষ্ট অক্ষর:{' '}
                              <span id="characterCount" className="fw-bold">
                                {remainingCharacters}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recipient Selection for Client / Student Mode */}
                      {!isTeacherMode && (
                        <div className="col-12">
                          <div className="row g-3">
                            {/* ১. জামাত নির্বাচন ড্রপডাউন (ডিফল্ট: "সকল জামাত") */}
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

                            {/* ২. ছাত্র নির্বাচন ড্রপডাউন (জামাত অনুসারে স্বয়ংক্রিয়ভাবে ফিল্টার) */}
                            <div className="col-md-7 col-12">
                              <label htmlFor="student_id" className="form-label fw-semibold mb-2">
                                <i className="fas fa-user-graduate me-2 text-primary"></i>
                                ছাত্র নির্বাচন করুন
                              </label>
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
                                      {selectedJamat === 'all' ? 'সবাইকে পাঠান' : `${selectedJamat} - সবাইকে পাঠান`}
                                    </option>
                                    <optgroup label="একক ছাত্র/ছাত্রী নির্বাচন">
                                      {dropdownStudents.map((s) => (
                                        <option key={s.id} value={`student_${s.id}`}>
                                          {s.roll || s.admissionNo ? `${s.roll || s.admissionNo} - ` : ''}{s.name}{selectedJamat === 'all' && s.jamat ? ` - ${s.jamat}` : ''}
                                        </option>
                                      ))}
                                    </optgroup>
                                  </select>
                                </div>
                                <div className="col-3">
                                  <button
                                    id="clientAddModalBtn"
                                    className="btn btn-success w-100 shadow-sm"
                                    type="button"
                                    onClick={() => setShowRecipientModal(true)}
                                    title="বিস্তারিত প্রাপক তালিকা"
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                              <span
                                className="text-danger fw-bold small ms-2 d-block mt-1"
                                id="student_id_Error"
                              ></span>
                            </div>
                          </div>

                          {/* Live recipient summary indicator */}
                          <div className="d-flex justify-content-between align-items-center mt-2 px-1">
                            <small className="text-muted">
                              <i className="fas fa-check-double text-success me-1"></i>
                              প্রাপক সংখ্যা: <b className="text-dark">{recipientNumbers.length} জন</b>
                            </small>
                            <small className="text-muted">
                              আনুমানিক ব্যয়: <b className="text-primary font-monospace">৳ {estimatedCost.toFixed(2)}</b>
                            </small>
                          </div>
                        </div>
                      )}

                      {/* Recipient Selection for Teacher Mode */}
                      {isTeacherMode && (
                        <div className="col-12">
                          <label htmlFor="teacher_id" className="form-label fw-semibold mb-2">
                            <i className="fas fa-chalkboard-user me-2 text-primary"></i>
                            শিক্ষক নির্বাচন করুন
                          </label>
                          <div className="row g-2">
                            <div className="col-9">
                              <select
                                name="teacher_id"
                                id="teacher_id"
                                className="form-control form-select teacher_id shadow-sm"
                                value={teacherSelectionMode}
                                onChange={(e) => setTeacherSelectionMode(e.target.value)}
                              >
                                <option value="send_to_all">সকল শিক্ষক</option>
                                <optgroup label="একক শিক্ষক নির্বাচন">
                                  {teachers.map((t) => (
                                    <option key={t.id} value={`teacher_${t.id}`}>
                                      {t.name} - {t.designation}
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
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>

                          {/* Live summary indicator */}
                          <div className="d-flex justify-content-between align-items-center mt-2 px-1">
                            <small className="text-muted">
                              <i className="fas fa-check-double text-success me-1"></i>
                              প্রাপক শিক্ষক: <b className="text-dark">{recipientNumbers.length} জন</b>
                            </small>
                            <small className="text-muted">
                              আনুমানিক ব্যয়: <b className="text-primary font-monospace">৳ {estimatedCost.toFixed(2)}</b>
                            </small>
                          </div>
                        </div>
                      )}

                      {/* Low balance warning notice */}
                      {isBalanceInsufficient && (
                        <div className="col-12">
                          <div className="alert alert-warning py-2 px-3 d-flex justify-content-between align-items-center mb-0 rounded-3 shadow-sm">
                            <small>
                              <i className="fas fa-triangle-exclamation text-warning me-1"></i>
                              <b>ব্যালেন্স অপর্যাপ্ত:</b> বর্তমান ব্যালেন্স ৳ {currentBalance.toFixed(2)}, প্রয়োজন ৳ {estimatedCost.toFixed(2)}
                            </small>
                            <button
                              type="button"
                              className="btn btn-sm btn-dark rounded-pill py-0 px-2"
                              onClick={() => setShowRechargeModal(true)}
                            >
                              রিচার্জ
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Submit Button (Exact 1:1 live markup) */}
                      <div className="col-12 mt-4">
                        <div className="d-grid">
                          <button
                            type="submit"
                            id="submitButton"
                            className="btn btn-success btn-lg rounded-pill shadow-sm"
                            disabled={isSubmitDisabled}
                          >
                            <i className="fas fa-paper-plane me-2"></i>
                            {isSubmitting ? 'পাঠানো হচ্ছে...' : 'এসএমএস পাঠান'}
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
                  <i className="fas fa-users text-primary me-2"></i>
                  {isTeacherMode ? 'শিক্ষক প্রাপক তালিকা নির্বাচন' : 'ছাত্র/ছাত্রী প্রাপক তালিকা ও জামাত ফিল্টার'}
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
                          <th>অভিভাবকের মোবাইল নম্বর</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">
                              কোনো ছাত্র/ছাত্রী পাওয়া যায়নি
                            </td>
                          </tr>
                        ) : (
                          filteredStudents.map(s => {
                            const isChecked = selectedStudentIds.includes(String(s.id));
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
                                  {s.guardianPhone ? (
                                    <span><i className="fas fa-phone-alt me-1 small"></i>{s.guardianPhone}</span>
                                  ) : (
                                    <span className="text-danger small">মোবাইল নেই</span>
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
                          <th>মোবাইল নম্বর</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTeachers.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center py-4 text-muted">
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
                                    <span><i className="fas fa-phone-alt me-1 small"></i>{t.mobile}</span>
                                  ) : (
                                    <span className="text-danger small">মোবাইল নেই</span>
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
                  মোট নির্বাচিত: <b className="text-dark">{isTeacherMode ? selectedTeacherIds.length : selectedStudentIds.length} জন</b> (বৈধ নম্বর: <b className="text-success">{recipientNumbers.length} টি</b>)
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-4 rounded-pill"
                  onClick={() => setShowRecipientModal(false)}
                >
                  <i className="fas fa-check me-1"></i>ঠিক আছে
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance Recharge Modal */}
      {showRechargeModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-gradient text-dark border-bottom py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fas fa-wallet text-success me-2"></i>
                  এসএমএস ব্যালেন্স রিচার্জ
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRechargeModal(false)}
                ></button>
              </div>
              <form onSubmit={handleRechargeSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3 text-center p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">বর্তমান ব্যালেন্স</span>
                    <h3 className="fw-bold text-success mb-0 font-monospace">৳ {currentBalance.toFixed(2)}</h3>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small">রিচার্জের পরিমাণ (টাকা):</label>
                    <input
                      type="number"
                      className="form-control form-control-lg font-monospace text-center fw-bold"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      min="10"
                      step="10"
                      required
                    />
                  </div>

                  <div className="d-flex gap-2 justify-content-center mb-3">
                    {['50', '100', '200', '500'].map(val => (
                      <button
                        key={val}
                        type="button"
                        className={`btn btn-sm ${rechargeAmount === val ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={() => setRechargeAmount(val)}
                      >
                        ৳ {val}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-light rounded-3 border small text-muted">
                    <i className="fas fa-info-circle text-primary me-1"></i>
                    প্রতি এসএমএস রেট: <b>৳ ০.৪০</b>। রিচার্জকৃত টাকা সাথে সাথে এসএমএস ব্যালেন্সে যোগ হবে।
                  </div>
                </div>

                <div className="modal-footer bg-light py-2 px-3">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm rounded-pill"
                    onClick={() => setShowRechargeModal(false)}
                  >
                    বাতিল
                  </button>
                  <button type="submit" className="btn btn-success btn-sm px-4 rounded-pill">
                    <i className="fas fa-check-circle me-1"></i>রিচার্জ সম্পন্ন করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Gateway Settings Info Modal */}
      {showGatewayModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-gradient text-dark border-bottom py-3">
                <h5 className="modal-title fw-bold">
                  <i className="fas fa-cog text-primary me-2"></i>
                  এসএমএস গেটওয়ে সেটিংস
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowGatewayModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <table className="table table-bordered table-sm mb-0">
                  <tbody>
                    <tr>
                      <th className="bg-light" style={{ width: '40%' }}>গেটওয়ে সার্ভিস</th>
                      <td><span className="badge bg-success">HostZoneBD SMS Gateway (সক্রিয়)</span></td>
                    </tr>
                    <tr>
                      <th className="bg-light">মাস্কিং স্ট্যাটাস</th>
                      <td>Non-Masking (MADRASHA)</td>
                    </tr>
                    <tr>
                      <th className="bg-light">বর্তমান ব্যালেন্স</th>
                      <td className="fw-bold text-success font-monospace">৳ {currentBalance.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th className="bg-light">প্রতি SMS চার্জ</th>
                      <td className="font-monospace">৳ ০.৪০ / SMS</td>
                    </tr>
                    <tr>
                      <th className="bg-light">SMS ক্যারেক্টার লিমিট</th>
                      <td>ইংরেজি: ১৬০ অক্ষর, বাংলা: ৭০ অক্ষর</td>
                    </tr>
                    <tr>
                      <th className="bg-light">API এন্ডপয়েন্ট</th>
                      <td className="font-monospace small">/admin/settings/check-sms-balance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer bg-light py-2 px-3">
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-4 rounded-pill"
                  onClick={() => setShowGatewayModal(false)}
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Logs (when defaultView === 'logs') */}
      {defaultView === 'logs' && (
        <div className="card shadow-lg border-0 mt-4">
          <div className="card-header bg-gradient border-0 py-3">
            <h5 className="card-title mb-0 fw-bold text-dark">
              <i className="fas fa-history me-2 text-primary"></i>
              এসএমএস প্রেরণের ইতিহাস
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
                    <th>ব্যয় (৳)</th>
                    <th>স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody>
                  {smsLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        কোনো এসএমএস প্রেরণের রেকর্ড পাওয়া যায়নি
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
                        <td className="font-monospace text-success">৳ {log.cost || '0.40'}</td>
                        <td>
                          <span className={`badge ${log.status === 'সফল' ? 'bg-success' : 'bg-danger'}`}>
                            {log.status || 'সফল'}
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
