import React, { useState } from 'react';
import { Printer, Download, UserCheck, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionForm = () => {
  const { students, profile } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const currentStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-file-signature me-2"></i>
            অফিশিয়াল ভর্তি ফরম (Student Admission Form)
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> ফরম প্রিন্ট করুন
            </button>
          </div>
        </div>

        <div className="card-body bg-light py-3">
          <div className="row g-3 align-items-center justify-content-between">
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted mb-1">
                পূরণকৃত ফরম দেখতে শিক্ষার্থী নির্বাচন করুন (অথবা খালি ফরমের জন্য ফাঁকা রাখুন):
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="">-- খালি ভর্তি ফরম (Blank Admission Form) --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.roll} - {s.name} ({s.jamat})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button
                type="button"
                onClick={() => setSelectedStudentId('')}
                className="btn btn-sm btn-outline-secondary"
              >
                <i className="fa-solid fa-rotate-left me-1"></i> খালি ফরম
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Admission Form Sheet */}
      <div className="d-flex justify-content-center">
        <div
          className="bg-white p-5 border shadow-sm"
          style={{
            width: '210mm',
            minHeight: '297mm',
            position: 'relative',
            color: '#1a202c',
            fontFamily: "'SolaimanLipi', 'Kalpurush', sans-serif"
          }}
          id="admission-print-sheet"
        >
          {/* Header */}
          <div className="text-center border-bottom pb-3 mb-4">
            <div className="d-flex justify-content-between align-items-start">
              <img
                src="/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png"
                alt="Logo"
                style={{ width: '85px', height: '85px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/images/avatar.svg';
                }}
              />
              <div className="flex-grow-1 px-3">
                <h3 className="fw-bold text-dark mb-1" style={{ fontSize: '24px' }}>
                  {profile.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}
                </h3>
                <p className="mb-1 text-muted small">{profile.address || 'বদরখালী, মাতামুহুরী, চকরিয়া, কক্সবাজার।'}</p>
                <p className="mb-0 text-muted small font-mono">
                  মোবাইল: {profile.phone1 || '01820050095'}, {profile.phone2 || '01847657580'} | ইমেইল: {profile.email}
                </p>
              </div>
              {/* Photo Box */}
              <div
                className="border border-2 border-secondary d-flex align-items-center justify-content-center text-center p-1"
                style={{ width: '90px', height: '110px', fontSize: '11px', color: '#718096' }}
              >
                {currentStudent?.photo ? (
                  <img
                    src={currentStudent.photo}
                    alt="Student"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span>পাসপোর্ট সাইজ ছবি</span>
                )}
              </div>
            </div>

            <div className="mt-3">
              <span
                className="px-4 py-1 text-white fw-bold rounded-pill text-uppercase"
                style={{ backgroundColor: '#0f626a', fontSize: '15px' }}
              >
                ভর্তি ফরম
              </span>
            </div>
          </div>

          {/* Form Meta: Form No & Date */}
          <div className="d-flex justify-content-between mb-4 small fw-semibold">
            <div>
              <span>ভর্তি ফরম নং: </span>
              <span className="font-mono fw-bold border-bottom px-3">
                {currentStudent ? `AF-2026-${currentStudent.roll}` : '_________________'}
              </span>
            </div>
            <div>
              <span>ভর্তি সেশন: </span>
              <span className="fw-bold border-bottom px-2">২০২৬ ইং</span>
            </div>
            <div>
              <span>ভর্তির তারিখ: </span>
              <span className="font-mono border-bottom px-3">
                {currentStudent ? '2026-01-15' : '____ / ____ / ২০২৬'}
              </span>
            </div>
          </div>

          {/* Form Body Table Layout */}
          <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle text-sm mb-0">
              <tbody>
                <tr>
                  <td className="bg-light fw-bold" style={{ width: '25%' }}>শিক্ষার্থীর নাম (বাংলা)</td>
                  <td colSpan="3" className="fw-bold fs-6">
                    {currentStudent?.name || '________________________________________________'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">শিক্ষার্থীর নাম (ইংরেজি)</td>
                  <td colSpan="3" className="font-mono">
                    {currentStudent?.nameEn || '________________________________________________'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">ভর্তিকৃত জামাত/বিভাগ</td>
                  <td className="fw-bold text-primary">
                    {currentStudent?.jamat || '_____________________'}
                  </td>
                  <td className="bg-light fw-bold" style={{ width: '20%' }}>রোল / আইডি নং</td>
                  <td className="font-mono fw-bold">
                    {currentStudent?.roll || '_________'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">জন্ম তারিখ</td>
                  <td className="font-mono">
                    {currentStudent?.dob || '____ / ____ / ________'}
                  </td>
                  <td className="bg-light fw-bold">রক্তের গ্রুপ</td>
                  <td>
                    <span className="badge bg-danger-subtle text-danger fs-6 fw-bold">
                      {currentStudent?.bloodGroup || '________'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">জন্ম নিবন্ধন নম্বর</td>
                  <td colSpan="3" className="font-mono">
                    {currentStudent?.birthReg || '____________________________________'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">পিতার নাম</td>
                  <td className="fw-semibold">
                    {currentStudent?.fatherName || '________________________________'}
                  </td>
                  <td className="bg-light fw-bold">পিতার পেশা</td>
                  <td>{currentStudent?.fatherOcc || 'ব্যবসা / চাকরি'}</td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">মাতার নাম</td>
                  <td className="fw-semibold">
                    {currentStudent?.motherName || 'মোসাম্মৎ আয়েশা বেগম'}
                  </td>
                  <td className="bg-light fw-bold">মাতার পেশা</td>
                  <td>গৃহিণী</td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">অভিভাবকের মোবাইল নং</td>
                  <td className="font-mono fw-bold text-success">
                    {currentStudent?.guardianPhone || '01XXXXXXXXX'}
                  </td>
                  <td className="bg-light fw-bold">জরুরি মোবাইল</td>
                  <td className="font-mono">01800000000</td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">বর্তমান ঠিকানা</td>
                  <td colSpan="3">
                    {currentStudent?.presentAddress || currentStudent?.address || 'গ্রাম: বদরখালী, ডাকঘর: বদরখালী, উপজেলা: চকরিয়া, জেলা: কক্সবাজার।'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">স্থায়ী ঠিকানা</td>
                  <td colSpan="3">
                    {currentStudent?.permanentAddress || currentStudent?.address || 'গ্রাম: বদরখালী, ডাকঘর: বদরখালী, উপজেলা: চকরিয়া, জেলা: কক্সবাজার।'}
                  </td>
                </tr>
                <tr>
                  <td className="bg-light fw-bold">ভর্তির ধরন</td>
                  <td>
                    {currentStudent?.khurakiFee > 0 ? 'আবাসিক (বোডিং)' : 'অনাবাসিক'}
                  </td>
                  <td className="bg-light fw-bold">নির্ধারিত মাসিক বেতন</td>
                  <td className="font-mono fw-bold text-success">
                    ৳ {currentStudent?.monthlyFee || '৫০০'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Declaration Section */}
          <div className="p-3 border rounded mb-5 bg-light" style={{ fontSize: '13px', lineHeight: '1.8' }}>
            <h6 className="fw-bold mb-1">অভিভাবকের অঙ্গীকারনামা:</h6>
            <p className="mb-0 text-muted">
              আমি এই মর্মে অঙ্গীকার করছি যে, আমার সন্তান অত্র প্রতিষ্ঠানের যাবতীয় নিয়মনীতি ও শৃঙ্খলা মেনে চলবে।
              প্রতিষ্ঠানের নিয়ম অনুযায়ী প্রতি মাসের নির্ধারিত বেতন ও খোরাকী ফি সময়মতো পরিশোধ করতে বাধ্য থাকিব।
            </p>
          </div>

          {/* Signatures */}
          <div className="row text-center mt-5 pt-4">
            <div className="col-4">
              <div className="border-top border-dark pt-1">
                <span className="small fw-bold">অভিভাবকের স্বাক্ষর</span>
              </div>
            </div>
            <div className="col-4">
              <div className="border-top border-dark pt-1">
                <span className="small fw-bold">ভর্তি কমিটির স্বাক্ষর</span>
              </div>
            </div>
            <div className="col-4">
              <div className="border-top border-dark pt-1">
                <span className="small fw-bold">মুহতামিম / প্রধান শিক্ষকের সীল ও স্বাক্ষর</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
