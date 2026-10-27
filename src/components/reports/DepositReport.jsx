'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY } from '../../utils/bengaliWords';

/**
 * Normalizes a date string to YYYY-MM-DD
 * Handles both "DD/MM/YYYY" and "YYYY-MM-DD"
 */
function toStandardDateStr(dStr) {
  if (!dStr) return '';
  const s = String(dStr).trim().split('T')[0];
  if (s.includes('/')) {
    const parts = s.split('/');
    if (parts.length === 3) {
      // Assuming DD/MM/YYYY
      const [day, month, year] = parts;
      return `${year.padStart(4, '20')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return s;
}

export const DepositReport = () => {
  const { profile, transactions } = useApp();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('অনুগ্রহ করে শুরুর ও শেষের তারিখ নির্বাচন করুন');
      return;
    }

    const startD = new Date(startDate);
    const endD = new Date(endDate);
    if (endD < startD) {
      alert('শেষের তারিখ শুরুর তারিখের পরে হতে হবে');
      return;
    }

    const filterObj = { startDate, endDate, hasSearched: true };
    setAppliedFilter(filterObj);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.pathname = '/admin/report/deposit';
      url.searchParams.set('start_date', startDate);
      url.searchParams.set('end_date', endDate);
      window.history.pushState(null, '', url.toString());
    }
  };

  // Filter deposit transactions within selected date range
  const startD = appliedFilter.hasSearched && appliedFilter.startDate ? new Date(appliedFilter.startDate) : null;
  const endD = appliedFilter.hasSearched && appliedFilter.endDate ? new Date(appliedFilter.endDate) : null;

  const depositTransactions = (transactions || []).filter((t) => {
    const isDep = t.type === 'deposit' || t.type === 'income';
    if (!isDep) return false;

    if (!appliedFilter.hasSearched) return false;

    const tDateStr = toStandardDateStr(t.date);
    if (!tDateStr) return false;
    const tD = new Date(tDateStr);
    if (isNaN(tD.getTime())) return false;

    if (startD && tD < startD) return false;
    if (endD && tD > endD) return false;

    return true;
  });

  // Calculate category aggregates and breakdown
  const categoryMap = {};
  const categoryCounts = {};

  depositTransactions.forEach((t) => {
    if (Array.isArray(t.items) && t.items.length > 0) {
      t.items.forEach((item) => {
        const cat = item.category || 'সাধারণ জমা';
        const amt = Number(item.amount) || 0;
        categoryMap[cat] = (categoryMap[cat] || 0) + amt;
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    } else {
      const cat = t.category || 'সাধারণ জমা';
      const amt = Number(t.totalAmount ?? t.amount) || 0;
      categoryMap[cat] = (categoryMap[cat] || 0) + amt;
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  // Sort categories by total amount descending
  const depositCategorySummary = Object.entries(categoryMap)
    .map(([category, amount]) => ({
      category,
      amount,
      count: categoryCounts[category] || 1
    }))
    .sort((a, b) => b.amount - a.amount);

  const totalDeposit = depositCategorySummary.reduce((sum, item) => sum + item.amount, 0);

  // Prepare flattened transaction list for the detailed table
  const detailedDepositList = [];
  depositTransactions.forEach((t) => {
    if (Array.isArray(t.items) && t.items.length > 0) {
      t.items.forEach((item, itemIdx) => {
        detailedDepositList.push({
          id: `${t.id}-${itemIdx}`,
          voucherNo: t.voucherNo || t.id,
          date: t.date,
          category: item.category || t.category || 'সাধারণ জমা',
          description: item.description || t.description || t.note || '-',
          donorOrStudent: t.donorOrStudent || t.receiver || '-',
          account: t.account || 'ক্যাশ / সাধারণ',
          bookNo: t.bookNo || '-',
          receiptNo: t.receiptNo || '-',
          amount: Number(item.amount) || 0
        });
      });
    } else {
      detailedDepositList.push({
        id: t.id,
        voucherNo: t.voucherNo || t.id,
        date: t.date,
        category: t.category || 'সাধারণ জমা',
        description: t.description || t.note || '-',
        donorOrStudent: t.donorOrStudent || t.receiver || '-',
        account: t.account || 'ক্যাশ / সাধারণ',
        bookNo: t.bookNo || '-',
        receiptNo: t.receiptNo || '-',
        amount: Number(t.totalAmount ?? t.amount) || 0
      });
    }
  });

  const bannerUrl =
    profile?.banner || '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';

  return (
    <div className="w-100">
      {/* Filter Card (1:1 with madrasha.hostzonebd.com/admin/report/deposit) */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-file-invoice me-2"></i> জমার রিপোর্ট
          </h5>
        </div>

        <div className="card-body">
          <form method="GET" onSubmit={handleSubmit}>
            <div className="row">
              {/* শুরুর তারিখ */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">শুরুর তারিখ</label>
                <input
                  type="date"
                  name="start_date"
                  className="form-control datepicker"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              {/* শেষের তারিখ */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-bold">শেষের তারিখ</label>
                <input
                  type="date"
                  name="end_date"
                  className="form-control datepicker"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
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

      {/* Unsearched Initial State */}
      <div className={`card border-0 shadow-sm no-print ${appliedFilter.hasSearched ? 'd-none' : ''}`}>
        <div className="card-body text-center py-5">
          <i className="fa-solid fa-file-invoice fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">তারিখ নির্বাচন করে রিপোর্ট দেখুন</h5>
          <p className="text-muted small mb-0">
            শুরুর ও শেষের তারিখ নির্বাচন করে &quot;রিপোর্ট দেখাও&quot; বাটনে ক্লিক করুন
          </p>
        </div>
      </div>

      {/* Searched Report View (Matches live site d-none toggling) */}
      <div
        className={`card border-0 shadow-sm mb-4 ${!appliedFilter.hasSearched ? 'd-none' : ''}`}
        id="printContent"
      >
          {/* Institution Banner & Report Header */}
          <div className="card-body py-4">
            <img src={bannerUrl} alt="Banner" className="w-100 img-fluid" />
            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="mt-2 fw-semibold" style={{ color: '#2c5f2d' }}>
                  জমার প্রতিবেদন
                </h5>
                <p className="mb-0 text-muted">
                  তারিখঃ {formatDateDDMMYYYY(appliedFilter.startDate)} থেকে{' '}
                  {formatDateDDMMYYYY(appliedFilter.endDate)} ইং
                </p>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">তারিখঃ {formatDateDDMMYYYY(todayStr)} ইং</p>
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            {/* KPI Summary Cards */}
            <div className="row g-3 mb-4 no-print">
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded border text-center">
                  <div className="text-muted small fw-semibold">সর্বমোট জমা</div>
                  <div className="fs-4 fw-bold text-success font-monospace">
                    ৳ {formatMoney(totalDeposit)}
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded border text-center">
                  <div className="text-muted small fw-semibold">মোট জমা ভাউচার</div>
                  <div className="fs-4 fw-bold text-primary font-monospace">
                    {depositTransactions.length} টি
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded border text-center">
                  <div className="text-muted small fw-semibold">জমার খাত সংখ্যা</div>
                  <div className="fs-4 fw-bold text-secondary font-monospace">
                    {depositCategorySummary.length} টি
                  </div>
                </div>
              </div>
            </div>

            {/* Category-wise Summary Table */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0 text-dark">
                  <i className="fa-solid fa-chart-pie me-1 text-primary"></i> খাতভিত্তিক জমার সারসংক্ষেপ
                </h6>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0">
                  <thead className="table bg-primary text-white">
                    <tr>
                      <th className="text-white text-center" style={{ width: '60px' }}>
                        ক্র নং
                      </th>
                      <th className="text-white">জমার খাত</th>
                      <th className="text-white text-center">ভাউচার সংখ্যা</th>
                      <th className="text-white text-end">শতকরা হার (%)</th>
                      <th className="text-white text-end">টাকা (৳)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositCategorySummary.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-3">
                          এই সময়কালে কোনো জমা হয়নি
                        </td>
                      </tr>
                    ) : (
                      depositCategorySummary.map((item, idx) => {
                        const percent =
                          totalDeposit > 0
                            ? ((item.amount / totalDeposit) * 100).toFixed(1)
                            : '0.0';
                        return (
                          <tr key={item.category}>
                            <td className="text-center">{idx + 1}</td>
                            <td className="fw-semibold">{item.category}</td>
                            <td className="text-center">{item.count}</td>
                            <td className="text-end">{percent}%</td>
                            <td className="text-end font-monospace">{formatMoney(item.amount)}</td>
                          </tr>
                        );
                      })
                    )}
                    <tr className="table-success fw-bold">
                      <td colSpan="4" className="text-end">
                        সর্বমোট জমাঃ
                      </td>
                      <td className="text-end font-monospace">{formatMoney(totalDeposit)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Deposit Transactions Table */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0 text-dark">
                  <i className="fa-solid fa-list-check me-1 text-primary"></i> জমার বিস্তারিত বিবরণী
                </h6>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0">
                  <thead className="table bg-primary text-white">
                    <tr>
                      <th className="text-white text-center" style={{ width: '50px' }}>
                        ক্র নং
                      </th>
                      <th className="text-white">ভাউচার নং</th>
                      <th className="text-white">তারিখ</th>
                      <th className="text-white">জমার খাত</th>
                      <th className="text-white">বিবরণ / দাতার নাম</th>
                      <th className="text-white">হিসাব মাধ্যম</th>
                      <th className="text-white text-center">বই/রশিদ নং</th>
                      <th className="text-white text-end">টাকা (৳)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedDepositList.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-4">
                          এই সময়কালে কোনো জমা ভাউচার নেই
                        </td>
                      </tr>
                    ) : (
                      detailedDepositList.map((item, idx) => (
                        <tr key={item.id || idx}>
                          <td className="text-center">{idx + 1}</td>
                          <td className="fw-semibold text-primary">{item.voucherNo}</td>
                          <td>{formatDateDDMMYYYY(item.date)}</td>
                          <td>{item.category}</td>
                          <td>{item.donorOrStudent}</td>
                          <td>{item.account}</td>
                          <td className="text-center">
                            {item.bookNo !== '-' || item.receiptNo !== '-'
                              ? `${item.bookNo}/${item.receiptNo}`
                              : '-'}
                          </td>
                          <td className="text-end font-monospace fw-semibold">
                            {formatMoney(item.amount)}
                          </td>
                        </tr>
                      ))
                    )}
                    <tr className="table-success fw-bold">
                      <td colSpan="7" className="text-end">
                        মোট জমাঃ
                      </td>
                      <td className="text-end font-monospace">{formatMoney(totalDeposit)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total In Words Summary Box */}
            <div className="row mt-4">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center">সর্বমোট জমা</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fw-bold">
                      <td className="text-center py-3">
                        <span className="fs-5">{formatMoney(totalDeposit)} ৳</span>
                        <p className="mb-0 text-muted mt-1 fw-normal">
                          ({numberToBengaliWords(totalDeposit)} টাকা মাত্র)
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official Signatures Section */}
            <div className="row mt-5 pt-3">
              <div className="col-6">
                <div className="text-center">
                  <p
                    className="d-inline-block px-4 pt-2"
                    style={{ borderTop: '1px dashed #000' }}
                  >
                    মুহতামিম সাহেবের স্বাক্ষর
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center">
                  <p
                    className="d-inline-block px-4 pt-2"
                    style={{ borderTop: '1px dashed #000' }}
                  >
                    হিসাব রক্ষকের স্বাক্ষর
                  </p>
                </div>
              </div>
            </div>

            {/* Print Button (no-print) */}
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
    </div>
  );
};
