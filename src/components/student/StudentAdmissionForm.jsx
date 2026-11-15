import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionForm = () => {
  const { students, jamats } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const filteredStudents = React.useMemo(() => {
    if (selectedJamat === 'all') return students;
    return students.filter(s => s.jamat === selectedJamat);
  }, [students, selectedJamat]);

  const currentStudent = students.find(s => s.id === selectedStudentId) || filteredStudents[0] || students[0];

  const admissionNo = currentStudent?.admissionNumber || currentStudent?.admission_number || currentStudent?.roll || '101';
  const admissionDate = currentStudent?.admissionDate || '2024-01-15';
  const name = currentStudent?.name || '';
  const birthDay = currentStudent?.birthDay || currentStudent?.dob || '2013-02-08';
  const fatherName = currentStudent?.fatherName || '';
  const fatherProf = currentStudent?.fatherProf || currentStudent?.fatherOcc || 'ব্যবসা';
  const currentAddress = currentStudent?.currentAddress || currentStudent?.address || 'বদরখালী, কক্সবাজার';
  const parentsName = currentStudent?.parentsName || currentStudent?.fatherName || '';
  const relation = currentStudent?.relation || 'পিতা';
  const parentsPhone = currentStudent?.parentsPhone || currentStudent?.guardianPhone || '01810003871';
  const parentsPhone2 = currentStudent?.parentsPhone2 || 'N/A';
  const courseFee = currentStudent?.coursefee || currentStudent?.monthlyFee || 800;
  const foodBill = currentStudent?.food_bill || currentStudent?.khurakiFee || 2000;
  const admissionFee = currentStudent?.admissionFee || 1500;
  const totalFee = Number(courseFee) + Number(foodBill);
  const isAbasik = (currentStudent?.khurakiFee || currentStudent?.food_bill || 0) > 0 || currentStudent?.residential === 'আবাসিক';

  return (
    <div className="container-fluid p-0">
      <style>{`
        .form-page {
          width: 210mm;
          height: 297mm;
          margin: 0 auto 20px;
          position: relative;
          overflow: hidden;
          background: white;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        .form-page img.bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        .form-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          padding: 20mm;
          font-family: 'SolaimanLipi', sans-serif;
        }
        .admission_number {
          position: absolute;
          top: 54.4mm;
          left: 26mm;
          font-size: 13pt;
          font-weight: bold;
        }
        .admission_date {
          position: absolute;
          top: 54.4mm;
          left: 171mm;
          font-size: 13pt;
          font-weight: bold;
        }
        .name {
          position: absolute;
          top: 67.5mm;
          left: 40mm;
          font-size: 13pt;
          font-weight: 600;
        }
        .birth_day {
          position: absolute;
          top: 67.9mm;
          left: 159mm;
          font-size: 13pt;
        }
        .father_name {
          position: absolute;
          top: 77.9mm;
          left: 40mm;
          font-size: 13pt;
        }
        .father_profesion {
          position: absolute;
          top: 77.9mm;
          left: 125mm;
          font-size: 13pt;
        }
        .current_address {
          position: absolute;
          top: 107.1mm;
          left: 49mm;
          font-size: 13pt;
          line-height: 2.1;
        }
        .parents_name {
          position: absolute;
          top: 127.4mm;
          left: 49mm;
          font-size: 13pt;
          line-height: 2.1;
        }
        .relation {
          position: absolute;
          top: 127.4mm;
          left: 126.2mm;
          font-size: 13pt;
          line-height: 2.1;
        }
        .parents_phone {
          position: absolute;
          top: 148.6mm;
          left: 34.2mm;
          font-size: 13pt;
          line-height: 2.1;
        }
        .parents_phone2 {
          position: absolute;
          top: 148.6mm;
          left: 128.2mm;
          font-size: 13pt;
          line-height: 2.1;
        }
        .coursefee {
          position: absolute;
          top: 172mm;
          left: 40mm;
          font-size: 13pt;
        }
        .food_bill {
          position: absolute;
          top: 172mm;
          left: 120mm;
          font-size: 13pt;
        }
        .admission_fee {
          position: absolute;
          top: 185mm;
          left: 40mm;
          font-size: 13pt;
        }
        .examiner {
          position: absolute;
          top: 226mm;
          left: 45.2mm;
          font-size: 13pt;
          line-height: 2.1;
        }
        .abasik {
          position: absolute;
          top: 60.1mm;
          left: 145mm;
          font-size: 10pt;
        }
        .onabashik {
          position: absolute;
          top: 60.1mm;
          left: 175mm;
          font-size: 10pt;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .form-page {
            box-shadow: none !important;
            margin: 0 !important;
            page-break-after: always;
          }
        }
      `}</style>

      {/* Top Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> ভর্তি ফর্ম
          </h5>
        </div>

        <div className="card-body mb-3">
          <div className="row align-items-end">
            <div className="col-md-10 d-flex flex-wrap gap-3 align-items-end">
              <div className="col-12 col-md-4">
                <label htmlFor="jamat_select" className="form-label fw-bold">জামাত</label>
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
                  {(jamats || []).map((j) => (
                    <option key={j.id || j.name} value={j.name}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-5">
                <label className="form-label fw-bold">ভর্তি নং দিয়ে খুঁজুন</label>
                <select
                  name="student_id"
                  id="name_select"
                  className="form-select"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                  <option value="">ভর্তি নং নির্বাচন করুন</option>
                  {filteredStudents.map((s) => {
                    const adm = s.admissionNumber || s.admission_number || s.roll;
                    return (
                      <option key={s.id} value={s.id}>
                        {adm} - {s.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                type="button"
                className="btn b-r-22 btn-info px-4 flex-shrink-0"
                onClick={() => {}}
              >
                ফলাফল দেখান
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admission Form Pages */}
      {currentStudent && (
        <div id="printContent">
          {/* Front Page */}
          <div className="form-page">
            <img src="/assets/custom/1.png" alt="Front Page" className="bg-image" />
            <div className="form-content">
              <div className="admission_number">{admissionNo}</div>
              <div className="admission_date">{admissionDate}</div>
              <div className="name">{name}</div>
              <div className="birth_day">{birthDay}</div>
              <div className="father_name">{fatherName}</div>
              <div className="father_profesion">{fatherProf}</div>
              <div className="current_address">{currentAddress}</div>
              <div className="parents_name">{parentsName}</div>
              <div className="relation">{relation}</div>
              <div className="parents_phone">{parentsPhone}</div>
              <div className="parents_phone2">{parentsPhone2}</div>
              <div className="coursefee">৳ {courseFee}</div>
              <div className="food_bill">৳ {foodBill}</div>
              <div className="admission_fee">৳ {admissionFee}</div>

              {isAbasik ? (
                <div className="text-dark abasik">
                  <i className="fa-solid fa-circle"></i>
                </div>
              ) : (
                <div className="text-dark onabashik">
                  <i className="fa-solid fa-circle"></i>
                </div>
              )}

              <div className="examiner">মাহমুদুল করিম</div>
            </div>
          </div>

          {/* Back Page */}
          <div className="form-page">
            <img src="/assets/custom/2.png" alt="Back Page" className="bg-image" />
            <div className="form-content">
              {/* Back page content overlay */}
            </div>
          </div>
        </div>
      )}

      {/* Print Button */}
      <div className="row mb-4 no-print">
        <div className="col-12 d-flex justify-content-center">
          <button onClick={() => window.print()} className="btn btn-primary px-5 py-2">
            <i className="fas fa-print me-2"></i> ভর্তি ফর্ম প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};
