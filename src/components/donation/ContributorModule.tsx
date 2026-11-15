import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const ContributorModule = ({ defaultMode = 'list' }) => {
  const {
    contributors,
    addContributor,
    updateContributor,
    deleteContributor,
    addSubscriptionPayment,
    transactions,
    accounts,
    receivers,
    paymentMethods,
    setSelectedReceiptForPrint,
    setActiveTab
  } = useApp();

  const [activeMode, setActiveMode] = useState(defaultMode);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Contributor Form matching /admin/contributor modal
  const [newContributor, setNewContributor] = useState({
    name: '',
    father_name: '',
    mobile: '',
    address: 'বদরখালী, কক্সবাজার',
    type: 'monthly',
    amount: '1000',
    note: ''
  });

  // Edit Contributor Form State
  const [editingContributor, setEditingContributor] = useState(null);
  const [editingContributorForm, setEditingContributorForm] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    address: '',
    monthlyAmount: '1000',
    note: ''
  });

  // Single Contributor Collection Modal State ("চাঁদা গ্রহণ")
  const [collectingContributor, setCollectingContributor] = useState(null);
  const [singleCollectForm, setSingleCollectForm] = useState({
    received_date: new Date().toISOString().split('T')[0],
    received_month: '10',
    received_year: '2026',
    account: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    payment_method: 'cash',
    receiver: receivers?.[0]?.name || 'হাফেজ আযম নূর',
    book_no: '01',
    receipt_no: '101',
    amount: '1000',
    note: ''
  });

  // Monthly Add Form matching /admin/contributor/monthly/subscription/add
  const [monthlyAddForm, setMonthlyAddForm] = useState({
    received_date: new Date().toISOString().split('T')[0],
    received_month: '10',
    received_year: '2026',
    deposit_category: 'মাসিক চাঁদা',
    account_id: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    payment_method_id: 'cash'
  });

  // Table rows for monthly subscription add
  const [contributorPayments, setContributorPayments] = useState(() => {
    const map = {};
    (contributors || []).forEach(c => {
      map[c.id] = {
        amount: c.monthlyAmount || c.amount || '1000',
        book_no: '01',
        receipt_no: Math.floor(100 + Math.random() * 900).toString(),
        receiver: receivers?.[0]?.name || 'হাফেজ আযম নূর',
        note: ''
      };
    });
    return map;
  });

  // Individual Selector
  const [individualContributorId, setIndividualContributorId] = useState(contributors?.[0]?.id || '');
  const [selectedYear, setSelectedYear] = useState('2026');

  const selectedContributor = contributors.find(c => c.id === individualContributorId) || contributors[0];

  // Collection History (all subscription vouchers)
  const collectionList = transactions.filter(t =>
    t.type === 'deposit' && (t.category === 'মাসিক চাঁদা' || t.donorOrStudent)
  );

  const handleAddContributorSubmit = (e) => {
    e.preventDefault();
    if (!newContributor.name || !newContributor.mobile) {
      alert('চাঁদাদাতার নাম এবং মোবাইল নম্বর পূরণ করা আবশ্যক।');
      return;
    }
    addContributor({
      name: newContributor.name,
      fatherName: newContributor.father_name,
      mobile: newContributor.mobile,
      address: newContributor.address,
      subscriptionType: 'মাসিক',
      monthlyAmount: parseFloat(newContributor.amount) || 1000,
      note: newContributor.note
    });
    setShowAddModal(false);
    alert('নতুন চাঁদাদাতা সফলভাবে যুক্ত করা হয়েছে!');
    setNewContributor({
      name: '',
      father_name: '',
      mobile: '',
      address: 'বদরখালী, কক্সবাজার',
      type: 'monthly',
      amount: '1000',
      note: ''
    });
  };

  const handleOpenEditContributor = (c) => {
    setEditingContributor(c);
    setEditingContributorForm({
      name: c.name || '',
      fatherName: c.fatherName || '',
      mobile: c.mobile || c.phone || '',
      address: c.address || 'বদরখালী, কক্সবাজার',
      monthlyAmount: c.monthlyAmount || c.amount || '1000',
      note: c.note || ''
    });
  };

  const handleUpdateContributorSubmit = (e) => {
    e.preventDefault();
    if (!editingContributor) return;
    if (updateContributor) {
      updateContributor(editingContributor.id, {
        name: editingContributorForm.name,
        fatherName: editingContributorForm.fatherName,
        mobile: editingContributorForm.mobile,
        address: editingContributorForm.address,
        monthlyAmount: parseFloat(editingContributorForm.monthlyAmount) || 1000,
        amount: parseFloat(editingContributorForm.monthlyAmount) || 1000,
        note: editingContributorForm.note
      });
    }
    setEditingContributor(null);
  };

  const handleOpenCollectModal = (c) => {
    setCollectingContributor(c);
    setSingleCollectForm({
      received_date: new Date().toISOString().split('T')[0],
      received_month: '10',
      received_year: '2026',
      account: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
      payment_method: 'cash',
      receiver: receivers?.[0]?.name || 'হাফেজ আযম নূর',
      book_no: '01',
      receipt_no: Math.floor(100 + Math.random() * 900).toString(),
      amount: c.monthlyAmount || c.amount || '1000',
      note: `মাসিক চাঁদা গ্রহণ (${c.name})`
    });
  };

  const handleSingleCollectSubmit = (e) => {
    e.preventDefault();
    if (!collectingContributor) return;
    const monthBengali = MONTH_NAMES[parseInt(singleCollectForm.received_month, 10) - 1] || 'অক্টোবর';
    const amountNum = parseFloat(singleCollectForm.amount) || 0;

    const receipt = addSubscriptionPayment({
      contributorId: collectingContributor.id,
      contributorName: collectingContributor.name,
      date: singleCollectForm.received_date,
      month: monthBengali,
      year: singleCollectForm.received_year,
      account: singleCollectForm.account,
      receiver: singleCollectForm.receiver,
      bookNo: singleCollectForm.book_no,
      receiptNo: singleCollectForm.receipt_no,
      amount: amountNum,
      note: singleCollectForm.note || `মাসিক চাঁদা গ্রহণ (${monthBengali} ${singleCollectForm.received_year})`
    });

    setCollectingContributor(null);
    if (receipt && setSelectedReceiptForPrint) {
      setSelectedReceiptForPrint(receipt);
    }
  };

  const handleMonthlyAddSubmit = (e) => {
    e.preventDefault();
    let count = 0;
    const monthBengali = MONTH_NAMES[parseInt(monthlyAddForm.received_month, 10) - 1] || 'অক্টোবর';

    contributors.forEach(c => {
      const entry = contributorPayments[c.id];
      const amount = parseFloat(entry?.amount);
      if (amount && amount > 0) {
        addSubscriptionPayment({
          contributorId: c.id,
          contributorName: c.name,
          date: monthlyAddForm.received_date,
          month: monthBengali,
          year: monthlyAddForm.received_year,
          account: monthlyAddForm.account_id,
          receiver: entry?.receiver || 'হাফেজ আযম নূর',
          bookNo: entry?.book_no,
          receiptNo: entry?.receipt_no,
          amount,
          note: entry?.note || `মাসিক চাঁদা গ্রহণ (${monthBengali} ${monthlyAddForm.received_year})`
        });
        count++;
      }
    });

    alert(`${count} জন চাঁদাদাতার চাঁদা সফলভাবে যুক্ত করা হয়েছে!`);
    setActiveMode('history');
  };

  return (
    <div className="container-fluid p-0">
      {/* ---------------- 1. CONTRIBUTOR LIST & MODAL (/admin/contributor) ---------------- */}
      {(activeMode === 'create' || activeMode === 'list') && (
        <div>
          {/* Top Button */}
          <div className="text-md-end text-start mb-3 mx-2">
            <button
              type="button"
              className="btn btn-danger text-white fw-bold"
              onClick={() => setShowAddModal(true)}
            >
              <i className="fa-solid fa-plus me-1"></i> চাঁদাদাতার যুক্ত করুন
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
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>চাঁদাদাতার তালিকা</h5>
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
                    <th>চাঁদাদাতার নাম</th>
                    <th>পিতার নাম</th>
                    <th>মোবাইল</th>
                    <th>ঠিকানা</th>
                    <th>চাঁদা ধরণ</th>
                    <th>চাঁদা পরিমান</th>
                    <th>মন্তব্য</th>
                    <th className="no-print">ক্রিয়া</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((c, idx) => (
                    <tr key={c.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="fw-bold">{c.name}</td>
                      <td>{c.fatherName || '-'}</td>
                      <td className="text-center font-monospace">{c.mobile || c.phone}</td>
                      <td>{c.address || 'বদরখালী, কক্সবাজার'}</td>
                      <td className="text-center">মাসিক</td>
                      <td className="text-center font-monospace fw-bold">৳ {parseFloat(c.monthlyAmount || c.amount || 1000).toLocaleString('en-IN')}</td>
                      <td>{c.note || '-'}</td>
                      <td className="text-center no-print">
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenCollectModal(c)}
                            className="btn btn-sm btn-success px-2 py-1 text-nowrap"
                            title="চাঁদা গ্রহণ"
                          >
                            <i className="fa-solid fa-hand-holding-dollar me-1"></i> চাঁদা গ্রহণ
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditContributor(c)}
                            className="btn btn-sm btn-primary"
                            title="সম্পাদনা"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('আপনি কি নিশ্চিতভাবে এই চাঁদাদাতাকে মুছে ফেলতে চান?')) {
                                if (deleteContributor) deleteContributor(c.id);
                              }
                            }}
                            className="btn btn-sm btn-danger delete-btn"
                            title="ডিলিট"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
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

      {/* ---------------- 2. MONTHLY SUBSCRIPTION ADD (/admin/contributor/monthly/subscription/add) ---------------- */}
      {activeMode === 'add' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-chalkboard-user me-2"></i> মাসিক চাঁদা যুক্ত করুন
            </h5>
          </div>

          <form onSubmit={handleMonthlyAddSubmit}>
            <div className="card-body">
              <div className="row mb-3 g-3">
                {/* Date */}
                <div className="col-md-3">
                  <label htmlFor="today-day" className="form-label fw-semibold">
                    তারিখ <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    id="today-day"
                    className="form-control"
                    value={monthlyAddForm.received_date}
                    onChange={(e) => setMonthlyAddForm({ ...monthlyAddForm, received_date: e.target.value })}
                    required
                  />
                </div>

                {/* Month */}
                <div className="col-md-3">
                  <label htmlFor="month" className="form-label fw-semibold">
                    কোন মাসে দিচ্ছে <span className="text-danger">*</span>
                  </label>
                  <select
                    id="month"
                    className="form-select"
                    value={monthlyAddForm.received_month}
                    onChange={(e) => setMonthlyAddForm({ ...monthlyAddForm, received_month: e.target.value })}
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

                {/* Year */}
                <div className="col-md-3">
                  <label htmlFor="year" className="form-label fw-semibold">
                    সাল <span className="text-danger">*</span>
                  </label>
                  <select
                    id="year"
                    className="form-select"
                    value={monthlyAddForm.received_year}
                    onChange={(e) => setMonthlyAddForm({ ...monthlyAddForm, received_year: e.target.value })}
                    required
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                {/* Deposit Category */}
                <div className="col-md-3">
                  <label htmlFor="deposit_category" className="form-label fw-semibold">
                    জমার ধরন <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="deposit_category"
                    className="form-control"
                    value="মাসিক চাঁদা"
                    readOnly
                  />
                </div>

                {/* Account */}
                <div className="col-md-3">
                  <label htmlFor="account" className="form-label fw-bold">এ্যাকাউন্ট</label>
                  <select
                    id="account"
                    className="form-select"
                    value={monthlyAddForm.account_id}
                    onChange={(e) => setMonthlyAddForm({ ...monthlyAddForm, account_id: e.target.value })}
                    required
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                    ))}
                  </select>
                </div>

                {/* Payment Method */}
                <div className="col-md-3">
                  <label htmlFor="payment_method" className="form-label fw-bold">পেমেন্ট মেথড</label>
                  <select
                    id="payment_method"
                    className="form-select"
                    value={monthlyAddForm.payment_method_id}
                    onChange={(e) => setMonthlyAddForm({ ...monthlyAddForm, payment_method_id: e.target.value })}
                    required
                  >
                    <option value="cash">নগদ (Cash)</option>
                    <option value="bkash">বিকাশ (Bkash)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table of Contributors */}
            <div className="table-responsive card-body">
              <table className="table table-bordered table-striped align-middle mb-0 print-table">
                <thead className="bg-primary print-thead text-white">
                  <tr>
                    <th className="text-center" style={{ width: '60px' }}>নং</th>
                    <th>নাম</th>
                    <th className="text-center" style={{ width: '180px' }}>চাঁদা গ্রহণ <span className="text-danger">*</span></th>
                    <th className="text-center" style={{ width: '150px' }}>বই নং</th>
                    <th className="text-center" style={{ width: '150px' }}>রসিদ নং</th>
                    <th className="text-center" style={{ width: '180px' }}>গ্রহণকারী</th>
                    <th className="text-center" style={{ width: '180px' }}>মন্তব্য</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((c, idx) => {
                    const row = contributorPayments[c.id] || { amount: c.monthlyAmount || '1000', book_no: '01', receipt_no: '101', receiver: 'হাফেজ আযম নূর', note: '' };
                    return (
                      <tr key={c.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="fw-bold">{c.name}</td>
                        <td className="text-center">
                          <input
                            type="number"
                            className="form-control text-end font-monospace"
                            value={row.amount}
                            onChange={(e) => setContributorPayments({
                              ...contributorPayments,
                              [c.id]: { ...row, amount: e.target.value }
                            })}
                            required
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="form-control text-center"
                            value={row.book_no}
                            onChange={(e) => setContributorPayments({
                              ...contributorPayments,
                              [c.id]: { ...row, book_no: e.target.value }
                            })}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="form-control text-center font-monospace"
                            value={row.receipt_no}
                            onChange={(e) => setContributorPayments({
                              ...contributorPayments,
                              [c.id]: { ...row, receipt_no: e.target.value }
                            })}
                          />
                        </td>
                        <td className="text-center">
                          <select
                            className="form-select"
                            value={row.receiver}
                            onChange={(e) => setContributorPayments({
                              ...contributorPayments,
                              [c.id]: { ...row, receiver: e.target.value }
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
                            onChange={(e) => setContributorPayments({
                              ...contributorPayments,
                              [c.id]: { ...row, note: e.target.value }
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

      {/* ---------------- 3. INDIVIDUAL CONTRIBUTOR LIST (/admin/contributor/monthly/individual/contributor/list) ---------------- */}
      {activeMode === 'individual' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-users me-2"></i> মাসিক চাঁদাদাতার তালিকা (একক ভাবে)
              </h5>
            </div>

            <div className="card-body mb-3">
              <div className="row g-3 align-items-end">
                <div className="col-md-4">
                  <label htmlFor="contributor_id" className="form-label fw-bold">চাঁদাদাতার নাম</label>
                  <select
                    id="contributor_id"
                    className="form-select"
                    value={individualContributorId}
                    onChange={(e) => setIndividualContributorId(e.target.value)}
                  >
                    {contributors.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.mobile || c.phone})</option>
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

          {selectedContributor && (
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
                      চাঁদাদাতার নাম: {selectedContributor.name} (সন: {selectedYear})
                    </h5>
                    <p className="text-muted small">মোবাইল: {selectedContributor.mobile || selectedContributor.phone} | ঠিকানা: {selectedContributor.address}</p>
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
                        <th>চাঁদার পরিমাণ</th>
                        <th>পরিশোধের অবস্থা</th>
                        <th>রশিদ নং</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MONTH_NAMES.map((m, idx) => (
                        <tr key={m}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{m}</td>
                          <td className="font-monospace">৳ {parseFloat(selectedContributor.monthlyAmount || 1000).toLocaleString('en-IN')}</td>
                          <td>
                            {idx < 10 ? (
                              <span className="badge bg-success">পরিশোধিত</span>
                            ) : (
                              <span className="badge bg-danger">বকেয়া</span>
                            )}
                          </td>
                          <td className="font-monospace">{idx < 10 ? `REC-${202600 + idx + 1}` : '-'}</td>
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

      {/* ---------------- 4. ALL CONTRIBUTORS 12-MONTH LIST (/admin/contributor/monthly/contributors/list) ---------------- */}
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
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>মাসিক চাঁদা দানকারীদের তালিকা</h5>
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
                      <th>চাঁদার পরিমাণ</th>
                      {MONTH_NAMES.map(m => (
                        <th key={m}>{m}</th>
                      ))}
                      <th>মোট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributors.map((c, idx) => {
                      const amt = parseFloat(c.monthlyAmount || 1000);
                      const paidMonths = 10;
                      const totalPaid = amt * paidMonths;
                      return (
                        <tr key={c.id}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold text-start">{c.name}</td>
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

      {/* ---------------- 5. CONTRIBUTION COLLECTION LIST (/admin/contributor/monthly/contribution/list) ---------------- */}
      {activeMode === 'history' && (
        <div className="container-fluid p-0">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0 text-white">
                <i className="fas fa-list-alt me-2"></i>মাসিক চাঁদা গ্রহণের লিস্ট
              </h4>
              <button
                onClick={() => setActiveMode('add')}
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
                    <th className="text-end">চাঁদার পরিমাণ</th>
                    <th>বই নং</th>
                    <th>রসিদ নং</th>
                    <th>গ্রহণকারী</th>
                    <th className="text-center">স্লিপ</th>
                    <th className="text-center">কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {collectionList.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center text-muted py-4">
                        কোন চাঁদা সংগ্রহের তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    collectionList.map((col, idx) => (
                      <tr key={col.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-monospace fw-bold text-primary">{col.voucherNo}</td>
                        <td className="fw-bold">{col.donorOrStudent || col.donorName || 'সাধারণ চাঁদাদাতা'}</td>
                        <td>{col.month || 'অক্টোবর'} {col.year || '2026'}</td>
                        <td>{col.date}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(col.totalAmount || 0).toLocaleString('en-IN')}</td>
                        <td className="text-center">{col.bookNo || '01'}</td>
                        <td className="text-center font-monospace">{col.receiptNo || '101'}</td>
                        <td>{col.receiver || 'হাফেজ আযম নূর'}</td>
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

      {/* Add Contributor Modal matching /admin/contributor modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <form onSubmit={handleAddContributorSubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-user-plus me-2"></i>নতুন চাঁদাদাতা যুক্ত করুন
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">চাঁদাদাতার নাম <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="চাঁদাদাতার নাম লিখুন"
                    value={newContributor.name}
                    onChange={(e) => setNewContributor({ ...newContributor, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">বাবার নাম</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="বাবার নাম লিখুন"
                    value={newContributor.father_name}
                    onChange={(e) => setNewContributor({ ...newContributor, father_name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">চাঁদাদাতার মোবাইল নম্বর <span className="text-danger">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="চাঁদাদাতার মোবাইল নম্বর লিখুন"
                    value={newContributor.mobile}
                    onChange={(e) => setNewContributor({ ...newContributor, mobile: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">চাঁদাদাতার ঠিকানা <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="চাঁদাদাতার ঠিকানা লিখুন"
                    value={newContributor.address}
                    onChange={(e) => setNewContributor({ ...newContributor, address: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">চাঁদার ধরণ <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={newContributor.type}
                    onChange={(e) => setNewContributor({ ...newContributor, type: e.target.value })}
                    required
                  >
                    <option value="monthly">মাসিক</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">চাঁদার পরিমাণ <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="চাঁদার পরিমাণ"
                    value={newContributor.amount}
                    onChange={(e) => setNewContributor({ ...newContributor, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">মন্তব্য</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="মন্তব্য (ঐচ্ছিক)"
                    value={newContributor.note}
                    onChange={(e) => setNewContributor({ ...newContributor, note: e.target.value })}
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

      {/* Edit Contributor Modal */}
      {editingContributor && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <form onSubmit={handleUpdateContributorSubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-pen-to-square me-2"></i>চাঁদাদাতার তথ্য সম্পাদনা করুন
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditingContributor(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">চাঁদাদাতার নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingContributorForm.name}
                      onChange={(e) => setEditingContributorForm({ ...editingContributorForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">পিতার নাম</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingContributorForm.fatherName}
                      onChange={(e) => setEditingContributorForm({ ...editingContributorForm, fatherName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">মোবাইল নম্বর <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className="form-control"
                      value={editingContributorForm.mobile}
                      onChange={(e) => setEditingContributorForm({ ...editingContributorForm, mobile: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">চাঁদার পরিমাণ (টাকা) <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control font-monospace fw-bold"
                      value={editingContributorForm.monthlyAmount}
                      onChange={(e) => setEditingContributorForm({ ...editingContributorForm, monthlyAmount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">ঠিকানা <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingContributorForm.address}
                      onChange={(e) => setEditingContributorForm({ ...editingContributorForm, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">মন্তব্য</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={editingContributorForm.note}
                      onChange={(e) => setEditingContributorForm({ ...editingContributorForm, note: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingContributor(null)}
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-save me-1"></i> আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Single Contributor Collection Modal ("চাঁদা গ্রহণ") */}
      {collectingContributor && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <form onSubmit={handleSingleCollectSubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-hand-holding-dollar me-2"></i>মাসিক চাঁদা গ্রহণ
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setCollectingContributor(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="alert alert-light border mb-4">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <strong>চাঁদাদাতা:</strong> <span className="fw-bold">{collectingContributor.name}</span>
                    </div>
                    <div className="col-md-4">
                      <strong>মোবাইল:</strong> <span className="font-monospace">{collectingContributor.mobile || collectingContributor.phone}</span>
                    </div>
                    <div className="col-md-4">
                      <strong>নির্ধারিত চাঁদা:</strong> <span className="badge bg-success">৳ {parseFloat(collectingContributor.monthlyAmount || collectingContributor.amount || 1000).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">আদায়ের তারিখ <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      value={singleCollectForm.received_date}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, received_date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">কোন মাসে দিচ্ছে <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={singleCollectForm.received_month}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, received_month: e.target.value })}
                      required
                    >
                      <option value="1">জানুয়ারি</option>
                      <option value="2">ফেব্রুয়ারি</option>
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

                  <div className="col-md-4">
                    <label className="form-label fw-bold">সাল <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={singleCollectForm.received_year}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, received_year: e.target.value })}
                      required
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">চাঁদার পরিমাণ (টাকা) <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      className="form-control font-monospace fw-bold text-success fs-5"
                      value={singleCollectForm.amount}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, amount: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">এ্যাকাউন্ট <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={singleCollectForm.account}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, account: e.target.value })}
                      required
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">পেমেন্ট মেথড</label>
                    <select
                      className="form-select"
                      value={singleCollectForm.payment_method}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, payment_method: e.target.value })}
                    >
                      <option value="cash">নগদ (Cash)</option>
                      <option value="bkash">বিকাশ (bKash)</option>
                      <option value="bank">ব্যাংক (Bank)</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">বই নং</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      value={singleCollectForm.book_no}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, book_no: e.target.value })}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">রসিদ নং</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      value={singleCollectForm.receipt_no}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, receipt_no: e.target.value })}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-bold">গ্রহণকারী <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={singleCollectForm.receiver}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, receiver: e.target.value })}
                      required
                    >
                      {receivers.map(r => (
                        <option key={r.id} value={r.name}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">মন্তব্য</label>
                    <input
                      type="text"
                      className="form-control"
                      value={singleCollectForm.note}
                      onChange={(e) => setSingleCollectForm({ ...singleCollectForm, note: e.target.value })}
                      placeholder="মন্তব্য (ঐচ্ছিক)"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCollectingContributor(null)}
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-success fw-bold">
                  <i className="fa-solid fa-check me-1"></i> চাঁদা জমা করুন ও রসিদ দেখুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
