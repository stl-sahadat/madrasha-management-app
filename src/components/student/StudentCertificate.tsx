import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentCertificate = () => {
  const { students, jamats, profile } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [searchName, setSearchName] = useState('');

  const filteredStudents = React.useMemo(() => {
    let pool = selectedJamat === 'all' ? [...students] : students.filter(s => s.jamat === selectedJamat);
    if (!searchName.trim()) return pool;

    const q = searchName.trim().toLowerCase();
    return pool.sort((a, b) => {
      const aMatches = (a.name || '').toLowerCase().includes(q) || String(a.roll || a.admissionNumber || '').includes(q);
      const bMatches = (b.name || '').toLowerCase().includes(q) || String(b.roll || b.admissionNumber || '').includes(q);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  }, [students, selectedJamat, searchName]);

  const currentStudent = students.find(s => s.id === selectedStudentId) || filteredStudents[0] || students[0];

  const [certData, setCertData] = useState({
    regNo: '20261089',
    gpa: '৫.০০',
    grade: 'A+',
    issueDate: new Date().toLocaleDateString('bn-BD'),
    certNo: 'JNM-2026-089'
  });

  const studentName = currentStudent?.name || '';
  const fatherName = currentStudent?.fatherName || '';
  const motherName = currentStudent?.motherName || 'মোছাঃ ফাতেমা বেগম';
  const jamatName = currentStudent?.jamat || 'হিফজ বিভাগ';
  const dob = currentStudent?.birthDay || currentStudent?.dob || '2013-02-08';
  const roll = currentStudent?.admissionNumber || currentStudent?.admission_number || currentStudent?.roll || '১০১';

  return (
    <div className="container-fluid p-0">
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .certificate-container {
            background: white !important;
            padding: 0 !important;
          }
          .certificate-wrapper {
            box-shadow: none !important;
            padding: 20px !important;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }

        .certificate-container {
          min-height: 100vh;
          padding: 20px;
          background: #f8f9fa;
        }

        .certificate-wrapper {
          background: white;
          max-width: 850px;
          margin: 0 auto;
          padding: 30px 40px;
          border: 3px double #000;
          box-shadow: 0 0 20px rgba(31, 26, 26, 0.1);
          font-family: 'SolaimanLipi', serif;
        }

        /* Header */
        .cert-header {
          text-align: center;
          margin-bottom: 15px;
        }

        .image-logo {
          width: 140px;
          height: auto;
          object-fit: contain;
          border-radius: 50%;
          margin-bottom: 8px;
        }

        .cert-header h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 5px 0;
          color: #1a1a1a;
        }

        .cert-header p {
          font-size: 14px;
          color: #333;
          margin: 3px 0;
        }

        .cert-contact {
          font-size: 12px !important;
          color: #666 !important;
        }

        .cert-hr {
          border: none;
          border-top: 2px solid #000;
          margin: 15px 0;
        }

        /* Title */
        .cert-title {
          text-align: center;
          font-size: 34px;
          font-weight: 700;
          margin: 15px 0 5px 0;
          letter-spacing: 1px;
        }

        .cert-subtitle {
          text-align: center;
          font-size: 15px;
          font-style: italic;
          color: #666;
          margin-bottom: 20px;
        }

        .cert-text-center {
          text-align: center;
          font-size: 16px;
          margin: 15px 0;
        }

        /* Student Name */
        .cert-student-name {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          margin: 15px 0;
          color: #15803D;
        }

        /* Tables */
        .info-table,
        .result-table,
        .signature-table,
        .footer-table {
          width: 100%;
          margin: 15px 0;
        }

        .info-table td {
          padding: 8px;
          font-size: 14px;
        }

        .cert-description {
          background: #fafafa;
          padding: 15px;
          margin: 15px 0;
          border-left: 3px solid #000;
          font-size: 15px;
          line-height: 1.8;
          text-align: justify;
        }

        /* Result Table */
        .result-table {
          margin: 20px 0;
        }

        .result-table td {
          text-align: center;
          padding: 12px;
          border: 2px solid #ddd;
          font-size: 14px;
        }

        .cert-wishes {
          text-align: center;
          font-size: 15px;
          font-style: italic;
          margin: 20px 0;
          color: #555;
        }

        /* Signature Table */
        .signature-table {
          margin: 30px 0 20px 0;
        }

        .signature-table td {
          text-align: center;
          vertical-align: bottom;
          padding: 0 10px;
        }

        .sig-line {
          width: 120px;
          height: 2px;
          background: #000;
          margin: 40px auto 8px auto;
        }

        .seal {
          width: 60px;
          height: 60px;
          border: 2px dashed #000;
          border-radius: 50%;
          margin: 10px auto 8px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .signature-table strong {
          font-size: 13px;
        }

        /* Footer */
        .footer-table td {
          font-size: 14px;
        }

        /* Button */
        .btn-print {
          padding: 12px 30px;
          font-size: 16px;
          font-weight: 600;
          background: #000;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-family: 'SolaimanLipi', serif;
        }

        .btn-print:hover {
          background: #333;
        }

        @media (max-width: 768px) {
          .certificate-wrapper {
            padding: 20px;
          }
          .info-table td {
            display: block;
            width: 100%;
          }
        }
      `}</style>

      {/* Selector Card (No Print) */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary py-3">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-award me-2"></i> সার্টিফিকেট / প্রশংসাপত্র জেনারেটর
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
            <div className="col-md-3 col-12">
              <label className="form-label fw-bold text-primary">
                <i className="fas fa-search me-1"></i> নাম বা রোল দিয়ে খুঁজুন:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="নাম বা রোল লিখুন..."
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  const q = e.target.value.trim().toLowerCase();
                  if (q) {
                    const pool = selectedJamat === 'all' ? students : students.filter(s => s.jamat === selectedJamat);
                    const match = pool.find(s =>
                      (s.name || '').toLowerCase().includes(q) ||
                      String(s.roll || s.admissionNumber || '').includes(q)
                    );
                    if (match) setSelectedStudentId(match.id);
                  }
                }}
              />
            </div>
            <div className="col-md-3 col-12">
              <label className="form-label fw-bold">শিক্ষার্থী নির্বাচন (নাম সবার উপরে):</label>
              <select
                className="form-select"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                {filteredStudents.map(s => {
                  const adm = s.admissionNumber || s.admission_number || s.roll;
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name} (রোল: {adm})
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">রেজিস্ট্রেশন:</label>
              <input
                type="text"
                className="form-control"
                value={certData.regNo}
                onChange={(e) => setCertData({ ...certData, regNo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">জিপিএ / গ্রেড:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="GPA"
                  value={certData.gpa}
                  onChange={(e) => setCertData({ ...certData, gpa: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Grade"
                  value={certData.grade}
                  onChange={(e) => setCertData({ ...certData, grade: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">সার্টিফিকেট নং:</label>
              <input
                type="text"
                className="form-control"
                value={certData.certNo}
                onChange={(e) => setCertData({ ...certData, certNo: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button onClick={() => window.print()} className="btn btn-dark w-100 py-2">
                <i className="fas fa-print me-1"></i> প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Certificate Container */}
      <div className="certificate-container" id="certificate">
        <div className="certificate-wrapper">
          {/* Header */}
          <div className="cert-header">
            <img
              src="/storage/institute/logos/madrasha_360_logo.png"
              alt="Logo"
              className="image-logo"
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
            <h1>{profile?.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}</h1>
            <p>{profile?.address || 'বদরখালী, মাতামুহুরী, কক্সবাজার।'}</p>
            <p className="cert-contact">মোবাইল: {profile?.phone1 || '01847657580'} | ইমেইল: {profile?.email || 'hafezazamnur@gmail.com'}</p>
          </div>

          <div className="cert-hr"></div>

          {/* Title */}
          <div className="cert-title">প্রশংসাপত্র</div>
          <div className="cert-subtitle">Testimonial / Academic Certificate</div>

          <p className="cert-text-center">এই মর্মে প্রত্যয়ন করা যাচ্ছে যে,</p>

          {/* Student Name */}
          <div className="cert-student-name">{studentName}</div>

          {/* Info Table */}
          <table className="info-table">
            <tbody>
              <tr>
                <td><strong>পিতা:</strong> {fatherName}</td>
                <td><strong>মাতা:</strong> {motherName}</td>
              </tr>
              <tr>
                <td><strong>জামাত/বিভাগ:</strong> {jamatName}</td>
                <td><strong>জন্ম তারিখ:</strong> {dob}</td>
              </tr>
            </tbody>
          </table>

          {/* Description */}
          <p className="cert-description">
            তিনি অত্র মাদ্রাসার একজন নিয়মিত শিক্ষার্থী ছিলেন। অধ্যয়নকালীন সময়ে তিনি ধর্মীয় অনুশাসন মেনে চলেছেন এবং তার আচরণ প্রশংসনীয় ও অনুকরণীয় ছিল। অত্র প্রতিষ্ঠান বা দেশের আইন পরিপন্থী কোনো কার্যকলাপে তিনি লিপ্ত ছিলেন না।
          </p>

          {/* Result Table */}
          <table className="result-table">
            <tbody>
              <tr>
                <td>
                  <strong>রোল নং:</strong><br />
                  {roll}
                </td>
                <td>
                  <strong>রেজিস্ট্রেশন:</strong><br />
                  {certData.regNo}
                </td>
                <td>
                  <strong>জিপিএ:</strong><br />
                  {certData.gpa}
                </td>
                <td>
                  <strong>গ্রেড:</strong><br />
                  {certData.grade}
                </td>
              </tr>
            </tbody>
          </table>

          <p className="cert-wishes">আমরা তার ভবিষ্যৎ জীবনে সর্বাঙ্গীণ সাফল্য ও সমৃদ্ধি কামনা করছি।</p>

          {/* Signatures */}
          <table className="signature-table">
            <tbody>
              <tr>
                <td>
                  <div className="sig-line"></div>
                  <strong>শ্রেণী শিক্ষক/শিক্ষিকা</strong>
                </td>
                <td>
                  <div className="seal">সীল</div>
                  <strong>প্রতিষ্ঠান সীল</strong>
                </td>
                <td>
                  <div className="sig-line"></div>
                  <strong>প্রধান শিক্ষক/অধ্যক্ষ</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="cert-hr"></div>

          {/* Footer */}
          <table className="footer-table">
            <tbody>
              <tr>
                <td><strong>ইস্যুর তারিখ:</strong> {certData.issueDate}</td>
                <td style={{ textAlign: 'right' }}><strong>সার্টিফিকেট নং:</strong> {certData.certNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Button */}
      <div className="text-center no-print my-4">
        <button onClick={() => window.print()} className="btn-print">
          🖨️ প্রিন্ট করুন
        </button>
      </div>
    </div>
  );
};
