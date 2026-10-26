import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentFeeMatrix = () => {
  const { students, recordStudentFee, accounts, setSelectedReceiptForPrint } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [payingMonth, setPayingMonth] = useState(null);
  const [payFeeType, setPayFeeType] = useState('both'); // tuition, khuraki, both

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handlePayClick = (month) => {
    setPayingMonth(month);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!currentStudent || !payingMonth) return;

    let totalAmount = 0;
    const monthlyFee = currentStudent.coursefee || currentStudent.monthlyFee || 800;
    const khurakiFee = currentStudent.food_bill || currentStudent.khurakiFee || 2000;

    if (payFeeType === 'tuition' || payFeeType === 'both') {
      totalAmount += monthlyFee;
    }
    if (payFeeType === 'khuraki' || payFeeType === 'both') {
      totalAmount += khurakiFee;
    }

    const vch = recordStudentFee(
      currentStudent.id,
      payingMonth,
      payFeeType,
      totalAmount,
      selectedAccount
    );

    setPayingMonth(null);
    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Filter Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-credit-card me-2"></i> ১২ মাসের মাসিক বেতন ও খোরাকী ফি রেজিস্টার
          </h5>
          <button onClick={() => window.print()} className="btn btn-sm btn-light no-print">
            <i className="fas fa-print me-1"></i> প্রিন্ট করুন
          </button>
        </div>

        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label fw-bold">শিক্ষার্থী নির্বাচন করুন:</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="form-select"
              >
                {students.map(s => {
                  const adm = s.admissionNumber || s.admission_number || s.roll;
                  return (
                    <option key={s.id} value={s.id}>
                      {adm} - {s.name} ({s.jamat})
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">জমার এ্যাকাউন্ট:</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="form-select"
              >
                {accounts.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {currentStudent && (
        <>
          {/* Student Info Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-auto">
                  <img
                    src={currentStudent.photo || '/students/FB_IMG_1791220812856.webp'}
                    alt={currentStudent.name}
                    className="rounded-circle border border-3 border-primary"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col">
                  <h4 className="fw-bold mb-1 text-primary">{currentStudent.name}</h4>
                  <div className="d-flex flex-wrap gap-3 small text-muted">
                    <span><strong>জামাত:</strong> {currentStudent.jamat}</span>
                    <span><strong>ভর্তি নং:</strong> {currentStudent.admissionNumber || currentStudent.roll}</span>
                    <span><strong>অভিভাবক:</strong> {currentStudent.parentsName || currentStudent.fatherName}</span>
                    <span><strong>মোবাইল:</strong> {currentStudent.parentsPhone || currentStudent.guardianPhone}</span>
                  </div>
                </div>
                <div className="col-auto text-end">
                  <div className="p-3 bg-light rounded text-center">
                    <div className="small text-muted">মাসিক বেতন + খোরাকী</div>
                    <div className="fs-5 fw-bold text-success">
                      ৳ {(Number(currentStudent.coursefee || currentStudent.monthlyFee || 800) + Number(currentStudent.food_bill || currentStudent.khurakiFee || 2000)).toLocaleString('bn-BD')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Month Cards Grid */}
          <div className="row g-3 mb-4">
            {MONTH_NAMES.map((month) => {
              const feeData = currentStudent.fees?.[month];
              const isPaid = feeData?.paid;

              return (
                <div key={month} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className={`card h-100 shadow-sm border ${isPaid ? 'border-success' : 'border-warning'}`}>
                    <div className={`card-header py-2 text-center fw-bold ${isPaid ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                      {month}
                    </div>
                    <div className="card-body p-3 text-center">
                      <p className="mb-1 small">
                        বেতন: <strong>৳ {currentStudent.coursefee || currentStudent.monthlyFee || 800}</strong>
                      </p>
                      <p className="mb-2 small">
                        খোরাকী: <strong>৳ {currentStudent.food_bill || currentStudent.khurakiFee || 2000}</strong>
                      </p>
                      {isPaid ? (
                        <div className="badge bg-success-subtle text-success p-2 w-100">
                          <i className="fa-solid fa-check me-1"></i> পরিশোধিত ({feeData?.date || '২০২৬'})
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-primary w-100 no-print"
                          onClick={() => handlePayClick(month)}
                        >
                          <i className="fa-solid fa-credit-card me-1"></i> ফি জমা নিন
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Payment Confirmation Modal */}
      {payingMonth && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fa-solid fa-receipt me-2"></i>{payingMonth} মাসের ফি জমা
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setPayingMonth(null)}
                ></button>
              </div>
              <form onSubmit={handleConfirmPayment}>
                <div className="modal-body p-4">
                  <p className="mb-2"><strong>শিক্ষার্থী:</strong> {currentStudent.name}</p>
                  <p className="mb-3"><strong>জামাত:</strong> {currentStudent.jamat}</p>

                  <div className="mb-3">
                    <label className="form-label fw-bold">জমার ধরন নির্বাচন করুন:</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="pay_both"
                          name="payFeeType"
                          className="form-check-input"
                          value="both"
                          checked={payFeeType === 'both'}
                          onChange={(e) => setPayFeeType(e.target.value)}
                        />
                        <label htmlFor="pay_both" className="form-check-label">বেতন + খোরাকী</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="pay_tuition"
                          name="payFeeType"
                          className="form-check-input"
                          value="tuition"
                          checked={payFeeType === 'tuition'}
                          onChange={(e) => setPayFeeType(e.target.value)}
                        />
                        <label htmlFor="pay_tuition" className="form-check-label">শুধু বেতন</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="pay_khuraki"
                          name="payFeeType"
                          className="form-check-input"
                          value="khuraki"
                          checked={payFeeType === 'khuraki'}
                          onChange={(e) => setPayFeeType(e.target.value)}
                        />
                        <label htmlFor="pay_khuraki" className="form-check-label">শুধু খোরাকী</label>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded text-center mb-3">
                    <div className="small text-muted">মোট প্রদেয় টাকা</div>
                    <h3 className="fw-bold text-success mb-0">
                      ৳ {(
                        payFeeType === 'both'
                          ? (Number(currentStudent.coursefee || currentStudent.monthlyFee || 800) + Number(currentStudent.food_bill || currentStudent.khurakiFee || 2000))
                          : payFeeType === 'tuition'
                          ? Number(currentStudent.coursefee || currentStudent.monthlyFee || 800)
                          : Number(currentStudent.food_bill || currentStudent.khurakiFee || 2000)
                      ).toLocaleString('bn-BD')}
                    </h3>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setPayingMonth(null)}>
                    বাতিল
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="fa-solid fa-check me-1"></i> জমা নিশ্চিত করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
