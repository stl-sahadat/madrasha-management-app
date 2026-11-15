'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  numberToBengaliWords,
  formatMoney,
  formatDateDDMMYYYY,
  toStandardDateStr
} from '../../utils/bengaliWords';

export const ExpenseAccountReport = () => {
  const { profile, transactions, expenseCategories, activeTab } = useApp();

  const currentYear = new Date().getFullYear().toString();

  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catId = params.get('category_id') || '';
      const yr = params.get('year') || currentYear;
      return {
        categoryId: catId,
        year: yr,
        hasSearched: Boolean(catId)
      };
    }
    return {
      categoryId: '',
      year: currentYear,
      hasSearched: false
    };
  };

  const initial = getInitialParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(initial.categoryId);
  const [selectedYear, setSelectedYear] = useState(initial.year);
  const [appliedFilter, setAppliedFilter] = useState(initial);

  useEffect(() => {
    const handlePopState = () => {
      const p = getInitialParams();
      setSelectedCategoryId(p.categoryId);
      setSelectedYear(p.year);
      setAppliedFilter(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const p = getInitialParams();
    setSelectedCategoryId(p.categoryId);
    setSelectedYear(p.year);
    setAppliedFilter(p);
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert('অনুগ্রহ করে খাত নির্বাচন করুন');
      return;
    }
    const filterObj = {
      categoryId: selectedCategoryId,
      year: selectedYear,
      hasSearched: true
    };
    setAppliedFilter(filterObj);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('category_id', selectedCategoryId);
      url.searchParams.set('year', selectedYear);
      window.history.pushState({}, '', url.toString());
    }
  };

  const currentCategory = expenseCategories.find(
    (c) => String(c.id) === String(appliedFilter.categoryId) || c.name === appliedFilter.categoryId
  );
  const selectedCatName = currentCategory ? currentCategory.name : appliedFilter.categoryId;

  // Filter expense transactions matching this category and year
  const expenseList = transactions.filter((t) => {
    if (!appliedFilter.hasSearched || t.type !== 'expense') return false;
    const stdDate = toStandardDateStr(t.date);
    if (!stdDate.startsWith(appliedFilter.year)) return false;

    if (Array.isArray(t.items) && t.items.length > 0) {
      return t.items.some((i) => i.category === selectedCatName);
    }
    return t.category === selectedCatName;
  });

  const totalExpense = expenseList.reduce((s, v) => s + (parseFloat(v.totalAmount) || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid py-2">
      {/* Search Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-file-invoice me-2"></i> খরচের খাতের রিপোর্ট
          </h5>
        </div>
        <div className="card-body mb-3">
          <form onSubmit={handleSubmit} id="categoryForm">
            <div className="row align-items-end">
              <div className="col-md-4 mb-3">
                <label htmlFor="category_select" className="form-label fw-bold">
                  খাত
                </label>
                <select
                  name="category_id"
                  id="category_select"
                  className="form-select"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  required
                >
                  <option value="">খাত নির্বাচন করুন</option>
                  {expenseCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="year_select" className="form-label fw-bold">
                  বছর
                </label>
                <select
                  name="year"
                  id="year_select"
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  required
                >
                  <option value="">বছর নির্বাচন করুন</option>
                  {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">&nbsp;</label>
                <button type="submit" className="btn btn-success fw-bold w-100">
                  <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখান
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
                  খরচের খাতের রিপোর্ট
                </h5>
                <h5 className="mb-0 text-muted">খাতঃ {selectedCatName}</h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">সন {appliedFilter.year} ইং</p>
              </div>
            </div>
          </div>

          {/* Table: খরচের বিবরণ */}
          <div className="table-responsive card-body pt-0">
            <table className="table table-bordered table-striped align-middle mb-0 print-table text-center">
              <thead className="bg-primary text-white print-thead">
                <tr className="text-center">
                  <th style={{ width: '60px' }}>নং</th>
                  <th style={{ width: '130px' }}>ভাউচার নং</th>
                  <th style={{ width: '120px' }}>তারিখ</th>
                  <th>বিবরণ</th>
                  <th style={{ width: '150px' }}>টাকা</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-3 text-muted">
                      এই খাতে কোন খরচ পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  expenseList.map((v, idx) => (
                    <tr key={v.id || idx}>
                      <td>{idx + 1}</td>
                      <td className="fw-semibold">{v.voucherNo || `EV-${idx + 1}`}</td>
                      <td>{formatDateDDMMYYYY(v.date)}</td>
                      <td>{v.note || v.donorOrStudent || '-'}</td>
                      <td className="text-end fw-bold text-danger">{formatMoney(v.totalAmount)} ৳</td>
                    </tr>
                  ))
                )}
              </tbody>
              {expenseList.length > 0 && (
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan="4" className="text-end">সর্বমোট:</td>
                    <td className="text-end text-danger">{formatMoney(totalExpense)} ৳</td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="text-start ps-3 fw-semibold text-muted">
                      কথায়: <span className="text-dark fw-bold">({numberToBengaliWords(totalExpense)} টাকা মাত্র)</span>
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
