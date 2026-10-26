import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CashLedger = ({ initialFilter = 'all' }) => {
  const {
    transactions,
    accounts,
    setActiveTab,
    setSelectedReceiptForPrint,
    deleteTransaction
  } = useApp();

  const [filterType, setFilterType] = useState(initialFilter); // all, deposit, expense
  const [filterAccount, setFilterAccount] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter transactions
  const filtered = transactions.filter(tx => {
    const matchType = filterType === 'all' || tx.type === filterType;
    const matchAccount = filterAccount === 'all' || tx.account?.includes(filterAccount);
    const matchSearch =
      (tx.voucherNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.donorOrStudent || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.category || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchType && matchAccount && matchSearch;
  });

  const totalDeposits = filtered
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const totalExpenses = filtered
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const netBalance = totalDeposits - totalExpenses;

  return (
    <div className="container-fluid p-0">
      {/* ---------------- 1. DEPOSIT LIST (/admin/cash/deposit/list) ---------------- */}
      {initialFilter === 'deposit' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0 text-white">
              <i className="fas fa-list-alt me-2"></i>জমার লিস্ট
            </h4>
            <button
              onClick={() => setActiveTab('voucher-deposit')}
              className="btn btn-success btn-sm fw-bold"
            >
              <i className="fas fa-plus me-1"></i> নতুন জমা
            </button>
          </div>

          <div className="table-responsive card-body">
            <table className="table table-striped table-hover align-middle" id="deposits-datatable">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>নং</th>
                  <th>ভাউচার নং</th>
                  <th>তারিখ</th>
                  <th>জমার খাত</th>
                  <th>বই নং</th>
                  <th>রশিদ নং</th>
                  <th>একাউন্ট</th>
                  <th>পেমেন্ট মেথড</th>
                  <th className="text-end">টাকা</th>
                  <th className="text-center">স্লিপ</th>
                  <th className="text-center" style={{ width: '100px' }}>ক্রিয়া</th>
                </tr>
              </thead>
              <tbody>
                {filtered.filter(t => t.type === 'deposit').length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center text-muted py-4">
                      কোন জমার ভাউচার পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filtered.filter(t => t.type === 'deposit').map((tx, idx) => (
                    <tr key={tx.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="font-monospace fw-bold text-primary">{tx.voucherNo}</td>
                      <td>{tx.date}</td>
                      <td className="fw-semibold">{tx.category || (tx.items?.[0]?.category) || 'সাধারণ জমা'}</td>
                      <td className="text-center font-monospace">{tx.bookNo || tx.book_no || '01'}</td>
                      <td className="text-center font-monospace">{tx.receiptNo || tx.receipt_no || (100 + idx)}</td>
                      <td>
                        <span className="badge bg-light text-dark border">{tx.account}</span>
                      </td>
                      <td>{tx.paymentMethod || 'cash'}</td>
                      <td className="text-end font-monospace fw-bold text-success">
                        ৳ {parseFloat(tx.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => setSelectedReceiptForPrint(tx)}
                          className="btn btn-sm btn-info text-white"
                        >
                          <i className="fa-solid fa-print"></i> স্লিপ
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি নিশ্চিতভাবে এই ভাউচারটি মুছে ফেলতে চান?')) {
                              if (deleteTransaction) deleteTransaction(tx.id);
                            }
                          }}
                          className="btn btn-sm btn-danger"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- 2. EXPENSE LIST (/admin/cash/expense/list) ---------------- */}
      {initialFilter === 'expense' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0 text-white">
              <i className="fas fa-list-alt me-2"></i>ব্যয় লিস্ট
            </h4>
            <button
              onClick={() => setActiveTab('voucher-expense')}
              className="btn btn-success btn-sm fw-bold"
            >
              <i className="fas fa-plus me-1"></i> নতুন ব্যয়
            </button>
          </div>

          <div className="table-responsive card-body">
            <table className="table table-striped table-hover align-middle" id="expenses-datatable">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>নং</th>
                  <th>ভাউচার নং</th>
                  <th>তারিখ</th>
                  <th>খরচের খাত</th>
                  <th>খরচের উৎস</th>
                  <th>বিবরণ</th>
                  <th>একাউন্ট</th>
                  <th>পেমেন্ট মেথড</th>
                  <th className="text-center">পরিমান</th>
                  <th className="text-end">টাকা</th>
                  <th className="text-center">স্লিপ</th>
                  <th className="text-center" style={{ width: '100px' }}>ক্রিয়া</th>
                </tr>
              </thead>
              <tbody>
                {filtered.filter(t => t.type === 'expense').length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center text-muted py-4">
                      কোন খরচের ভাউচার পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filtered.filter(t => t.type === 'expense').map((tx, idx) => (
                    <tr key={tx.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="font-monospace fw-bold text-danger">{tx.voucherNo}</td>
                      <td>{tx.date}</td>
                      <td className="fw-semibold">{tx.category || (tx.items?.[0]?.category) || 'সাধারণ খরচ'}</td>
                      <td>{tx.donorOrStudent || 'মাদ্রাসা সাধারণ তহবিল'}</td>
                      <td>{tx.note || (tx.items?.[0]?.description) || '-'}</td>
                      <td>
                        <span className="badge bg-light text-dark border">{tx.account}</span>
                      </td>
                      <td>{tx.paymentMethod || 'cash'}</td>
                      <td className="text-center">১</td>
                      <td className="text-end font-monospace fw-bold text-danger">
                        ৳ {parseFloat(tx.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => setSelectedReceiptForPrint(tx)}
                          className="btn btn-sm btn-info text-white"
                        >
                          <i className="fa-solid fa-print"></i> স্লিপ
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি নিশ্চিতভাবে এই খরচটি মুছে ফেলতে চান?')) {
                              if (deleteTransaction) deleteTransaction(tx.id);
                            }
                          }}
                          className="btn btn-sm btn-danger"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- 3. CASH LEDGER (ALL TRANSACTIONS) ---------------- */}
      {initialFilter === 'all' && (
        <div>
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-primary text-white d-flex flex-wrap justify-content-between align-items-center py-3">
              <h4 className="mb-0 text-white font-bold">
                <i className="fas fa-book me-2"></i>দৈনিক ক্যাশ লেজার ও ভাউচার রেজিস্টার
              </h4>
              <div className="d-flex gap-2">
                <button
                  onClick={() => setActiveTab('voucher-deposit')}
                  className="btn btn-success btn-sm fw-bold"
                >
                  <i className="fas fa-plus me-1"></i> + জমা ভাউচার
                </button>
                <button
                  onClick={() => setActiveTab('voucher-expense')}
                  className="btn btn-danger btn-sm fw-bold"
                >
                  <i className="fas fa-minus me-1"></i> + খরচ ভাউচার
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn btn-info btn-sm text-white fw-bold"
                >
                  <i className="fa-solid fa-print me-1"></i> লেজার প্রিন্ট
                </button>
              </div>
            </div>

            <div className="card-body">
              {/* Summary Cards */}
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded border-start border-4 border-success">
                    <span className="small text-muted fw-bold">মোট জমা (ফিল্টারকৃত)</span>
                    <h3 className="mb-0 text-success fw-bold font-monospace mt-1">
                      ৳ {totalDeposits.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded border-start border-4 border-danger">
                    <span className="small text-muted fw-bold">মোট ব্যয় (ফিল্টারকৃত)</span>
                    <h3 className="mb-0 text-danger fw-bold font-monospace mt-1">
                      ৳ {totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded border-start border-4 border-primary">
                    <span className="small text-muted fw-bold">বর্তমান উদ্বৃত্ত (ব্যালেন্স)</span>
                    <h3 className="mb-0 text-primary fw-bold font-monospace mt-1">
                      ৳ {netBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="row g-3 mb-3 align-items-end">
                <div className="col-md-4">
                  <label className="form-label fw-bold">লেনদেনের ধরণ</label>
                  <select
                    className="form-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">সকল লেনদেন (জমা ও খরচ)</option>
                    <option value="deposit">শুধুমাত্র জমা (Income)</option>
                    <option value="expense">শুধুমাত্র খরচ (Expense)</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">একাউন্ট</label>
                  <select
                    className="form-select"
                    value={filterAccount}
                    onChange={(e) => setFilterAccount(e.target.value)}
                  >
                    <option value="all">সকল একাউন্ট</option>
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.name}>{acc.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-bold">খোঁজ করুন</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ভাউচার নং বা খাত..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Transactions Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white text-center">
                    <tr>
                      <th style={{ width: '50px' }}>নং</th>
                      <th>ভাউচার নং</th>
                      <th>তারিখ</th>
                      <th>খাত ও বিবরণ</th>
                      <th>একাউন্ট</th>
                      <th>মেথড</th>
                      <th className="text-end">জমা (৳)</th>
                      <th className="text-end">খরচ (৳)</th>
                      <th className="text-center no-print">স্লিপ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tx, idx) => (
                      <tr key={tx.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-monospace fw-bold text-center">
                          <span className={tx.type === 'deposit' ? 'text-success' : 'text-danger'}>
                            {tx.voucherNo}
                          </span>
                        </td>
                        <td className="text-center">{tx.date}</td>
                        <td>
                          <span className="fw-bold">{tx.category || (tx.items?.[0]?.category) || 'সাধারণ'}</span>
                          <span className="text-muted small d-block">{tx.donorOrStudent ? `উৎস/গ্রহীতা: ${tx.donorOrStudent}` : ''}</span>
                        </td>
                        <td>{tx.account}</td>
                        <td className="text-center">{tx.paymentMethod || 'cash'}</td>
                        <td className="text-end font-monospace text-success fw-bold">
                          {tx.type === 'deposit' ? `৳ ${parseFloat(tx.totalAmount || 0).toLocaleString('en-IN')}` : '-'}
                        </td>
                        <td className="text-end font-monospace text-danger fw-bold">
                          {tx.type === 'expense' ? `৳ ${parseFloat(tx.totalAmount || 0).toLocaleString('en-IN')}` : '-'}
                        </td>
                        <td className="text-center no-print">
                          <button
                            onClick={() => setSelectedReceiptForPrint(tx)}
                            className="btn btn-sm btn-info text-white"
                          >
                            <i className="fa-solid fa-print"></i>
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
      )}
    </div>
  );
};
