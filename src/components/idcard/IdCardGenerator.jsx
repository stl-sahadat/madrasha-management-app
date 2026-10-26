import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const IdCardGenerator = ({ defaultType = 'student' }) => {
  const {
    students,
    teachers,
    profile,
    jamats,
    selectedStudentForIdCard,
    setSelectedStudentForIdCard
  } = useApp();

  const [cardType, setCardType] = useState(defaultType); // 'student' or 'teacher'
  const [selectedStudentId, setSelectedStudentId] = useState(
    selectedStudentForIdCard?.id || students[0]?.id || ''
  );
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || '');
  const [activeStudent, setActiveStudent] = useState(
    students.find(s => s.id === selectedStudentId) || selectedStudentForIdCard || students[0] || null
  );
  const [activeTeacher, setActiveTeacher] = useState(
    teachers.find(t => t.id === selectedTeacherId) || teachers[0] || null
  );

  useEffect(() => {
    setCardType(defaultType);
  }, [defaultType]);

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const st = students.find(s => String(s.id) === String(selectedStudentId));
    if (st) setActiveStudent(st);
  };

  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    const tch = teachers.find(t => String(t.id) === String(selectedTeacherId));
    if (tch) setActiveTeacher(tch);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid p-0">
      <style>{`
        .card-wrapper {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
            margin: 20px 0;
        }

        .id-card {
            width: 300px;
            height: 480px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            border: 1px solid #e0e0e0;
            position: relative;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .id-card-front {
            background-image: url('https://madrasha.hostzonebd.com/assets/custom/id-card-front.png'), linear-gradient(180deg, #0d6efd 0%, #0b5ed7 100%);
        }

        .id-card-back {
            background-image: url('https://madrasha.hostzonebd.com/assets/custom/id-card-back.png'), linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .photo-section {
            text-align: center;
            padding: 15px 20px 8px;
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
        }

        .photo {
            width: 140px;
            height: 140px;
            background: #f5f5f5;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: #adb5bd;
            border: 3px solid #3b82f6;
            overflow: hidden;
        }

        .full_name {
            position: absolute;
            top: 240px;
            color: #ffffff;
            text-shadow: 0 1px 2px rgba(0,0,0,0.6);
            padding: 0 20px 0px;
            font-size: 17px;
            text-align: center;
            width: 100%;
            font-weight: bold;
        }

        .details-front {
            position: absolute;
            top: 270px;
            left: 0;
            right: 0;
            padding: 0 24px 12px;
        }

        .detail-row {
            display: flex;
            padding: 3px 0;
            font-size: 14px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .label {
            width: 85px;
            color: #555;
            font-weight: 600;
            font-size: 14px;
        }

        .value {
            flex: 1;
            color: #1a1a1a;
            font-weight: 600;
        }

        .back-content {
            padding: 15px 20px;
            height: 100%;
            position: relative;
        }

        .card-box {
            position: absolute;
            top: 200px;
            left: 20px;
            right: 20px;
        }

        .emergency-box {
            padding: 0px;
            margin: 0;
            position: absolute;
            top: 270px;
            left: 24px;
            right: 24px;
            font-size: 13px;
        }

        @media print {
            .card,
            .btn,
            .no-print,
            header,
            aside,
            nav {
                display: none !important;
            }

            .card-wrapper {
                gap: 10mm;
            }

            body {
                background: white;
            }

            .id-card {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
        }
      `}</style>

      {/* Top Type Switcher Tab Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3 no-print">
        <div className="btn-group shadow-sm">
          <button
            type="button"
            onClick={() => setCardType('student')}
            className={`btn btn-sm ${cardType === 'student' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-users me-1"></i> ছাত্র/ছাত্রী আইডি কার্ড
          </button>
          <button
            type="button"
            onClick={() => setCardType('teacher')}
            className={`btn btn-sm ${cardType === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-chalkboard-user me-1"></i> শিক্ষক আইডি কার্ড
          </button>
        </div>
      </div>

      {/* STUDENT ID CARD SEARCH */}
      {cardType === 'student' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-users me-2"></i> ছাত্র/ছাত্রী আইডি কার্ড
            </h5>
          </div>
          <div className="card-body mb-3">
            <form onSubmit={handleStudentSubmit}>
              <div className="row align-items-end">
                <div className="col-md-8">
                  <label htmlFor="student_select" className="form-label fw-bold">ভর্তি নং বা নাম লিখুন"</label>
                  <select
                    name="student_id"
                    id="student_select"
                    className="form-select"
                    value={selectedStudentId}
                    onChange={(e) => {
                      setSelectedStudentId(e.target.value);
                      const s = students.find(st => String(st.id) === String(e.target.value));
                      if (s) setActiveStudent(s);
                    }}
                    required
                  >
                    <option value="">ভর্তি নং বা নাম লিখুন</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.roll || s.admissionNo || s.id} - {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-eye me-2"></i>আইডি কার্ড দেখুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEACHER ID CARD SEARCH */}
      {cardType === 'teacher' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-users me-2"></i>শিক্ষক আইডি কার্ড
            </h5>
          </div>
          <div className="card-body mb-3">
            <form onSubmit={handleTeacherSubmit}>
              <div className="row align-items-end">
                <div className="col-md-8">
                  <label htmlFor="teacher_select" className="form-label fw-bold">শিক্ষক আইডি বা নাম লিখুন</label>
                  <select
                    name="teacher_id"
                    id="teacher_select"
                    className="form-select"
                    value={selectedTeacherId}
                    onChange={(e) => {
                      setSelectedTeacherId(e.target.value);
                      const t = teachers.find(tc => String(tc.id) === String(e.target.value));
                      if (t) setActiveTeacher(t);
                    }}
                    required
                  >
                    <option value="">শিক্ষক আইডি বা নাম লিখুন</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id} - {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-eye me-2"></i>আইডি কার্ড দেখুন
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS (Print & Download) */}
      <div className="text-center mb-3 no-print">
        <button type="button" onClick={handlePrint} className="btn btn-primary me-2 shadow-sm">
          <i className="fas fa-print me-2"></i>প্রিন্ট করুন
        </button>
        <button type="button" onClick={handlePrint} className="btn btn-success shadow-sm">
          <i className="fas fa-download me-2"></i>পিডিএফ ডাউনলোড করুন
        </button>
      </div>

      {/* ID CARD PREVIEW (Front & Back) */}
      <div id="idCardWrapper" className="card-wrapper">
        {cardType === 'student' && activeStudent && (
          <>
            {/* Student Front Side */}
            <div className="id-card id-card-front">
              <div className="photo-section">
                <div className="photo">
                  <img
                    src={activeStudent.photo || '/storage/students/default-student.jpg'}
                    alt="Student Photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/storage/students/default-student.jpg";
                    }}
                  />
                </div>
              </div>

              <div className="details-front">
                <div className="detail-row">
                  <div className="label">নাম</div>
                  <div className="value">: {activeStudent.name}</div>
                </div>
                <div className="detail-row">
                  <div className="label">জামাত</div>
                  <div className="value">: {activeStudent.jamat}</div>
                </div>
                <div className="detail-row">
                  <div className="label">রক্তের গ্রুপ</div>
                  <div className="value">: {activeStudent.bloodGroup || 'O+'}</div>
                </div>
                <div className="detail-row">
                  <div className="label">ভর্তি নং</div>
                  <div className="value">: {activeStudent.roll || activeStudent.admissionNo || activeStudent.id}</div>
                </div>
              </div>
            </div>

            {/* Student Back Side */}
            <div className="id-card id-card-back">
              <div className="back-content">
                <div className="emergency-box p-2">
                  <span className="lh-1">
                    <b>পিতার নাম:</b> {activeStudent.fatherName || 'আব্দুল জলিল'}
                  </span>
                  <br />
                  <span className="lh-1">
                    <b>অভিভাবকের মোবাইল:</b> {activeStudent.guardianPhone || '01820050095'}
                  </span>
                  <br />
                  <span className="lh-1">
                    <b>সম্পর্ক:</b> {activeStudent.relationship || 'Father'}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          </>
        )}

        {cardType === 'teacher' && activeTeacher && (
          <>
            {/* Teacher Front Side */}
            <div className="id-card id-card-front">
              <div className="photo-section">
                <div className="photo">
                  <img
                    src={activeTeacher.photo || '/storage/teachers/w4VIRK4VVwP31z1S0tC2ralZnX6xbXswNIgeLN8A.jpg'}
                    alt="Teacher Photo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/storage/teachers/eXUAuPhreXk0tOWTeviLX2y8J6SwvMJJnSh4Mj85.jpg";
                    }}
                  />
                </div>
              </div>
              <div className="full_name">{activeTeacher.name}</div>

              <div className="details-front" style={{ top: '280px' }}>
                <div className="detail-row">
                  <div className="label" style={{ color: '#fff' }}>পদবী</div>
                  <div className="value" style={{ color: '#fff' }}>: {activeTeacher.designation}</div>
                </div>
                <div className="detail-row">
                  <div className="label" style={{ color: '#fff' }}>পিতার নাম</div>
                  <div className="value" style={{ color: '#fff' }}>: {activeTeacher.fatherName || 'আব্দুল মান্নান'}</div>
                </div>
                <div className="detail-row">
                  <div className="label" style={{ color: '#fff' }}>জন্ম তারিখ</div>
                  <div className="value" style={{ color: '#fff' }}>: {activeTeacher.dob || '25 May 1985'}</div>
                </div>
                <div className="detail-row">
                  <div className="label" style={{ color: '#fff' }}>মোবাইল</div>
                  <div className="value" style={{ color: '#fff' }}>: {activeTeacher.mobile}</div>
                </div>
                <div className="detail-row">
                  <div className="label" style={{ color: '#fff' }}>রক্তের গ্রুপ</div>
                  <div className="value" style={{ color: '#fff' }}>: {activeTeacher.bloodGroup || 'A+'}</div>
                </div>
              </div>
            </div>

            {/* Teacher Back Side */}
            <div className="id-card id-card-back">
              <div className="back-content">
                <div className="card-box p-2">
                  <span style={{ color: '#105C6F' }} className="lh-1 d-block text-center font-bold">
                    কার্ডের মেয়াদ : 31 / 12 / 2026
                  </span>
                  <br />
                </div>

                <div className="emergency-box p-2">
                  <span style={{ color: '#415254' }} className="lh-1 d-block text-center">
                    <b>জরুরি মোবাইল</b>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '2px' }}>
                      {activeTeacher.mobile || '01711288382'}
                    </div>
                  </span>
                  <br />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
