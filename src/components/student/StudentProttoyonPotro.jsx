import React, { useState } from 'react';
import { Printer, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentProttoyonPotro = () => {
  const { students, profile } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);

  const student = students.find(s => s.id === selectedStudentId);

  return (
    <div className="space-y-4">
      {/* Action / Selector Bar */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-certificate me-2"></i>
            প্রত্যয়ন পত্র জেনারেটর (Official Testimonial)
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> প্রত্যয়ন পত্র প্রিন্ট
            </button>
          </div>
        </div>

        <div className="card-body bg-light py-3">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <label className="form-label fw-bold small text-muted mb-1">শিক্ষার্থী নির্বাচন করুন:</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="">-- ফাঁকা প্রত্যয়ন পত্র (Blank) --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.roll} - {s.name} ({s.jamat})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold small text-muted mb-1">ইস্যুর তারিখ:</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="form-control form-control-sm"
              >
              </input>
            </div>

            <div className="col-md-4 text-md-end mt-4">
              <button
                type="button"
                onClick={() => setSelectedStudentId('')}
                className="btn btn-sm btn-outline-secondary"
              >
                ফাঁকা ফরম দেখান
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Container (Matching hostzonebd 100%) */}
      <div className="certificate-container" id="certificate">
        <div className="certificate-wrapper">
          {/* Header */}
          <div className="certificate-header text-center">
            <img
              src="/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png"
              alt="Logo"
              className="institute-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/avatar.svg';
              }}
            />
            <h2 className="institute-name">{profile.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}</h2>
            <p className="institute-address">{profile.address || 'বদরখালী, মাতামুহুরী, কক্সবাজার।'}</p>
            <p className="institute-contact">মোবাইল: {profile.phone2 || '01847657580'}</p>
            <p className="institute-email">ইমেইল: {profile.email || 'hafezazamnur@gmail.com'}</p>
          </div>

          <div className="divider"></div>

          {/* Title */}
          <div className="certificate-title text-center">
            <h3>প্রত্যয়ন পত্র</h3>
          </div>

          {/* Content */}
          <div className="certificate-body">
            <p className="mb-4">
              এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,{' '}
              <span className="blank fw-bold text-dark">{student ? student.name : ''}</span>
              পিতা:{' '}
              <span className="blank fw-semibold">{student ? student.fatherName : ''}</span>
              মাতা:{' '}
              <span className="blank fw-semibold">{student ? (student.motherName || 'মোসাম্মৎ আয়েশা বেগম') : ''}</span>
              অত্র প্রতিষ্ঠানে <span className="blank-sm font-mono fw-bold">২০২৬</span> সনে{' '}
              <span className="blank fw-bold text-primary">{student ? student.jamat : ''}</span> শ্রেণীতে অধ্যয়নরত ছিল/ছিলেন।
            </p>

            <p className="mb-4">
              রোল নং: <span className="blank-sm font-mono fw-bold">{student ? student.roll : ''}</span>{' '}
              রেজিস্ট্রেশন নং:{' '}
              <span className="blank font-mono">{student ? `REG-2026-${student.roll}` : ''}</span> ।
            </p>

            <p className="mb-5">
              অধ্যয়নকালীন সময়ে তার আচার-আচরণ ও চরিত্র অত্যন্ত ভালো ছিল। আমি তার ভবিষ্যৎ জীবনের সর্বাঙ্গীণ মঙ্গল ও সফলতা কামনা করি।
            </p>

            {/* Signature Section */}
            <div className="signature-section">
              <div className="row">
                <div className="col-6">
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <p className="signature-label">শ্রেণী শিক্ষক/শিক্ষিকার স্বাক্ষর</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="signature-box text-end">
                    <div className="signature-line ms-auto"></div>
                    <p className="signature-label">প্রধান শিক্ষক/অধ্যক্ষের স্বাক্ষর ও সীল</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="certificate-date mt-4">
              <p>তারিখ: <span className="blank-sm font-mono fw-bold">{issueDate}</span></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Print Styles */
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .certificate-container {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          .certificate-wrapper {
            box-shadow: none !important;
            padding: 30px 50px !important;
            page-break-after: avoid;
          }
        }

        /* Screen Styles */
        .certificate-container {
          background: #f5f5f5;
          padding: 30px;
        }

        .certificate-wrapper {
          background: white;
          max-width: 210mm;
          margin: 0 auto;
          padding: 40px 60px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        /* Header Styles */
        .certificate-header {
          margin-bottom: 25px;
        }

        .institute-logo {
          max-width: 90px;
          max-height: auto;
          margin-bottom: 12px;
        }

        .institute-name {
          font-size: 26px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 8px;
          font-family: 'SolaimanLipi', 'Kalpurush', sans-serif;
        }

        .institute-address,
        .institute-contact,
        .institute-email {
          font-size: 13px;
          color: #555;
          margin: 4px 0;
        }

        /* Divider */
        .divider {
          height: 2px;
          background: linear-gradient(to right, transparent, #2c3e50, transparent);
          margin: 15px 0;
        }

        /* Title */
        .certificate-title h3 {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
          text-decoration: underline;
          margin: 25px 0;
          font-family: 'SolaimanLipi', 'Kalpurush', sans-serif;
        }

        /* Body Content */
        .certificate-body {
          font-size: 16px;
          line-height: 2.2;
          color: #333;
          text-align: justify;
          font-family: 'SolaimanLipi', 'Kalpurush', sans-serif;
        }

        .blank {
          display: inline-block;
          min-width: 160px;
          border-bottom: 1px solid #333;
          margin: 0 5px;
          text-align: center;
        }

        .blank-sm {
          display: inline-block;
          min-width: 80px;
          border-bottom: 1px solid #333;
          margin: 0 5px;
          text-align: center;
        }

        /* Signature Section */
        .signature-section {
          margin-top: 50px;
        }

        .signature-box {
          padding: 10px 0;
        }

        .signature-line {
          width: 200px;
          height: 40px;
          border-bottom: 1px solid #333;
          margin-bottom: 8px;
        }

        .signature-label {
          font-size: 13px;
          font-weight: bold;
          color: #333;
          margin: 3px 0;
        }

        /* Date */
        .certificate-date {
          font-size: 14px;
          color: #333;
        }
      `}</style>
    </div>
  );
};
