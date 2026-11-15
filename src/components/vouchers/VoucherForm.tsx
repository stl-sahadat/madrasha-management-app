import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const VoucherForm = ({ defaultType = 'deposit' }) => {
  const {
    depositCategories,
    expenseCategories,
    accounts,
    receivers,
    transactions = [],
    depositVouchers,
    expenseVouchers,
    addDepositVoucher,
    addExpenseVoucher,
    setSelectedReceiptForPrint
  } = useApp();

  const [voucherType] = useState(defaultType); // 'deposit' or 'expense'

  // Form states
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [receiptNo, setReceiptNo] = useState(Math.floor(100 + Math.random() * 900).toString());
  const [bookNo, setBookNo] = useState('01');
  const [voucherNo, setVoucherNo] = useState(`V${Math.floor(20 + Math.random() * 80)}`);
  const [category, setCategory] = useState(
    defaultType === 'deposit' ? (depositCategories[0] || 'সাধারণ দান') : (expenseCategories[0] || 'দৈনিক বাজার খরচ')
  );
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const categories = voucherType === 'deposit' ? depositCategories : expenseCategories;
  const safeDepositVouchers = Array.isArray(depositVouchers) ? depositVouchers : (transactions || []).filter(t => t.type === 'deposit');
  const safeExpenseVouchers = Array.isArray(expenseVouchers) ? expenseVouchers : (transactions || []).filter(t => t.type === 'expense');
  const recentList = voucherType === 'deposit' ? safeDepositVouchers.slice(-8).reverse() : safeExpenseVouchers.slice(-8).reverse();

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert('অনুগ্রহ করে সঠিক টাকার পরিমাণ লিখুন');
      return;
    }

    const payload = {
      voucherNo,
      date,
      receiptNo,
      bookNo,
      account,
      paymentMethod,
      donorOrStudent: description || 'সাধারণ',
      receiver: receivers[0]?.name || 'মাহমুদুল করিম',
      items: [
        {
          category,
          description: description || category,
          amount: parsedAmount
        }
      ],
      totalAmount: parsedAmount,
      note: description
    };

    let created;
    if (voucherType === 'deposit') {
      created = addDepositVoucher(payload);
      alert('জমা ভাউচার সফলভাবে সংরক্ষণ করা হয়েছে!');
    } else {
      created = addExpenseVoucher(payload);
      alert('ব্যয় ভাউচার সফলভাবে সংরক্ষণ করা হয়েছে!');
    }

    setAmount('');
    setDescription('');
    setReceiptNo(Math.floor(100 + Math.random() * 900).toString());
    setVoucherNo(`V${Math.floor(20 + Math.random() * 80)}`);

    if (created) {
      setSelectedReceiptForPrint(created);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm mb-4">
        {/* Card Header */}
        <div className="card-header bg-primary">
          <h5 className="mb-0 text-white">
            <i className="fa-solid fa-users me-2"></i>{' '}
            {voucherType === 'deposit' ? 'নতুন জমা যুক্ত করুন' : 'নতুন ব্যয় যুক্ত'}
          </h5>
        </div>

        <div className="row card-body p-4">
          {voucherType === 'deposit' ? (
            /* DEPOSIT LAYOUT: Left 7 cols, Right 5 cols */
            <>
              {/* Left Column - নতুন জমা যুক্ত করুন */}
              <div className="col-md-7 col-sm-12 mb-4 mb-md-0">
                <div className="panel border rounded p-3 bg-white shadow-xs">
                  <div className="border-bottom pb-2 mb-3">
                    <h5 className="mb-0 fw-bold text-dark">নতুন জমা যুক্ত করুন</h5>
                  </div>
                  <form onSubmit={handleSubmit} className="form-horizontal">
                    {/* তারিখ */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="date">
                        তারিখ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>

                    {/* রশিদ নং ও বই নং */}
                    <div className="row mb-3">
                      <div className="col-6">
                        <label className="form-label fw-semibold" htmlFor="receipt_no">
                          রশিদ নং <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="receipt_no"
                          name="receipt_no"
                          placeholder="রশিদ নং লিখুন"
                          className="form-control"
                          value={receiptNo}
                          onChange={(e) => setReceiptNo(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold" htmlFor="book_no">
                          বই নং
                        </label>
                        <input
                          type="text"
                          id="book_no"
                          name="book_no"
                          placeholder="বই নং লিখুন"
                          className="form-control"
                          value={bookNo}
                          onChange={(e) => setBookNo(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* জমার খাত */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="category">
                        জমার খাত <span className="text-danger">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        {categories.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* মারফত / বিবরণ */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="description">
                        মারফত / বিবরণ
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="মারফত বা বিবরণ লিখুন"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    {/* টাকা */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="amount">
                        টাকা <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="টাকার পরিমাণ লিখুন"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>

                    {/* এ্যাকাউন্ট ও পেমেন্ট মেথড */}
                    <div className="row mb-4">
                      <div className="col-6">
                        <label className="form-label fw-semibold" htmlFor="account">
                          এ্যাকাউন্ট <span className="text-danger">*</span>
                        </label>
                        <select
                          id="account"
                          name="account"
                          className="form-select"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                          required
                        >
                          {accounts.map(a => (
                            <option key={a.id} value={a.name}>{a.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold" htmlFor="payment_method">
                          পেমেন্ট মেথড <span className="text-danger">*</span>
                        </label>
                        <select
                          id="payment_method"
                          name="payment_method"
                          className="form-select"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          required
                        >
                          <option value="cash">নগদ ক্যাশ (Cash)</option>
                          <option value="bkash">বিকাশ (bKash)</option>
                          <option value="nagad">নগদ (Nagad)</option>
                          <option value="bank">ব্যাংক (Bank)</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-end">
                      <button type="submit" className="btn btn-success btn-lg px-4">
                        <i className="fa-solid fa-save me-1"></i> সংরক্ষণ করুন
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column - সম্প্রতি জমার বিবরণ */}
              <div className="col-md-5 col-sm-12">
                <div className="panel border rounded p-3 bg-light shadow-xs h-100">
                  <div className="border-bottom pb-2 mb-3">
                    <h5 className="mb-0 fw-bold text-dark">সম্প্রতি জমার বিবরণ</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-sm bg-white" style={{ fontSize: '12px' }}>
                      <thead className="bg-primary text-white">
                        <tr className="text-center align-middle">
                          <th>ভাউচার নং</th>
                          <th>তারিখ</th>
                          <th>রশিদ নং</th>
                          <th>বই নং</th>
                          <th>জমার খাত</th>
                          <th>টাকা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentList.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-3 text-muted">
                              কোন জমার রেকর্ড নেই
                            </td>
                          </tr>
                        ) : (
                          recentList.map((v, idx) => (
                            <tr key={v.id || idx}>
                              <td className="text-center fw-bold">{v.voucherNo || `V${10 + idx}`}</td>
                              <td className="text-center">{v.date}</td>
                              <td className="text-center">{v.receiptNo || '101'}</td>
                              <td className="text-center">{v.bookNo || '01'}</td>
                              <td className="text-truncate" style={{ maxWidth: '100px' }}>
                                {v.items?.[0]?.category || 'সাধারণ দান'}
                              </td>
                              <td className="text-end fw-bold text-success">
                                ৳ {v.totalAmount || v.amount || 0}
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
          ) : (
            /* EXPENSE LAYOUT: Left 6 cols, Right 6 cols */
            <>
              {/* Left Column - নতুন ব্যয় যুক্ত */}
              <div className="col-md-6 col-sm-12 mb-4 mb-md-0">
                <div className="panel border rounded p-3 bg-white shadow-xs">
                  <div className="border-bottom pb-2 mb-3">
                    <h5 className="mb-0 fw-bold text-dark">নতুন ব্যয় যুক্ত</h5>
                  </div>
                  <form onSubmit={handleSubmit} className="form-horizontal">
                    {/* ভাউচার নং */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="voucher_no">
                        ভাউচার নং <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="voucher_no"
                        name="voucher_no"
                        placeholder="ভাউচার নং লিখুন"
                        className="form-control"
                        value={voucherNo}
                        onChange={(e) => setVoucherNo(e.target.value)}
                        required
                      />
                    </div>

                    {/* তারিখ */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="date">
                        তারিখ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>

                    {/* খরচের খাত */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="category">
                        খরচের খাত <span className="text-danger">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        {categories.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    {/* মারফত / বিবরণ */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="description">
                        মারফত / বিবরণ
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="মারফত বা বিবরণ লিখুন"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    {/* টাকা */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" htmlFor="amount">
                        টাকা <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="টাকার পরিমাণ লিখুন"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>

                    {/* এ্যাকাউন্ট ও পেমেন্ট মেথড */}
                    <div className="row mb-4">
                      <div className="col-6">
                        <label className="form-label fw-semibold" htmlFor="account">
                          এ্যাকাউন্ট <span className="text-danger">*</span>
                        </label>
                        <select
                          id="account"
                          name="account"
                          className="form-select"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                          required
                        >
                          {accounts.map(a => (
                            <option key={a.id} value={a.name}>{a.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label fw-semibold" htmlFor="payment_method">
                          পেমেন্ট মেথড <span className="text-danger">*</span>
                        </label>
                        <select
                          id="payment_method"
                          name="payment_method"
                          className="form-select"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          required
                        >
                          <option value="cash">নগদ ক্যাশ (Cash)</option>
                          <option value="bkash">বিকাশ (bKash)</option>
                          <option value="nagad">নগদ (Nagad)</option>
                          <option value="bank">ব্যাংক (Bank)</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-end">
                      <button type="submit" className="btn btn-danger btn-lg px-4">
                        <i className="fa-solid fa-save me-1"></i> সংরক্ষণ করুন
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column - সম্প্রতি ব্যয়ের বিবরণ */}
              <div className="col-md-6 col-sm-12">
                <div className="panel border rounded p-3 bg-light shadow-xs h-100">
                  <div className="border-bottom pb-2 mb-3">
                    <h5 className="mb-0 fw-bold text-dark">সম্প্রতি ব্যয়ের বিবরণ</h5>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-sm bg-white" style={{ fontSize: '12px' }}>
                      <thead className="bg-primary text-white">
                        <tr className="text-center align-middle">
                          <th>ভাউচার নং</th>
                          <th>তারিখ</th>
                          <th>খরচের খাত</th>
                          <th>বিবরণ</th>
                          <th>টাকা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentList.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center py-3 text-muted">
                              কোন ব্যয়ের রেকর্ড নেই
                            </td>
                          </tr>
                        ) : (
                          recentList.map((v, idx) => (
                            <tr key={v.id || idx}>
                              <td className="text-center fw-bold">{v.voucherNo || `V${20 + idx}`}</td>
                              <td className="text-center">{v.date}</td>
                              <td className="text-truncate" style={{ maxWidth: '120px' }}>
                                {v.items?.[0]?.category || 'দৈনিক খরচ'}
                              </td>
                              <td className="text-truncate" style={{ maxWidth: '140px' }}>
                                {v.items?.[0]?.description || '-'}
                              </td>
                              <td className="text-end fw-bold text-danger">
                                ৳ {v.totalAmount || v.amount || 0}
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
        </div>
      </div>
    </div>
  );
};
