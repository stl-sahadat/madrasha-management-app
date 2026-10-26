import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SmsModule = ({ defaultView = 'compose', defaultRecipientTarget = 'all_students' }) => {
  const {
    profile,
    students,
    teachers,
    committee,
    jamats,
    sendSms,
    smsLogs,
    rechargeSmsBalance,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState(
    defaultRecipientTarget === 'all_teachers' ? 'teacher' : 'client'
  );
  const [selectedStudentId, setSelectedStudentId] = useState('all');
  const [selectedTeacherId, setSelectedTeacherId] = useState('all');
  const [messageBody, setMessageBody] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('100');

  useEffect(() => {
    if (defaultRecipientTarget === 'all_teachers') {
      setActiveTab('teacher');
    } else {
      setActiveTab('client');
    }
  }, [defaultRecipientTarget]);

  const maxChars = 160;
  const remainingChars = Math.max(0, maxChars - messageBody.length);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('বার্তার বিষয়বস্তু লিখুন');
      return;
    }

    let numbers = [];
    if (activeTab === 'client') {
      if (selectedStudentId === 'all') {
        numbers = students.map(s => s.guardianPhone).filter(Boolean);
      } else {
        const s = students.find(st => String(st.id) === String(selectedStudentId));
        if (s && s.guardianPhone) numbers = [s.guardianPhone];
      }
    } else {
      if (selectedTeacherId === 'all') {
        numbers = teachers.map(t => t.mobile).filter(Boolean);
      } else {
        const t = teachers.find(tc => String(tc.id) === String(selectedTeacherId));
        if (t && t.mobile) numbers = [t.mobile];
      }
    }

    if (numbers.length === 0) {
      alert('কোনো প্রাপক নম্বর পাওয়া যায়নি');
      return;
    }

    sendSms(numbers, messageBody);
    setMessageBody('');
    showToast(`${numbers.length} টি নম্বরে এসএমএস সফলভাবে পাঠানো হয়েছে!`);
  };

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    if (!rechargeAmount || isNaN(rechargeAmount)) return;
    rechargeSmsBalance(rechargeAmount);
    setShowRechargeModal(false);
    showToast(`৳ ${rechargeAmount} SMS ব্যালেন্স রিচার্জ সম্পন্ন হয়েছে!`);
  };

  return (
    <div className="container-fluid p-0">
      {/* View Switcher Top Tabs (no-print) */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 no-print">
        <div className="btn-group shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('client')}
            className={`btn btn-sm ${activeTab === 'client' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-users me-1"></i> ছাত্র ছাত্রীকে SMS দিন
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`btn btn-sm ${activeTab === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-chalkboard-user me-1"></i> শিক্ষককে SMS দিন
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`btn btn-sm ${activeTab === 'logs' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-clock-rotate-left me-1"></i> এসএমএস লগ
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={() => setShowRechargeModal(true)}
            className="btn btn-sm btn-outline-success font-monospace"
          >
            <i className="fa-solid fa-wallet me-1"></i> ব্যালেন্স রিচার্জ
          </button>
        </div>
      </div>

      {/* 1. SEND TO CLIENT / STUDENT (Matches sms_send_to_client.html) */}
      {activeTab === 'client' && (
        <div className="main-content-body">
          <div className="row row-sm">
            <div className="col-12">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-gradient border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0 fw-bold text-dark">
                      <i className="fas fa-sms me-2 text-primary"></i>ছাত্র ছাত্রীকে SMS দিন
                    </h5>
                  </div>
                </div>

                <div className="card-body p-4 p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                      <form onSubmit={handleSend}>
                        <div className="row g-4">
                          {/* Message Body */}
                          <div className="col-12">
                            <div className="form-floating">
                              <textarea
                                className="form-control shadow-sm"
                                name="message_body"
                                id="messageBody"
                                style={{ height: '180px', resize: 'none' }}
                                placeholder="এখানে আপনার বার্তা লিখুন..."
                                value={messageBody}
                                onChange={(e) => setMessageBody(e.target.value)}
                                maxLength={maxChars}
                                required
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
                                <span className="badge bg-primary mt-2 fs-6" id="characterCountBadge">
                                  অবশিষ্ট অক্ষর:{' '}
                                  <span id="characterCount" className="fw-bold">
                                    {remainingChars}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Client Selection */}
                          <div className="col-12">
                            <label htmlFor="student_id" className="form-label fw-semibold mb-2">
                              <i className="fas fa-user-graduate me-2 text-primary"></i>ছাত্র নির্বাচন করুন
                            </label>
                            <div className="row g-2">
                              <div className="col-12">
                                <select
                                  name="student_id"
                                  id="student_id"
                                  className="form-control form-select student_id"
                                  value={selectedStudentId}
                                  onChange={(e) => setSelectedStudentId(e.target.value)}
                                >
                                  <option value="all">সকল ছাত্র/ছাত্রীর অভিভাবক ({students.length} জন)</option>
                                  {students.map((s) => (
                                    <option key={s.id} value={s.id}>
                                      {s.roll || s.admissionNo} - {s.name} ({s.jamat}) - {s.guardianPhone}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="col-12 mt-4">
                            <div className="d-grid">
                              <button
                                type="submit"
                                className="btn btn-success btn-lg rounded-pill shadow-sm"
                                disabled={!messageBody.trim()}
                              >
                                <i className="fas fa-paper-plane me-2"></i>এসএমএস পাঠান
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
        </div>
      )}

      {/* 2. SEND TO TEACHER (Matches sms_send_to_teacher.html) */}
      {activeTab === 'teacher' && (
        <div className="main-content-body">
          <div className="row row-sm">
            <div className="col-12">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-gradient border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0 fw-bold text-dark">
                      <i className="fas fa-sms me-2 text-primary"></i>শিক্ষককে SMS দিন
                    </h5>
                  </div>
                </div>

                <div className="card-body p-4 p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                      <form onSubmit={handleSend}>
                        <div className="row g-4">
                          {/* Message Body */}
                          <div className="col-12">
                            <div className="form-floating">
                              <textarea
                                className="form-control shadow-sm"
                                name="message_body"
                                id="messageBodyTeacher"
                                style={{ height: '180px', resize: 'none' }}
                                placeholder="এখানে আপনার বার্তা লিখুন..."
                                value={messageBody}
                                onChange={(e) => setMessageBody(e.target.value)}
                                maxLength={maxChars}
                                required
                              ></textarea>
                              <label htmlFor="messageBodyTeacher">
                                <i className="fas fa-comment-dots me-2"></i>বার্তার বিষয়বস্তু
                              </label>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2 px-2">
                              <small className="text-muted">
                                <i className="fas fa-info-circle me-1"></i>সর্বোচ্চ ১৬০ অক্ষর
                              </small>
                              <div>
                                <span className="badge bg-primary mt-2 fs-6">
                                  অবশিষ্ট অক্ষর:{' '}
                                  <span className="fw-bold">{remainingChars}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Teacher Selection */}
                          <div className="col-12">
                            <label htmlFor="teacher_id" className="form-label fw-semibold mb-2">
                              <i className="fas fa-chalkboard-user me-2 text-primary"></i>শিক্ষক নির্বাচন করুন
                            </label>
                            <div className="row g-2">
                              <div className="col-12">
                                <select
                                  name="teacher_id"
                                  id="teacher_id"
                                  className="form-control form-select"
                                  value={selectedTeacherId}
                                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                                >
                                  <option value="all">সকল শিক্ষক ({teachers.length} জন)</option>
                                  {teachers.map((t) => (
                                    <option key={t.id} value={t.id}>
                                      {t.name} ({t.designation}) - {t.mobile}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="col-12 mt-4">
                            <div className="d-grid">
                              <button
                                type="submit"
                                className="btn btn-success btn-lg rounded-pill shadow-sm"
                                disabled={!messageBody.trim()}
                              >
                                <i className="fas fa-paper-plane me-2"></i>এসএমএস পাঠান
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
        </div>
      )}

      {/* 3. SMS LOGS */}
      {activeTab === 'logs' && (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-clock-rotate-left me-2"></i>এসএমএস প্রেরণের ইতিহাস
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-bordered mb-0">
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
                        <td>{log.date}</td>
                        <td>
                          <span className="badge bg-secondary font-monospace">
                            {Array.isArray(log.recipients) ? log.recipients.length : 1} টি
                          </span>
                        </td>
                        <td>{log.message}</td>
                        <td className="font-monospace text-success">৳ {log.cost || '0.40'}</td>
                        <td>
                          <span className="badge bg-success">সফল</span>
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

      {/* Balance Recharge Modal */}
      {showRechargeModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fa-solid fa-wallet me-2"></i>এসএমএস ব্যালেন্স রিচার্জ
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowRechargeModal(false)}
                ></button>
              </div>
              <form onSubmit={handleRechargeSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">রিচার্জের পরিমাণ (টাকা)</label>
                    <input
                      type="number"
                      className="form-control font-monospace"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      min="10"
                      required
                    />
                  </div>
                  <p className="text-muted small mb-0">
                    প্রতি এসএমএস রেট: ৳ ০.৪০। রিচার্জকৃত টাকা আপনার মাদ্রাসা অ্যাকাউন্ট থেকে স্বয়ংক্রিয়ভাবে সমন্বয় হবে।
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowRechargeModal(false)}
                  >
                    বাতিল
                  </button>
                  <button type="submit" className="btn btn-success">
                    রিচার্জ নিশ্চিত করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
