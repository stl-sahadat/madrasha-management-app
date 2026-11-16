'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  numberToBengaliWords,
  formatMoney,
  formatDateDDMMYYYY,
  toStandardDateStr
} from '../../utils/bengaliWords';

export const AccountsModule = ({ defaultView = 'list', initialEditId = null }) => {
  const {
    profile,
    accounts = [],
    addAccount,
    updateAccount,
    deleteAccount,
    transferAccount,
    transfers = [],
    deleteAccountTransfer,
    transactions = [],
    setActiveTab,
    showToast
  } = useApp();

  const [activeView, setActiveView] = useState(defaultView);
  const [editingAccount, setEditingAccount] = useState(null);

  // Form State for Create / Edit Account
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [number, setNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPersonPhone, setContactPersonPhone] = useState('');
  const [isBank, setIsBank] = useState(false);

  // Transfer Form State
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferDate, setTransferDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [transferNote, setTransferNote] = useState('');

  // Report View State
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const firstDayOfYear = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-01-01`;
  }, []);

  const [startDate, setStartDate] = useState(firstDayOfYear);
  const [endDate, setEndDate] = useState(todayStr);
  const [appliedFilter, setAppliedFilter] = useState({
    start: firstDayOfYear,
    end: todayStr
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [reportPage, setReportPage] = useState(1);
  const reportPerPage = 20;

  // SweetAlert2 styled modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    text: '',
    confirmText: '',
    cancelText: 'বাতিল করুন',
    onConfirm: null
  });

  // Sync initialEditId if provided via props
  useEffect(() => {
    if (initialEditId && accounts && accounts.length > 0) {
      const found = accounts.find(
        (a, idx) => String(a.id) === String(initialEditId) || String(idx + 1) === String(initialEditId)
      );
      if (found) {
        setEditingAccount(found);
        setName(found.name || '');
        setDescription(found.description || '');
        setNumber(found.number || found.accountNumber || '');
        setContactPerson(found.contact_person || found.contactPerson || '');
        setContactPersonPhone(found.contact_person_phone || found.mobile || '');
        setIsBank(!!found.isBank || !!found.is_bank);
        setActiveView('create');
      }
    }
  }, [initialEditId, accounts]);

  // Sync activeView with defaultView prop
  useEffect(() => {
    setActiveView(defaultView);
    if (defaultView === 'create' && !initialEditId && !editingAccount) {
      resetForm();
    }
  }, [defaultView, initialEditId]);

  // Check URL query parameters on mount for report view
  useEffect(() => {
    if (typeof window !== 'undefined' && activeView === 'report') {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('start_date');
      const e = params.get('end_date');
      if (s || e) {
        const stdStart = s ? toStandardDateStr(s) : firstDayOfYear;
        const stdEnd = e ? toStandardDateStr(e) : todayStr;
        setStartDate(stdStart);
        setEndDate(stdEnd);
        setAppliedFilter({
          start: stdStart,
          end: stdEnd
        });
        setHasSearched(true);
      }
    }
  }, [activeView, firstDayOfYear, todayStr]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setNumber('');
    setContactPerson('');
    setContactPersonPhone('');
    setIsBank(false);
    setEditingAccount(null);
  };

  const handleStartEdit = (acc, updateUrl = true) => {
    setEditingAccount(acc);
    setName(acc.name || '');
    setDescription(acc.description || '');
    setNumber(acc.number || acc.accountNumber || '');
    setContactPerson(acc.contact_person || acc.contactPerson || '');
    setContactPersonPhone(acc.contact_person_phone || acc.mobile || '');
    setIsBank(!!acc.isBank || !!acc.is_bank);
    setActiveView('create');
    if (updateUrl && setActiveTab) {
      setActiveTab(`account-edit:${acc.id}`);
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('এ্যাকাউন্ট নাম আবশ্যক');
      return;
    }

    if (editingAccount) {
      updateAccount(editingAccount.id, {
        name: name.trim(),
        description: description.trim(),
        number: number.trim(),
        contact_person: contactPerson.trim(),
        contact_person_phone: contactPersonPhone.trim(),
        is_bank: isBank
      });
      resetForm();
      setActiveView('list');
      if (setActiveTab) setActiveTab('account-list');
    } else {
      addAccount({
        name: name.trim(),
        description: description.trim(),
        number: number.trim(),
        contact_person: contactPerson.trim(),
        contact_person_phone: contactPersonPhone.trim(),
        is_bank: isBank,
        balance: 0
      });
      resetForm();
      setActiveView('list');
      if (setActiveTab) setActiveTab('account-list');
    }
  };

  const handleCancelCreateOrEdit = () => {
    const wasEditing = !!editingAccount;
    resetForm();
    if (wasEditing) {
      setActiveView('list');
      if (setActiveTab) setActiveTab('account-list');
    } else {
      if (setActiveTab) setActiveTab('dashboard');
    }
  };

  const handleDeleteAccountClick = (acc) => {
    setConfirmModal({
      isOpen: true,
      title: 'আপনি কি নিশ্চিত?',
      text: 'একবার মুছে ফেলা হলে এটি পুনরুদ্ধার করা যাবে না!',
      confirmText: 'হ্যাঁ, মুছে দিন!',
      cancelText: 'বাতিল করুন',
      onConfirm: () => {
        deleteAccount(acc.id, true);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleDeleteTransferClick = (transferId) => {
    setConfirmModal({
      isOpen: true,
      title: 'আপনি কি নিশ্চিত?',
      text: 'এই ট্রান্সফার রেকর্ডটি মুছে ফেলা হলে ব্যালেন্স পুনরায় সমন্বয় করা হবে।',
      confirmText: 'হ্যাঁ, মুছে দিন!',
      cancelText: 'বাতিল করুন',
      onConfirm: () => {
        deleteAccountTransfer(transferId, true);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!fromAccountId || !toAccountId) {
      alert('অনুগ্রহ করে প্রেরক এবং প্রাপক উভয় অ্যাকাউন্ট নির্বাচন করুন');
      return;
    }
    if (String(fromAccountId) === String(toAccountId)) {
      alert('প্রেরক এবং প্রাপক একই অ্যাকাউন্ট হতে পারে না');
      return;
    }
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0) {
      alert('সঠিক টাকার পরিমাণ লিখুন');
      return;
    }

    const success = transferAccount(
      fromAccountId,
      toAccountId,
      amt,
      transferNote,
      transferDate
    );

    if (success) {
      setFromAccountId('');
      setToAccountId('');
      setTransferAmount('');
      setTransferNote('');
    }
  };

  const handleReportSearch = (e) => {
    e.preventDefault();
    setAppliedFilter({
      start: startDate,
      end: endDate
    });
    setHasSearched(true);
    setReportPage(1);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('start_date', formatDateDDMMYYYY(startDate));
      url.searchParams.set('end_date', formatDateDDMMYYYY(endDate));
      window.history.pushState({}, '', url.toString());
    }
  };

  // Filtered transactions for Account Statement / Report
  const filteredTransactions = useMemo(() => {
    if (!hasSearched) return [];
    const sDate = toStandardDateStr(appliedFilter.start);
    const eDate = toStandardDateStr(appliedFilter.end);

    return transactions.filter((t) => {
      const tDate = toStandardDateStr(t.date);
      if (sDate && tDate < sDate) return false;
      if (eDate && tDate > eDate) return false;
      return true;
    });
  }, [transactions, appliedFilter, hasSearched]);

  const totalDeposit = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + (parseFloat(t.totalAmount || t.amount) || 0), 0);
  }, [filteredTransactions]);

  const totalExpense = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + (parseFloat(t.totalAmount || t.amount) || 0), 0);
  }, [filteredTransactions]);

  // Paginated report transactions
  const totalReportEntries = filteredTransactions.length;
  const totalReportPages = Math.max(1, Math.ceil(totalReportEntries / reportPerPage));
  const displayedReportTransactions = useMemo(() => {
    const startIdx = (reportPage - 1) * reportPerPage;
    return filteredTransactions.slice(startIdx, startIdx + reportPerPage);
  }, [filteredTransactions, reportPage, reportPerPage]);

  const formattedCurrentDateBangla = useMemo(() => {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    return `${d}/${m}/${y} ইং`;
  }, []);

  const bannerSrc = profile?.banner || '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';

  const switchView = (view, tabName) => {
    setActiveView(view);
    if (view === 'create' && !editingAccount) {
      resetForm();
    }
    if (setActiveTab && tabName) {
      setActiveTab(tabName);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* 1. CREATE / EDIT ACCOUNT (Matches 1_create.html & account_edit.html) */}
      {activeView === 'create' && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-gradient bg-primary text-white py-3">
                <h5 className="mb-0 text-white">
                  <i className="fas fa-wallet me-2"></i>
                  {editingAccount ? 'এ্যাকাউন্ট সম্পাদনা' : 'নতুন অ্যাকাউন্ট তৈরি'}
                </h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSaveAccount}>
                  <div className="mb-3">
                    <label className="form-label">
                      এ্যাকাউন্ট নাম <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">বিবরন (যদি থাকে)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">এ্যাকাউন্ট নাম্বার (যদি থাকে)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
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
                      value={contactPersonPhone}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                        setContactPersonPhone(e.target.value);
                      }}
                      onChange={(e) => setContactPersonPhone(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        id="is_bank"
                        name="is_bank"
                        type="checkbox"
                        checked={isBank}
                        onChange={(e) => setIsBank(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="is_bank">
                        এটি একটি ব্যাংক অ্যাকাউন্ট
                      </label>
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    {!editingAccount && (
                      <button
                        className="btn btn-warning"
                        type="button"
                        onClick={resetForm}
                      >
                        পুনরায় সেট করুন
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={handleCancelCreateOrEdit}
                    >
                      বাতিল
                    </button>
                    <button className="btn btn-primary" type="submit">
                      {editingAccount ? 'আপডেট করুন' : 'এ্যাকাউন্ট যুক্ত করুন'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACCOUNT LIST VIEW (Matches 2_list.html) */}
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
                      resetForm();
                      switchView('create', 'account-create');
                    }}
                    className="btn btn-success"
                  >
                    <i className="fas fa-plus me-1"></i> নতুন এ্যাকাউন্ট যোগ
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered align-middle mb-0">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>নং</th>
                        <th>এ্যাকাউন্ট নাম</th>
                        <th>এ্যাকাউন্ট নাম্বার</th>
                        <th>বিবরণ</th>
                        <th>যোগাযোগ ব্যক্তি</th>
                        <th>মোবাইল</th>
                        <th className="text-center" style={{ width: '190px', minWidth: '190px' }}>মুছুন / সম্পাদনা</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4 text-muted">
                            কোন রেকর্ড নেই
                          </td>
                        </tr>
                      ) : (
                        accounts.map((acc, index) => (
                          <tr key={acc.id}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{acc.name}</strong>
                              {(acc.isBank || acc.is_bank) && (
                                <span className="badge bg-info text-dark ms-2">ব্যাংক</span>
                              )}
                            </td>
                            <td>{acc.number || acc.accountNumber || ''}</td>
                            <td>{acc.description || ''}</td>
                            <td>{acc.contact_person || acc.contactPerson || ''}</td>
                            <td>{acc.contact_person_phone || acc.mobile || ''}</td>
                            <td className="text-center" style={{ whiteSpace: 'nowrap', width: '190px', minWidth: '190px' }}>
                              <div className="d-inline-flex align-items-center gap-2 justify-content-center">
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(acc)}
                                  className="btn btn-sm btn-outline-primary px-2.5 py-1 fw-semibold d-inline-flex align-items-center shadow-none"
                                  title="এ্যাকাউন্ট সম্পাদনা করুন"
                                >
                                  <i className="fa-solid fa-pen-to-square me-1"></i> সম্পাদনা
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAccountClick(acc)}
                                  className="btn btn-sm btn-outline-danger px-2.5 py-1 fw-semibold d-inline-flex align-items-center shadow-none delete-btn"
                                  title="এ্যাকাউন্ট মুছে ফেলুন"
                                >
                                  <i className="fa-solid fa-trash me-1"></i> মুছে ফেলুন
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ACCOUNT REPORT / STATEMENT VIEW (Matches 3_report.html & 3_report_ddmmyyyy.html) */}
      {activeView === 'report' && (
        <>
          <div className="card shadow-sm mb-4 no-print">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-file-invoice me-2"></i> এ্যাকাউন্ট বিবরণ
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleReportSearch}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">শুরুর তারিখ</label>
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold">শেষের তারিখ</label>
                    <input
                      type="date"
                      name="end_date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mb-3 d-flex align-items-end">
                    <button type="submit" className="btn btn-success fw-bold w-100">
                      <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখাও
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Results Card (shown only after search, matching live site behavior) */}
          {hasSearched && (
            <div className="card shadow-sm mb-4" id="printContent">
              <div className="card-body">
                <img
                  src={bannerSrc}
                  alt="Banner"
                  className="w-100 img-fluid mb-2"
                  style={{ maxHeight: '160px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';
                  }}
                />
                <div className="row mt-3">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 text-center">
                    <h5 className="text-success fw-semibold mb-1">অ্যাকাউন্ট বিবরণ</h5>
                    <p className="mb-2 text-muted">
                      {formatDateDDMMYYYY(appliedFilter.start)} - {formatDateDDMMYYYY(appliedFilter.end)}
                    </p>
                  </div>
                  <div className="col-md-2 text-end"></div>
                </div>

                <div className="table-responsive mt-2">
                  <table className="table table-bordered table-striped align-middle mb-0 print-table">
                    <thead className="table-primary print-thead">
                      <tr className="text-center text-white">
                        <th style={{ width: '60px' }}>ক্রম</th>
                        <th style={{ width: '110px' }}>তারিখ</th>
                        <th>এ্যাকাউন্ট</th>
                        <th style={{ width: '90px' }}>জমা/খরচ</th>
                        <th>খাত</th>
                        <th>বিবরণ</th>
                        <th style={{ width: '180px' }}>জমা</th>
                        <th style={{ width: '180px' }}>খরচ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedReportTransactions.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-4 text-muted">
                            কোন রেকর্ড নেই
                          </td>
                        </tr>
                      ) : (
                        displayedReportTransactions.map((tx, idx) => {
                          const serial = (reportPage - 1) * reportPerPage + idx + 1;
                          const isDep = tx.type === 'deposit';
                          const isExp = tx.type === 'expense';
                          const amtNum = parseFloat(tx.totalAmount || tx.amount || 0);

                          return (
                            <tr key={tx.id || idx}>
                              <td className="text-center">{serial}</td>
                              <td className="text-center">{formatDateDDMMYYYY(tx.date)}</td>
                              <td className="text-center">{tx.account || '-'}</td>
                              <td className="text-center">
                                {isDep ? (
                                  <span className="badge bg-success">জমা</span>
                                ) : isExp ? (
                                  <span className="badge bg-danger">খরচ</span>
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>
                                {tx.category || (tx.items && tx.items[0]?.category) || '-'}
                              </td>
                              <td>
                                {tx.description || tx.particulars || (tx.items && tx.items[0]?.description) || '-'}
                              </td>
                              <td className="text-center fw-bold">
                                {isDep ? formatMoney(amtNum) : '-'}
                              </td>
                              <td className="text-center fw-bold">
                                {isExp ? formatMoney(amtNum) : '-'}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                    <tfoot className="table-secondary">
                      <tr>
                        <td className="text-end fw-bold" colSpan="6">
                          মোট:
                        </td>
                        <td className="text-center fw-bold">
                          {formatMoney(totalDeposit)}
                          <br />
                          <small className="fw-normal">
                            ({numberToBengaliWords(totalDeposit)} টাকা মাত্র)
                          </small>
                        </td>
                        <td className="text-center fw-bold">
                          {formatMoney(totalExpense)}
                          <br />
                          <small className="fw-normal">
                            ({numberToBengaliWords(totalExpense)} টাকা মাত্র)
                          </small>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Pagination controls (no-print) */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 no-print">
                  <div className="pagination-info text-muted small">
                    মোট {totalReportEntries} টি এন্ট্রি থেকে{' '}
                    {totalReportEntries > 0 ? (reportPage - 1) * reportPerPage + 1 : 0} -{' '}
                    {Math.min(reportPage * reportPerPage, totalReportEntries)} দেখাচ্ছে
                  </div>
                  {totalReportPages > 1 && (
                    <ul className="pagination pagination-sm mb-0">
                      <li className={`page-item ${reportPage === 1 ? 'disabled' : ''}`}>
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => setReportPage((p) => Math.max(1, p - 1))}
                        >
                          পূর্ববর্তী
                        </button>
                      </li>
                      {Array.from({ length: totalReportPages }, (_, i) => i + 1).map((pNum) => (
                        <li
                          key={pNum}
                          className={`page-item ${reportPage === pNum ? 'active' : ''}`}
                        >
                          <button
                            type="button"
                            className="page-link"
                            onClick={() => setReportPage(pNum)}
                          >
                            {pNum}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${reportPage === totalReportPages ? 'disabled' : ''}`}>
                        <button
                          type="button"
                          className="page-link"
                          onClick={() => setReportPage((p) => Math.min(totalReportPages, p + 1))}
                        >
                          পরবর্তী
                        </button>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Print Button */}
                <div className="m-3 d-flex justify-content-end no-print">
                  <button
                    type="button"
                    className="btn btn-primary fw-bold"
                    onClick={() => window.print()}
                  >
                    <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 4. BALANCE TRANSFER VIEW (Matches 4_transfer.html) */}
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
                    <label className="form-label" htmlFor="from_account_id">
                      প্রেরক অ্যাকাউন্ট <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="from_account_id"
                      name="from_account_id"
                      required
                      value={fromAccountId}
                      onChange={(e) => setFromAccountId(e.target.value)}
                    >
                      <option value="">-- নির্বাচন করুন --</option>
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - ব্যালেন্স: ৳ {formatMoney(acc.balance || 0)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="to_account_id">
                      প্রাপক অ্যাকাউন্ট <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="to_account_id"
                      name="to_account_id"
                      required
                      value={toAccountId}
                      onChange={(e) => setToAccountId(e.target.value)}
                    >
                      <option value="">-- নির্বাচন করুন --</option>
                      {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.name} - ব্যালেন্স: ৳ {formatMoney(acc.balance || 0)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="amount">
                      পরিমাণ (টাকা) <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="amount"
                      min="0.01"
                      step="0.01"
                      name="amount"
                      required
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="transfer_date">
                      তারিখ <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="transfer_date"
                      name="transfer_date"
                      required
                      type="date"
                      value={transferDate}
                      onChange={(e) => setTransferDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="note">
                    নোট
                  </label>
                  <textarea
                    className="form-control"
                    id="note"
                    name="note"
                    rows="2"
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-end">
                  <button className="btn btn-primary" type="submit">
                    <i className="fa-solid fa-exchange-alt me-1"></i> ট্রান্সফার করুন
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Transfer List */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-list me-2"></i> ট্রান্সফার তালিকা
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '60px' }}>ক্রম</th>
                      <th style={{ width: '120px' }}>তারিখ</th>
                      <th>প্রেরক</th>
                      <th>প্রাপক</th>
                      <th>পরিমাণ</th>
                      <th>নোট</th>
                      <th className="text-center" style={{ width: '110px' }}>
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transfers.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan="7">
                          কোন রেকর্ড নেই
                        </td>
                      </tr>
                    ) : (
                      transfers.map((t, idx) => (
                        <tr key={t.id || idx}>
                          <td className="text-center">{idx + 1}</td>
                          <td>{t.date}</td>
                          <td>{t.from}</td>
                          <td>{t.to}</td>
                          <td className="fw-bold font-monospace text-primary">
                            ৳{formatMoney(t.amount)}
                          </td>
                          <td>{t.note || ''}</td>
                          <td className="text-center" style={{ whiteSpace: 'nowrap', width: '130px', minWidth: '130px' }}>
                            <button
                              type="button"
                              onClick={() => handleDeleteTransferClick(t.id)}
                              className="btn btn-sm btn-outline-danger px-2.5 py-1 fw-semibold d-inline-flex align-items-center shadow-none delete-btn"
                              title="ট্রান্সফার মুছে ফেলুন"
                            >
                              <i className="fa-solid fa-trash me-1"></i> মুছে ফেলুন
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
        </>
      )}

      {/* 5. BALANCESHEET VIEW (Matches 5_balancesheet.html) */}
      {activeView === 'balancesheet' && (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-body py-4">
            <img
              src={bannerSrc}
              alt="Banner"
              className="w-100 img-fluid"
              style={{ maxHeight: '160px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';
              }}
            />
            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                  ব্যলেন্স সিট
                </h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">{formattedCurrentDateBangla}</p>
              </div>
            </div>
          </div>
          <div className="table-responsive card-body">
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
                {accounts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      কোন রেকর্ড নেই
                    </td>
                  </tr>
                ) : (
                  accounts.map((acc, index) => (
                    <tr key={acc.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{acc.name}</td>
                      <td>{acc.number || acc.accountNumber || ''}</td>
                      <td>
                        {acc.balance}
                        <br />
                        ({numberToBengaliWords(acc.balance)} টাকা মাত্র)
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="m-3 d-flex justify-content-end no-print">
            <button
              type="button"
              className="btn btn-primary fw-bold"
              onClick={() => window.print()}
            >
              <i className="fa-solid fa-print me-2"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>
      )}

      {/* SweetAlert2-Style Confirmation Modal (Matching Live Site Swal.fire) */}
      {confirmModal.isOpen && (
        <div
          className="modal fade show d-block no-print"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1055 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '420px' }}>
            <div className="modal-content border-0 shadow-lg text-center p-4 rounded-4">
              <div className="modal-body p-0">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '70px',
                    height: '70px',
                    border: '4px solid #facea8',
                    color: '#f8bb86'
                  }}
                >
                  <span style={{ fontSize: '38px', fontWeight: 'bold' }}>!</span>
                </div>
                <h4 className="fw-bold mb-2 text-dark">{confirmModal.title}</h4>
                <p className="text-muted mb-4 small">{confirmModal.text}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-danger px-4 fw-bold"
                    onClick={() => {
                      if (confirmModal.onConfirm) confirmModal.onConfirm();
                    }}
                  >
                    {confirmModal.confirmText}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary px-4 fw-bold"
                    style={{ backgroundColor: '#3085d6', borderColor: '#3085d6' }}
                    onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  >
                    {confirmModal.cancelText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
