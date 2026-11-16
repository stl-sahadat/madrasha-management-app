'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY } from '../../utils/bengaliWords';

export const YearlyReport = () => {
  const { profile, transactions } = useApp();

  const currentYear = new Date().getFullYear().toString();
  const years = [
    '2026',
    '2025',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016'
  ];

  // Parse initial query params from URL if present
  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const yr = params.get('year') || currentYear;
      const sDate = params.get('start_date') || '';
      const eDate = params.get('end_date') || '';
      const hasSearched = Boolean(sDate && eDate);
      return { year: yr, startDate: sDate, endDate: eDate, hasSearched };
    }
    return { year: currentYear, startDate: '', endDate: '', hasSearched: false };
  };

  const initial = getInitialParams();
  const [selectedYear, setSelectedYear] = useState(initial.year);
  const [startDate, setStartDate] = useState(initial.startDate);
  const [endDate, setEndDate] = useState(initial.endDate);
  const [appliedFilter, setAppliedFilter] = useState(initial);

  useEffect(() => {
    const handlePopState = () => {
      const p = getInitialParams();
      setSelectedYear(p.year);
      setStartDate(p.startDate);
      setEndDate(p.endDate);
      setAppliedFilter(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleYearChange = (e) => {
    const yr = e.target.value;
    setSelectedYear(yr);
    if (yr) {
      setStartDate(`${yr}-01-01`);
      setEndDate(`${yr}-12-31`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('শুরুর ও শেষের তারিখ নির্বাচন করুন');
      return;
    }

    const startD = new Date(startDate);
    const endD = new Date(endDate);
    if (endD < startD) {
      alert('শেষের তারিখ শুরুর তারিখের পরে হতে হবে');
      return;
    }

    const filterObj = {
      year: selectedYear,
      startDate,
      endDate,
      hasSearched: true
    };
    setAppliedFilter(filterObj);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.pathname = '/admin/report/yearly/deposit-expense';
      if (selectedYear) url.searchParams.set('year', selectedYear);
      else url.searchParams.delete('year');
      url.searchParams.set('start_date', startDate);
      url.searchParams.set('end_date', endDate);
      window.history.pushState(null, '', url.toString());
    }
  };

  // Filter transactions
  const filteredTx = (transactions || []).filter((t) => {
    if (!t.date || !appliedFilter.hasSearched) return false;
    const tDate = String(t.date).split('T')[0];
    if (appliedFilter.startDate && tDate < appliedFilter.startDate) return false;
    if (appliedFilter.endDate && tDate > appliedFilter.endDate) return false;
    return true;
  });

  const depositMap = {};
  const expenseMap = {};

  filteredTx.forEach((t) => {
    const isDeposit = t.type === 'deposit' || t.type === 'income';
    const isExpense = t.type === 'expense';

    if (isDeposit) {
      if (Array.isArray(t.items) && t.items.length > 0) {
        t.items.forEach((item) => {
          const cat = item.category || 'সাধারণ জমা';
          const amt = Number(item.amount) || 0;
          depositMap[cat] = (depositMap[cat] || 0) + amt;
        });
      } else {
        const cat = t.category || 'সাধারণ জমা';
        const amt = Number(t.totalAmount ?? t.amount) || 0;
        depositMap[cat] = (depositMap[cat] || 0) + amt;
      }
    } else if (isExpense) {
      if (Array.isArray(t.items) && t.items.length > 0) {
        t.items.forEach((item) => {
          const cat = item.category || 'সাধারণ খরচ';
          const amt = Number(item.amount) || 0;
          expenseMap[cat] = (expenseMap[cat] || 0) + amt;
        });
      } else {
        const cat = t.category || 'সাধারণ খরচ';
        const amt = Number(t.totalAmount ?? t.amount) || 0;
        expenseMap[cat] = (expenseMap[cat] || 0) + amt;
      }
    }
  });

  // Sort descending by amount matching live site
  const depositList = Object.entries(depositMap)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const expenseList = Object.entries(expenseMap)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const totalDeposit = depositList.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalDeposit - totalExpense;

  const bannerUrl =
    profile?.banner || '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';

  const displayYear =
    appliedFilter.year ||
    (appliedFilter.startDate ? appliedFilter.startDate.slice(0, 4) : currentYear);

  return (
    <div className="w-100">
      {/* Filter Card (hidden in print) */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-calendar-check me-2"></i> বার্ষিক জমা ও খরচের প্রতিবেদন
          </h5>
        </div>

        <div className="card-body mb-3">
          <form method="GET" id="yearlyReportForm" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              {/* Year Selector */}
              <div className="col-md-3 mb-3">
                <label htmlFor="year_select" className="form-label fw-bold">
                  বছর
                </label>
                <select
                  name="year"
                  id="year_select"
                  className="form-select"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  <option value="">বছর নির্বাচন করুন</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div className="col-md-3 mb-3">
                <label htmlFor="start_date" className="form-label fw-bold">
                  শুরুর তারিখ
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="form-control custom-datepicker"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="yyyy-mm-dd"
                  required
                />
              </div>

              {/* End Date */}
              <div className="col-md-3 mb-3">
                <label htmlFor="end_date" className="form-label fw-bold">
                  শেষের তারিখ
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="form-control custom-datepicker"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="yyyy-mm-dd"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-md-3 mb-3">
                <button type="submit" className="btn btn-success fw-bold w-100">
                  <i className="fas fa-search me-1"></i> রিপোর্ট দেখান
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Report Content or Initial Empty State Card */}
      {!appliedFilter.hasSearched ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <i className="fa-solid fa-calendar-days fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">তারিখ নির্বাচন করে রিপোর্ট দেখান</h5>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-body py-4">
            <img src={bannerUrl} alt="Banner" className="w-100 img-fluid" />
            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="mt-2 fw-semibold" style={{ color: '#2c5f2d' }}>
                  বার্ষিক জমা ও খরচের বিবরণী
                </h5>
                <h6 className="mb-0 text-muted">
                  {formatDateDDMMYYYY(appliedFilter.startDate)} থেকে{' '}
                  {formatDateDDMMYYYY(appliedFilter.endDate)}
                </h6>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">বছরঃ {displayYear} ইং</p>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              {/* Income Section */}
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="text-white">আয়ের খাত</th>
                        <th className="text-end text-white">টাকা</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depositList.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="text-center text-muted">
                            এই সময়কালে কোন জমা হয়নি
                          </td>
                        </tr>
                      ) : (
                        depositList.map((item) => (
                          <tr key={item.category}>
                            <td>{item.category}</td>
                            <td className="text-end">{formatMoney(item.amount)}</td>
                          </tr>
                        ))
                      )}

                      {/* Total Income Row */}
                      <tr className="table-success fw-bold">
                        <td>মোট জমাঃ</td>
                        <td className="text-end">{formatMoney(totalDeposit)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expense Section */}
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="text-white">ব্যয়ের খাত</th>
                        <th className="text-end text-white">টাকা</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseList.length === 0 ? (
                        <tr>
                          <td colSpan="2" className="text-center text-muted">
                            এই সময়কালে কোন খরচ হয়নি
                          </td>
                        </tr>
                      ) : (
                        expenseList.map((item) => (
                          <tr key={item.category}>
                            <td>{item.category}</td>
                            <td className="text-end">{formatMoney(item.amount)}</td>
                          </tr>
                        ))
                      )}

                      {/* Total Expense Row */}
                      <tr className="table-danger fw-bold">
                        <td>মোট খরচঃ</td>
                        <td className="text-end">{formatMoney(totalExpense)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Table */}
            <div className="row mt-4">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th className="text-center">মোট জমা</th>
                      <th className="text-center">মোট খরচ</th>
                      <th className="text-center">অবশিষ্ট তহবিল</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fw-bold">
                      <td className="text-center">
                        {formatMoney(totalDeposit)}
                        <p>({numberToBengaliWords(totalDeposit)} টাকা মাত্র)</p>
                      </td>
                      <td className="text-center">
                        {formatMoney(totalExpense)}
                        <p>({numberToBengaliWords(totalExpense)} টাকা মাত্র)</p>
                      </td>
                      <td className="text-center">
                        {formatMoney(remaining)}
                        <p>({numberToBengaliWords(remaining)} টাকা মাত্র)</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signature Section */}
            <div className="row mt-5">
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
    </div>
  );
};

export default YearlyReport;
