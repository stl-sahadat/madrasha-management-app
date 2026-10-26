import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const DonorModule = ({ defaultMode = 'list' }) => {
  const {
    donors,
    addDonor,
    deleteDonor,
    addDonationRecord,
    transactions,
    accounts,
    receivers,
    setSelectedReceiptForPrint,
    setActiveTab
  } = useApp();

  const [activeMode, setActiveMode] = useState(defaultMode);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Donor Form matching /admin/doner modal
  const [newDonor, setNewDonor] = useState({
    name: '',
    father_name: '',
    mobile: '',
    address: 'চকরিয়া, কক্সবাজার',
    type: 'normal',
    note: 'সাধারণ দান'
  });

  // Donation Add Form matching /admin/donation/create
  const [donationAddForm, setDonationAddForm] = useState({
    received_date: new Date().toISOString().split('T')[0],
    received_month: '10',
    received_year: '2026',
    deposit_category: 'দান',
    account_id: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    payment_method_id: 'cash'
  });

  // Table rows for donation add
  const [donorPayments, setDonorPayments] = useState(() => {
    const map = {};
    (donors || []).forEach(d => {
      map[d.id] = {
        amount: '2000',
        book_no: '02',
        receipt_no: Math.floor(100 + Math.random() * 900).toString(),
        receiver: receivers?.[0]?.name || 'মাহমুদুল করিম',
        note: ''
      };
    });
    return map;
  });

  // Individual Selector
  const [individualDonorId, setIndividualDonorId] = useState(donors?.[0]?.id || '');
  const [selectedYear, setSelectedYear] = useState('2026');

  const selectedDonor = donors.find(d => d.id === individualDonorId) || donors[0];

  // Donation history list (all donation deposits)
  const donationList = transactions.filter(t =>
    t.type === 'deposit' && (t.category === 'দান' || (t.donorOrStudent && t.category?.includes('দান')))
  );

  const handleAddDonorSubmit = (e) => {
    e.preventDefault();
    if (!newDonor.name || !newDonor.mobile) {
      alert('দানকারীর নাম এবং মোবাইল নম্বর পূরণ করা আবশ্যক।');
      return;
    }
    addDonor({
      name: newDonor.name,
      fatherName: newDonor.father_name,
      mobile: newDonor.mobile,
      address: newDonor.address,
      donationType: newDonor.type === 'normal' ? 'সাধারণ' : 'অন্যান্য',
      note: newDonor.note
    });
    setShowAddModal(false);
    alert('নতুন দানকারী সফলভাবে যুক্ত করা হয়েছে!');
    setNewDonor({
      name: '',
      father_name: '',
      mobile: '',
      address: 'চকরিয়া, কক্সবাজার',
      type: 'normal',
      note: 'সাধারণ দান'
    });
  };

  const handleDonationAddSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    const monthBengali = MONTH_NAMES[parseInt(donationAddForm.received_month, 10) - 1] || 'অক্টোবর';

    donors.forEach(d => {
      const entry = donorPayments[d.id];
      const amount = parseFloat(entry?.amount);
      if (amount && amount > 0) {
        addDonationRecord({
          donorName: d.name,
          mobile: d.mobile,
          address: d.address,
          category: 'দান',
          amount,
          date: donationAddForm.received_date,
          account: donationAddForm.account_id,
          receiver: entry?.receiver || 'মাহমুদুল করিম',
          bookNo: entry?.book_no,
          receiptNo: entry?.receipt_no,
          note: entry?.note || `সাধারণ দান গ্রহণ (${monthBengali} ${donationAddForm.received_year})`
        });
        count++;
      }
    });

    alert(`${count} জন দানকারীর দান সফলভাবে যুক্ত করা হয়েছে!`);
    setActiveMode('history');
  };

  return (
    <div className="container-fluid p-0">
      {/* ---------------- 1. DONOR LIST & MODAL (/admin/doner) ---------------- */}
      {(activeMode === 'create-donor' || activeMode === 'list') && (
        <div>
          <div className="text-md-end text-start mb-3 mx-2">
            <button
              type="button"
              className="btn btn-danger text-white fw-bold"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fa-solid fa-plus me-1"></i> দানকারীর যুক্ত করুন
            </button>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>দানকারীর তালিকা</h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন: ২০২৬ ইং</p>
                </div>
              </div>
            </div>

            <div className="table-responsive card-body">
              <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                <thead className="bg-primary print-thead text-white">
                  <tr>
                    <th>নং</th>
                    <th>দানকারীর নাম</th>
                    <th>পিতার নাম</th>
                    <th>মোবাইল</th>
                    <th>ঠিকানা</th>
                    <th>দান ধরণ</th>
                    <th>মন্তব্য</th>
                    <th className="no-print">ক্রিয়া</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((d, idx) => (
                    <tr key={d.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="fw-bold">{d.name}</td>
                      <td>{d.fatherName || '-'}</td>
                      <td className="text-center font-monospace">{d.mobile || d.phone}</td>
                      <td>{d.address || 'চকরিয়া, কক্সবাজার'}</td>
                      <td className="text-center">{d.donationType || 'সাধারণ'}</td>
                      <td>{d.note || '-'}</td>
                      <td className="text-center no-print">
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('আপনি কি নিশ্চিতভাবে এই দানকারীকে মুছে ফেলতে চান?')) {
                              if (deleteDonor) deleteDonor(d.id);
                            }
                          }}
                          className="btn btn-sm btn-danger delete-btn"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="m-3 d-flex justify-content-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. DONATION CREATE (/admin/donation/create) ---------------- */}
      {activeMode === 'create' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-chalkboard-user me-2"></i> দান যুক্ত করুন
            </h5>
          </div>

          <form onSubmit={handleDonationAddSubmit}>
            <div className="card-body">
              <div className="row g-3 mb-3">
                <div className="col-md-3 col-12">
                  <label htmlFor="today-day" className="form-label fw-semibold">
                    তারিখ <span className="text-danger">*</span>
                  </label>
                  <input
                    name="received_date"
                    type="date"
                    id="today-day"
                    className="form-control"
                    value={donationAddForm.received_date}
                    onChange={(e) => setDonationAddForm({ ...donationAddForm, received_date: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="month" className="form-label fw-semibold">
                    কোন মাসে দিচ্ছে <span className="text-danger">*</span>
                  </label>
                  <select
                    name="received_month"
                    id="month"
                    className="form-select"
                    value={donationAddForm.received_month}
                    onChange={(e) => setDonationAddForm({ ...donationAddForm, received_month: e.target.value })}
                    required
                  >
                    <option value="1">জানুয়ারি</option>
                    <option value="2">ফেব্রুয়ারি</option>
                    <option value="3">মার্চ</option>
                    <option value="4">এপ্রিল</option>
                    <option value="5">মে</option>
                    <option value="6">জুন</option>
                    <option value="7">জুলাই</option>
                    <option value="8">অগাস্ট</option>
                    <option value="9">সেপ্টেম্বর</option>
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                  </select>
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="received_year" className="form-label fw-semibold">
                    সাল <span className="text-danger">*</span>
                  </label>
                  <select
                    name="received_year"
                    id="received_year"
                    className="form-select"
                    value={donationAddForm.received_year}
                    onChange={(e) => setDonationAddForm({ ...donationAddForm, received_year: e.target.value })}
                    required
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="deposit_category_id" className="form-label fw-semibold">
                    জমার ধরন <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="deposit_category_id"
                    className="form-control"
                    value="দান"
                    readOnly
                  />
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="account" className="form-label fw-bold">এ্যাকাউন্ট</label>
                  <select
                    name="account_id"
                    id="account"
                    className="form-select"
                    value={donationAddForm.account_id}
                    onChange={(e) => setDonationAddForm({ ...donationAddForm, account_id: e.target.value })}
                    required
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="payment_method" className="form-label fw-bold">পেমেন্ট মেথড</label>
                  <select
                    name="payment_method_id"
                    id="payment_method"
                    className="form-select"
                    value={donationAddForm.payment_method_id}
                    onChange={(e) => setDonationAddForm({ ...donationAddForm, payment_method_id: e.target.value })}
                    required
                  >
                    <option value="cash">নগদ (Cash)</option>
                    <option value="bkash">বিকাশ (Bkash)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive card-body">
              <table className="table table-bordered table-striped align-middle mb-0 print-table">
                <thead className="bg-primary print-thead text-white">
                  <tr>
                    <th className="text-center" style={{ width: '60px' }}>নং</th>
                    <th>নাম</th>
                    <th className="text-center" style={{ width: '180px' }}>দান গ্রহণ <span className="text-danger">*</span></th>
                    <th className="text-center" style={{ width: '150px' }}>বই নং</th>
                    <th className="text-center" style={{ width: '150px' }}>রসিদ নং</th>
                    <th className="text-center" style={{ width: '180px' }}>গ্রহণকারী</th>
                    <th className="text-center" style={{ width: '180px' }}>মন্তব্য</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((d, idx) => {
                    const row = donorPayments[d.id] || { amount: '2000', book_no: '02', receipt_no: '101', receiver: 'মাহমুদুল করিম', note: '' };
                    return (
                      <tr key={d.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="fw-bold">{d.name}</td>
                        <td className="text-center">
                          <input
                            type="number"
                            className="form-control text-end font-monospace"
                            value={row.amount}
                            onChange={(e) => setDonorPayments({
                              ...donorPayments,
                              [d.id]: { ...row, amount: e.target.value }
                            })}
                            required
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="form-control text-center"
                            value={row.book_no}
                            onChange={(e) => setDonorPayments({
                              ...donorPayments,
                              [d.id]: { ...row, book_no: e.target.value }
                            })}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="form-control text-center font-monospace"
                            value={row.receipt_no}
                            onChange={(e) => setDonorPayments({
                              ...donorPayments,
                              [d.id]: { ...row, receipt_no: e.target.value }
                            })}
                          />
                        </td>
                        <td className="text-center">
                          <select
                            className="form-select"
                            value={row.receiver}
                            onChange={(e) => setDonorPayments({
                              ...donorPayments,
                              [d.id]: { ...row, receiver: e.target.value }
                            })}
                          >
                            {receivers.map(r => (
                              <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="মন্তব্য লিখুন"
                            value={row.note}
                            onChange={(e) => setDonorPayments({
                              ...donorPayments,
                              [d.id]: { ...row, note: e.target.value }
                            })}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="card-footer text-end py-3">
              <button type="submit" className="btn btn-success btn-lg px-4 fw-bold">
                <i className="fa-solid fa-save me-2"></i> সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- 3. INDIVIDUAL DONOR LIST (/admin/doner/individual/list) ---------------- */}
      {activeMode === 'individual' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-users me-2"></i> দানকারীর তালিকা (একক ভাবে)
              </h5>
            </div>

            <div className="card-body mb-3">
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label htmlFor="donor_id" className="form-label fw-bold">দানকারীর নাম</label>
                  <select
                    id="donor_id"
                    className="form-select"
                    value={individualDonorId}
                    onChange={(e) => setIndividualDonorId(e.target.value)}
                  >
                    {donors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.mobile || d.phone})</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="year" className="form-label fw-bold">বছর</label>
                  <select
                    id="year"
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div className="col-md-3 text-center">
                  <button type="button" className="btn btn-info px-4 text-white fw-bold">
                    <i className="fas fa-search me-1"></i> ফলাফল দেখান
                  </button>
                </div>
              </div>
            </div>
          </div>

          {selectedDonor && (
            <div className="card border-0 shadow-sm mb-4" id="printContent">
              <div className="card-body py-4">
                <img
                  src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                  alt="Banner"
                  className="w-100 img-fluid rounded"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="row mt-3">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 text-center">
                    <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                      দানকারীর নাম: {selectedDonor.name} (সন: {selectedYear})
                    </h5>
                    <p className="text-muted small">মোবাইল: {selectedDonor.mobile || selectedDonor.phone} | ঠিকানা: {selectedDonor.address}</p>
                  </div>
                  <div className="col-md-2 text-end">
                    <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                  </div>
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
                    <thead className="bg-primary print-thead text-white">
                      <tr>
                        <th>নং</th>
                        <th>মাস</th>
                        <th>দানের পরিমাণ</th>
                        <th>পরিশোধের অবস্থা</th>
                        <th>রশিদ নং</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MONTH_NAMES.map((m, idx) => (
                        <tr key={m}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{m}</td>
                          <td className="font-monospace">৳ 2,000</td>
                          <td>
                            {idx < 9 ? (
                              <span className="badge bg-success">পরিশোধিত</span>
                            ) : (
                              <span className="badge bg-secondary">প্রযোজ্য নয়</span>
                            )}
                          </td>
                          <td className="font-monospace">{idx < 9 ? `DON-${202600 + idx + 1}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 text-end no-print">
                  <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                    <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- 4. ALL DONORS LIST (/admin/doner/list) ---------------- */}
      {activeMode === 'all' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-filter me-2"></i> ফিল্টার
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-md-3">
                  <label htmlFor="year-select" className="form-label fw-bold">বছর নির্বাচন করুন</label>
                  <select
                    id="year-select"
                    className="form-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>দানকারীদের তালিকা</h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন {selectedYear} ইং</p>
                </div>
              </div>

              <div className="table-responsive card-body mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table text-center" style={{ fontSize: '11px' }}>
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th>ক্রমিক নং</th>
                      <th>নাম</th>
                      <th>দানের পরিমাণ</th>
                      {MONTH_NAMES.map(m => (
                        <th key={m}>{m}</th>
                      ))}
                      <th>মোট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map((d, idx) => {
                      const amt = 2000;
                      const paidMonths = 8;
                      const totalPaid = amt * paidMonths;
                      return (
                        <tr key={d.id}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold text-start">{d.name}</td>
                          <td className="font-monospace">৳ {amt}</td>
                          {MONTH_NAMES.map((m, mIdx) => (
                            <td key={m} className={mIdx < paidMonths ? 'text-success fw-bold' : 'text-muted'}>
                              {mIdx < paidMonths ? amt : '-'}
                            </td>
                          ))}
                          <td className="font-monospace fw-bold text-primary">৳ {totalPaid}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 5. DONATION HISTORY LIST (/admin/donation) ---------------- */}
      {activeMode === 'history' && (
        <div className="container-fluid p-0">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0 text-white">
                <i className="fas fa-list-alt me-2"></i>দানের লিস্ট
              </h4>
              <button
                onClick={() => setActiveMode('create')}
                className="btn btn-success btn-sm fw-bold"
              >
                <i className="fas fa-plus me-1"></i> নতুন যুক্ত করুন
              </button>
            </div>

            <div className="table-responsive card-body">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '50px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th>দাতার নাম</th>
                    <th>মাস ও বছর</th>
                    <th>তারিখ</th>
                    <th className="text-end">দানের পরিমাণ</th>
                    <th>বই নং</th>
                    <th>রসিদ নং</th>
                    <th>গ্রহণকারী</th>
                    <th className="text-center">স্লিপ</th>
                    <th className="text-center">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {donationList.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center text-muted py-4">
                        কোন দানের তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    donationList.map((col, idx) => (
                      <tr key={col.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-monospace fw-bold text-primary">{col.voucherNo}</td>
                        <td className="fw-bold">{col.donorOrStudent || col.donorName || 'সাধারণ দানকারী'}</td>
                        <td>{col.month || 'অক্টোবর'} {col.year || '2026'}</td>
                        <td>{col.date}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(col.totalAmount || 0).toLocaleString('en-IN')}</td>
                        <td className="text-center">{col.bookNo || '02'}</td>
                        <td className="text-center font-monospace">{col.receiptNo || '101'}</td>
                        <td>{col.receiver || 'মাহমুদুল করিম'}</td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(col)}
                            className="btn btn-sm btn-info text-white"
                          >
                            <i className="fa-solid fa-print"></i> স্লিপ
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(col)}
                            className="btn btn-sm btn-secondary"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Donor Modal matching /admin/doner modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <form onSubmit={handleAddDonorSubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-user-plus me-2"></i>নতুন দানকারী যুক্ত করুন
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">দানকারীর নাম <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="দানকারীর নাম লিখুন"
                    value={newDonor.name}
                    onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">পিতার নাম</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="পিতার নাম লিখুন"
                    value={newDonor.father_name}
                    onChange={(e) => setNewDonor({ ...newDonor, father_name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">দানকারীর মোবাইল নম্বর <span className="text-danger">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="দানকারীর মোবাইল নম্বর লিখুন"
                    value={newDonor.mobile}
                    onChange={(e) => setNewDonor({ ...newDonor, mobile: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">দানকারীর ঠিকানা <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="দানকারীর ঠিকানা লিখুন"
                    value={newDonor.address}
                    onChange={(e) => setNewDonor({ ...newDonor, address: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">দান ধরণ <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={newDonor.type}
                    onChange={(e) => setNewDonor({ ...newDonor, type: e.target.value })}
                    required
                  >
                    <option value="normal">সাধারণ</option>
                    <option value="others">অন্যান্য</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">মন্তব্য <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="মন্তব্য"
                    value={newDonor.note}
                    onChange={(e) => setNewDonor({ ...newDonor, note: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  <i className="fa-solid fa-times me-1"></i>বন্ধ করুন
                </button>
                <button type="submit" className="btn btn-danger">
                  <i className="fa-solid fa-save me-1"></i>সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
