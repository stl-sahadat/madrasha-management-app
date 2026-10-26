import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const PrintReceiptModal = () => {
  const {
    profile,
    selectedReceiptForPrint,
    setSelectedReceiptForPrint
  } = useApp();

  // Close on Escape key
  useEffect(() => {
    if (!selectedReceiptForPrint) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedReceiptForPrint(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReceiptForPrint, setSelectedReceiptForPrint]);

  if (!selectedReceiptForPrint) return null;

  const receipt = selectedReceiptForPrint;
  const isDeposit = receipt.type
    ? receipt.type !== 'expense'
    : !(receipt.voucherNo?.startsWith('SAL') || receipt.voucherNo?.startsWith('TSP') || receipt.teacherName || receipt.category?.includes('বেতন') || receipt.expense_category_id);

  const total = Number(receipt.totalAmount ?? receipt.amount ?? 0);
  const voucherNo = receipt.voucherNo || receipt.voucher_no || receipt.id || `V-${Date.now().toString().slice(-4)}`;
  const date = receipt.date || receipt.payment_date || new Date().toISOString().split('T')[0];
  const donorOrStudent = receipt.donorOrStudent || receipt.teacherName || receipt.studentName || receipt.contributorName || receipt.donorName || receipt.name || '—';
  const account = receipt.account || receipt.account_id || 'নগদ ক্যাশ (Hand Cash)';
  const receiver = receipt.receiver || 'ক্যাশিয়ার';

  const items = (receipt.items && receipt.items.length > 0)
    ? receipt.items
    : [{
        category: receipt.category || (isDeposit ? 'সাধারণ জমা' : 'শিক্ষক বেতন / ব্যয়'),
        description: receipt.note || (receipt.month ? `${receipt.month} ${receipt.year || ''}-এর বেতন/চাঁদা` : 'আর্থিক লেনদেন বিবরণ'),
        amount: total
      }];

  // Number to words in Bengali
  const numberToWordsBn = (num) => {
    return `${Math.round(num)} টাকা মাত্র`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1060 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedReceiptForPrint(null);
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content shadow-lg border-0 rounded-3">
          {/* Header Controls - Hidden during print */}
          <div className="modal-header bg-primary text-white py-2 px-3 d-flex justify-content-between align-items-center no-print">
            <h5 className="modal-title fs-6 fw-bold text-white mb-0 d-flex align-items-center">
              <i className="fa-solid fa-receipt me-2"></i>
              {isDeposit ? 'মানি রশিদ প্রিভিউ ও প্রিন্ট' : 'খরচ / বেতন ভাউচার প্রিভিউ ও প্রিন্ট'}
            </h5>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-warning btn-sm fw-bold px-3 py-1 text-dark"
                title="প্রিন্ট করুন"
              >
                <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceiptForPrint(null)}
                className="btn btn-danger btn-sm fw-bold px-2 py-1 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '32px', height: '32px', lineHeight: 1 }}
                title="বন্ধ করুন"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark fs-5"></i>
              </button>
            </div>
          </div>

          {/* Printable Memo Area */}
          <div className="modal-body p-4 bg-white" id="printContent">
            <div className="border border-2 border-dark rounded-3 p-4 bg-white position-relative">
              {/* Header */}
              <div className="text-center pb-3 border-bottom border-2 border-primary">
                <span className="small fw-bold text-primary tracking-wider text-uppercase d-block mb-1">
                  বিসমিল্লাহির রাহমানির রাহিম
                </span>
                <h3 className="fw-bolder text-dark mb-1 font-bangla">
                  {profile.name}
                </h3>
                <p className="mb-1 text-muted small">{profile.address}</p>
                <p className="mb-2 text-muted small font-monospace">
                  মোবাইল: {profile.phone1} | ইমেইল: {profile.email}
                </p>
                <span className="badge bg-primary fs-6 px-3 py-1 rounded-pill">
                  {isDeposit ? 'অর্থ প্রাপ্তির অফিসিয়াল রশিদ' : 'অফিসিয়াল ব্যয় ও পেমেন্ট ভাউচার'}
                </span>
              </div>

              {/* Meta Information */}
              <div className="row g-2 py-3 border-bottom text-dark" style={{ fontSize: '13px' }}>
                <div className="col-6">
                  <span className="text-muted">ভাউচার / রশিদ নং: </span>
                  <strong className="font-monospace text-primary">{voucherNo}</strong>
                </div>
                <div className="col-6 text-end">
                  <span className="text-muted">তারিখ: </span>
                  <strong className="font-monospace">{date}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted">{isDeposit ? 'দাতা / শিক্ষার্থী: ' : 'প্রাপক / শিক্ষক: '}</span>
                  <strong className="text-dark">{donorOrStudent}</strong>
                </div>
                <div className="col-6 text-end">
                  <span className="text-muted">হিসাব মাধ্যম: </span>
                  <strong>{account}</strong>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="table-responsive my-3">
                <table className="table table-bordered table-sm align-middle mb-0 text-dark">
                  <thead className="table-light">
                    <tr>
                      <th className="text-center" style={{ width: '50px' }}>নং</th>
                      <th>খাত ও বিবরণ</th>
                      <th className="text-end" style={{ width: '140px' }}>পরিমাণ (৳)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="text-center font-monospace">{idx + 1}</td>
                        <td>
                          <strong>{item.category}</strong>
                          {item.description && (
                            <span className="text-muted d-block small">{item.description}</span>
                          )}
                        </td>
                        <td className="text-end font-monospace fw-bold">
                          ৳ {Number(item.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="table-light fw-bold">
                      <td colSpan="2" className="text-end">সর্বমোট টাকা:</td>
                      <td className="text-end font-monospace text-primary fs-6">
                        ৳ {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Words */}
              <div className="mb-2 text-dark small">
                <span>কথায়: </span>
                <strong className="text-primary font-bangla">{numberToWordsBn(total)}</strong>
              </div>

              {receipt.note && (
                <p className="mb-3 text-muted small fst-italic">নোট: {receipt.note}</p>
              )}

              {/* Signatures */}
              <div className="row mt-5 pt-4 text-center text-dark" style={{ fontSize: '12px' }}>
                <div className="col-6 text-center">
                  <div className="fw-semibold font-monospace pb-1">{receiver}</div>
                  <div className="border-top border-dark pt-1 d-inline-block px-3">
                    আদায়কারী / ক্যাশিয়ার স্বাক্ষর
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="fw-bold text-primary pb-1">{profile.principal}</div>
                  <div className="border-top border-dark pt-1 d-inline-block px-3 text-primary fw-bold">
                    মুহতামিম / অনুমোদকের স্বাক্ষর
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer (Hidden in print) */}
          <div className="modal-footer bg-light py-2 px-3 no-print d-flex justify-content-between">
            <span className="text-muted small">
              <i className="fa-solid fa-circle-info me-1"></i>
              ESC চাপুন বা বন্ধ করুন ক্লিক করে ডায়ালগ বন্ধ করুন
            </span>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-secondary px-4 fw-bold"
                onClick={() => setSelectedReceiptForPrint(null)}
              >
                <i className="fa-solid fa-xmark me-1"></i> বন্ধ করুন
              </button>
              <button
                type="button"
                className="btn btn-primary px-4 fw-bold"
                onClick={handlePrint}
              >
                <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
