'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY } from '../../utils/bengaliWords';

export const DailyReport = () => {
  const { profile, transactions } = useApp();

  // Default to today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [appliedDate, setAppliedDate] = useState(today);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppliedDate(selectedDate);
  };

  // Filter transactions for appliedDate
  const dateTx = (transactions || []).filter((t) => {
    if (!t.date) return false;
    const tDate = String(t.date).split('T')[0];
    return tDate === appliedDate;
  });

  const depositMap = {};
  const expenseMap = {};

  dateTx.forEach((t) => {
    if (t.type === 'deposit') {
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
    } else if (t.type === 'expense') {
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

  const depositList = Object.entries(depositMap).map(([category, amount]) => ({ category, amount }));
  const expenseList = Object.entries(expenseMap).map(([category, amount]) => ({ category, amount }));

  const totalDeposit = depositList.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalDeposit - totalExpense;

  const bannerUrl =
    profile?.banner || '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';

  return (
    <div className="container-fluid">
      {/* Filter Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-calendar-days me-2"></i> দৈনিক জমা ও খরচের প্রতিবেদন
          </h5>
        </div>

        <div className="card-body mb-3">
          <form method="GET" id="dailyReportForm" className="w-100" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              {/* তারিখ */}
              <div className="col-12 col-md-5">
                <label htmlFor="report_date" className="form-label fw-bold">
                  তারিখ
                </label>
                <input
                  type="date"
                  name="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  id="report_date"
                  className="form-control"
                  placeholder="তারিখ নির্বাচন করুন"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-success px-5 w-100">
                  <i className="fas fa-search me-1"></i> দেখান
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Report Content */}
      <div className="card border-0 shadow-sm mb-4" id="printContent">
        <div className="card-body py-4">
          <img src={bannerUrl} alt="Banner" className="w-100 img-fluid" />
          <div className="row mt-3">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                দৈনিক জমা ও খরচের বিবরণী
              </h5>
            </div>
            <div className="col-md-2 text-end">
              <p className="mb-0 fw-semibold">তারিখঃ {formatDateDDMMYYYY(appliedDate)} ইং</p>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row">
            {/* Income Section */}
            <div className="col-md-6">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table bg-primary">
                    <tr>
                      <th className="text-white">আয়ের খাত</th>
                      <th className="text-end text-white">টাকা</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositList.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center text-muted">
                          এই তারিখে কোন জমা হয়নি
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
                  <thead className="table bg-primary">
                    <tr>
                      <th className="text-white">ব্যয়ের খাত</th>
                      <th className="text-end text-white">টাকা</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseList.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center text-muted">
                          এই তারিখে কোন খরচ হয়নি
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
                    <th className="text-center">অবশিষ্ট</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="fw-bold">
                    <td className="text-center">
                      {formatMoney(totalDeposit)}
                      <p className="mb-0 text-muted fw-normal">
                        ({numberToBengaliWords(totalDeposit)} টাকা মাত্র)
                      </p>
                    </td>
                    <td className="text-center">
                      {formatMoney(totalExpense)}
                      <p className="mb-0 text-muted fw-normal">
                        ({numberToBengaliWords(totalExpense)} টাকা মাত্র)
                      </p>
                    </td>
                    <td className="text-center">
                      {formatMoney(remaining)}
                      <p className="mb-0 text-muted fw-normal">
                        ({numberToBengaliWords(remaining)} টাকা মাত্র)
                      </p>
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
    </div>
  );
};

export default DailyReport;
