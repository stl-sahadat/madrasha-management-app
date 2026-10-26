import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentParentsNumber = () => {
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
            <i className="fa-solid fa-users me-2"></i> জামাত অনুযায়ী অভিভাবকের মোবাইল নাম্বারর
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
              <p id="totalParents" style={{ fontSize: '17px' }} className="mt-3 fw-bold px-3">
                অভিভাবক: {filteredStudents.length} জন
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
                জামাত অনুযায়ী অভিভাবকের মোবাইল নাম্বারর
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
                <th>ক্রমিক নং</th>
                <th>ছাত্রের নাম</th>
                <th>অভিভাবক</th>
                <th>১ম মোবাইল</th>
                <th>২য় মোবাইল</th>
                <th>সম্পর্ক</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    কোন অভিভাবকের তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const guardianName = student.parentsName || student.fatherName || 'মাওলানা নুরুল হক';
                  const phone1 = student.parentsPhone || student.guardianPhone || '01810003871';
                  const phone2 = student.parentsPhone2 || 'N/A';
                  const rel = student.relation || 'পিতা';

                  return (
                    <tr key={student.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="text-start ps-3 fw-semibold">{student.name}</td>
                      <td className="text-start ps-3">{guardianName}</td>
                      <td className="text-center fw-mono">
                        <a href={`tel:${phone1}`} className="text-decoration-none text-dark">
                          {phone1}
                        </a>
                      </td>
                      <td className="text-center fw-mono">{phone2}</td>
                      <td className="text-center">{rel}</td>
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
