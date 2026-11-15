import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionForm = () => {
  const { students, jamats, profile } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const filteredStudents = useMemo(() => {
    if (selectedJamat === 'all') return students;
    return students.filter(s => s.jamat === selectedJamat);
  }, [students, selectedJamat]);

  const currentStudent = students.find(s => s.id === selectedStudentId) || filteredStudents[0] || students[0];

  const madrashaNameBn = profile?.name || 'ইকরা ইসলামিয়া মাদ্রাসা';
  const madrashaNameAr = 'مَدْرَسَةُ إِقْرَاء الإِسْلَامِيَّة';
  const madrashaNameEn = profile?.nameEn || 'Iqra Islamia Madrasha';
  const madrashaAddress = profile?.address || 'বরুড়া, কুমিল্লা।';
  const madrashaPhone = `${profile?.phone1 || '০১৮২০০৫০০৯৫'}, ${profile?.phone2 || '০১৮৪৭৬৫৭৫৮০'}`;
  const madrashaEmail = profile?.email || 'hafezazamnur@gmail.com';
  const madrashaEstablished = profile?.established || '১৯৯০';

  const admissionNo = currentStudent?.roll || currentStudent?.admissionNumber || currentStudent?.id || '১০১';
  const sessionYear = currentStudent?.session || '২০২৬';
  const admissionDate = currentStudent?.admissionDate || '১৫/০১/২০২৬';
  const nameBn = currentStudent?.name || 'মুহাম্মদ আবু বকর';
  const nameEn = currentStudent?.nameEn || 'MUHAMMAD ABU BAKR';
  const jamatName = currentStudent?.jamat || 'হিফজ বিভাগ';
  const bloodGroup = currentStudent?.bloodGroup || 'A+';
  const dob = currentStudent?.dob || '০৮/০২/২০১৩';
  const birthReg = currentStudent?.birthReg || '২০১৩১৫৯২৩১০০১০০১';

  const fatherName = currentStudent?.fatherName || 'মাওলানা নুরুল হক';
  const fatherOcc = currentStudent?.fatherOcc || 'ইমাম / ব্যবসা';
  const motherName = currentStudent?.motherName || 'ফাতেমা জান্নাত';
  const motherOcc = currentStudent?.motherOcc || 'গৃহিনী';
  const guardianPhone = currentStudent?.guardianPhone || '০১৮১০০০৩৮৭১';
  const guardianPhone2 = currentStudent?.parentsPhone2 || '০১৮৪৭৬৫৭৫৮০';
  const nid = currentStudent?.nid || '১৯৮৫১৫৯২৩১০০২০০১';
  const address = currentStudent?.address || 'গ্রাম: বরুড়া, ডাকঘর: বরুড়া, উপজেলা: বরুড়া, জেলা: কুমিল্লা';

  const courseFee = currentStudent?.monthlyFee || currentStudent?.coursefee || 800;
  const foodBill = currentStudent?.khurakiFee || currentStudent?.food_bill || 2200;
  const admissionFee = currentStudent?.admissionFee || 1500;
  const totalMonthlyFee = Number(courseFee) + Number(foodBill);
  const isAbasik = (currentStudent?.khurakiFee || currentStudent?.food_bill || 0) > 0 || currentStudent?.residential === 'আবাসিক';

  return (
    <div className="container-fluid p-0">
      <style>{`
        /* Screen & Print Standard A4 Dimensions */
        .admission-container {
          background-color: #f1f5f9;
          min-height: 100vh;
          padding: 24px 0 48px;
          font-family: 'SolaimanLipi', 'Noto Sans Bengali', sans-serif;
        }

        .admission-form-sheet {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto 30px;
          background: #ffffff;
          position: relative;
          box-shadow: 0 4px 25px rgba(15, 23, 42, 0.12);
          border: 1px solid #cbd5e1;
          box-sizing: border-box;
          overflow: hidden;
          page-break-after: always;
        }

        .sheet-inner-border {
          position: absolute;
          top: 8mm;
          left: 8mm;
          right: 8mm;
          bottom: 8mm;
          border: 2px solid #15803D;
          pointer-events: none;
          z-index: 5;
        }

        .sheet-inner-border::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 0.8px dashed #15803D;
          pointer-events: none;
        }

        .sheet-content {
          position: relative;
          z-index: 10;
          padding: 12mm 14mm;
          height: 100%;
          display: flex;
          flex-direction: column;
          color: #0F172A;
          box-sizing: border-box;
        }

        /* Watermark Background Logo */
        .sheet-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 380px;
          height: 380px;
          background-image: url('/storage/institute/sidelogo/madrasha_360_logo.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          opacity: 0.055;
          pointer-events: none;
          z-index: 1;
        }

        /* Form Header */
        .form-header-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #15803D;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }

        .header-logo-left {
          width: 78px;
          height: 78px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header-logo-left img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .header-text-center {
          text-align: center;
          flex-grow: 1;
          padding: 0 10px;
        }

        .header-arabic-bismillah {
          font-family: 'Amiri', 'Traditional Arabic', serif;
          font-size: 15px;
          color: #15803D;
          margin-bottom: 2px;
          font-weight: bold;
        }

        .header-arabic-name {
          font-family: 'Amiri', 'Scheherazade New', serif;
          font-size: 24px;
          color: #15803D;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0.5px;
        }

        .header-bangla-name {
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.2;
          margin-top: 1px;
        }

        .header-meta-text {
          font-size: 11px;
          color: #475569;
          font-weight: 500;
          margin-top: 3px;
        }

        .header-photo-box {
          width: 32mm;
          height: 38mm;
          border: 1.5px dashed #15803D;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 4px;
          overflow: hidden;
          text-align: center;
          padding: 3px;
        }

        .header-photo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }

        .header-photo-box span {
          font-size: 9.5px;
          color: #64748b;
          line-height: 1.2;
          font-weight: 600;
        }

        /* Banner title */
        .admission-title-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #15803D;
          color: #ffffff;
          padding: 5px 16px;
          border-radius: 30px;
          margin: 6px 0 14px;
          box-shadow: 0 2px 6px rgba(21, 128, 61, 0.25);
        }

        .admission-title-banner h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .admission-type-checkboxes {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 11.5px;
          font-weight: 600;
        }

        .check-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .check-square {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 13px;
          height: 13px;
          background: #ffffff;
          color: #15803D;
          border-radius: 2px;
          font-size: 11px;
          font-weight: 900;
          line-height: 1;
        }

        /* Form Meta Strip */
        .form-meta-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 5px 12px;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .meta-pill {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-label {
          color: #64748b;
          font-weight: 600;
        }

        .meta-val {
          color: #0F172A;
          font-weight: 700;
          font-family: inherit;
        }

        /* Section Headings */
        .section-header-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          border-left: 4px solid #15803D;
          padding: 4px 10px;
          margin: 8px 0 6px;
          border-radius: 0 4px 4px 0;
        }

        .section-header-tag span {
          font-size: 12.5px;
          font-weight: 700;
          color: #15803D;
        }

        /* Form Grid Rows */
        .form-data-row {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          font-size: 12px;
          line-height: 1.6;
        }

        .field-group {
          display: flex;
          align-items: baseline;
          flex: 1;
          margin-right: 14px;
        }

        .field-group:last-child {
          margin-right: 0;
        }

        .field-lbl {
          color: #334155;
          font-weight: 600;
          white-space: nowrap;
          padding-right: 6px;
        }

        .field-fill-line {
          flex-grow: 1;
          border-bottom: 1px dotted #94a3b8;
          color: #0F172A;
          font-weight: 700;
          padding-left: 6px;
          min-height: 20px;
        }

        /* Table styles in form */
        .form-spec-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
          margin: 6px 0;
        }

        .form-spec-table th,
        .form-spec-table td {
          border: 1px solid #cbd5e1;
          padding: 4px 8px;
          vertical-align: middle;
        }

        .form-spec-table th {
          background-color: #f8fafc;
          font-weight: 700;
          color: #334155;
          text-align: center;
        }

        /* Office Use Box */
        .office-box {
          margin-top: 8px;
          border: 1.5px solid #15803D;
          border-radius: 6px;
          padding: 8px 10px;
          background: #ffffff;
        }

        .office-title {
          font-size: 11.5px;
          font-weight: 700;
          color: #15803D;
          text-align: center;
          margin-bottom: 6px;
          text-decoration: underline;
        }

        /* Signatures footer */
        .signatures-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 14px;
          padding-top: 10px;
        }

        .sig-block {
          text-align: center;
          font-size: 10.5px;
          font-weight: 600;
          color: #334155;
          width: 28%;
        }

        .sig-line {
          border-top: 1px dashed #64748b;
          margin-bottom: 3px;
          padding-top: 2px;
        }

        /* Page 2 Oath items */
        .oath-intro {
          font-size: 12.5px;
          line-height: 1.6;
          color: #1e293b;
          margin: 10px 0 12px;
          text-align: justify;
        }

        .oath-list {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }

        .oath-list-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 11.5px;
          line-height: 1.55;
          color: #1e293b;
          text-align: justify;
        }

        .oath-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          background: #15803D;
          color: white;
          border-radius: 50%;
          font-size: 10.5px;
          font-weight: bold;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .guardian-notice-card {
          margin-top: 14px;
          border: 1px solid #15803D;
          background: #f0fdf4;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 11.5px;
          line-height: 1.6;
          color: #166534;
        }

        /* Print Override */
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print, header, nav, .app-sidebar, .sidebar-backdrop, .btn-group {
            display: none !important;
          }
          .admission-container {
            padding: 0 !important;
            background: transparent !important;
          }
          .admission-form-sheet {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          .sheet-inner-border {
            border: 2px solid #15803D !important;
          }
          .admission-title-banner {
            background: #15803D !important;
            color: #ffffff !important;
          }
        }
      `}</style>

      {/* Top Filter & Control Toolbar (Hidden in Print) */}
      <div className="card shadow-sm mb-4 mx-3 mx-md-4 no-print border-0 rounded-3 mt-3">
        <div className="card-header bg-success text-white py-3 px-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-file-signature fs-5"></i>
            <h5 className="mb-0 fw-bold">শিক্ষার্থীর ভর্তি আবেদন ফরম ও অঙ্গীকারনামা</h5>
          </div>
          <span className="badge bg-light text-dark fw-bold px-3 py-2">
            মোট শিক্ষার্থী: {students.length} জন
          </span>
        </div>

        <div className="card-body p-4 bg-white">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-3">
              <label htmlFor="jamat_select" className="form-label fw-bold text-dark mb-1">
                জামাত / বিভাগ নির্বাচন:
              </label>
              <select
                id="jamat_select"
                className="form-select border-2"
                value={selectedJamat}
                onChange={(e) => {
                  setSelectedJamat(e.target.value);
                  const firstOfJamat = students.find(s => e.target.value === 'all' || s.jamat === e.target.value);
                  if (firstOfJamat) setSelectedStudentId(firstOfJamat.id);
                }}
              >
                <option value="all">সকল জামাত ({students.length} জন)</option>
                {(jamats || []).map((j) => (
                  <option key={j.id || j.name} value={j.name}>
                    {j.name} ({students.filter(s => s.jamat === j.name).length} জন)
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-5">
              <label htmlFor="student_select" className="form-label fw-bold text-dark mb-1">
                শিক্ষার্থী নির্বাচন (রোল ও নাম দিয়ে খুঁজুন):
              </label>
              <select
                id="student_select"
                className="form-select border-2"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                {filteredStudents.map((s) => (
                  <option key={s.id} value={s.id}>
                    রোল: {s.roll} | {s.name} ({s.jamat})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-4 d-flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-success flex-grow-1 fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
              >
                <i className="fas fa-print"></i>
                <span>ভর্তি ফরম প্রিন্ট করুন (A4)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Sheet Wrapper */}
      <div className="admission-container">
        {/* ========================================================
            PAGE 1: মূল ভর্তি আবেদন ফরম (Student Admission Form)
            ======================================================== */}
        <div className="admission-form-sheet" id="admission-form-page-1">
          <div className="sheet-inner-border"></div>
          <div className="sheet-watermark"></div>

          <div className="sheet-content">
            {/* Header Box */}
            <div className="form-header-box">
              {/* Left Logo */}
              <div className="header-logo-left">
                <img
                  src="/storage/institute/sidelogo/madrasha_360_logo.png"
                  alt="মাদ্রাসা লোগো"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/storage/institute/sidelogo/kZvKJCWGaUTdn3y6ZSjepGWQoM2vD9wRM6iBLrRl.png';
                  }}
                />
              </div>

              {/* Center Madrasha Info */}
              <div className="header-text-center">
                <div className="header-arabic-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div className="header-arabic-name">{madrashaNameAr}</div>
                <div className="header-bangla-name">{madrashaNameBn}</div>
                <div className="header-meta-text">
                  {madrashaAddress} | স্থাপিত: {madrashaEstablished} ইং | মোবাইল: {madrashaPhone} | ইমেইল: {madrashaEmail}
                </div>
              </div>

              {/* Right Passport Photo Frame */}
              <div className="header-photo-box">
                {currentStudent?.photo ? (
                  <img src={currentStudent.photo} alt={nameBn} />
                ) : (
                  <>
                    <i className="fa-solid fa-user-graduate fs-4 text-muted mb-1"></i>
                    <span>পাসপোর্ট সাইজ ছবি</span>
                  </>
                )}
              </div>
            </div>

            {/* Title Banner & Type */}
            <div className="admission-title-banner">
              <h3>ভর্তি আবেদন ফরম — শিক্ষাবর্ষ {sessionYear} ইং</h3>
              <div className="admission-type-checkboxes">
                <div className="check-item">
                  <span className="check-square">{isAbasik ? '✓' : ''}</span>
                  <span>আবাসিক</span>
                </div>
                <div className="check-item">
                  <span className="check-square">{!isAbasik ? '✓' : ''}</span>
                  <span>অনাবাসিক</span>
                </div>
                <div className="check-item">
                  <span className="check-square"></span>
                  <span>ডে-কেয়ার</span>
                </div>
              </div>
            </div>

            {/* Meta Strip */}
            <div className="form-meta-strip">
              <div className="meta-pill">
                <span className="meta-label">ভর্তি / রোল নং:</span>
                <span className="meta-val">{admissionNo}</span>
              </div>
              <div className="meta-pill">
                <span className="meta-label">ভর্তির তারিখ:</span>
                <span className="meta-val">{admissionDate}</span>
              </div>
              <div className="meta-pill">
                <span className="meta-label">ভর্তিকৃত জামাত:</span>
                <span className="meta-val">{jamatName}</span>
              </div>
              <div className="meta-pill">
                <span className="meta-label">শিক্ষাবর্ষ:</span>
                <span className="meta-val">{sessionYear} ইং</span>
              </div>
            </div>

            {/* Section 1: Student Information */}
            <div className="section-header-tag">
              <span>১. শিক্ষার্থীর ব্যক্তিগত পরিচিতি ও বিবরণ:</span>
            </div>

            <div className="form-data-row">
              <div className="field-group" style={{ flex: 1.4 }}>
                <span className="field-lbl">শিক্ষার্থীর নাম (বাংলায়):</span>
                <div className="field-fill-line">{nameBn}</div>
              </div>
              <div className="field-group" style={{ flex: 1 }}>
                <span className="field-lbl">Name (English):</span>
                <div className="field-fill-line text-uppercase">{nameEn}</div>
              </div>
            </div>

            <div className="form-data-row">
              <div className="field-group">
                <span className="field-lbl">জন্ম তারিখ:</span>
                <div className="field-fill-line">{dob}</div>
              </div>
              <div className="field-group">
                <span className="field-lbl">জন্ম নিবন্ধন সনদ নং:</span>
                <div className="field-fill-line">{birthReg}</div>
              </div>
              <div className="field-group" style={{ maxWidth: '140px' }}>
                <span className="field-lbl">রক্তের গ্রুপ:</span>
                <div className="field-fill-line">{bloodGroup}</div>
              </div>
            </div>

            {/* Section 2: Parents Information */}
            <div className="section-header-tag">
              <span>২. পিতা ও মাতার তথ্যাবলী:</span>
            </div>

            <div className="form-data-row">
              <div className="field-group" style={{ flex: 1.3 }}>
                <span className="field-lbl">পিতার পূর্ণ নাম:</span>
                <div className="field-fill-line">{fatherName}</div>
              </div>
              <div className="field-group" style={{ flex: 0.9 }}>
                <span className="field-lbl">পেশা:</span>
                <div className="field-fill-line">{fatherOcc}</div>
              </div>
              <div className="field-group" style={{ flex: 1 }}>
                <span className="field-lbl">মোবাইল নং:</span>
                <div className="field-fill-line font-monospace">{guardianPhone}</div>
              </div>
            </div>

            <div className="form-data-row">
              <div className="field-group" style={{ flex: 1.3 }}>
                <span className="field-lbl">মাতার পূর্ণ নাম:</span>
                <div className="field-fill-line">{motherName}</div>
              </div>
              <div className="field-group" style={{ flex: 0.9 }}>
                <span className="field-lbl">পেশা:</span>
                <div className="field-fill-line">{motherOcc}</div>
              </div>
              <div className="field-group" style={{ flex: 1 }}>
                <span className="field-lbl">অভিভাবকের NID:</span>
                <div className="field-fill-line font-monospace">{nid}</div>
              </div>
            </div>

            {/* Section 3: Address & Guardian */}
            <div className="section-header-tag">
              <span>৩. ঠিকানা ও স্থানীয় অভিভাবকের বিবরণ:</span>
            </div>

            <div className="form-data-row">
              <div className="field-group">
                <span className="field-lbl">বর্তমান ঠিকানা:</span>
                <div className="field-fill-line">{address}</div>
              </div>
            </div>

            <div className="form-data-row">
              <div className="field-group">
                <span className="field-lbl">স্থায়ী ঠিকানা:</span>
                <div className="field-fill-line">{address}</div>
              </div>
            </div>

            <div className="form-data-row">
              <div className="field-group" style={{ flex: 1.2 }}>
                <span className="field-lbl">স্থানীয় অভিভাবকের নাম:</span>
                <div className="field-fill-line">{fatherName} (পিতা)</div>
              </div>
              <div className="field-group" style={{ flex: 1 }}>
                <span className="field-lbl">জরুরি যোগাযোগ নম্বর:</span>
                <div className="field-fill-line font-monospace">{guardianPhone2}</div>
              </div>
            </div>

            {/* Section 4: Fees Specification */}
            <div className="section-header-tag">
              <span>৪. ভর্তি ও নিয়মিত মাসিক ফি সংক্রান্ত বিবরণ:</span>
            </div>

            <table className="form-spec-table">
              <thead>
                <tr>
                  <th>ভর্তি ফি (এককালীন)</th>
                  <th>মাসিক টিউশন ফি</th>
                  <th>মাসিক খোরাকী ফি</th>
                  <th>অন্যান্য / কল্যাণ ফি</th>
                  <th>প্রতি মাসে সর্বমোট প্রদেয়</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center fw-bold">
                  <td>৳ {admissionFee.toFixed(2)}</td>
                  <td>৳ {Number(courseFee).toFixed(2)}</td>
                  <td>৳ {Number(foodBill).toFixed(2)}</td>
                  <td>৳ ০.০০</td>
                  <td className="text-success">৳ {totalMonthlyFee.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Section 5: Student Pledge */}
            <div className="p-2 border rounded bg-light mt-2" style={{ fontSize: '11px', lineHeight: '1.5' }}>
              <strong>শিক্ষার্থীর অঙ্গীকার:</strong> বখিদমতে জনাব মুহতামিম সাহেব দাঃ বাঃ — আমি এই মর্মে অঙ্গীকার করছি যে, আমাকে <strong>{madrashaNameBn}</strong>-এ লেখাপড়ার সুযোগ দান করিলে আমি মাদ্রাসার যাবতীয় নিয়মনীতি, শৃংখলা ও সুন্নতী বিধান সন্তুষ্টচিত্তে মানিয়া চলিব। কোনো অবস্থাতেই মাদ্রাসার সুনাম ক্ষুণ্ণকারী কোনো কাজে লিপ্ত হইব না।
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ fontSize: '11px' }}>
              <div>ভর্তির আবেদন তারিখ: <strong>{admissionDate}</strong></div>
              <div className="text-center" style={{ width: '180px' }}>
                <div style={{ borderTop: '1px dashed #64748b', paddingTop: '3px' }}>শিক্ষার্থীর পূর্ণ স্বাক্ষর</div>
              </div>
            </div>

            {/* Section 6: Office Use Box */}
            <div className="office-box mt-3">
              <div className="office-title">শুধুমাত্র দাপ্তরিক ও পরিচালনা পরিষদের ব্যবহারের জন্য</div>
              <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '11px' }}>
                <div>ভর্তি পরীক্ষা ফলাফল: <strong>উত্তীর্ণ (মুমতাজ A+)</strong></div>
                <div>পরীক্ষকের নাম: <strong>মাওলানা মাহমুদুল করিম</strong></div>
                <div>অনুমোদিত জামাত: <strong>{jamatName}</strong></div>
                <div>ভর্তি মঞ্জুরকারী: <strong>মুহতামিম সাহেব</strong></div>
              </div>
            </div>

            {/* Signatures */}
            <div className="signatures-row mt-auto pt-3">
              <div className="sig-block">
                <div className="sig-line">ভর্তি কার্যক্রম পরিচালনাকারী</div>
              </div>
              <div className="sig-block">
                <div className="sig-line">নাজিমে তা'লীমাত (শিক্ষা সচিব)</div>
              </div>
              <div className="sig-block">
                <div className="sig-line">মুহতামিম / প্রধান শিক্ষক (সিলমোহর)</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PAGE 2: ছাত্র ও অভিভাবকের যৌথ অঙ্গীকারনামা (Code of Conduct)
            ======================================================== */}
        <div className="admission-form-sheet" id="admission-form-page-2">
          <div className="sheet-inner-border"></div>
          <div className="sheet-watermark"></div>

          <div className="sheet-content">
            {/* Header Box */}
            <div className="form-header-box">
              <div className="header-logo-left">
                <img
                  src="/storage/institute/sidelogo/madrasha_360_logo.png"
                  alt="মাদ্রাসা লোগো"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/storage/institute/sidelogo/kZvKJCWGaUTdn3y6ZSjepGWQoM2vD9wRM6iBLrRl.png';
                  }}
                />
              </div>

              <div className="header-text-center">
                <div className="header-arabic-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div className="header-arabic-name">{madrashaNameAr}</div>
                <div className="header-bangla-name">{madrashaNameBn}</div>
                <div className="header-meta-text">{madrashaAddress} | স্থাপিত: {madrashaEstablished} ইং</div>
              </div>

              <div style={{ width: '78px' }}></div>
            </div>

            {/* Banner */}
            <div className="admission-title-banner" style={{ justifyContent: 'center' }}>
              <h3 className="text-center">ছাত্র ও অভিভাবকের লিখিত অঙ্গীকারনামা ও সাধারণ নিয়মাবলী</h3>
            </div>

            {/* Introduction */}
            <div className="oath-intro">
              আমি সহীহ ইলমে দ্বীন হাসিলের নেক নিয়তে আমার সন্তান/পোষ্যকে <strong>{madrashaNameBn}</strong>-এর নিয়মিত শিক্ষার্থী হিসেবে ভর্তি করানোর উদ্দেশ্যে প্রতিষ্ঠানটির সকল নিয়ম-শৃঙ্খলা পুঙ্খানুপুঙ্খ পাঠ করিয়া সজ্ঞানে নিম্নলিখিত শর্তাবলীতে অঙ্গীকারাবদ্ধ হইতেছি:
            </div>

            {/* 9 Code of Conduct Rules */}
            <ul className="oath-list">
              <li className="oath-list-item">
                <span className="oath-num">১</span>
                <div>
                  <strong>শরীয়তের অনুশাসন ও সুন্নতী লেবাস:</strong> শিক্ষার্থী সর্বাবস্থায় ইসলামী শরীয়তের হুকুম-আহকাম মানিয়া চলিবে, পাঞ্জাবি-পায়জামা ও টুপিসহ সুন্নতী লেবাস পরিধান করিবে এবং পাঁচ ওয়াক্ত সালাত জামায়াতে আদায় করিবে।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">২</span>
                <div>
                  <strong>আইন-কানুন ও শৃঙ্খলা রক্ষা:</strong> মাদ্রাসার নির্ধারিত সকল আইন-কানুন নিঃশর্তভাবে মান্য করিবে। মাদ্রাসার অভ্যন্তরে বা বাহিরে কোনো প্রকার দলাদলি, বিশৃঙ্খলা বা অনৈতিক কাজে লিপ্ত হইবে না।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৩</span>
                <div>
                  <strong>উস্তাদ ও গুরুজনদের ইহতিরাম:</strong> মাদ্রাসার সম্মানিত সকল শিক্ষক ও কর্মচারীদের প্রতি যথাযথ ভক্তি, শ্রদ্ধা ও আদব বজায় রাখিবে এবং তাহাদের দিকনির্দেশনা নিষ্ঠার সহিত পালন করিবে।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৪</span>
                <div>
                  <strong>সহপাঠীদের সহিত ভ্রাতৃত্ববোধ:</strong> সকল সহপাঠী ভাইদের সহিত হৃদ্যতাপূর্ণ আচরণ করিবে। ঝগড়া-বিবাদ বা অনুমতি ব্যতীত অন্যের কোনো আসবাবপত্র ব্যবহার করা হইতে সম্পূর্ণরূপে বিরত থাকিবে।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৫</span>
                <div>
                  <strong>নিয়মিত উপস্থিতি:</strong> দফতরে তা'লীমাতের পূর্বানুমতি ব্যতীত কোনো ক্লাসে বা মাদ্রাসায় অনুপস্থিত থাকা সম্পূর্ণ নিষিদ্ধ। অসুস্থতা বা বিশেষ কারণে ছুটির আবেদনপত্র দাখিল করিতে হইবে।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৬</span>
                <div>
                  <strong>দরস, মোতালা'আ ও তাকরার:</strong> প্রতিদিনের নির্ধারিত পাঠ নিয়মিত প্রস্তুত করিবে এবং মোতালা'আ ও তাকরারে সময়মতো উপস্থিত থাকিবে। কোনো প্রকার ক্ষতিকর ডিভাইস বা মোবাইল ফোন মাদ্রাসায় আনা নিষিদ্ধ।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৭</span>
                <div>
                  <strong>মাদ্রাসার সম্পদের হেফাজত:</strong> মাদ্রাসার ভবন, লাইব্রেরি, কিতাবপত্র, পানির ফিল্টার ও আসবাবপত্রের যথাযথ হেফাজত করিবে। অসাবধানতায় কোনো ক্ষতি হইলে ক্ষতিপূরণ প্রদান করিতে বাধ্য থাকিবে।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৮</span>
                <div>
                  <strong>স্বতঃস্ফূর্ত সেবা ও খেদমত:</strong> দ্বীনি শিক্ষার কল্যাণার্থে মাদ্রাসার পরিষ্কার-পরিচ্ছন্নতা ও দ্বীনি কার্যক্রমে আন্তরিকতার সহিত স্বতঃস্ফূর্ত অংশগ্রহণ করিবে।
                </div>
              </li>

              <li className="oath-list-item">
                <span className="oath-num">৯</span>
                <div>
                  <strong>কর্তৃপক্ষের চূড়ান্ত ক্ষমতা:</strong> উপরোক্ত কোনো শর্ত বা মাদ্রাসার শৃঙ্খলা ভঙ্গ করিলে কর্তৃপক্ষ যেকোনো ধরনের শাস্তিমূলক ব্যবস্থা বা মাদ্রাসা হইতে বহিষ্কার করিতে পারিবেন, ইহাতে শিক্ষার্থী বা অভিভাবকের কোনো ওজর-আপত্তি থাকিবে না।
                </div>
              </li>
            </ul>

            {/* Student Signature */}
            <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ fontSize: '11px' }}>
              <div>অঙ্গীকারের তারিখ: <strong>{admissionDate}</strong></div>
              <div className="text-center" style={{ width: '180px' }}>
                <div style={{ borderTop: '1px dashed #64748b', paddingTop: '3px' }}>শিক্ষার্থীর দস্তখত</div>
              </div>
            </div>

            {/* Guardian Special Oath Notice Card */}
            <div className="guardian-notice-card">
              <div className="fw-bold mb-1" style={{ fontSize: '12px', color: '#15803D' }}>
                <i className="fa-solid fa-triangle-exclamation me-1"></i> অভিভাবকের বিশেষ স্বীকৃতি ও দস্তখত:
              </div>
              <div>
                আমি এই মর্মে অঙ্গীকার করিতেছি যে, আমার সন্তান <strong>{nameBn}</strong> মাদ্রাসা কর্তৃপক্ষের লিখিত অনুমতি ব্যতীত বাহিরে গিয়া হারাইয়া গেলে বা কোনো দুর্ঘটনার শিকার হইলে মাদ্রাসা কর্তৃপক্ষ কোনোভাবেই দায়ী থাকিবেন না। মাদ্রাসার ধার্যকৃত যাবতীয় প্রদেয় ফি (বেতন ও খোরাকী) চলতি মাসের ৭ তারিখের মধ্যে নিয়মিত পরিশোধ করিতে বাধ্য থাকিব।
              </div>
            </div>

            {/* Guardian Signature Details */}
            <div className="d-flex justify-content-between align-items-center mt-3" style={{ fontSize: '11.5px' }}>
              <div>
                অভিভাবকের নাম: <strong>{fatherName}</strong>
              </div>
              <div>
                মোবাইল নম্বর: <strong>{guardianPhone}</strong>
              </div>
              <div className="text-center" style={{ width: '180px' }}>
                <div style={{ borderTop: '1px dashed #64748b', paddingTop: '3px' }}>অভিভাবকের দস্তখত ও তারিখ</div>
              </div>
            </div>

            {/* Signatures */}
            <div className="signatures-row mt-auto pt-3">
              <div className="sig-block">
                <div className="sig-line">ভর্তি অফিসার স্বাক্ষর</div>
              </div>
              <div className="sig-block">
                <div className="sig-line">নাজিমে তা'লীমাত (শিক্ষা সচিব)</div>
              </div>
              <div className="sig-block">
                <div className="sig-line">মুহতামিম / প্রধান শিক্ষক (সিলমোহর)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
