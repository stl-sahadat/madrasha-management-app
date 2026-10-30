'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  numberToBengaliWords,
  formatMoney,
  formatDateDDMMYYYY,
  toStandardDateStr
} from '../../utils/bengaliWords';

export const DepositExpenseStatementReport = () => {
  const { profile, transactions, activeTab } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sDate = params.get('start_date') || '';
      const eDate = params.get('end_date') || '';
      const normStart = toStandardDateStr(sDate);
      const normEnd = toStandardDateStr(eDate);
      return {
        startDate: normStart || todayStr,
        endDate: normEnd || todayStr,
        hasSearched: Boolean(normStart && normEnd)
      };
    }
    return {
      startDate: todayStr,
      endDate: todayStr,
      hasSearched: false
    };
  };

  const initial = getInitialParams();
  const [startDate, setStartDate] = useState(initial.startDate);
  const [endDate, setEndDate] = useState(initial.endDate);
  const [appliedFilter, setAppliedFilter] = useState(initial);

  useEffect(() => {
    const handlePopState = () => {
      const p = getInitialParams();
      setStartDate(p.startDate);
      setEndDate(p.endDate);
      setAppliedFilter(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const p = getInitialParams();
    setStartDate(p.startDate);
    setEndDate(p.endDate);
    setAppliedFilter(p);
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert('অনুগ্রহ করে শুরুর ও শেষের তারিখ নির্বাচন করুন');
      return;
    }
    const normStart = toStandardDateStr(startDate);
    const normEnd = toStandardDateStr(endDate);
    if (normEnd < normStart) {
      alert('শেষের তারিখ শুরুর তারিখের পরে হতে হবে');
      return;
    }

    const filterObj = { startDate: normStart, endDate: normEnd, hasSearched: true };
    setAppliedFilter(filterObj);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('start_date', normStart);
      url.searchParams.set('end_date', normEnd);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Filter transactions in date range
  const filteredList = transactions.filter((t) => {
    if (!appliedFilter.hasSearched) return false;
    const stdDate = toStandardDateStr(t.date);
    const s = toStandardDateStr(appliedFilter.startDate);
    const e = toStandardDateStr(appliedFilter.endDate);
    if (s && stdDate < s) return false;
    if (e && stdDate > e) return false;
    return true;
  });

  const totalDeposit = filteredList
    .filter((t) => t.type === 'deposit')
    .reduce((s, v) => s + (parseFloat(v.totalAmount) || 0), 0);

  const totalExpense = filteredList
    .filter((t) => t.type === 'expense')
    .reduce((s, v) => s + (parseFloat(v.totalAmount) || 0), 0);

  const balance = totalDeposit - totalExpense;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid py-2">
      {/* Search Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-file-invoice me-2"></i> এ্যাকাউন্ট বিবরণ
          </h5>
        </div>
        <div className="card-body mb-3">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-end">
              <div className="col-md-4 mb-3">
                <label htmlFor="start_date" className="form-label fw-bold">
                  শুরুর তারিখ
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="end_date" className="form-label fw-bold">
                  শেষের তারিখ
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <button type="submit" className="btn btn-success fw-bold px-4 w-100">
                  <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখাও
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Searched View */}
      {appliedFilter.hasSearched && (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-body py-4">
            {profile?.banner ? (
              <img
                src={profile.banner}
                alt="Banner"
                className="w-100 img-fluid mb-2"
                style={{ maxHeight: '160px', objectFit: 'cover' }}
              />
            ) : (
              <div className="text-center mb-3">
                <h3 className="fw-bold mb-1" style={{ color: '#2c5f2d' }}>
                  {profile?.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}
                </h3>
                <p className="text-muted mb-0">{profile?.address}</p>
              </div>
            )}

            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="mt-2 fw-semibold" style={{ color: '#2c5f2d' }}>
                  জমা ও খরচের বিবরণী
                </h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">
                  তারিখঃ {formatDateDDMMYYYY(appliedFilter.startDate)} হতে {formatDateDDMMYYYY(appliedFilter.endDate)}
                </p>
              </div>
            </div>
          </div>

          {/* 3 KPI Summary Cards */}
          <div className="card-body pt-0 no-print">
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card border-success shadow-sm">
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-2">মোট জমা</h6>
                    <h5 className="fw-bold mb-0 text-success">{formatMoney(totalDeposit)} ৳</h5>
                    <h6 className="text-muted small mt-1">({numberToBengaliWords(totalDeposit)} টাকা মাত্র)</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-danger shadow-sm">
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-2">মোট খরচ</h6>
                    <h5 className="fw-bold mb-0 text-danger">{formatMoney(totalExpense)} ৳</h5>
                    <h6 className="text-muted small mt-1">({numberToBengaliWords(totalExpense)} টাকা মাত্র)</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-primary shadow-sm">
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-2">অবশিষ্ট টাকা</h6>
                    <h5 className="text-primary fw-bold mb-0">{formatMoney(balance)} ৳</h5>
                    <h6 className="text-muted small mt-1">({numberToBengaliWords(balance)} টাকা মাত্র)</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive card-body pt-0">
            <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
              <thead className="bg-primary text-white print-thead">
                <tr className="text-center">
                  <th style={{ width: '50px' }}>নং</th>
                  <th style={{ width: '110px' }}>ভাউচার নং</th>
                  <th style={{ width: '100px' }}>তারিখ</th>
                  <th style={{ width: '100px' }}>ধরন</th>
                  <th style={{ width: '150px' }}>খাত</th>
                  <th>বিবরণ</th>
                  <th style={{ width: '110px' }}>একাউন্ট</th>
                  <th style={{ width: '130px' }}>টাকা</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-3 text-muted">
                      এই সময়কালে কোন লেনদেন পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filteredList.map((v, idx) => (
                    <tr key={v.id || idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{v.voucherNo || `V-${idx + 1}`}</td>
                      <td>{formatDateDDMMYYYY(v.date)}</td>
                      <td>
                        <span className={`badge ${v.type === 'deposit' ? 'bg-success' : 'bg-danger'}`}>
                          {v.type === 'deposit' ? 'জমা' : 'খরচ'}
                        </span>
                      </td>
                      <td>{v.category || (v.items && v.items[0]?.category) || '-'}</td>
                      <td>{v.note || v.donorOrStudent || '-'}</td>
                      <td>{v.account || 'Hand Cash'}</td>
                      <td className={`text-end fw-bold ${v.type === 'deposit' ? 'text-success' : 'text-danger'}`}>
                        {formatMoney(v.totalAmount)} ৳
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {filteredList.length > 0 && (
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan="7" className="text-end">মোট জমা:</td>
                    <td className="text-end text-success">{formatMoney(totalDeposit)} ৳</td>
                  </tr>
                  <tr>
                    <td colSpan="7" className="text-end">মোট খরচ:</td>
                    <td className="text-end text-danger">{formatMoney(totalExpense)} ৳</td>
                  </tr>
                  <tr className="table-secondary">
                    <td colSpan="7" className="text-end fw-bold">অবশিষ্ট ব্যালেন্স:</td>
                    <td className={`text-end fw-bold ${balance >= 0 ? 'text-primary' : 'text-danger'}`}>
                      {formatMoney(balance)} ৳
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Signatures */}
          <div className="card-body">
            <div className="row mt-5 pt-4 text-center">
              <div className="col-4">
                <div style={{ borderTop: '1px dashed #666', width: '160px', margin: '0 auto' }}></div>
                <p className="mt-2 mb-0 fw-semibold">হিসাব রক্ষক</p>
              </div>
              <div className="col-4"></div>
              <div className="col-4">
                <div style={{ borderTop: '1px dashed #666', width: '160px', margin: '0 auto' }}></div>
                <p className="mt-2 mb-0 fw-semibold">মুহতামিম</p>
              </div>
            </div>

            {/* Print Button */}
            <div className="text-end mt-4 no-print">
              <button onClick={handlePrint} className="btn btn-secondary px-4 fw-semibold">
                <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
