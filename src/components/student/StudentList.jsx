import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const StudentList = () => {
  const { students, jamats, deleteStudent, updateStudent, setActiveTab } = useApp();

  const [searchAdmission, setSearchAdmission] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchJamat, setSearchJamat] = useState('');
  const [selectedModalStudent, setSelectedModalStudent] = useState(null);
  const [smsModalStudent, setSmsModalStudent] = useState(null);
  const [smsText, setSmsText] = useState('');

  // Filter students
  const filteredStudents = students.filter(s => {
    const admissionNo = (s.admissionNumber || s.admission_number || s.roll || '').toString();
    const phone = (s.parentsPhone || s.parents_phone || s.guardianPhone || '').toString();
    const jamat = s.jamat || '';

    const matchAdmission = !searchAdmission || admissionNo.includes(searchAdmission);
    const matchPhone = !searchPhone || phone.includes(searchPhone);
    const matchJamat = !searchJamat || jamat === searchJamat;

    return matchAdmission && matchPhone && matchJamat;
  });

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই ছাত্র/ছাত্রীকে মুছে ফেলতে চান?')) {
      deleteStudent(id);
    }
  };

  const handleSendSms = (student) => {
    setSmsModalStudent(student);
    setSmsText(`সম্মানিত অভিভাবক, আপনার সন্তান ${student.name}-এর মাদ্রাসা সংক্রান্ত তথ্য...`);
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">
            <i className="fas fa-clipboard-list me-2 text-primary"></i>
            ছাত্র/ছাত্রী লিস্ট
          </h5>
          <button
            onClick={() => setActiveTab('student-create')}
            className="btn btn-danger text-white fw-bold"
          >
            <i className="fa-solid fa-plus me-1"></i> নতুন ছাত্র/ছাত্রী যুক্ত করুন
          </button>
        </div>

        <div className="card-body">
          {/* Custom Search Boxes */}
          <div className="row mb-3 g-3">
            <div className="col-md-4">
              <label htmlFor="search_admission" className="form-label fw-semibold">
                ভর্তি নম্বর দিয়ে খুঁজুন
              </label>
              <input
                type="text"
                id="search_admission"
                className="form-control"
                placeholder="ভর্তি নম্বর লিখুন"
                value={searchAdmission}
                onChange={(e) => setSearchAdmission(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="search_phone" className="form-label fw-semibold">
                অভিভাবকের মোবাইল ১ দিয়ে খুঁজুন
              </label>
              <input
                type="text"
                id="search_phone"
                className="form-control"
                placeholder="অভিভাবকের মোবাইল ১ নম্বর লিখুন"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="search_jamat" className="form-label fw-semibold">
                জামাত দিয়ে ফিল্টার করুন
              </label>
              <select
                id="search_jamat"
                className="form-select"
                value={searchJamat}
                onChange={(e) => setSearchJamat(e.target.value)}
              >
                <option value="">সকল জামাত</option>
                {jamats.map((j) => (
                  <option key={j.id || j.name} value={j.name}>
                    {j.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle table-bordered" id="students-datatable">
              <thead className="table-light">
                <tr>
                  <th title="ছবি" className="text-center" style={{ width: '120px' }}>ছবি</th>
                  <th title="বিবরণ">বিবরণ</th>
                  <th title="জামাত" style={{ width: '140px' }}>জামাত</th>
                  <th title="এ্যাকাউন্ট সংক্ষিপ্তসার" style={{ width: '180px' }}>এ্যাকাউন্ট সংক্ষিপ্তসার</th>
                  <th title="বিস্তারিত" className="text-center" style={{ width: '130px' }}>বিস্তারিত</th>
                  <th title="মুছুন" className="text-center" style={{ width: '100px' }}>মুছুন</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      কোন ছাত্র/ছাত্রীর তথ্য পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const admissionNo = student.admissionNumber || student.admission_number || student.roll || 'N/A';
                    const birthDay = student.birthDay || student.dob || 'N/A';
                    const blood = student.bloodGroup || 'N/A';
                    const admissionDate = student.admissionDate || 'N/A';
                    const parentsName = student.parentsName || student.fatherName || 'N/A';
                    const phone1 = student.parentsPhone || student.guardianPhone || 'N/A';
                    const phone2 = student.parentsPhone2 || 'N/A';
                    const courseFee = student.coursefee || student.monthlyFee || 0;
                    const foodBill = student.food_bill || student.khurakiFee || 0;

                    return (
                      <tr key={student.id}>
                        {/* ছবি */}
                        <td className="text-center">
                          <div className="d-flex justify-content-center">
                            <div className="text-center">
                              <img
                                src={student.photo || '/storage/students/default-student.jpg'}
                                alt={student.name}
                                className="img-thumbnail mb-2"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                onError={(e) => { e.target.src = '/storage/students/default-student.jpg'; }}
                              />
                              <label
                                htmlFor={`photo-upload-${student.id}`}
                                className="btn btn-warning btn-sm w-100"
                                style={{ cursor: 'pointer', fontSize: '11px' }}
                              >
                                <i className="fa-solid fa-upload me-1"></i> ছবি
                              </label>
                              <input
                                type="file"
                                id={`photo-upload-${student.id}`}
                                className="d-none"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      updateStudent(student.id, { photo: ev.target.result });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* বিবরণ */}
                        <td>
                          <div className="student-details" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                            <p className="mb-1">নাম: <strong>{student.name}</strong></p>
                            <p className="mb-1">ভর্তি নং: <strong>{admissionNo}</strong></p>
                            <p className="mb-1">জন্ম তারিখ: <strong>{birthDay}</strong></p>
                            <p className="mb-1">রক্তের গ্রুপ: <strong>{blood}</strong></p>
                            <p className="mb-1">ভর্তি তারিখ: <strong>{admissionDate}</strong></p>
                            <p className="mb-1">অভিভাবকের নাম: <strong>{parentsName}</strong></p>
                            <p className="mb-1">ই-মেইল: <strong>{student.email || 'N/A'}</strong></p>
                            <p className="mb-1">অভিভাবকের ১ম মোবাইল : <strong>{phone1}</strong></p>
                            <p className="mb-1">অভিভাবকের ২য় মোবাইল : <strong>{phone2}</strong></p>
                          </div>
                        </td>

                        {/* জামাত */}
                        <td>
                          <div className="batch-info">
                            <strong>{student.jamat}</strong>
                          </div>
                        </td>

                        {/* এ্যাকাউন্ট সংক্ষিপ্তসার */}
                        <td>
                          <div className="account-summary" style={{ fontSize: '13px' }}>
                            <p className="mb-1">
                              বেতন : <strong>৳ {Number(courseFee).toLocaleString('bn-BD')}</strong>
                            </p>
                            <p className="mb-1">
                              খানা খরচ : <strong>৳ {Number(foodBill).toLocaleString('bn-BD')}</strong>
                            </p>
                          </div>
                        </td>

                        {/* বিস্তারিত */}
                        <td className="text-center">
                          <div className="action-buttons d-flex flex-column align-items-center">
                            <button
                              className="btn btn-primary btn-sm mb-2 w-100"
                              onClick={() => setSelectedModalStudent(student)}
                              style={{ fontSize: '12px' }}
                            >
                              <i className="fa-solid fa-eye me-1"></i> বিস্তারিত
                            </button>
                            <button
                              className="btn btn-success btn-sm mb-2 w-100"
                              onClick={() => handleSendSms(student)}
                              style={{ fontSize: '12px' }}
                            >
                              <i className="fa-solid fa-message me-1"></i> এস এম এস
                            </button>
                          </div>
                        </td>

                        {/* মুছুন */}
                        <td className="text-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(student.id)}
                            style={{ fontSize: '12px' }}
                          >
                            <i className="fa-solid fa-trash me-1"></i> মুছুন
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedModalStudent && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
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
                  onClick={() => setSelectedModalStudent(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                {/* Photo and Name */}
                <div className="text-center mb-4">
                  <img
                    src={selectedModalStudent.photo || '/students/FB_IMG_1791220812856.webp'}
                    alt={selectedModalStudent.name}
                    className="rounded-circle mb-2"
                    style={{ width: '120px', height: '120px', objectFit: 'cover', border: '3px solid #007bff' }}
                  />
                  <h4 className="fw-bold mb-0">{selectedModalStudent.name}</h4>
                </div>

                {/* All Information Table */}
                <table className="table table-bordered table-sm text-start">
                  <tbody>
                    <tr>
                      <td className="fw-bold" style={{ width: '35%' }}>জন্ম তারিখ</td>
                      <td>{selectedModalStudent.birthDay || selectedModalStudent.dob || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">রক্তের গ্রুপ</td>
                      <td>{selectedModalStudent.bloodGroup || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email</td>
                      <td>{selectedModalStudent.email || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">পিতার নাম</td>
                      <td>{selectedModalStudent.fatherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">মাতার নাম</td>
                      <td>{selectedModalStudent.motherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">পিতার পেশা</td>
                      <td>{selectedModalStudent.fatherProf || selectedModalStudent.fatherOcc || 'কৃষক / ব্যবসা'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">অভিভাবকের নাম</td>
                      <td>{selectedModalStudent.parentsName || selectedModalStudent.fatherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">১ম ফোন নম্বর</td>
                      <td>{selectedModalStudent.parentsPhone || selectedModalStudent.guardianPhone || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">২য় ফোন নম্বর</td>
                      <td>{selectedModalStudent.parentsPhone2 || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">সম্পর্ক</td>
                      <td>{selectedModalStudent.relation || 'পিতা'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">বর্তমান ঠিকানা</td>
                      <td>{selectedModalStudent.currentAddress || selectedModalStudent.address || 'বদরখালী, কক্সবাজার'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">স্থায়ী ঠিকানা</td>
                      <td>{selectedModalStudent.permanentAddress || selectedModalStudent.address || 'বদরখালী, কক্সবাজার'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">জামাত</td>
                      <td>{selectedModalStudent.jamat}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ভর্তির তারিখ</td>
                      <td>{selectedModalStudent.admissionDate || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ফর্ম নম্বর</td>
                      <td>{selectedModalStudent.form_number || selectedModalStudent.roll || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ভর্তি নম্বর</td>
                      <td>{selectedModalStudent.admissionNumber || selectedModalStudent.admission_number || selectedModalStudent.roll || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ভর্তি ফি</td>
                      <td>{selectedModalStudent.admissionFee || 1500} টাকা</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">খাবার বিল</td>
                      <td>{selectedModalStudent.food_bill || selectedModalStudent.khurakiFee || 0} টাকা</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">মাসিক বেতন</td>
                      <td>{selectedModalStudent.coursefee || selectedModalStudent.monthlyFee || 0} টাকা</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">আবাসিক/অনাবাসিক</td>
                      <td>{selectedModalStudent.residential || ((selectedModalStudent.khurakiFee || 0) > 0 ? 'আবাসিক' : 'অনাবাসিক')}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">খাবারের ধরন</td>
                      <td>{selectedModalStudent.meal_type || 'সাধারণ'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">বোর্ডিং ফুড</td>
                      <td>{selectedModalStudent.bording_food || ((selectedModalStudent.khurakiFee || 0) > 0 ? 'হ্যা' : 'না')}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ইতিম</td>
                      <td>{selectedModalStudent.etim || 'না'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">ছাত্র/ছাত্রীর ধরন</td>
                      <td>{selectedModalStudent.student_type || 'নতুন'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">নোট</td>
                      <td>{selectedModalStudent.note || 'কোন মন্তব্য নেই'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedModalStudent(null)}
                >
                  <i className="fa-solid fa-times me-1"></i>বন্ধ করুন
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedModalStudent(null);
                    setActiveTab('student-create');
                  }}
                >
                  <i className="fa-solid fa-edit me-1"></i>সম্পাদনা করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Modal */}
      {smsModalStudent && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="fa-solid fa-message me-2"></i>অভিভাবককে এসএমএস পাঠান
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSmsModalStudent(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-2">
                  <strong>শিক্ষার্থী:</strong> {smsModalStudent.name} ({smsModalStudent.jamat})
                </p>
                <p className="mb-3">
                  <strong>মোবাইল নম্বর:</strong> {smsModalStudent.parentsPhone || smsModalStudent.guardianPhone}
                </p>
                <div className="mb-3">
                  <label className="form-label fw-bold">মেসেজ কন্টেন্ট:</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={smsText}
                    onChange={(e) => setSmsText(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSmsModalStudent(null)}
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    alert(`এসএমএস পাঠানো হয়েছে: ${smsModalStudent.parentsPhone || smsModalStudent.guardianPhone}`);
                    setSmsModalStudent(null);
                  }}
                >
                  <i className="fa-solid fa-paper-plane me-1"></i> পাঠান
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
