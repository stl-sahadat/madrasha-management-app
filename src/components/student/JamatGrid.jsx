import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const JamatGrid = () => {
  const { students, jamats, deleteStudent, setActiveTab } = useApp();
  const [selectedJamat, setSelectedJamat] = useState('');
  const [viewStudent, setViewStudent] = useState(null);

  const filteredStudents = selectedJamat
    ? students.filter(s => s.jamat === selectedJamat)
    : students;

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই ছাত্র/ছাত্রীকে মুছে ফেলতে চান?')) {
      deleteStudent(id);
    }
  };

  return (
    <div className="container-fluid p-0">
      <style>{`
        .student-card-wrapper {
          flex: 0 0 100%;
          max-width: 100%;
        }
        @media (min-width: 576px) {
          .student-card-wrapper {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        @media (min-width: 768px) {
          .student-card-wrapper {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }
        }
        @media (min-width: 992px) {
          .student-card-wrapper {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
        @media (min-width: 1400px) {
          .student-card-wrapper {
            flex: 0 0 20%;
            max-width: 20%;
          }
        }
      `}</style>

      {/* Top Filter Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> জামাত অনুসারে ছাত্র/ছাত্রী লিস্ট
          </h5>
        </div>

        <div className="card-body mb-3">
          <div className="row align-items-end">
            {/* Left: Select */}
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

            {/* Right: Add Student button */}
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

      {/* Students Container */}
      <div className="row g-4" id="studentsContainer">
        {filteredStudents.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="text-muted">এই জামাতে কোন ছাত্র/ছাত্রী পাওয়া যায়নি</p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const phone1 = student.parentsPhone || student.guardianPhone || 'N/A';
            const phone2 = student.parentsPhone2 || 'N/A';

            return (
              <div key={student.id} className="student-card-wrapper">
                <div className="card b-t-4-primary h-100 shadow-sm">
                  <div className="card-body text-center p-3 pb-0">
                    {/* Photo */}
                    <div className="mb-2">
                      <img
                        src={student.photo || '/students/FB_IMG_1791220812856.webp'}
                        alt={student.name}
                        className="rounded-circle border border-2 border-primary"
                        width="80"
                        height="80"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Name */}
                    <h6 className="card-title mb-2 text-truncate" title={student.name}>
                      {student.name}
                    </h6>

                    {/* Info */}
                    <div className="text-start small">
                      <p className="mb-1">
                        <strong>জামাত:</strong> <span>{student.jamat}</span>
                      </p>
                      <p className="mb-0" style={{ fontSize: '13px' }}>
                        <strong>Phone 1:</strong> {phone1}{' '}
                        <span className="text-success">(বাবা)</span>
                      </p>
                      <p className="mb-0" style={{ fontSize: '13px' }}>
                        <strong>Phone 2:</strong> {phone2}
                      </p>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="card-footer bg-white border-0 p-3">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary flex-fill"
                        onClick={() => setViewStudent(student)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-danger flex-fill"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View Student Modal */}
      {viewStudent && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fa-solid fa-user-graduate me-2"></i>ছাত্র/ছাত্রীর সম্পূর্ণ তথ্য
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setViewStudent(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="text-center mb-4">
                  <img
                    src={viewStudent.photo || '/students/FB_IMG_1791220812856.webp'}
                    alt={viewStudent.name}
                    className="rounded-circle mb-2"
                    style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #007bff' }}
                  />
                  <h4 className="fw-bold mb-0">{viewStudent.name}</h4>
                </div>

                <table className="table table-bordered table-sm text-start">
                  <tbody>
                    <tr>
                      <td className="fw-bold" style={{ width: '35%' }}>জন্ম তারিখ</td>
                      <td>{viewStudent.birthDay || viewStudent.dob || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">রক্তের গ্রুপ</td>
                      <td>{viewStudent.bloodGroup || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email</td>
                      <td>{viewStudent.email || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">পিতার নাম</td>
                      <td>{viewStudent.fatherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">মাতার নাম</td>
                      <td>{viewStudent.motherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">পিতার পেশা</td>
                      <td>{viewStudent.fatherProf || viewStudent.fatherOcc || 'কৃষক / ব্যবসা'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">অভিভাবকের নাম</td>
                      <td>{viewStudent.parentsName || viewStudent.fatherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">১ম ফোন নম্বর</td>
                      <td>{viewStudent.parentsPhone || viewStudent.guardianPhone || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">২য় ফোন নম্বর</td>
                      <td>{viewStudent.parentsPhone2 || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">জামাত</td>
                      <td>{viewStudent.jamat}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ভর্তি নম্বর</td>
                      <td>{viewStudent.admissionNumber || viewStudent.roll || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">মাসিক বেতন</td>
                      <td>৳ {viewStudent.coursefee || viewStudent.monthlyFee || 0}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">খাবার বিল</td>
                      <td>৳ {viewStudent.food_bill || viewStudent.khurakiFee || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewStudent(null)}
                >
                  <i className="fa-solid fa-times me-1"></i>বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
