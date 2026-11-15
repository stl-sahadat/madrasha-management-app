import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentProttoyonPotro = () => {
  const { students, jamats } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const filteredStudents = React.useMemo(() => {
    if (selectedJamat === 'all') return students;
    return students.filter(s => s.jamat === selectedJamat);
  }, [students, selectedJamat]);

  const currentStudent = students.find(s => s.id === selectedStudentId) || filteredStudents[0] || students[0];

  const [customData, setCustomData] = useState({
    session: '২০২৬',
    regNo: '20261054',
    date: new Date().toLocaleDateString('bn-BD')
  });

  const studentName = currentStudent?.name || '';
  const fatherName = currentStudent?.fatherName || '';
  const motherName = currentStudent?.motherName || 'মোছাঃ ফাতেমা বেগম';
  const jamatName = currentStudent?.jamat || 'হিফজ বিভাগ';
  const rollNo = currentStudent?.admissionNumber || currentStudent?.admission_number || currentStudent?.roll || '১০১';

  return (
    <div className="container-fluid p-0">
      <style>{`
        /* Print Styles */
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .certificate-container {
            margin: 0;
            padding: 0;
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
          margin-bottom: 30px;
        }

        .institute-logo {
          max-width: 140px;
          max-height: auto;
          margin-bottom: 15px;
        }

        .institute-name {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
          font-family: 'SolaimanLipi', 'Kalpurush', sans-serif;
        }

        .institute-address,
        .institute-contact,
        .institute-email {
          font-size: 14px;
          color: #555;
          margin: 5px 0;
        }

        /* Divider */
        .divider {
          height: 3px;
          background: linear-gradient(to right, transparent, #2c3e50, transparent);
          margin: 20px 0;
        }

        /* Title */
        .certificate-title h3 {
          font-size: 26px;
          font-weight: bold;
          color: #2c3e50;
          text-decoration: underline;
          margin: 30px 0;
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
          padding: 0 5px;
          text-align: center;
          font-weight: bold;
          color: #000;
        }

        .blank-sm {
          display: inline-block;
          min-width: 90px;
          border-bottom: 1px solid #333;
          margin: 0 5px;
          padding: 0 5px;
          text-align: center;
          font-weight: bold;
          color: #000;
        }

        /* Signature Section */
        .signature-section {
          margin-top: 60px;
        }

        .signature-box {
          padding: 20px 0;
        }

        .signature-line {
          width: 200px;
          height: 60px;
          border-bottom: 1px solid #333;
          margin-bottom: 10px;
        }

        .signature-label {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin: 5px 0;
        }

        /* Date */
        .certificate-date {
          font-size: 15px;
          color: #333;
        }
      `}</style>

      {/* Top Selector Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary py-3">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-file-certificate me-2"></i> প্রত্যয়ন পত্র জেনারেটর
          </h5>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label htmlFor="jamat_select" className="form-label fw-bold">জামাত:</label>
              <select
                id="jamat_select"
                className="form-select"
                value={selectedJamat}
                onChange={(e) => {
                  setSelectedJamat(e.target.value);
                  const firstOfJamat = students.find(s => e.target.value === 'all' || s.jamat === e.target.value);
                  if (firstOfJamat) setSelectedStudentId(firstOfJamat.id);
                }}
              >
                <option value="all">সকল জামাত</option>
                {(jamats || []).map(j => (
                  <option key={j.id || j.name} value={j.name}>{j.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">শিক্ষার্থী নির্বাচন করুন:</label>
              <select
                className="form-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                {filteredStudents.map(s => {
                  const adm = s.admissionNumber || s.admission_number || s.roll;
                  return (
                    <option key={s.id} value={s.id}>
                      {adm} - {s.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold">রেজিস্ট্রেশন নং:</label>
              <input
                type="text"
                className="form-control"
                value={customData.regNo}
                onChange={(e) => setCustomData({ ...customData, regNo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">শিক্ষাবর্ষ/সন:</label>
              <input
                type="text"
                className="form-control"
                value={customData.session}
                onChange={(e) => setCustomData({ ...customData, session: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button onClick={() => window.print()} className="btn btn-primary w-100 py-2">
                <i className="fas fa-print me-1"></i> প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Main Container */}
      <div className="container-fluid">
        <div className="certificate-container" id="certificate">
          <div className="certificate-wrapper">
            {/* Header */}
            <div className="certificate-header text-center">
              <img
                src="/storage/institute/logos/madrasha_360_logo.png"
                alt="Logo"
                className="institute-logo"
              />
              <h2 className="institute-name">জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা</h2>
              <p className="institute-address">বদরখালী, মাতামুহুরী, কক্সবাজার।</p>
              <p className="institute-contact">মোবাইল: 01847657580</p>
              <p className="institute-email">ইমেইল: hafezazamnur@gmail.com</p>
            </div>

            <div className="divider"></div>

            {/* Title */}
            <div className="certificate-title text-center">
              <h3>প্রত্যয়ন পত্র</h3>
            </div>

            {/* Content */}
            <div className="certificate-body">
              <p className="mb-4">
                এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,
                <span className="blank">{studentName}</span>
                পিতা: <span className="blank">{fatherName}</span>
                মাতা: <span className="blank">{motherName}</span>
                অত্র প্রতিষ্ঠানে <span className="blank-sm">{customData.session}</span> সনে
                <span className="blank">{jamatName}</span> শ্রেণীতে অধ্যয়নরত ছিল/ছিলেন।
              </p>

              <p className="mb-4">
                রোল নং: <span className="blank-sm">{rollNo}</span>
                রেজিস্ট্রেশন নং: <span className="blank">{customData.regNo}</span> ।
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
                <p>তারিখ: <span className="blank-sm">{customData.date}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Print Button */}
        <div className="row mb-3 mt-3 no-print">
          <div className="col-12 d-flex justify-content-center">
            <button onClick={() => window.print()} className="btn btn-primary px-5 py-2">
              <i className="fas fa-print me-2"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
