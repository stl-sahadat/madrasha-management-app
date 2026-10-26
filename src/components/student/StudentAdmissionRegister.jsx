import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentAdmissionRegister = () => {
  const { students, jamats, setActiveTab } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('');

  const filteredStudents = selectedJamat
    ? students.filter(s => s.jamat === selectedJamat)
    : students;

  return (
    <div className="container-fluid p-0">
      {/* Top Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> জামাত অনুসারে ভর্তি রেজিষ্টার
          </h5>
        </div>

        <div className="card-body mb-3">
          <div className="row align-items-end">
            <div className="col-md-6">
              <label htmlFor="jamat_select" className="form-label fw-bold">
                জামাত লিস্ট
              </label>
              <select
                name="jamat_id"
                id="jamat_select"
                className="form-select"
                value={selectedJamat}
                onChange={(e) => setSelectedJamat(e.target.value)}
              >
                <option value="">সকল জামাত</option>
                {jamats.map((j) => (
                  <option key={j.id || j.name} value={j.name}>
                    {j.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 text-md-end text-start mt-3 mt-md-0">
              <button
                onClick={() => setActiveTab('student-create')}
                className="btn btn-danger text-white fw-bold"
              >
                <i className="fa-solid fa-plus me-1"></i> নতুন ছাত্র/ছাত্রী যুক্ত করুন
              </button>
              <p id="totalStudents" style={{ fontSize: '17px' }} className="mt-3 fw-bold px-3">
                ছাত্র/ছাত্রী: {filteredStudents.length} জন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Card */}
      <div className="card border-0 shadow-sm mb-4" id="printContent">
        <div className="card-body py-4">
          <img
            src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
            alt="Banner"
            className="w-100 img-fluid"
          />
          <div className="row mt-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                জামাত অনুসারে ভর্তি রেজিষ্টার
              </h5>
              {selectedJamat && <p className="mb-0 text-muted">জামাত: <strong>{selectedJamat}</strong></p>}
            </div>
            <div className="col-md-2 text-end">
              <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
            </div>
          </div>
        </div>

        <div className="table-responsive card-body">
          <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
            <thead className="bg-primary print-thead text-white">
              <tr className="text-center">
                <th>নং</th>
                <th>ছাত্রের নাম</th>
                <th>ভর্তি নং</th>
                <th>ফরম নং</th>
                <th>নিজ খোরাকি</th>
                <th>হাফ ফি</th>
                <th>ফুল ফি</th>
                <th>আবাসিক</th>
                <th>অনাবাসিক</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    কোন ছাত্র/ছাত্রীর তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const admissionNo = student.admissionNumber || student.admission_number || student.roll || idx + 101;
                  const formNo = student.form_number || student.roll || idx + 1001;
                  const isResidential = (student.khurakiFee || student.food_bill || 0) > 0 || student.residential === 'আবাসিক';
                  const mealType = student.meal_type || 'সাধারণ';

                  const selfKhuraki = mealType === 'সাধারণ' && isResidential ? '✓' : '-';
                  const halfFree = mealType === 'হাফ ফ্রি' ? '✓' : '-';
                  const fullFree = mealType === 'ফুল ফ্রি' ? '✓' : '-';
                  const abasik = isResidential ? '✓' : '-';
                  const onabashik = !isResidential ? '✓' : '-';

                  return (
                    <tr key={student.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="text-start ps-3 fw-semibold">{student.name}</td>
                      <td className="text-center">{admissionNo}</td>
                      <td className="text-center">{formNo}</td>
                      <td className="text-center">{selfKhuraki}</td>
                      <td className="text-center">{halfFree}</td>
                      <td className="text-center">{fullFree}</td>
                      <td className="text-center">{abasik}</td>
                      <td className="text-center">{onabashik}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Button */}
      <div className="row mb-3 no-print">
        <div className="col-12 d-flex justify-content-center">
          <button onClick={() => window.print()} className="btn btn-primary px-4 py-2">
            <i className="fas fa-print me-2"></i> প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};
