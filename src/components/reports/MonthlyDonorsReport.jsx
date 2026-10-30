'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  numberToBengaliWords,
  formatMoney,
  formatDateDDMMYYYY,
  toStandardDateStr
} from '../../utils/bengaliWords';

export const MonthlyDonorsReport = () => {
  const { profile, transactions, committee, activeTab } = useApp();

  const currentYear = new Date().getFullYear().toString();

  const getInitialParams = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cId = params.get('contributor_id') || '';
      const yr = params.get('year') || currentYear;
      return {
        contributorId: cId,
        year: yr,
        hasSearched: Boolean(cId)
      };
    }
    return {
      contributorId: '',
      year: currentYear,
      hasSearched: false
    };
  };

  const initial = getInitialParams();
  const [selectedContributorId, setSelectedContributorId] = useState(initial.contributorId);
  const [selectedYear, setSelectedYear] = useState(initial.year);
  const [appliedFilter, setAppliedFilter] = useState(initial);

  useEffect(() => {
    const handlePopState = () => {
      const p = getInitialParams();
      setSelectedContributorId(p.contributorId);
      setSelectedYear(p.year);
      setAppliedFilter(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const p = getInitialParams();
    setSelectedContributorId(p.contributorId);
    setSelectedYear(p.year);
    setAppliedFilter(p);
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedContributorId) {
      alert('অনুগ্রহ করে চাঁদাদাতা নির্বাচন করুন');
      return;
    }
    const filterObj = {
      contributorId: selectedContributorId,
      year: selectedYear,
      hasSearched: true
    };
    setAppliedFilter(filterObj);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('contributor_id', selectedContributorId);
      url.searchParams.set('year', selectedYear);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Find contributor details from transactions or committee
  const donorNameList = [
    { id: '1', name: 'BANDA MOHAMMAD OMOR FARUK', phone: '01749548881', address: 'Boro Vogobenpur, Chatra Kachari' },
    { id: '2', name: 'মাওলানা আব্দুল হক', phone: '01812345678', address: 'জব্বর নগর' },
    { id: '3', name: 'হাজী মোঃ লোকমান হোসেন', phone: '01711223344', address: 'মাইজদী, নোয়াখালী' },
    ...committee.map((c, i) => ({
      id: `comm_${c.id || i + 4}`,
      name: c.name,
      phone: c.phone || '০১৭০০০০০০০০',
      address: c.designation || 'কমিটি সদস্য'
    }))
  ];

  const currentDonor =
    donorNameList.find((d) => String(d.id) === String(appliedFilter.contributorId) || d.name === appliedFilter.contributorId) ||
    donorNameList[0];

  const monthsBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  // Find payments by this donor in the year
  const donorPayments = transactions.filter((t) => {
    if (!appliedFilter.hasSearched || t.type !== 'deposit') return false;
    const stdDate = toStandardDateStr(t.date);
    if (!stdDate.startsWith(appliedFilter.year)) return false;
    return (
      t.donorOrStudent === currentDonor.name ||
      t.note?.includes(currentDonor.name) ||
      t.category === 'মাসিক চাঁদা'
    );
  });

  // Map payments to 12 months
  const monthlyRows = monthsBn.map((mName, mIdx) => {
    const payment = donorPayments.find((p) => {
      const d = new Date(toStandardDateStr(p.date));
      return d.getMonth() === mIdx;
    });
    return {
      month: mName,
      date: payment ? formatDateDDMMYYYY(payment.date) : '-',
      bookNo: payment?.bookNo || '-',
      receiptNo: payment?.receiptNo || '-',
      amount: payment ? parseFloat(payment.totalAmount) || 0 : 0,
      note: payment?.note || '-'
    };
  });

  const totalPaid = monthlyRows.reduce((s, r) => s + r.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container-fluid py-2">
      {/* Search Filter Card */}
      <div className="card shadow-sm mb-4 no-print">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i> মাসিক চাদাদাতার রিপোর্ট
          </h5>
        </div>
        <div className="card-body mb-3">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-5">
                <label htmlFor="contributor_id" className="form-label fw-bold">
                  চাঁদাদাতার নাম
                </label>
                <select
                  name="contributor_id"
                  id="contributor_id"
                  className="form-select"
                  value={selectedContributorId}
                  onChange={(e) => setSelectedContributorId(e.target.value)}
                  required
                >
                  <option value="">চাঁদাদাতা নির্বাচন করুন</option>
                  {donorNameList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="year" className="form-label fw-bold">
                  বছর
                </label>
                <select
                  name="year"
                  id="year"
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  required
                >
                  <option value="">বছর নির্বাচন করুন</option>
                  {['2026', '2025', '2024', '2023', '2022'].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <button type="submit" className="btn btn-success fw-bold px-4 w-100">
                  <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখুন
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
                <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                  মাসিক চাদাদাতার রিপোর্ট
                </h5>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">সন {appliedFilter.year} ইং</p>
              </div>
            </div>
          </div>

          <div className="card-body pt-0">
            {/* Contributor Info Section */}
            <div className="row contributor-info-section bg-light p-3 rounded mb-4 border">
              <div className="col-md-12">
                <p className="mb-1">
                  <strong>চাঁদা দাতার নামঃ</strong> {currentDonor.name}
                </p>
                <p className="mb-1">
                  <strong>মোবাইলঃ</strong> {currentDonor.phone}
                </p>
                <p className="mb-0">
                  <strong>ঠিকানাঃ</strong> {currentDonor.address}
                </p>
              </div>
            </div>

            {/* 12 Months Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle mb-0 text-center">
                <thead className="bg-primary text-white">
                  <tr className="text-center">
                    <th style={{ width: '130px' }}>মাস</th>
                    <th style={{ width: '130px' }}>তারিখ</th>
                    <th style={{ width: '100px' }}>বুক নং</th>
                    <th style={{ width: '100px' }}>রশিদ নং</th>
                    <th style={{ width: '150px' }}>টাকার পরিমাণ</th>
                    <th>মন্তব্য</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRows.map((r, idx) => (
                    <tr key={idx}>
                      <td className="fw-semibold">{r.month}</td>
                      <td>{r.date}</td>
                      <td>{r.bookNo}</td>
                      <td>{r.receiptNo}</td>
                      <td className="text-end fw-bold text-success">
                        {r.amount > 0 ? `${formatMoney(r.amount)} ৳` : '-'}
                      </td>
                      <td>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light fw-bold">
                  <tr>
                    <td colSpan="4" className="text-end">সর্বমোট চাঁদাঃ</td>
                    <td className="text-end text-success">{formatMoney(totalPaid)} ৳</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="text-start ps-3 fw-semibold text-muted">
                      কথায়: <span className="text-dark fw-bold">({numberToBengaliWords(totalPaid)} টাকা মাত্র)</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Signatures */}
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
