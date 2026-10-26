import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { numberToBengaliWords } from '../../utils/bengaliWords';

function toBengaliDigits(num) {
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, d => digits[d]);
}

export const AccountsModule = ({ defaultView = 'list' }) => {
  const { accounts, setAccounts, transferAccount, transactions, showToast } = useApp();

  const [activeView, setActiveView] = useState(defaultView);
  const [editingAccount, setEditingAccount] = useState(null);

  // Form State for Create / Edit Account
  const [accName, setAccName] = useState('');
  const [accDesc, setAccDesc] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isBank, setIsBank] = useState(false);

  // Transfer Form State
  const [fromAccount, setFromAccount] = useState(accounts[0]?.id || '');
  const [toAccount, setToAccount] = useState(accounts[1]?.id || '');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
  const [transferNote, setTransferNote] = useState('');

  // Transfer history state
  const [transferLogs, setTransferLogs] = useState([
    {
      id: 1,
      from: 'Bkash',
      to: 'Hand Cash',
      amount: 5000,
      date: '2026-10-25',
      note: 'জরুরি নগদ ব্যয় নির্বাহ'
    }
  ]);

  // Report State
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  const [searchedReport, setSearchedReport] = useState(false);

  useEffect(() => {
    setActiveView(defaultView);
  }, [defaultView]);

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (!accName.trim()) {
      alert('এ্যাকাউন্ট নাম আবশ্যক');
      return;
    }

    if (editingAccount) {
      setAccounts(accounts.map(a => a.id === editingAccount.id ? {
        ...a,
        name: accName.trim(),
        description: accDesc.trim(),
        accountNumber: accNumber.trim(),
        contactPerson: contactPerson.trim(),
        mobile: contactPhone.trim(),
        isBank
      } : a));
      showToast(`এ্যাকাউন্ট "${accName}" সফলভাবে সম্পাদনা করা হয়েছে!`);
      setEditingAccount(null);
    } else {
      const newAcc = {
        id: `acc-${Date.now()}`,
        name: accName.trim(),
        type: isBank ? 'ব্যাংক অ্যাকাউন্ট' : 'ক্যাশ/ডিজিটাল',
        balance: 0,
        description: accDesc.trim(),
        accountNumber: accNumber.trim(),
        contactPerson: contactPerson.trim(),
        mobile: contactPhone.trim(),
        isBank
      };
      setAccounts([...accounts, newAcc]);
      showToast(`নতুন এ্যাকাউন্ট "${newAcc.name}" সফলভাবে তৈরি হয়েছে!`);
    }

    setAccName('');
    setAccDesc('');
    setAccNumber('');
    setContactPerson('');
    setContactPhone('');
    setIsBank(false);
    setActiveView('list');
  };

  const handleDeleteAccount = (accId) => {
    if (confirm('আপনি কি নিশ্চিত যে এই এ্যাকাউন্টটি মুছে ফেলতে চান?')) {
      setAccounts(accounts.filter(a => a.id !== accId));
      showToast('এ্যাকাউন্ট সফলভাবে মুছে ফেলা হয়েছে!');
    }
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (fromAccount === toAccount) {
      alert('প্রেরক এবং প্রাপক একই এ্যাকাউন্ট হতে পারে না');
      return;
    }
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0) {
      alert('সঠিক টাকার পরিমাণ লিখুন');
      return;
    }

    const src = accounts.find(a => String(a.id) === String(fromAccount));
    const dest = accounts.find(a => String(a.id) === String(toAccount));

    if (!src || !dest) {
      alert('অনুগ্রহ করে সঠিক এ্যাকাউন্ট নির্বাচন করুন');
      return;
    }

    if ((src.balance || 0) < amt) {
      alert('প্রেরক অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই');
      return;
    }

    transferAccount(src.name, dest.name, amt, transferNote);

    setTransferLogs([
      {
        id: Date.now(),
        from: src.name,
        to: dest.name,
        amount: amt,
        date: transferDate,
        note: transferNote
      },
      ...transferLogs
    ]);

    setTransferAmount('');
    setTransferNote('');
    showToast(`৳ ${amt} সফলভাবে ${src.name} থেকে ${dest.name}-এ স্থানান্তর করা হয়েছে!`);
  };

  const todayStr = new Date().toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="container-fluid p-0">
      {/* View Switcher Top Toolbar (no-print) */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 no-print">
        <div className="btn-group shadow-sm">
          <button
            type="button"
            onClick={() => setActiveView('list')}
            className={`btn btn-sm ${activeView === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-list me-1"></i> এ্যাকাউন্ট তালিকা
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingAccount(null);
              setAccName('');
              setAccDesc('');
              setAccNumber('');
              setContactPerson('');
              setContactPhone('');
              setIsBank(false);
              setActiveView('create');
            }}
            className={`btn btn-sm ${activeView === 'create' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-plus me-1"></i> নতুন অ্যাকাউন্ট তৈরি
          </button>
          <button
            type="button"
            onClick={() => setActiveView('transfer')}
            className={`btn btn-sm ${activeView === 'transfer' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-money-bill-transfer me-1"></i> ব্যলেন্স ট্রান্সফার
          </button>
          <button
            type="button"
            onClick={() => setActiveView('report')}
            className={`btn btn-sm ${activeView === 'report' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-file-invoice me-1"></i> এ্যাকাউন্ট বিবরণ
          </button>
          <button
            type="button"
            onClick={() => setActiveView('balancesheet')}
            className={`btn btn-sm ${activeView === 'balancesheet' ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            <i className="fa-solid fa-scale-balanced me-1"></i> ব্যলেন্স সিট
          </button>
        </div>
      </div>

      {/* 1. CREATE / EDIT ACCOUNT (Matches account_create.html) */}
      {activeView === 'create' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-gradient bg-primary text-white py-3">
                <h5 className="mb-0 text-white">
                  <i className="fas fa-wallet me-2"></i>
                  {editingAccount ? 'এ্যাকাউন্ট সম্পাদনা করুন' : 'নতুন অ্যাকাউন্ট তৈরি'}
                </h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSaveAccount}>
                  <div className="mb-3">
                    <label className="form-label">
                      এ্যাকাউন্ট নাম<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={accName}
                      onChange={(e) => setAccName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">বিবরন (যদি থাকে)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={accDesc}
                      onChange={(e) => setAccDesc(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">এ্যাকাউন্ট নাম্বার (যদি থাকে)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="number"
                      value={accNumber}
                      onChange={(e) => setAccNumber(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">যোগাযোগ ব্যক্তি (যদি থাকে)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contact_person"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">যোগাযোগ ব্যক্তির ফোন (যদি থাকে)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="contact_person_phone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="is_bank"
                        id="is_bank"
                        checked={isBank}
                        onChange={(e) => setIsBank(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="is_bank">
                        এটি একটি ব্যাংক অ্যাকাউন্ট
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      onClick={() => {
                        setAccName('');
                        setAccDesc('');
                        setAccNumber('');
                        setContactPerson('');
                        setContactPhone('');
                        setIsBank(false);
                      }}
                      className="btn btn-warning"
                    >
                      পুনরায় সেট করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView('list')}
                      className="btn btn-danger"
                    >
                      বাতিল
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingAccount ? 'আপডেট করুন' : 'এ্যাকাউন্ট যুক্ত করুন'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACCOUNT LIST VIEW (Matches account_list.html) */}
      {activeView === 'list' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">এ্যাকাউন্ট তালিকা</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAccount(null);
                      setAccName('');
                      setAccDesc('');
                      setAccNumber('');
                      setContactPerson('');
                      setContactPhone('');
                      setIsBank(false);
                      setActiveView('create');
                    }}
                    className="btn btn-success"
                  >
                    <i className="fas fa-plus me-1"></i> নতুন এ্যাকাউন্ট যোগ
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered mb-0">
                    <thead className="table bg-primary">
                      <tr className="text-white">
                        <th>নং</th>
                        <th>এ্যাকাউন্ট নাম</th>
                        <th>এ্যাকাউন্ট নাম্বার</th>
                        <th>বিবরণ</th>
                        <th>যোগাযোগ ব্যক্তি</th>
                        <th>মোবাইল</th>
                        <th>ব্যালেন্স</th>
                        <th className="text-center">মুছুন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((acc, index) => (
                        <tr key={acc.id}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{acc.name}</strong>
                            {acc.isBank && (
                              <span className="badge bg-info text-dark ms-2">ব্যাংক</span>
                            )}
                          </td>
                          <td>{acc.accountNumber || '-'}</td>
                          <td>{acc.description || '-'}</td>
                          <td>{acc.contactPerson || '-'}</td>
                          <td>{acc.mobile || '-'}</td>
                          <td>
                            <strong className="text-primary font-monospace">৳ {acc.balance.toFixed(2)}</strong>
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAccount(acc);
                                setAccName(acc.name);
                                setAccDesc(acc.description || '');
                                setAccNumber(acc.accountNumber || '');
                                setContactPerson(acc.contactPerson || '');
                                setContactPhone(acc.mobile || '');
                                setIsBank(!!acc.isBank);
                                setActiveView('create');
                              }}
                              className="btn btn-sm btn-warning me-1"
                            >
                              <i className="fa-solid fa-pen-to-square"></i> সম্পাদনা
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteAccount(acc.id)}
                              className="btn btn-sm btn-danger delete-btn"
                              title="ডিলিট"
                            >
                              <i className="fa-solid fa-trash"></i> মুছে ফেলুন
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. BALANCE TRANSFER VIEW (Matches account_transfer.html) */}
      {activeView === 'transfer' && (
        <>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-money-bill-transfer me-2"></i> ব্যলেন্স ট্রান্সফার
              </h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleTransferSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="from_account_id" className="form-label">
                      প্রেরক অ্যাকাউন্ট <span className="text-danger">*</span>
                    </label>
                    <select
                      name="from_account_id"
                      id="from_account_id"
                      className="form-select"
                      value={fromAccount}
                      onChange={(e) => setFromAccount(e.target.value)}
                      required
                    >
                      <option value="">-- নির্বাচন করুন --</option>
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - ব্যালেন্স: ৳ {acc.balance.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="to_account_id" className="form-label">
                      প্রাপক অ্যাকাউন্ট <span className="text-danger">*</span>
                    </label>
                    <select
                      name="to_account_id"
                      id="to_account_id"
                      className="form-select"
                      value={toAccount}
                      onChange={(e) => setToAccount(e.target.value)}
                      required
                    >
                      <option value="">-- নির্বাচন করুন --</option>
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - ব্যালেন্স: ৳ {acc.balance.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="amount" className="form-label">
                      পরিমাণ (টাকা) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="form-control font-monospace"
                      step="0.01"
                      min="0.01"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="transfer_date" className="form-label">
                      তারিখ <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="transfer_date"
                      id="transfer_date"
                      className="form-control"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="note" className="form-label">নোট</label>
                  <textarea
                    name="note"
                    id="note"
                    rows="2"
                    className="form-control"
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    <i className="fa-solid fa-exchange-alt me-1"></i> ট্রান্সফার করুন
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Transfer List Table */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-list me-2"></i>ট্রান্সফার তালিকা
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead className="table bg-primary text-white">
                    <tr>
                      <th>নং</th>
                      <th>প্রেরক এ্যাকাউন্ট</th>
                      <th>প্রাপক এ্যাকাউন্ট</th>
                      <th>পরিমাণ</th>
                      <th>তারিখ</th>
                      <th>নোট</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transferLogs.map((log, index) => (
                      <tr key={log.id}>
                        <td>{index + 1}</td>
                        <td>{log.from}</td>
                        <td>{log.to}</td>
                        <td className="font-monospace text-primary">৳ {log.amount.toFixed(2)}</td>
                        <td>{log.date}</td>
                        <td>{log.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. ACCOUNT REPORT VIEW (Matches account_report.html) */}
      {activeView === 'report' && (
        <>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-file-invoice me-2"></i> এ্যাকাউন্ট বিবরণ
              </h5>
            </div>

            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); setSearchedReport(true); }}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">শুরুর তারিখ</label>
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      value={reportStartDate}
                      onChange={(e) => setReportStartDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">শেষের তারিখ</label>
                    <input
                      type="date"
                      name="end_date"
                      className="form-control"
                      value={reportEndDate}
                      onChange={(e) => setReportEndDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">&nbsp;</label>
                    <button type="submit" className="btn btn-success fw-bold w-100">
                      <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখাও
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {searchedReport && (
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-white">লেনদেন বিবরণী ফলাফল</h5>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-sm btn-light font-bold"
                >
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>তারিখ</th>
                        <th>ভাউচার / আইডি</th>
                        <th>খাত / বিবরণ</th>
                        <th>অ্যাকাউন্ট</th>
                        <th>জমা (৳)</th>
                        <th>খরচ (৳)</th>
                        <th>ব্যালেন্স (৳)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4 text-muted">
                            কোনো লেনদেন পাওয়া যায়নি
                          </td>
                        </tr>
                      ) : (
                        transactions.map((tx) => (
                          <tr key={tx.id}>
                            <td>{tx.date}</td>
                            <td>{tx.voucherNo || tx.id}</td>
                            <td>{tx.particulars || tx.category || '-'}</td>
                            <td>{tx.account || '-'}</td>
                            <td className="text-success font-monospace">
                              {tx.type === 'deposit' ? `৳ ${Number(tx.amount).toFixed(2)}` : '-'}
                            </td>
                            <td className="text-danger font-monospace">
                              {tx.type === 'expense' ? `৳ ${Number(tx.amount).toFixed(2)}` : '-'}
                            </td>
                            <td className="font-monospace fw-bold">
                              ৳ {Number(tx.amount).toFixed(2)}
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
        </>
      )}

      {/* 5. BALANCESHEET VIEW (Matches account_balancesheet.html) */}
      {activeView === 'balancesheet' && (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-body py-4">
            <img
              src="https://madrasha.hostzonebd.com/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
              alt="Banner"
              className="w-100 img-fluid mb-3"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>ব্যলেন্স সিট</h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">{todayStr} ইং</p>
              </div>
            </div>
          </div>

          <div className="table-responsive card-body pt-0">
            <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
              <thead className="bg-primary print-thead">
                <tr className="text-center text-white">
                  <th>নং</th>
                  <th>এ্যাকাউন্ট</th>
                  <th>এ্যাকাউন্ট নাম্বার</th>
                  <th style={{ width: '330px' }}>ব্যলেন্স</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc, index) => (
                  <tr key={acc.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{acc.name}</td>
                    <td>{acc.accountNumber || '-'}</td>
                    <td>
                      {acc.balance}
                      <br />
                      <small className="text-muted">
                        ({numberToBengaliWords(acc.balance)} টাকা মাত্র)
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="m-3 d-flex justify-content-end no-print">
            <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
              <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
