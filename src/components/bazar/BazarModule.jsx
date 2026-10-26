import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

function formatBazarItems(item) {
  if (!item) return '';
  if (item.itemsSummary) return item.itemsSummary;
  if (typeof item.items === 'string') return item.items;
  if (Array.isArray(item.items)) {
    return item.items
      .map(it => {
        if (!it) return '';
        if (typeof it === 'string') return it;
        const name = it.item_name || it.name || '';
        const qty = it.quantity || it.qty || '';
        return name ? (qty ? `${name} (${qty})` : name) : '';
      })
      .filter(Boolean)
      .join(', ');
  }
  return 'চাল, ডাল, তেল, সবজি';
}

export const BazarModule = ({ defaultView = 'weekly-create' }) => {
  const {
    accounts,
    receivers,
    weeklyBazar,
    monthlyBazar,
    addWeeklyBazarRecord,
    addMonthlyBazarRecord,
    setSelectedReceiptForPrint,
    depositCategories
  } = useApp();

  const [activeView, setActiveView] = useState(defaultView);

  // Weekly Create Form matching /admin/weeklymarket/create
  const [weeklyForm, setWeeklyForm] = useState({
    date: new Date().toISOString().split('T')[0],
    week: '1',
    month: '10',
    year: '2026',
    deposit_category: 'ছাএদের খানার টাকা',
    account: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    receiver: receivers?.[0]?.name || 'হাফেজ আযম নূর',
    payment_method: 'cash',
    items: [
      { item_name: 'মিনিকেট চাল', quantity: '২ বস্তা', amount: '6400', note: 'লিল্লা বোডিং' },
      { item_name: 'সয়াবিন তেল', quantity: '১০ লিটার', amount: '1850', note: '' },
      { item_name: 'মসুর ডাল', quantity: '১০ কেজি', amount: '1350', note: '' },
      { item_name: 'আলু ও পেঁয়াজ', quantity: '২০ কেজি', amount: '1200', note: '' }
    ]
  });

  // Monthly Create Form matching /admin/monthlymarket/create
  const [monthlyForm, setMonthlyForm] = useState({
    date: new Date().toISOString().split('T')[0],
    month: '10',
    year: '2026',
    deposit_category: 'ছাএদের খানার টাকা',
    account: accounts?.[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    receiver: receivers?.[0]?.name || 'হাফেজ আযম নূর',
    payment_method: 'cash',
    items: [
      { item_name: 'পাইকারি নাজিরশাইল চাল', quantity: '১০ বস্তা', amount: '35000', note: 'মাসিক রসদ' },
      { item_name: 'সয়াবিন তেল (ড্রাম)', quantity: '১ ড্রাম', amount: '16500', note: '' },
      { item_name: 'মসুর ডাল ও ছোলা', quantity: '৫০ কেজি', amount: '6500', note: '' }
    ]
  });

  // Report Filter State
  const [reportMonth, setReportMonth] = useState('10');
  const [reportWeek, setReportWeek] = useState('1');
  const [reportYear, setReportYear] = useState('2026');

  // Weekly Row Operations
  const handleWeeklyItemChange = (idx, field, val) => {
    const updated = [...weeklyForm.items];
    updated[idx][field] = val;
    setWeeklyForm({ ...weeklyForm, items: updated });
  };

  const handleAddWeeklyRow = () => {
    setWeeklyForm({
      ...weeklyForm,
      items: [...weeklyForm.items, { item_name: '', quantity: '', amount: '', note: '' }]
    });
  };

  const handleRemoveWeeklyRow = (idx) => {
    if (weeklyForm.items.length <= 1) return;
    setWeeklyForm({
      ...weeklyForm,
      items: weeklyForm.items.filter((_, i) => i !== idx)
    });
  };

  // Monthly Row Operations
  const handleMonthlyItemChange = (idx, field, val) => {
    const updated = [...monthlyForm.items];
    updated[idx][field] = val;
    setMonthlyForm({ ...monthlyForm, items: updated });
  };

  const handleAddMonthlyRow = () => {
    setMonthlyForm({
      ...monthlyForm,
      items: [...monthlyForm.items, { item_name: '', quantity: '', amount: '', note: '' }]
    });
  };

  const handleRemoveMonthlyRow = (idx) => {
    if (monthlyForm.items.length <= 1) return;
    setMonthlyForm({
      ...monthlyForm,
      items: monthlyForm.items.filter((_, i) => i !== idx)
    });
  };

  // Submit Weekly Bazar
  const handleWeeklySubmit = (e) => {
    e.preventDefault();
    const total = weeklyForm.items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0);
    const itemNames = weeklyForm.items.map(i => `${i.item_name} (${i.quantity})`).join(', ');

    addWeeklyBazarRecord({
      date: weeklyForm.date,
      week: `${weeklyForm.week} সপ্তাহ`,
      month: 'অক্টোবর',
      year: weeklyForm.year,
      receiver: weeklyForm.receiver,
      account: weeklyForm.account,
      itemsSummary: itemNames,
      totalAmount: total,
      note: `সাপ্তাহিক বাজার খরচ (${weeklyForm.week} সপ্তাহ)`
    });

    alert('সাপ্তাহিক বাজার সফলভাবে সংরক্ষণ করা হয়েছে!');
    setActiveView('weekly-list');
  };

  // Submit Monthly Bazar
  const handleMonthlySubmit = (e) => {
    e.preventDefault();
    const total = monthlyForm.items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0);
    const itemNames = monthlyForm.items.map(i => `${i.item_name} (${i.quantity})`).join(', ');

    addMonthlyBazarRecord({
      date: monthlyForm.date,
      month: 'অক্টোবর',
      year: monthlyForm.year,
      receiver: monthlyForm.receiver,
      account: monthlyForm.account,
      itemsSummary: itemNames,
      totalAmount: total,
      note: 'মাসিক বোডিং বাজার রসদ'
    });

    alert('মাসিক বাজার সফলভাবে সংরক্ষণ করা হয়েছে!');
    setActiveView('monthly-list');
  };

  return (
    <div className="container-fluid p-0">
      {/* ---------------- 1. WEEKLY MARKET CREATE (/admin/weeklymarket/create) ---------------- */}
      {activeView === 'weekly-create' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-shopping-cart me-2"></i> সাপ্তাহিক বাজার যুক্ত করুন
            </h5>
          </div>

          <form onSubmit={handleWeeklySubmit} id="weeklyMarketForm">
            <div className="card-body mb-3">
              {/* Row 1: Date, Week, Month, Year */}
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">তারিখ <span className="text-danger">*</span></label>
                  <input
                    name="date"
                    type="date"
                    className="form-control"
                    value={weeklyForm.date}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, date: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">সপ্তাহ <span className="text-danger">*</span></label>
                  <select
                    name="week"
                    className="form-select"
                    value={weeklyForm.week}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, week: e.target.value })}
                    required
                  >
                    <option value="1">1 সপ্তাহ</option>
                    <option value="2">2 সপ্তাহ</option>
                    <option value="3">3 সপ্তাহ</option>
                    <option value="4">4 সপ্তাহ</option>
                    <option value="5">5 সপ্তাহ</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">মাস <span className="text-danger">*</span></label>
                  <select
                    name="month"
                    className="form-select"
                    value={weeklyForm.month}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, month: e.target.value })}
                    required
                  >
                    <option value="1">জানুয়ারি</option>
                    <option value="2">ফেব্রুয়ারি</option>
                    <option value="3">মার্চ</option>
                    <option value="4">এপ্রিল</option>
                    <option value="5">মে</option>
                    <option value="6">জুন</option>
                    <option value="7">জুলাই</option>
                    <option value="8">অগাস্ট</option>
                    <option value="9">সেপ্টেম্বর</option>
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">সাল <span className="text-danger">*</span></label>
                  <select
                    name="year"
                    className="form-select"
                    value={weeklyForm.year}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, year: e.target.value })}
                    required
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Deposit Category, Expense Category, Receiver */}
              <div className="row mb-3">
                <div className="col-md-3 col-12">
                  <label htmlFor="deposit_category" className="form-label fw-semibold">
                    কোন খাত থেকে <span className="text-danger">*</span>
                  </label>
                  <select
                    name="deposit_category_id"
                    id="deposit_category"
                    className="form-select custom-select"
                    value={weeklyForm.deposit_category}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, deposit_category: e.target.value })}
                    required
                  >
                    <option value="ছাএদের খানার টাকা">ছাএদের খানার টাকা</option>
                    <option value="মাসিক বেতন">মাসিক বেতন</option>
                    <option value="দান">দান</option>
                    <option value="যাকাত">যাকাত</option>
                    <option value="এতিমখানার">এতিমখানার</option>
                  </select>
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="expense_category" className="form-label fw-semibold">
                    খরচের খাত <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="expense_category"
                    className="form-control"
                    value="সাপ্তাহিক বাজার"
                    readOnly
                  />
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="receiver_id" className="form-label fw-semibold">
                    গ্রহণকারী <span className="text-danger">*</span>
                  </label>
                  <select
                    name="receiver_id"
                    id="receiver_id"
                    className="form-select"
                    value={weeklyForm.receiver}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, receiver: e.target.value })}
                    required
                  >
                    {receivers.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3 col-12">
                  <label htmlFor="account" className="form-label fw-semibold">এ্যাকাউন্ট</label>
                  <select
                    name="account"
                    id="account"
                    className="form-select custom-select"
                    value={weeklyForm.account}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, account: e.target.value })}
                    required
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Payment Method */}
              <div className="row mb-3">
                <div className="col-md-3 mb-2">
                  <label htmlFor="payment_method" className="form-label fw-bold">পেমেন্ট মেথড</label>
                  <select
                    name="payment_method_id"
                    id="payment_method"
                    className="form-select custom-select"
                    value={weeklyForm.payment_method}
                    onChange={(e) => setWeeklyForm({ ...weeklyForm, payment_method: e.target.value })}
                    required
                  >
                    <option value="cash">নগদ (Cash)</option>
                    <option value="bkash">বিকাশ (Bkash)</option>
                    <option value="bank">ব্যাংক (Bank)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bazar Item Table */}
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <h6 className="fw-bold mb-0">বাজার তালিকা</h6>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleAddWeeklyRow}>
                  <i className="fas fa-plus me-1"></i> নতুন আইটেম
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th style={{ width: '50px' }}>নং</th>
                      <th>আইটেম <span className="text-danger">*</span></th>
                      <th style={{ width: '180px' }}>পরিমাণ <span className="text-danger">*</span></th>
                      <th style={{ width: '180px' }}>টাকা <span className="text-danger">*</span></th>
                      <th style={{ width: '220px' }}>মন্তব্য</th>
                      <th style={{ width: '80px' }} className="text-center">মুছুন</th>
                    </tr>
                  </thead>
                  <tbody id="itemTable">
                    {weeklyForm.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="যেমন: চাল, ডাল, তেল"
                            value={it.item_name}
                            onChange={(e) => handleWeeklyItemChange(idx, 'item_name', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="যেমন: 5 kg"
                            value={it.quantity}
                            onChange={(e) => handleWeeklyItemChange(idx, 'quantity', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control text-end font-monospace market-amount"
                            placeholder="টাকা লিখুন"
                            value={it.amount}
                            onChange={(e) => handleWeeklyItemChange(idx, 'amount', e.target.value)}
                            step="1"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="মন্তব্য (ঐচ্ছিক)"
                            value={it.note}
                            onChange={(e) => handleWeeklyItemChange(idx, 'note', e.target.value)}
                          />
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveWeeklyRow(idx)}
                            disabled={weeklyForm.items.length <= 1}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light fw-bold">
                      <td colSpan="3" className="text-end">মোট বাজার খরচ:</td>
                      <td className="text-end font-monospace text-primary">
                        ৳ {weeklyForm.items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0).toLocaleString('en-IN')}
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-success btn-lg px-4 fw-bold">
                  <i className="fas fa-save me-2"></i>সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- 2. WEEKLY MARKET REPORT (/admin/weeklymarket) ---------------- */}
      {activeView === 'weekly-report' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-shopping-cart me-2"></i> সাপ্তাহিক বাজার রিপোর্ট
              </h5>
            </div>

            <div className="card-body mb-3">
              <div className="row align-items-end">
                <div className="col-md-3 mb-3">
                  <label htmlFor="month_select" className="form-label fw-bold">মাস</label>
                  <select
                    id="month_select"
                    className="form-select"
                    value={reportMonth}
                    onChange={(e) => setReportMonth(e.target.value)}
                  >
                    <option value="1">জানুয়ারি</option>
                    <option value="2">ফেব্রুয়ারি</option>
                    <option value="3">মার্চ</option>
                    <option value="4">এপ্রিল</option>
                    <option value="5">মে</option>
                    <option value="6">জুন</option>
                    <option value="7">জুলাই</option>
                    <option value="8">অগাস্ট</option>
                    <option value="9">সেপ্টেম্বর</option>
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="week_select" className="form-label fw-bold">সপ্তাহ</label>
                  <select
                    id="week_select"
                    className="form-select"
                    value={reportWeek}
                    onChange={(e) => setReportWeek(e.target.value)}
                  >
                    <option value="1">1 সপ্তাহ</option>
                    <option value="2">2 সপ্তাহ</option>
                    <option value="3">3 সপ্তাহ</option>
                    <option value="4">4 সপ্তাহ</option>
                    <option value="5">5 সপ্তাহ</option>
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="year_select" className="form-label fw-bold">বছর</label>
                  <select
                    id="year_select"
                    className="form-select"
                    value={reportYear}
                    onChange={(e) => setReportYear(e.target.value)}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখান
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                    সাপ্তাহিক বাজার খরচের রিপোর্ট ({reportWeek} সপ্তাহ, অক্টোবর {reportYear})
                  </h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th className="text-center" style={{ width: '60px' }}>নং</th>
                      <th>তারিখ</th>
                      <th>ক্রেতা/গ্রহীতা</th>
                      <th>বাজার বিবরণী</th>
                      <th className="text-end">মোট খরচ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyBazar.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td>{item.date}</td>
                        <td className="fw-bold">{item.buyer || item.receiver || 'হাফেজ আযম নূর'}</td>
                        <td>{formatBazarItems(item)}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(item.totalAmount || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light fw-bold">
                      <td colSpan="4" className="text-end">সর্বমোট:</td>
                      <td className="text-end font-monospace text-primary">
                        ৳ {weeklyBazar.reduce((s, it) => s + (parseFloat(it.totalAmount) || 0), 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. WEEKLY MARKET LIST (/admin/weeklymarket/list) ---------------- */}
      {activeView === 'weekly-list' && (
        <div className="container-fluid p-0">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0 text-white">
                <i className="fas fa-list-alt me-2"></i>সাপ্তাহিক বাজার লিস্ট
              </h4>
              <button
                onClick={() => setActiveView('weekly-create')}
                className="btn btn-success btn-sm fw-bold"
              >
                <i className="fas fa-plus me-1"></i> নতুন যুক্ত করুন
              </button>
            </div>

            <div className="table-responsive card-body">
              <table className="table table-striped table-hover align-middle" id="weekly-markets-datatable">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '50px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th>গ্রহণকারী</th>
                    <th>পণ্যের নাম</th>
                    <th>তারিখ</th>
                    <th>সপ্তাহ</th>
                    <th>মাস</th>
                    <th className="text-end">মূল্য</th>
                    <th>নোট</th>
                    <th className="text-center">স্লিপ</th>
                    <th className="text-center" style={{ width: '100px' }}>কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyBazar.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center text-muted py-4">
                        কোন সাপ্তাহিক বাজার রেকর্ড পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    weeklyBazar.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-monospace fw-bold text-primary">{item.voucherNo || `WB-${1000 + idx}`}</td>
                        <td className="fw-bold">{item.buyer || item.receiver || 'হাফেজ আযম নূর'}</td>
                        <td>{formatBazarItems(item)}</td>
                        <td>{item.date}</td>
                        <td>{item.week || '1 সপ্তাহ'}</td>
                        <td>{item.month || 'অক্টোবর'}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(item.totalAmount || 0).toLocaleString('en-IN')}</td>
                        <td>{item.note || '-'}</td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(item)}
                            className="btn btn-sm btn-info text-white"
                          >
                            <i className="fa-solid fa-print"></i> স্লিপ
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(item)}
                            className="btn btn-sm btn-secondary"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 4. MONTHLY MARKET CREATE (/admin/monthlymarket/create) ---------------- */}
      {activeView === 'monthly-create' && (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary">
            <h5 className="mb-0 text-white">
              <i className="fa-solid fa-shopping-cart me-2"></i> মাসিক বাজার যুক্ত করুন
            </h5>
          </div>

          <form onSubmit={handleMonthlySubmit} id="monthlyMarketForm">
            <div className="card-body mb-3">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">তারিখ <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    value={monthlyForm.date}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, date: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">মাস <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={monthlyForm.month}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, month: e.target.value })}
                    required
                  >
                    <option value="1">জানুয়ারি</option>
                    <option value="2">ফেব্রুয়ারি</option>
                    <option value="3">মার্চ</option>
                    <option value="4">এপ্রিল</option>
                    <option value="5">মে</option>
                    <option value="6">জুন</option>
                    <option value="7">জুলাই</option>
                    <option value="8">অগাস্ট</option>
                    <option value="9">সেপ্টেম্বর</option>
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">সাল <span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={monthlyForm.year}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, year: e.target.value })}
                    required
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">কোন খাত থেকে</label>
                  <select
                    className="form-select"
                    value={monthlyForm.deposit_category}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, deposit_category: e.target.value })}
                    required
                  >
                    <option value="ছাএদের খানার টাকা">ছাএদের খানার টাকা</option>
                    <option value="মাসিক বেতন">মাসিক বেতন</option>
                    <option value="দান">দান</option>
                    <option value="যাকাত">যাকাত</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">খরচের খাত</label>
                  <input type="text" className="form-control" value="মাসিক বাজার" readOnly />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">গ্রহণকারী</label>
                  <select
                    className="form-select"
                    value={monthlyForm.receiver}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, receiver: e.target.value })}
                    required
                  >
                    {receivers.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">এ্যাকাউন্ট</label>
                  <select
                    className="form-select"
                    value={monthlyForm.account}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, account: e.target.value })}
                    required
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.name}>{acc.name} (৳ {acc.balance})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <h6 className="fw-bold mb-0">মাসিক পাইকারি বাজার তালিকা</h6>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleAddMonthlyRow}>
                  <i className="fas fa-plus me-1"></i> নতুন আইটেম
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th style={{ width: '50px' }}>নং</th>
                      <th>আইটেম <span className="text-danger">*</span></th>
                      <th style={{ width: '180px' }}>পরিমাণ <span className="text-danger">*</span></th>
                      <th style={{ width: '180px' }}>টাকা <span className="text-danger">*</span></th>
                      <th style={{ width: '220px' }}>মন্তব্য</th>
                      <th style={{ width: '80px' }} className="text-center">মুছুন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyForm.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="যেমন: পাইকারি চাল"
                            value={it.item_name}
                            onChange={(e) => handleMonthlyItemChange(idx, 'item_name', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="যেমন: ১০ বস্তা"
                            value={it.quantity}
                            onChange={(e) => handleMonthlyItemChange(idx, 'quantity', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control text-end font-monospace"
                            value={it.amount}
                            onChange={(e) => handleMonthlyItemChange(idx, 'amount', e.target.value)}
                            step="1"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="মন্তব্য (ঐচ্ছিক)"
                            value={it.note}
                            onChange={(e) => handleMonthlyItemChange(idx, 'note', e.target.value)}
                          />
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveMonthlyRow(idx)}
                            disabled={monthlyForm.items.length <= 1}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light fw-bold">
                      <td colSpan="3" className="text-end">মোট মাসিক বাজার:</td>
                      <td className="text-end font-monospace text-primary">
                        ৳ {monthlyForm.items.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0).toLocaleString('en-IN')}
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-success btn-lg px-4 fw-bold">
                  <i className="fas fa-save me-2"></i>সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- 5. MONTHLY MARKET REPORT (/admin/monthlymarket) ---------------- */}
      {activeView === 'monthly-report' && (
        <div>
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-white">
                <i className="fa-solid fa-shopping-cart me-2"></i> মাসিক বাজার রিপোর্ট
              </h5>
            </div>

            <div className="card-body mb-3">
              <div className="row align-items-end">
                <div className="col-md-4 mb-3">
                  <label htmlFor="month_select" className="form-label fw-bold">মাস</label>
                  <select
                    id="month_select"
                    className="form-select"
                    value={reportMonth}
                    onChange={(e) => setReportMonth(e.target.value)}
                  >
                    <option value="1">জানুয়ারি</option>
                    <option value="2">ফেব্রুয়ারি</option>
                    <option value="3">মার্চ</option>
                    <option value="4">এপ্রিল</option>
                    <option value="5">মে</option>
                    <option value="6">জুন</option>
                    <option value="7">জুলাই</option>
                    <option value="8">অগাস্ট</option>
                    <option value="9">সেপ্টেম্বর</option>
                    <option value="10">অক্টোবর</option>
                    <option value="11">নভেম্বর</option>
                    <option value="12">ডিসেম্বর</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="year_select" className="form-label fw-bold">বছর</label>
                  <select
                    id="year_select"
                    className="form-select"
                    value={reportYear}
                    onChange={(e) => setReportYear(e.target.value)}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <button type="button" className="btn btn-success fw-bold w-100">
                    <i className="fa-solid fa-search me-1"></i> রিপোর্ট দেখান
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4" id="printContent">
            <div className="card-body py-4">
              <img
                src="/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg"
                alt="Banner"
                className="w-100 img-fluid rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="row mt-3">
                <div className="col-md-2"></div>
                <div className="col-md-8 text-center">
                  <h5 className="fw-semibold" style={{ color: '#2c5f2d' }}>
                    মাসিক পাইকারি বাজার ক্রয়ের প্রতিবেদন (অক্টোবর {reportYear})
                  </h5>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0 fw-semibold">সন ২০২৬ ইং</p>
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped align-middle mb-0 print-table">
                  <thead className="bg-primary print-thead text-white">
                    <tr>
                      <th className="text-center" style={{ width: '60px' }}>নং</th>
                      <th>তারিখ</th>
                      <th>ক্রেতা/গ্রহীতা</th>
                      <th>বাজার বিবরণী</th>
                      <th className="text-end">মোট খরচ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyBazar.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td>{item.date}</td>
                        <td className="fw-bold">{item.buyer || item.receiver || 'হাফেজ আযম নূর'}</td>
                        <td>{formatBazarItems(item)}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(item.totalAmount || 0).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-light fw-bold">
                      <td colSpan="4" className="text-end">সর্বমোট:</td>
                      <td className="text-end font-monospace text-primary">
                        ৳ {monthlyBazar.reduce((s, it) => s + (parseFloat(it.totalAmount) || 0), 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-3 text-end no-print">
                <button className="btn btn-primary fw-bold" onClick={() => window.print()}>
                  <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 6. MONTHLY MARKET LIST (/admin/monthlymarket/list) ---------------- */}
      {activeView === 'monthly-list' && (
        <div className="container-fluid p-0">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0 text-white">
                <i className="fas fa-list-alt me-2"></i>মাসিক বাজার লিস্ট
              </h4>
              <button
                onClick={() => setActiveView('monthly-create')}
                className="btn btn-success btn-sm fw-bold"
              >
                <i className="fas fa-plus me-1"></i> নতুন যুক্ত করুন
              </button>
            </div>

            <div className="table-responsive card-body">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '50px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th>গ্রহণকারী</th>
                    <th>পণ্যের বিবরণ</th>
                    <th>তারিখ</th>
                    <th>মাস</th>
                    <th className="text-end">মূল্য</th>
                    <th>নোট</th>
                    <th className="text-center">স্লিপ</th>
                    <th className="text-center" style={{ width: '100px' }}>কার্যক্রম</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyBazar.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center text-muted py-4">
                        কোন মাসিক বাজার রেকর্ড পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    monthlyBazar.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="text-center">{idx + 1}</td>
                        <td className="font-monospace fw-bold text-primary">{item.voucherNo || `MB-${1000 + idx}`}</td>
                        <td className="fw-bold">{item.buyer || item.receiver || 'হাফেজ আযম নূর'}</td>
                        <td>{formatBazarItems(item)}</td>
                        <td>{item.date}</td>
                        <td>{item.month || 'অক্টোবর'}</td>
                        <td className="text-end font-monospace fw-bold">৳ {parseFloat(item.totalAmount || 0).toLocaleString('en-IN')}</td>
                        <td>{item.note || '-'}</td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(item)}
                            className="btn btn-sm btn-info text-white"
                          >
                            <i className="fa-solid fa-print"></i> স্লিপ
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedReceiptForPrint(item)}
                            className="btn btn-sm btn-secondary"
                          >
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
