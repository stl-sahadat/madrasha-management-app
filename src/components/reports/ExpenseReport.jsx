'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  numberToBengaliWords,
  formatMoney,
  formatDateDDMMYYYY,
  toStandardDateStr
} from '../../utils/bengaliWords';

export const ExpenseReport = () => {
  const { profile, transactions, activeTab } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  // Parse initial query params from URL if present
  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sDate = params.get('start_date') || '';
      const eDate = params.get('end_date') || '';
      const normStart = toStandardDateStr(sDate);
      const normEnd = toStandardDateStr(eDate);
      const hasSearched = Boolean(normStart && normEnd);
      return {
        startDate: normStart || todayStr,
        endDate: normEnd || todayStr,
        hasSearched
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

  // Sync with browser Back and Forward navigation (popstate)
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

  // Re-sync when activeTab changes
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

  // Filter expense transactions in date range
  const filteredVouchers = transactions.filter((t) => {
    if (t.type !== 'expense') return false;
    if (!appliedFilter.hasSearched) return false;

    const tDateStr = toStandardDateStr(t.date);
    const normFilterStart = toStandardDateStr(appliedFilter.startDate);
    const normFilterEnd = toStandardDateStr(appliedFilter.endDate);

    if (normFilterStart && tDateStr < normFilterStart) return false;
    if (normFilterEnd && tDateStr > normFilterEnd) return false;
    return true;
  });

  // Calculate expense category summary
  const categoryMap = {};
  filteredVouchers.forEach((v) => {
    if (Array.isArray(v.items) && v.items.length > 0) {
      v.items.forEach((item) => {
        const cat = item.category || 'অন্যান্য';
        const amt = parseFloat(item.amount) || 0;
        if (!categoryMap[cat]) categoryMap[cat] = { name: cat, count: 0, total: 0 };
        categoryMap[cat].count += 1;
        categoryMap[cat].total += amt;
      });
    } else {
      const cat = v.category || 'অন্যান্য খরচ';
      const amt = parseFloat(v.totalAmount) || 0;
      if (!categoryMap[cat]) categoryMap[cat] = { name: cat, count: 0, total: 0 };
      categoryMap[cat].count += 1;
      categoryMap[cat].total += amt;
    }
  });

  const categoryList = Object.values(categoryMap).sort((a, b) => b.total - a.total);
  const totalExpenseAmount = filteredVouchers.reduce(
    (sum, v) => sum + (parseFloat(v.totalAmount) || 0),
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid py-2">
      {/* Search / Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-file-invoice me-2"></i> খরচের রিপোর্ট
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row align-items-end">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">শুরুর তারিখ</label>
                <input
                  type="date"
                  name="start_date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
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
                  required
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

      {/* Searched View */}
      {appliedFilter.hasSearched && (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          {/* Printable Header */}
          <div className="card-body py-4 print-header-container">
            {profile?.banner ? (
              <img
                src={profile.banner}
                alt="Banner"
                className="w-100 img-fluid mb-3"
                style={{ maxHeight: '160px', objectFit: 'cover' }}
              />
            ) : (
              <div className="text-center mb-3">
                <h3 className="fw-bold mb-1" style={{ color: '#2c5f2d' }}>
                  {profile?.name || 'জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসা'}
                </h3>
                <p className="text-muted mb-0">{profile?.address || 'পোঃ জব্বর নগর, উপজেলাঃ সদর, জেলাঃ নোয়াখালী'}</p>
              </div>
            )}

            <div className="text-center my-2">
              <h6 className="fw-semibold text-secondary mb-1">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </h6>
              <h5 className="fw-bold mb-1" style={{ color: '#2c5f2d' }}>
                খরচের রিপোর্ট
              </h5>
              <p className="text-muted mb-0 small">
                তারিখঃ {formatDateDDMMYYYY(appliedFilter.startDate)} হতে {formatDateDDMMYYYY(appliedFilter.endDate)} পর্যন্ত
              </p>
            </div>
          </div>

          {/* KPI Summary Card */}
          <div className="card-body pt-0 no-print">
            <div className="row g-3 mb-4">
              <div className="col-md-12">
                <div className="card border-danger shadow-sm">
                  <div className="card-body text-center py-3">
                    <h6 className="text-muted mb-1">মোট খরচ</h6>
                    <h3 className="text-danger fw-bold mb-1">
                      {formatMoney(totalExpenseAmount)} ৳
                    </h3>
                    <h6 className="text-muted small mb-0">
                      ({numberToBengaliWords(totalExpenseAmount)} টাকা মাত্র)
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table 1: Expense Category Summary */}
          <div className="card-body pt-0">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold text-dark mb-0">
                <i className="fa-solid fa-list-check me-2 text-primary"></i>
                খরচের খাতের সংক্ষিপ্ত বিবরণ
              </h6>
            </div>
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-striped align-middle mb-0">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-white text-center" style={{ width: '60px' }}>ক্র নং</th>
                    <th className="text-white">খরচের খাত</th>
                    <th className="text-white text-center" style={{ width: '140px' }}>ভাউচার সংখ্যা</th>
                    <th className="text-white text-end" style={{ width: '160px' }}>মোট খরচ</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-3 text-muted">
                        এই সময়কালে কোন খরচ হয়নি
                      </td>
                    </tr>
                  ) : (
                    categoryList.map((cat, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="fw-semibold">{cat.name}</td>
                        <td className="text-center">{cat.count}</td>
                        <td className="text-end fw-bold text-danger">
                          {formatMoney(cat.total)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {categoryList.length > 0 && (
                  <tfoot className="table-light fw-bold">
                    <tr>
                      <td colSpan="3" className="text-end">সর্বমোট খরচঃ</td>
                      <td className="text-end text-danger">{formatMoney(totalExpenseAmount)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* Table 2: Detailed Expense Vouchers */}
            <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
              <h6 className="fw-bold text-dark mb-0">
                <i className="fa-solid fa-receipt me-2 text-danger"></i>
                বিস্তারিত খরচের তালিকা
              </h6>
            </div>
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-striped align-middle mb-0">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-white text-center" style={{ width: '50px' }}>ক্র নং</th>
                    <th className="text-white text-center" style={{ width: '100px' }}>তারিখ</th>
                    <th className="text-white text-center" style={{ width: '110px' }}>ভাউচার নং</th>
                    <th className="text-white text-center" style={{ width: '80px' }}>বই নং</th>
                    <th className="text-white text-center" style={{ width: '80px' }}>রশিদ নং</th>
                    <th className="text-white">বিবরণ</th>
                    <th className="text-white" style={{ width: '140px' }}>খরচের খাত</th>
                    <th className="text-white text-center" style={{ width: '120px' }}>গ্রহীতা</th>
                    <th className="text-white text-end" style={{ width: '130px' }}>টাকা</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVouchers.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-3 text-muted">
                        এই সময়কালে কোন খরচের ভাউচার নেই
                      </td>
                    </tr>
                  ) : (
                    filteredVouchers.map((v, idx) => (
                      <tr key={v.id || idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="text-center">{formatDateDDMMYYYY(v.date)}</td>
                        <td className="text-center fw-semibold">{v.voucherNo || `EV-${idx + 1}`}</td>
                        <td className="text-center">{v.bookNo || '-'}</td>
                        <td className="text-center">{v.receiptNo || '-'}</td>
                        <td>{v.note || v.donorOrStudent || '-'}</td>
                        <td>{v.category || (v.items && v.items[0]?.category) || '-'}</td>
                        <td className="text-center">{v.receiver || '-'}</td>
                        <td className="text-end fw-bold text-danger">{formatMoney(v.totalAmount)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                {filteredVouchers.length > 0 && (
                  <tfoot className="table-light fw-bold">
                    <tr>
                      <td colSpan="8" className="text-end">সর্বমোটঃ</td>
                      <td className="text-end text-danger">{formatMoney(totalExpenseAmount)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>

            {/* In Words & Signatures */}
            <div className="mt-4 p-3 bg-light rounded border">
              <p className="mb-0 fw-semibold text-dark">
                কথায়ঃ <span className="text-danger fw-bold">{numberToBengaliWords(totalExpenseAmount)} টাকা মাত্র</span>
              </p>
            </div>

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
