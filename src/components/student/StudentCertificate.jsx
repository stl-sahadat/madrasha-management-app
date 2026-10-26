import React, { useState } from 'react';
import { Printer, Award, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentCertificate = () => {
  const { students, profile } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);

  const student = students.find(s => s.id === selectedStudentId);

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-award me-2"></i>
            প্রশংসাপত্র / সার্টিফিকেট জেনারেটর (Certificate of Achievement)
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> সার্টিফিকেট প্রিন্ট করুন
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
                <option value="">-- ফাঁকা সার্টিফিকেট (Blank) --</option>
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
              />
            </div>

            <div className="col-md-4 text-md-end mt-4">
              <button
                type="button"
                onClick={() => setSelectedStudentId('')}
                className="btn btn-sm btn-outline-secondary"
              >
                ফাঁকা সার্টিফিকেট দেখান
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Wrapper (Matching hostzonebd 100%) */}
      <div className="certificate-screen-area d-flex justify-content-center p-3">
        <div
          className="certificate-print-box bg-white p-5 position-relative"
          style={{
            maxWidth: '850px',
            width: '100%',
            border: '4px double #1a202c',
            boxShadow: '0 0 25px rgba(0,0,0,0.1)',
            fontFamily: "'Noto Serif Bengali', 'SolaimanLipi', serif"
          }}
        >
          {/* Header */}
          <div className="text-center mb-3">
            <img
              src="/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png"
              alt="Logo"
              style={{ width: '85px', height: '85px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/avatar.svg';
              }}
            />
            <h2 className="fw-bold text-dark mt-2 mb-1" style={{ fontSize: '24px' }}>
              {profile.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}
            </h2>
            <p className="text-muted small mb-1">{profile.address || 'বদরখালী, মাতামুহুরী, কক্সবাজার।'}</p>
            <p className="text-muted small mb-0 font-mono">
              মোবাইল: {profile.phone2 || '01847657580'} | ইমেইল: {profile.email || 'hafezazamnur@gmail.com'}
            </p>
          </div>

          <hr style={{ borderTop: '2px solid #000' }} />

          {/* Title */}
          <div className="text-center my-3">
            <h1 className="fw-bold mb-0" style={{ fontSize: '32px', letterSpacing: '1px' }}>
              সার্টিফিকেট
            </h1>
            <p className="fst-italic text-muted small">Certificate of Achievement</p>
          </div>

          <p className="text-center text-muted mb-2">এই সার্টিফিকেট সগৌরবে প্রদান করা হলো</p>

          <h3 className="text-center fw-bold text-primary my-3 border-bottom pb-2 d-inline-block w-100" style={{ fontSize: '24px' }}>
            {student ? student.name : '_________________________________'}
          </h3>

          <div className="my-4 p-3 bg-light border-start border-3 border-dark rounded">
            <p className="mb-0 text-dark" style={{ lineHeight: '1.9', fontSize: '15px' }}>
              তিনি অত্র মাদ্রাসার <strong>{student ? student.jamat : '_______________'}</strong> হতে ২০২৬ শিক্ষাবর্ষের
              বার্ষিক চূড়ান্ত মূল্যায়ন পরীক্ষায় সাফল্যের সাথে উত্তীর্ণ হয়েছেন। অধ্যয়নকালে তাঁর নৈতিক চরিত্র ও আচার-ব্যবহার
              প্রশংসনীয় ছিল।
            </p>
          </div>

          {/* Result Summary Table */}
          <table className="table table-bordered text-center my-4 align-middle">
            <tbody className="small">
              <tr>
                <td className="bg-light">
                  <strong>পিতার নাম:</strong><br />
                  {student ? student.fatherName : '_____________'}
                </td>
                <td className="bg-light">
                  <strong>রোল নং:</strong><br />
                  <span className="font-mono fw-bold">{student ? student.roll : '_______'}</span>
                </td>
                <td className="bg-light">
                  <strong>রেজিস্ট্রেশন:</strong><br />
                  <span className="font-mono">{student ? `REG-${student.roll}` : '_____________'}</span>
                </td>
                <td className="bg-light">
                  <strong>জিপিএ:</strong><br />
                  <span className="font-mono fw-bold text-success">৫.০০</span>
                </td>
                <td className="bg-light">
                  <strong>গ্রেড:</strong><br />
                  <span className="badge bg-success">মুমতাজ (A+)</span>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="text-center fst-italic text-muted my-4">
            আমরা তাঁর ভবিষ্যৎ জীবনে সর্বাঙ্গীণ সাফল্য, জ্ঞান ও দ্বীনি সমৃদ্ধি কামনা করছি।
          </p>

          {/* Signatures */}
          <div className="row text-center mt-5 pt-3 align-items-end">
            <div className="col-4">
              <div style={{ width: '130px', height: '2px', background: '#000', margin: '0 auto 8px' }}></div>
              <strong className="small">শ্রেণী শিক্ষক/শিক্ষিকা</strong>
            </div>
            <div className="col-4">
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  border: '2px dashed #000',
                  borderRadius: '50%',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}
              >
                সীল
              </div>
              <strong className="small">প্রতিষ্ঠান সীল</strong>
            </div>
            <div className="col-4">
              <div style={{ width: '130px', height: '2px', background: '#000', margin: '0 auto 8px' }}></div>
              <strong className="small">মুহতামিম / প্রধান শিক্ষক</strong>
            </div>
          </div>

          <hr className="mt-4" />

          {/* Footer Info */}
          <div className="d-flex justify-content-between small text-muted">
            <span><strong>ইস্যুর তারিখ:</strong> <span className="font-mono">{issueDate}</span></span>
            <span><strong>সার্টিফিকেট নং:</strong> <span className="font-mono">CERT-2026-{student ? student.roll : '000'}</span></span>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .certificate-screen-area {
            padding: 0 !important;
          }
          .certificate-print-box {
            box-shadow: none !important;
            border: 3px double #000 !important;
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
};
