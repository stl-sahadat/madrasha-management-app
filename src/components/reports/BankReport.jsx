'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { numberToBengaliWords, formatMoney, formatDateDDMMYYYY } from '../../utils/bengaliWords';

export const BankReport = () => {
  const { profile, accounts, transactions } = useApp();

  const currentYear = new Date().getFullYear().toString();
  const defaultStartDate = `${currentYear}-01-01`;
  const defaultEndDate = `${currentYear}-12-31`;

  // Find first bank account or first account
  const defaultAccount =
    (accounts || []).find((a) => a.isBank) || (accounts || [])[0] || null;

  const [selectedAccountId, setSelectedAccountId] = useState(defaultAccount ? defaultAccount.id : '');
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [appliedFilter, setAppliedFilter] = useState({
    accountId: defaultAccount ? defaultAccount.id : '',
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    hasSubmitted: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppliedFilter({
      accountId: selectedAccountId,
      startDate,
      endDate,
      hasSubmitted: Boolean(selectedAccountId)
    });
  };

  const selectedAccount = (accounts || []).find(
    (a) => String(a.id) === String(appliedFilter.accountId)
  );

  // Filter and sort transactions for selected account
  const accountTransactions = (transactions || [])
    .filter((tx) => {
      if (!appliedFilter.hasSubmitted || !selectedAccount) return false;
      if (!tx.date) return false;

      const txDate = String(tx.date).split('T')[0];
      if (appliedFilter.startDate && txDate < appliedFilter.startDate) return false;
      if (appliedFilter.endDate && txDate > appliedFilter.endDate) return false;

      // Check account match
      const accName = selectedAccount.name ? selectedAccount.name.toLowerCase() : '';
      const accId = String(selectedAccount.id).toLowerCase();
      const txAcc = String(tx.account || tx.accountId || '').toLowerCase();

      const isMatch =
        txAcc === accName ||
        txAcc === accId ||
        (accName && txAcc && (accName.includes(txAcc) || txAcc.includes(accName)));

      return isMatch;
    })
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  // Compute total deposits and expenses for this account
  const totalDeposit = accountTransactions
    .filter((tx) => tx.type === 'deposit')
    .reduce((sum, tx) => sum + (Number(tx.totalAmount ?? tx.amount) || 0), 0);

  const totalExpense = accountTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + (Number(tx.totalAmount ?? tx.amount) || 0), 0);

  const balance = totalDeposit - totalExpense;

  const bannerUrl =
    profile?.banner || '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg';

  return (
    <div className="container-fluid">
      {/* Filter Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-building-columns me-2"></i> ব্যাংক হিসাব প্রতিবেদন
          </h5>
        </div>

        <div className="card-body mb-3">
          <form method="GET" id="bankReportForm" className="w-100" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              {/* ব্যাংক অ্যাকাউন্ট */}
              <div className="col-12 col-md-3">
                <label htmlFor="bank_account_id" className="form-label fw-bold">
                  ব্যাংক অ্যাকাউন্ট
                </label>
                <select
                  name="bank_account_id"
                  id="bank_account_id"
                  className="form-select"
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  required
                >
                  <option value="">নির্বাচন করুন</option>
                  {(accounts || []).map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* শুরুর তারিখ */}
              <div className="col-12 col-md-3">
                <label htmlFor="start_date" className="form-label fw-bold">
                  শুরুর তারিখ
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  className="form-control custom-datepicker"
                  placeholder="yyyy-mm-dd"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              {/* শেষের তারিখ */}
              <div className="col-12 col-md-3">
                <label htmlFor="end_date" className="form-label fw-bold">
                  শেষের তারিখ
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  className="form-control custom-datepicker"
                  placeholder="yyyy-mm-dd"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-success px-4 w-100">
                  <i className="fas fa-search me-1"></i> দেখান
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Report Content when account is selected */}
      {appliedFilter.hasSubmitted && selectedAccount ? (
        <div className="card border-0 shadow-sm mb-4" id="printContent">
          <div className="card-body py-4">
            <img src={bannerUrl} alt="Banner" className="w-100 img-fluid" />
            <div className="row mt-3">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <h5 className="mt-2 fw-semibold" style={{ color: '#2c5f2d' }}>
                  ব্যাংক হিসাব প্রতিবেদন
                </h5>
                <p className="mb-0">
                  তারিখঃ {formatDateDDMMYYYY(appliedFilter.startDate)} থেকে{' '}
                  {formatDateDDMMYYYY(appliedFilter.endDate)}
                </p>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0 fw-semibold">{selectedAccount.name}</p>
                {selectedAccount.accountNumber || selectedAccount.number ? (
                  <p className="mb-0 small">
                    A/C: {selectedAccount.accountNumber || selectedAccount.number}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="card-body">
            {/* Transaction Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-center text-white" style={{ width: '8%' }}>
                      নং
                    </th>
                    <th className="text-center text-white" style={{ width: '10%' }}>
                      ভাউচার নং
                    </th>
                    <th className="text-center text-white" style={{ width: '10%' }}>
                      তারিখ
                    </th>
                    <th className="text-center text-white" style={{ width: '10%' }}>
                      ধরন
                    </th>
                    <th className="text-white" style={{ width: '15%' }}>
                      খাত
                    </th>
                    <th className="text-center text-white" style={{ width: '12%' }}>
                      পেমেন্ট মেথড
                    </th>
                    <th className="text-end text-white" style={{ width: '13%' }}>
                      টাকা
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accountTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        কোন লেনদেন পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    accountTransactions.map((tx, idx) => {
                      const amount = Number(tx.totalAmount ?? tx.amount) || 0;
                      const category =
                        (tx.items && tx.items[0]?.category) ||
                        tx.category ||
                        (tx.type === 'deposit' ? 'সাধারণ জমা' : 'সাধারণ খরচ');
                      return (
                        <tr key={tx.id || idx}>
                          <td className="text-center">{idx + 1}</td>
                          <td className="text-center">{tx.voucherNo || `V${idx + 1}`}</td>
                          <td className="text-center">{formatDateDDMMYYYY(tx.date)}</td>
                          <td className="text-center">
                            {tx.type === 'deposit' ? (
                              <span className="badge bg-success">জমা</span>
                            ) : (
                              <span className="badge bg-danger">খরচ</span>
                            )}
                          </td>
                          <td>{category}</td>
                          <td className="text-center">{tx.paymentMethod || 'cash'}</td>
                          <td className="text-end">{formatMoney(amount)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot className="table-light">
                  <tr className="fw-bold">
                    <td colSpan="5" className="text-end">
                      মোট জমাঃ
                    </td>
                    <td colSpan="2" className="text-end">
                      {formatMoney(totalDeposit)} ({numberToBengaliWords(totalDeposit)} টাকা মাত্র)
                    </td>
                  </tr>
                  <tr className="fw-bold">
                    <td colSpan="5" className="text-end">
                      মোট খরচঃ
                    </td>
                    <td colSpan="2" className="text-end">
                      {formatMoney(totalExpense)} ({numberToBengaliWords(totalExpense)} টাকা মাত্র)
                    </td>
                  </tr>
                  <tr className="fw-bold table-info">
                    <td colSpan="5" className="text-end">
                      ব্যালেন্স ( ব্যালেন্স ট্রান্সফার বাদে ):
                    </td>
                    <td colSpan="2" className="text-end">
                      {formatMoney(balance)} ({numberToBengaliWords(balance)} টাকা মাত্র)
                    </td>
                  </tr>
                  <tr className="fw-bold table-info">
                    <td colSpan="5" className="text-end">
                      ব্যালেন্স :
                    </td>
                    <td colSpan="2" className="text-end">
                      {formatMoney(balance)} ({numberToBengaliWords(balance)} টাকা মাত্র)
                    </td>
                  </tr>
                </tfoot>
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
        </div>
      ) : null}
    </div>
  );
};

export default BankReport;
