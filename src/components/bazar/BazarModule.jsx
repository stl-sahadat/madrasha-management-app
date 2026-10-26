import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Trash2,
  Calendar,
  Printer,
  FileSpreadsheet,
  CheckCircle,
  Eye,
  TrendingDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const BazarModule = ({ defaultView = 'weekly-create' }) => {
  const {
    accounts,
    receivers,
    weeklyBazar,
    monthlyBazar,
    addWeeklyBazarRecord,
    addMonthlyBazarRecord,
    setSelectedReceiptForPrint
  } = useApp();

  const [activeView, setActiveView] = useState(defaultView);

  // Weekly Bazar Entry State
  const [weeklyForm, setWeeklyForm] = useState({
    date: new Date().toISOString().split('T')[0],
    week: '1 সপ্তাহ',
    month: 'অক্টোবর',
    year: '2026',
    category: 'দৈনিক বাজার খরচ',
    account: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    buyer: 'হাফেজ আযম নূর (ক্যাশিয়ার)',
    items: [
      { name: 'মিনিকেট চাল (৫০ কেজি)', qty: '২ বস্তা', rate: '3200', total: 6400 },
      { name: 'সয়াবিন তেল (৫ লিটার)', qty: '২ বোতল', rate: '850', total: 1700 },
      { name: 'রুই মাছ', qty: '১০ কেজি', rate: '280', total: 2800 },
      { name: 'সবজি ও কাঁচা বাজার', qty: 'বিভিন্ন', rate: '1200', total: 1200 }
    ],
    note: ''
  });

  // Monthly Bazar Entry State
  const [monthlyForm, setMonthlyForm] = useState({
    date: new Date().toISOString().split('T')[0],
    month: 'অক্টোবর',
    year: '2026',
    category: 'বোডিং চাল-ডাল-তেল ক্রয়',
    account: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    buyer: 'হাফেজ আযম নূর (ক্যাশিয়ার)',
    items: 'মাসিক বোডিং চাল (১০ বস্তা), তেল (২ ড্রাম), ডাল (৫০ কেজি)',
    totalAmount: '58500',
    note: 'মাসিক পাইকারি রসদ ক্রয়'
  });

  // Report Filter States
  const [reportWeek, setReportWeek] = useState('1 সপ্তাহ');
  const [reportMonth, setReportMonth] = useState('অক্টোবর');
  const [reportYear, setReportYear] = useState('2026');

  // Handle Weekly Item Change
  const handleItemChange = (index, field, value) => {
    const updated = [...weeklyForm.items];
    updated[index][field] = value;
    if (field === 'rate' || field === 'qty') {
      const rateNum = parseFloat(updated[index].rate) || 0;
      const qtyNum = parseFloat(updated[index].qty) || 1;
      if (!isNaN(rateNum) && !isNaN(qtyNum)) {
        updated[index].total = rateNum * qtyNum;
      }
    }
    setWeeklyForm({ ...weeklyForm, items: updated });
  };

  const handleAddItem = () => {
    setWeeklyForm({
      ...weeklyForm,
      items: [...weeklyForm.items, { name: '', qty: '১', rate: '', total: 0 }]
    });
  };

  const handleRemoveItem = (index) => {
    if (weeklyForm.items.length === 1) return;
    setWeeklyForm({
      ...weeklyForm,
      items: weeklyForm.items.filter((_, idx) => idx !== index)
    });
  };

  const weeklyCalculatedTotal = weeklyForm.items.reduce(
    (sum, it) => sum + (parseFloat(it.total) || 0),
    0
  );

  // Submit Weekly Bazar
  const handleWeeklySubmit = (e) => {
    e.preventDefault();
    if (weeklyCalculatedTotal <= 0) {
      alert('সঠিক বাজার আইটেম ও মূল্য দিন');
      return;
    }

    const vch = addWeeklyBazarRecord({
      ...weeklyForm,
      totalAmount: weeklyCalculatedTotal
    });

    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  // Submit Monthly Bazar
  const handleMonthlySubmit = (e) => {
    e.preventDefault();
    const totalAmount = parseFloat(monthlyForm.totalAmount);
    if (!totalAmount || totalAmount <= 0) {
      alert('সঠিক টাকার পরিমাণ দিন');
      return;
    }

    const vch = addMonthlyBazarRecord(monthlyForm);
    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  // Filtered weekly records for report
  const currentWeeklyRecords = weeklyBazar.filter(
    b => b.month === reportMonth && b.year === reportYear && (reportWeek === 'সকল সপ্তাহ' || b.week === reportWeek)
  );
  const weeklyReportTotal = currentWeeklyRecords.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // Filtered monthly records for report
  const currentMonthlyRecords = monthlyBazar.filter(
    b => b.year === reportYear && (reportMonth === 'সকল মাস' || b.month === reportMonth)
  );
  const monthlyReportTotal = currentMonthlyRecords.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-shopping-cart me-2"></i>
            লিল্লা বোডিং ও ছাত্রাবাস বাজার ব্যবস্থাপনা (Bazar & Kitchen)
          </h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setActiveView('weekly-create')}
              className={`btn btn-sm ${activeView === 'weekly-create' ? 'btn-danger text-white' : 'btn-light text-primary'} fw-bold d-flex align-items-center gap-1`}
            >
              <i className="fa-solid fa-plus"></i> সাপ্তাহিক বাজার এন্ট্রি
            </button>
            <button
              onClick={() => setActiveView('monthly-create')}
              className={`btn btn-sm ${activeView === 'monthly-create' ? 'btn-danger text-white' : 'btn-light text-success'} fw-bold d-flex align-items-center gap-1`}
            >
              <i className="fa-solid fa-plus"></i> মাসিক বাজার এন্ট্রি
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> প্রিন্ট
            </button>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="card-body bg-light py-2 border-bottom">
          <div className="d-flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setActiveView('weekly-create')}
              className={`btn btn-sm rounded-pill px-3 ${activeView === 'weekly-create' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-cart-plus me-1"></i> সাপ্তাহিক বাজার এন্ট্রি
            </button>
            <button
              type="button"
              onClick={() => setActiveView('weekly-report')}
              className={`btn btn-sm rounded-pill px-3 ${activeView === 'weekly-report' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-chart-pie me-1"></i> সাপ্তাহিক বাজার রিপোর্ট
            </button>
            <button
              type="button"
              onClick={() => setActiveView('weekly-list')}
              className={`btn btn-sm rounded-pill px-3 ${activeView === 'weekly-list' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-receipt me-1"></i> সাপ্তাহিক বাজার লিস্ট
            </button>
            <button
              type="button"
              onClick={() => setActiveView('monthly-create')}
              className={`btn btn-sm rounded-pill px-3 ${activeView === 'monthly-create' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-boxes-packing me-1"></i> মাসিক বাজার এন্ট্রি
            </button>
            <button
              type="button"
              onClick={() => setActiveView('monthly-report')}
              className={`btn btn-sm rounded-pill px-3 ${activeView === 'monthly-report' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-chart-line me-1"></i> মাসিক বাজার রিপোর্ট
            </button>
            <button
              type="button"
              onClick={() => setActiveView('monthly-list')}
              className={`btn btn-sm rounded-pill px-3 ${activeView === 'monthly-list' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-list-check me-1"></i> মাসিক বাজার লিস্ট
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: Weekly Market Entry Form (সাপ্তাহিক বাজার এন্ট্রি) */}
      {activeView === 'weekly-create' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-basket-shopping text-primary me-2"></i>
              সাপ্তাহিক বাজার যুক্ত করুন (Weekly Market Entry)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleWeeklySubmit} className="row g-3">
              <div className="col-md-3">
                <label className="form-label fw-bold small">তারিখ *</label>
                <input
                  type="date"
                  value={weeklyForm.date}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, date: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">সপ্তাহ *</label>
                <select
                  value={weeklyForm.week}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, week: e.target.value })}
                  className="form-select"
                >
                  <option value="1 সপ্তাহ">1 সপ্তাহ</option>
                  <option value="2 সপ্তাহ">2 সপ্তাহ</option>
                  <option value="3 সপ্তাহ">3 সপ্তাহ</option>
                  <option value="4 সপ্তাহ">4 সপ্তাহ</option>
                  <option value="5 সপ্তাহ">5 সপ্তাহ</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">মাস *</label>
                <select
                  value={weeklyForm.month}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, month: e.target.value })}
                  className="form-select"
                >
                  {MONTH_NAMES.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">সাল *</label>
                <select
                  value={weeklyForm.year}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, year: e.target.value })}
                  className="form-select"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">কোন খাত থেকে *</label>
                <input
                  type="text"
                  value="দৈনিক বাজার খরচ"
                  readOnly
                  className="form-control bg-light"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">পেমেন্ট একাউন্ট *</label>
                <select
                  value={weeklyForm.account}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, account: e.target.value })}
                  className="form-select"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">ক্রেতা / গ্রহণকারী *</label>
                <input
                  type="text"
                  value={weeklyForm.buyer}
                  onChange={(e) => setWeeklyForm({ ...weeklyForm, buyer: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              {/* Dynamic Items Table */}
              <div className="col-12 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="fw-bold small text-dark mb-0">ক্রয়কৃত খাদ্যদ্রব্য ও কাঁচাবাজারের তালিকা:</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="btn btn-sm btn-outline-primary fw-bold"
                  >
                    <i className="fa-solid fa-plus me-1"></i> নতুন আইটেম যোগ করুন
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered align-middle text-sm mb-0">
                    <thead className="table-light text-center">
                      <tr className="fw-bold">
                        <th style={{ width: '40px' }}>#</th>
                        <th className="text-start">পণ্যের নাম (চাল, ডাল, মাছ, তেল...)</th>
                        <th style={{ width: '130px' }}>পরিমাণ</th>
                        <th style={{ width: '130px' }}>একক দর (৳)</th>
                        <th style={{ width: '150px' }} className="text-end">মোট মূল্য (৳)</th>
                        <th style={{ width: '50px' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {weeklyForm.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="text-center font-mono">{idx + 1}</td>
                          <td>
                            <input
                              type="text"
                              value={it.name}
                              onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                              placeholder="পণ্যের নাম লিখুন..."
                              className="form-control form-control-sm"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={it.qty}
                              onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                              placeholder="উদা: ৫ কেজি"
                              className="form-control form-control-sm"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={it.rate}
                              onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                              placeholder="দর"
                              className="form-control form-control-sm font-mono"
                            />
                          </td>
                          <td className="text-end font-mono fw-bold text-success">
                            ৳ {it.total || 0}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="btn btn-sm btn-outline-danger p-1"
                              title="মুছুন"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="table-light fw-bold">
                      <tr>
                        <td colSpan="4" className="text-end">সর্বমোট বাজার খরচ:</td>
                        <td className="text-end font-mono fs-6 text-success">
                          ৳ {weeklyCalculatedTotal.toLocaleString('en-IN')}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  বাজার খরচ সংরক্ষণ করুন ও ভাউচার প্রিন্ট
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 2: Weekly Market Report (সাপ্তাহিক বাজার রিপোর্ট) */}
      {activeView === 'weekly-report' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom no-print">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-bold small">সপ্তাহ</label>
                <select
                  value={reportWeek}
                  onChange={(e) => setReportWeek(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="সকল সপ্তাহ">সকল সপ্তাহ</option>
                  <option value="1 সপ্তাহ">1 সপ্তাহ</option>
                  <option value="2 সপ্তাহ">2 সপ্তাহ</option>
                  <option value="3 সপ্তাহ">3 সপ্তাহ</option>
                  <option value="4 সপ্তাহ">4 সপ্তাহ</option>
                  <option value="5 সপ্তাহ">5 সপ্তাহ</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">মাস</label>
                <select
                  value={reportMonth}
                  onChange={(e) => setReportMonth(e.target.value)}
                  className="form-select form-select-sm"
                >
                  {MONTH_NAMES.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-bold small">বছর</label>
                <select
                  value={reportYear}
                  onChange={(e) => setReportYear(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col text-end">
                <button onClick={() => window.print()} className="btn btn-sm btn-info text-white fw-bold">
                  <i className="fa-solid fa-print me-1"></i> রিপোর্ট প্রিন্ট
                </button>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h5 className="fw-bold mb-1">সাপ্তাহিক বোডিং খাদ্য রসদ ব্যয় প্রতিবেদন</h5>
              <p className="text-muted small mb-0">{reportMonth} {reportYear} ইং - {reportWeek}</p>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card bg-primary-subtle border-primary-subtle p-3 text-center">
                  <span className="small text-primary fw-bold">মোট সাপ্তাহিক ব্যয়</span>
                  <h4 className="fw-bold font-mono text-primary mb-0 mt-1">৳ {weeklyReportTotal.toLocaleString('en-IN')}</h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-success-subtle border-success-subtle p-3 text-center">
                  <span className="small text-success fw-bold">ভাউচার সংখ্যা</span>
                  <h4 className="fw-bold font-mono text-success mb-0 mt-1">{currentWeeklyRecords.length} টি</h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-info-subtle border-info-subtle p-3 text-center">
                  <span className="small text-info fw-bold">গড় দৈনিক খরচ</span>
                  <h4 className="fw-bold font-mono text-info mb-0 mt-1">
                    ৳ {Math.round(weeklyReportTotal / 7).toLocaleString('en-IN')}
                  </h4>
                </div>
              </div>
            </div>

            <h6 className="fw-bold mb-3">আইটেমভিত্তিক খরচের বিবরণী:</h6>
            <div className="table-responsive">
              <table className="table table-bordered align-middle text-sm mb-0">
                <thead className="table-light text-center">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th>তারিখ</th>
                    <th>সপ্তাহ</th>
                    <th className="text-start">বাজারের আইটেমসমূহ</th>
                    <th>ক্রেতা</th>
                    <th className="text-end">মোট টাকা</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWeeklyRecords.map((rec, idx) => (
                    <tr key={rec.id}>
                      <td className="text-center font-mono fw-bold">{idx + 1}</td>
                      <td className="text-center font-mono">{rec.date}</td>
                      <td className="text-center"><span className="badge bg-info-subtle text-info">{rec.week}</span></td>
                      <td className="text-start">
                        {Array.isArray(rec.items) ? (
                          <ul className="mb-0 ps-3 small">
                            {rec.items.map((it, iIdx) => (
                              <li key={iIdx}>
                                {it.name} - {it.qty} (৳{it.total})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          rec.items
                        )}
                      </td>
                      <td className="text-center">{rec.buyer}</td>
                      <td className="text-end font-mono fw-bold text-success fs-6">
                        ৳ {rec.totalAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Weekly Market List (সাপ্তাহিক বাজার লিস্ট) */}
      {activeView === 'weekly-list' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-receipt text-primary me-2"></i>
              সাপ্তাহিক বাজার ভাউচার লিস্ট
            </h6>
            <button
              onClick={() => setActiveView('weekly-create')}
              className="btn btn-sm btn-primary text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন সাপ্তাহিক বাজার
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th>তারিখ</th>
                    <th>সপ্তাহ ও মাস</th>
                    <th>ক্রেতা / গ্রহণকারী</th>
                    <th className="text-start">পণ্যের বিবরণ</th>
                    <th className="text-end">মূল্য (৳)</th>
                    <th>স্লিপ</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyBazar.map((b, idx) => (
                    <tr key={b.id || idx}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="font-mono fw-bold text-primary">{b.voucherNo}</td>
                      <td className="font-mono">{b.date}</td>
                      <td><span className="badge bg-light text-dark border">{b.week}, {b.month}</span></td>
                      <td>{b.buyer}</td>
                      <td className="text-start small">
                        {Array.isArray(b.items)
                          ? b.items.map(it => it.name).join(', ')
                          : b.items}
                      </td>
                      <td className="text-end font-mono fw-bold text-success">৳ {b.totalAmount.toLocaleString('en-IN')}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReceiptForPrint({
                              id: b.id,
                              type: 'expense',
                              voucherNo: b.voucherNo,
                              date: b.date,
                              receiver: b.buyer,
                              account: b.account,
                              donorOrStudent: `সাপ্তাহিক বাজার (${b.week})`,
                              items: Array.isArray(b.items) ? b.items.map(it => ({ category: 'দৈনিক বাজার খরচ', description: it.name, amount: it.total })) : [{ category: 'দৈনিক বাজার খরচ', description: b.items, amount: b.totalAmount }],
                              totalAmount: b.totalAmount,
                              note: b.note
                            });
                          }}
                          className="btn btn-sm btn-outline-primary px-2 py-1"
                        >
                          <i className="fa-solid fa-receipt me-1"></i> স্লিপ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: Monthly Market Entry Form (মাসিক বাজার এন্ট্রি) */}
      {activeView === 'monthly-create' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-boxes-packing text-success me-2"></i>
              মাসিক সামগ্রিক বাজার যুক্ত করুন (Monthly Bulk Purchase)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleMonthlySubmit} className="row g-3">
              <div className="col-md-3">
                <label className="form-label fw-bold small">তারিখ *</label>
                <input
                  type="date"
                  value={monthlyForm.date}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, date: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">মাস *</label>
                <select
                  value={monthlyForm.month}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, month: e.target.value })}
                  className="form-select"
                >
                  {MONTH_NAMES.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">সাল *</label>
                <select
                  value={monthlyForm.year}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, year: e.target.value })}
                  className="form-select"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">কোন খাত থেকে *</label>
                <input
                  type="text"
                  value="বোডিং চাল-ডাল-তেল ক্রয়"
                  readOnly
                  className="form-control bg-light"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">পেমেন্ট একাউন্ট *</label>
                <select
                  value={monthlyForm.account}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, account: e.target.value })}
                  className="form-select"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">ক্রেতা / গ্রহণকারী *</label>
                <input
                  type="text"
                  value={monthlyForm.buyer}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, buyer: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold small">ক্রয়কৃত মাসিক সামগ্রিক মালামালের বিবরণ *</label>
                <textarea
                  rows="3"
                  value={monthlyForm.items}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, items: e.target.value })}
                  placeholder="উদা: চাল ১০ বস্তা, সয়াবিন তেল ২ ড্রাম, ডাল ৫০ কেজি, চিনি ও মশলাপাতি..."
                  className="form-control"
                  required
                ></textarea>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">মোট খরচের পরিমাণ (টাকা) *</label>
                <div className="input-group">
                  <span className="input-group-text">৳</span>
                  <input
                    type="number"
                    value={monthlyForm.totalAmount}
                    onChange={(e) => setMonthlyForm({ ...monthlyForm, totalAmount: e.target.value })}
                    className="form-control font-mono fw-bold text-success fs-6"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">মন্তব্য (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={monthlyForm.note}
                  onChange={(e) => setMonthlyForm({ ...monthlyForm, note: e.target.value })}
                  placeholder="নোট বা মেমো নম্বর..."
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  সংরক্ষণ করুন ও ভাউচার তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 5: Monthly Market Report (মাসিক বাজার রিপোর্ট) */}
      {activeView === 'monthly-report' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom no-print">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label className="form-label fw-bold small">মাস</label>
                <select
                  value={reportMonth}
                  onChange={(e) => setReportMonth(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="সকল মাস">সকল মাস</option>
                  {MONTH_NAMES.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">বছর</label>
                <select
                  value={reportYear}
                  onChange={(e) => setReportYear(e.target.value)}
                  className="form-select form-select-sm"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col text-end">
                <button onClick={() => window.print()} className="btn btn-sm btn-info text-white fw-bold">
                  <i className="fa-solid fa-print me-1"></i> রিপোর্ট প্রিন্ট
                </button>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h5 className="fw-bold mb-1">মাসিক পাইকারি বোডিং রসদ ব্যয় বিবরণী</h5>
              <p className="text-muted small mb-0">{reportMonth} {reportYear} ইং</p>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="card bg-success-subtle border-success-subtle p-3 text-center">
                  <span className="small text-success fw-bold">মোট মাসিক রসদ ব্যয়</span>
                  <h3 className="fw-bold font-mono text-success mb-0 mt-1">৳ {monthlyReportTotal.toLocaleString('en-IN')}</h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-primary-subtle border-primary-subtle p-3 text-center">
                  <span className="small text-primary fw-bold">আবাসিক ছাত্র সংখ্যা</span>
                  <h3 className="fw-bold font-mono text-primary mb-0 mt-1">১০১ জন</h3>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered align-middle text-sm mb-0">
                <thead className="table-light text-center">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th>তারিখ</th>
                    <th>মাস</th>
                    <th className="text-start">পণ্যের বিবরণ</th>
                    <th>ক্রেতা / হিসাবরক্ষক</th>
                    <th className="text-end">মূল্য (৳)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMonthlyRecords.map((rec, idx) => (
                    <tr key={rec.id}>
                      <td className="text-center font-mono fw-bold">{idx + 1}</td>
                      <td className="text-center font-mono">{rec.date}</td>
                      <td className="text-center"><span className="badge bg-info-subtle text-info">{rec.month}</span></td>
                      <td className="text-start">{rec.items}</td>
                      <td className="text-center">{rec.buyer}</td>
                      <td className="text-end font-mono fw-bold text-success fs-6">
                        ৳ {rec.totalAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: Monthly Market List (মাসিক বাজার লিস্ট) */}
      {activeView === 'monthly-list' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-receipt text-primary me-2"></i>
              মাসিক সামগ্রিক বাজার ভাউচার তালিকা
            </h6>
            <button
              onClick={() => setActiveView('monthly-create')}
              className="btn btn-sm btn-primary text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন মাসিক বাজার
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th>তারিখ</th>
                    <th>মাস</th>
                    <th>গ্রহণকারী</th>
                    <th className="text-start">পণ্যের নাম ও বিবরণ</th>
                    <th className="text-end">মূল্য (৳)</th>
                    <th>স্লিপ</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyBazar.map((b, idx) => (
                    <tr key={b.id || idx}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="font-mono fw-bold text-primary">{b.voucherNo}</td>
                      <td className="font-mono">{b.date}</td>
                      <td><span className="badge bg-light text-dark border">{b.month}</span></td>
                      <td>{b.buyer}</td>
                      <td className="text-start small">{b.items}</td>
                      <td className="text-end font-mono fw-bold text-success">৳ {b.totalAmount.toLocaleString('en-IN')}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedReceiptForPrint({
                              id: b.id,
                              type: 'expense',
                              voucherNo: b.voucherNo,
                              date: b.date,
                              receiver: b.buyer,
                              account: b.account,
                              donorOrStudent: `মাসিক বাজার (${b.month})`,
                              items: [{ category: 'বোডিং চাল-ডাল-তেল ক্রয়', description: b.items, amount: b.totalAmount }],
                              totalAmount: b.totalAmount,
                              note: b.note
                            });
                          }}
                          className="btn btn-sm btn-outline-primary px-2 py-1"
                        >
                          <i className="fa-solid fa-receipt me-1"></i> স্লিপ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
