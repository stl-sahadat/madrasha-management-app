import React, { useState } from 'react';
import {
  Printer,
  Search,
  Plus,
  Utensils,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentKhurakiList = () => {
  const {
    khurakiPayments,
    transactions,
    setSelectedReceiptForPrint,
    setActiveTab,
    jamats
  } = useApp();

  const [selectedJamat, setSelectedJamat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all khuraki transactions from both khurakiPayments and transactions
  const allKhurakiList = [
    ...khurakiPayments,
    ...transactions
      .filter(t => t.type === 'deposit' && ((t.items && t.items.some(i => i.category.includes('খোরাকী') || i.category.includes('খানার'))) || (t.category && (t.category.includes('খোরাকী') || t.category.includes('খানার')))))
      .map(t => ({
        id: t.id,
        voucherNo: t.voucherNo,
        date: t.date,
        studentName: t.donorOrStudent?.split('(')[0]?.trim() || 'শিক্ষার্থী',
        roll: t.donorOrStudent?.match(/রোল:\s*(\w+)/)?.[1] || '১০১',
        jamat: t.donorOrStudent?.match(/জামাত:\s*([^)]+)/)?.[1] || 'হিফজ বিভাগ',
        month: t.items[0]?.description?.match(/\(([^)]+)\)/)?.[1] || 'চলতি মাস',
        amount: t.totalAmount,
        account: t.account,
        receiver: t.receiver,
        rawVoucher: t
      }))
  ];

  // Remove duplicates by voucherNo
  const uniqueList = Array.from(new Map(allKhurakiList.map(item => [item.voucherNo, item])).values());

  const filtered = uniqueList.filter(item => {
    const matchJamat = selectedJamat === 'all' || (item.jamat && item.jamat.includes(selectedJamat));
    const matchSearch =
      (item.studentName && item.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.roll && item.roll.includes(searchTerm)) ||
      (item.voucherNo && item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchJamat && matchSearch;
  });

  const totalCollected = filtered.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-receipt me-2"></i>
            ছাত্র খানার টাকা জমার তালিকা
          </h5>
          <div className="d-flex gap-2">
            <button
              onClick={() => setActiveTab('student-khuraki-entry')}
              className="btn btn-sm btn-danger text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-plus"></i> নতুন খানা জমা এন্ট্রি
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-sm btn-info text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-print"></i> প্রিন্ট করুন
            </button>
          </div>
        </div>

        <div className="card-body bg-light py-3">
          <div className="row g-3 align-items-center justify-content-between">
            <div className="col-md-4">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ভাউচার নং, নাম বা রোল দিয়ে খুঁজুন..."
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-md-4">
              <select
                value={selectedJamat}
                onChange={(e) => setSelectedJamat(e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="all">সকল জামাত</option>
                {jamats.map(j => (
                  <option key={j.id} value={j.name}>{j.name}</option>
                ))}
              </select>
            </div>

            <div className="col-auto">
              <span className="badge bg-success fs-6 px-3 py-2">
                মোট আদায়: <strong>৳ {totalCollected.toLocaleString('en-IN')}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-dark">খোরাকী ফি ভাউচারসমূহ</h6>
          <span className="text-muted small">মোট ভাউচার: {filtered.length} টি</span>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-xs">
              <thead className="table-light">
                <tr className="text-dark fw-bold">
                  <th style={{ width: '45px' }}>নং</th>
                  <th>ভাউচার নং</th>
                  <th>তারিখ</th>
                  <th className="text-start">শিক্ষার্থীর নাম</th>
                  <th>ভর্তি নং</th>
                  <th>জামাত</th>
                  <th>পরিশোধিত মাস</th>
                  <th className="text-end">টাকার পরিমাণ</th>
                  <th>হিসাব মাধ্যম</th>
                  <th>গ্রহণকারী</th>
                  <th>স্লিপ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="py-4 text-muted">
                      কোনো জমার ভাউচার পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="font-mono fw-bold text-primary">{item.voucherNo}</td>
                      <td className="font-mono">{item.date}</td>
                      <td className="text-start fw-bold text-dark">{item.studentName}</td>
                      <td className="font-mono text-muted">{item.roll}</td>
                      <td><span className="badge bg-light text-dark border">{item.jamat}</span></td>
                      <td><span className="badge bg-info-subtle text-info">{item.month}</span></td>
                      <td className="text-end font-mono fw-bold text-success">৳ {item.amount}</td>
                      <td><span className="badge bg-secondary-subtle text-secondary">{item.account}</span></td>
                      <td className="small">{item.receiver}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            const vchToPrint = item.rawVoucher || {
                              id: item.id,
                              voucherNo: item.voucherNo,
                              date: item.date,
                              receiver: item.receiver,
                              account: item.account,
                              donorOrStudent: `${item.studentName} (রোল: ${item.roll})`,
                              items: [{ category: 'খোরাকী ফি', description: `খোরাকী ফি - ${item.studentName} (${item.month})`, amount: item.amount }],
                              totalAmount: item.amount,
                              note: 'খানা জমার রসিদ'
                            };
                            setSelectedReceiptForPrint(vchToPrint);
                          }}
                          className="btn btn-sm btn-outline-primary px-2 py-1 d-inline-flex align-items-center gap-1"
                          title="রসিদ স্লিপ প্রিন্ট"
                        >
                          <i className="fa-solid fa-receipt"></i>
                          <span>রসিদ</span>
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
    </div>
  );
};
