import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  Printer,
  Search,
  Eye,
  CreditCard,
  User,
  CheckCircle,
  FileSpreadsheet,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const ContributorModule = ({ defaultMode = 'list' }) => {
  const {
    contributors,
    addContributor,
    addSubscriptionPayment,
    transactions,
    accounts,
    receivers,
    setSelectedReceiptForPrint,
    setActiveTab
  } = useApp();

  const [activeMode, setActiveMode] = useState(defaultMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonorId, setSelectedDonorId] = useState(contributors[0]?.id || '');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Add Donor Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDonorForm, setNewDonorForm] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    address: 'বদরখালী, কক্সবাজার',
    subscriptionType: 'মাসিক',
    monthlyAmount: '1000',
    note: ''
  });

  // Collect Subscription Form State
  const [collectionForm, setCollectionForm] = useState({
    contributorId: contributors[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    month: 'অক্টোবর',
    year: '2026',
    account: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    receiver: receivers[0]?.name || 'হাফেজ আযম নূর',
    amount: '',
    note: ''
  });

  // Handle Add New Donor
  const handleAddDonorSubmit = (e) => {
    e.preventDefault();
    if (!newDonorForm.name || !newDonorForm.mobile) {
      alert('নাম এবং মোবাইল নম্বর দিন');
      return;
    }
    addContributor(newDonorForm);
    setShowAddModal(false);
    setNewDonorForm({
      name: '',
      fatherName: '',
      mobile: '',
      address: 'বদরখালী, কক্সবাজার',
      subscriptionType: 'মাসিক',
      monthlyAmount: '1000',
      note: ''
    });
  };

  // Handle Subscription Collection
  const handleCollectionSubmit = (e) => {
    e.preventDefault();
    const targetDonor = contributors.find(c => c.id === collectionForm.contributorId) || contributors[0];
    const amount = parseFloat(collectionForm.amount) || parseFloat(targetDonor?.monthlyAmount) || 1000;

    const vch = addSubscriptionPayment({
      contributorId: targetDonor.id,
      contributorName: targetDonor.name,
      date: collectionForm.date,
      month: collectionForm.month,
      year: collectionForm.year,
      account: collectionForm.account,
      receiver: collectionForm.receiver,
      amount,
      note: collectionForm.note || `মাসিক চাঁদা গ্রহণ (${collectionForm.month} ${collectionForm.year})`
    });

    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  // Find donor for individual view
  const currentIndividualDonor = contributors.find(c => c.id === selectedDonorId) || contributors[0];

  // Subscription transactions
  const subTransactions = transactions.filter(t =>
    t.type === 'deposit' && ((t.items && t.items.some(i => i.category.includes('চাঁদা'))) || (t.category && t.category.includes('চাঁদা')))
  );

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-calendar-check me-2"></i>
            মাসিক চাঁদাদাতা ও গ্রাহক ব্যবস্থাপনা (Monthly Subscribers)
          </h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-sm btn-danger text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-user-plus"></i> নতুন চাঁদাদাতা
            </button>
            <button
              onClick={() => setActiveMode('add')}
              className={`btn btn-sm ${activeMode === 'add' ? 'btn-light text-primary' : 'btn-success text-white'} fw-bold d-flex align-items-center gap-1`}
            >
              <i className="fa-solid fa-hand-holding-dollar"></i> চাঁদা গ্রহণ
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
              onClick={() => setActiveMode('create')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'create' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-user-plus me-1"></i> নতুন চাঁদাদাতা
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('list')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'list' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-list me-1"></i> চাঁদাদাতার তালিকা ({contributors.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('add')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'add' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-plus-circle me-1"></i> চাঁদা আদায় এন্ট্রি
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('individual')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'individual' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-user me-1"></i> একক খতিয়ান (Ledger)
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('all')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'all' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-table me-1"></i> সকল চাঁদাদাতা (১২ মাস)
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('history')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'history' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-receipt me-1"></i> চাঁদা গ্রহণের লিস্ট
            </button>
          </div>
        </div>
      </div>

      {/* Add Contributor Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title font-bold">নতুন চাঁদাদাতা যুক্ত করুন</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddDonorSubmit}>
                <div className="modal-body row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold small">চাঁদাদাতার নাম *</label>
                    <input
                      type="text"
                      value={newDonorForm.name}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, name: e.target.value })}
                      placeholder="উদা: হাজী আব্দুল কাদের"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">পিতার নাম</label>
                    <input
                      type="text"
                      value={newDonorForm.fatherName}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, fatherName: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">মোবাইল নম্বর *</label>
                    <input
                      type="text"
                      value={newDonorForm.mobile}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, mobile: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="form-control font-mono"
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">চাঁদার ধরণ</label>
                    <input type="text" value="মাসিক" readOnly className="form-control bg-light" />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold small">মাসিক চাঁদার পরিমাণ (টাকা) *</label>
                    <input
                      type="number"
                      value={newDonorForm.monthlyAmount}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, monthlyAmount: e.target.value })}
                      className="form-control font-mono fw-bold text-success"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small">ঠিকানা</label>
                    <input
                      type="text"
                      value={newDonorForm.address}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, address: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small">মন্তব্য</label>
                    <input
                      type="text"
                      value={newDonorForm.note}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, note: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>বন্ধ করুন</button>
                  <button type="submit" className="btn btn-primary fw-bold">সংরক্ষণ করুন</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 0: Create Contributor Form */}
      {activeMode === 'create' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-user-plus text-primary me-2"></i>
              নতুন মাসিক চাঁদাদাতা নিবন্ধন ফরম (New Monthly Subscriber)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => { handleAddDonorSubmit(e); setActiveMode('list'); }} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">চাঁদাদাতার নাম *</label>
                <input
                  type="text"
                  value={newDonorForm.name}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, name: e.target.value })}
                  placeholder="উদা: হাজী আব্দুল কাদের"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">পিতার নাম</label>
                <input
                  type="text"
                  value={newDonorForm.fatherName}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, fatherName: e.target.value })}
                  placeholder="পিতার নাম"
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">মোবাইল নম্বর *</label>
                <input
                  type="text"
                  value={newDonorForm.mobile}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, mobile: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className="form-control font-mono"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">মাসিক চাঁদার পরিমাণ (টাকা) *</label>
                <div className="input-group">
                  <span className="input-group-text">৳</span>
                  <input
                    type="number"
                    value={newDonorForm.monthlyAmount}
                    onChange={(e) => setNewDonorForm({ ...newDonorForm, monthlyAmount: e.target.value })}
                    className="form-control font-mono fw-bold text-success"
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label fw-bold small">ঠিকানা</label>
                <input
                  type="text"
                  value={newDonorForm.address}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, address: e.target.value })}
                  placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা..."
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-bold small">মন্তব্য (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={newDonorForm.note}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, note: e.target.value })}
                  placeholder="বিশেষ বিবরণ"
                  className="form-control"
                />
              </div>
              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-save"></i>
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 1: Contributor List (চাঁদাদাতার তালিকা) */}
      {activeMode === 'list' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark">চাঁদাদাতার তালিকা সন: ২০২৬ ইং</h6>
            <div className="input-group input-group-sm w-auto">
              <span className="input-group-text bg-white"><i className="fa-solid fa-search text-muted"></i></span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..."
                className="form-control"
              />
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th className="text-start">চাঁদাদাতার নাম</th>
                    <th>পিতার নাম</th>
                    <th>মোবাইল</th>
                    <th className="text-start">ঠিকানা</th>
                    <th>চাঁদা ধরণ</th>
                    <th className="text-end">চাঁদা পরিমাণ</th>
                    <th>মন্তব্য</th>
                    <th>ক্রিয়া</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors
                    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.mobile.includes(searchTerm))
                    .map((c, idx) => (
                      <tr key={c.id}>
                        <td className="font-mono fw-bold">{idx + 1}</td>
                        <td className="text-start fw-bold text-dark">{c.name}</td>
                        <td className="text-muted small">{c.fatherName}</td>
                        <td className="font-mono">{c.mobile}</td>
                        <td className="text-start small">{c.address}</td>
                        <td><span className="badge bg-info-subtle text-info">মাসিক</span></td>
                        <td className="text-end font-mono fw-bold text-success">৳ {c.monthlyAmount}</td>
                        <td className="small text-muted">{c.note || '-'}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setCollectionForm(prev => ({
                                  ...prev,
                                  contributorId: c.id,
                                  amount: c.monthlyAmount
                                }));
                                setActiveMode('add');
                              }}
                              className="btn btn-sm btn-outline-success px-2 py-0.5"
                              title="চাঁদা গ্রহণ করুন"
                            >
                              আদায়
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDonorId(c.id);
                                setActiveMode('individual');
                              }}
                              className="btn btn-sm btn-outline-primary px-2 py-0.5"
                              title="একক খতিয়ান দেখুন"
                            >
                              খতিয়ান
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Monthly Subscription Collection (মাসিক চাঁদা গ্রহণ) */}
      {activeMode === 'add' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-hand-holding-dollar text-success me-2"></i>
              মাসিক চাঁদা গ্রহণ ফরম (Subscription Entry)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleCollectionSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">চাঁদাদাতা নির্বাচন করুন *</label>
                <select
                  value={collectionForm.contributorId}
                  onChange={(e) => {
                    const selId = e.target.value;
                    const found = contributors.find(c => c.id === selId);
                    setCollectionForm({
                      ...collectionForm,
                      contributorId: selId,
                      amount: found ? found.monthlyAmount : ''
                    });
                  }}
                  className="form-select"
                  required
                >
                  {contributors.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.mobile}) - ৳{c.monthlyAmount}/মাস
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">কোন মাসে দিচ্ছে *</label>
                <select
                  value={collectionForm.month}
                  onChange={(e) => setCollectionForm({ ...collectionForm, month: e.target.value })}
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
                  value={collectionForm.year}
                  onChange={(e) => setCollectionForm({ ...collectionForm, year: e.target.value })}
                  className="form-select"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">তারিখ *</label>
                <input
                  type="date"
                  value={collectionForm.date}
                  onChange={(e) => setCollectionForm({ ...collectionForm, date: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">জমার ধরন *</label>
                <input type="text" value="মাসিক চাঁদা" readOnly className="form-control bg-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">পেমেন্ট একাউন্ট *</label>
                <select
                  value={collectionForm.account}
                  onChange={(e) => setCollectionForm({ ...collectionForm, account: e.target.value })}
                  className="form-select"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">চাঁদার পরিমাণ (টাকা) *</label>
                <div className="input-group">
                  <span className="input-group-text">৳</span>
                  <input
                    type="number"
                    value={collectionForm.amount || (contributors.find(c => c.id === collectionForm.contributorId)?.monthlyAmount || 1000)}
                    onChange={(e) => setCollectionForm({ ...collectionForm, amount: e.target.value })}
                    className="form-control font-mono fw-bold text-success fs-6"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">গ্রহণকারী *</label>
                <select
                  value={collectionForm.receiver}
                  onChange={(e) => setCollectionForm({ ...collectionForm, receiver: e.target.value })}
                  className="form-select"
                >
                  {receivers.map(r => (
                    <option key={r.id} value={r.name}>{r.name} ({r.designation})</option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-bold small">মন্তব্য (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={collectionForm.note}
                  onChange={(e) => setCollectionForm({ ...collectionForm, note: e.target.value })}
                  placeholder="নোট বা বিশেষ বিবরণ..."
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  চাঁদা গ্রহণ করুন ও রসিদ প্রিন্ট
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 3: Individual Contributor Statement (একক ভাবে) */}
      {activeMode === 'individual' && (
        <div className="space-y-4">
          <div className="card shadow-sm border-0 no-print">
            <div className="card-header bg-white py-3 border-bottom">
              <h6 className="mb-0 fw-bold text-dark">মাসিক চাঁদাদাতার তালিকা (একক ভাবে)</h6>
            </div>
            <div className="card-body bg-light py-3">
              <div className="row g-3 align-items-end">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">চাঁদাদাতা নির্বাচন করুন</label>
                  <select
                    value={selectedDonorId}
                    onChange={(e) => setSelectedDonorId(e.target.value)}
                    className="form-select"
                  >
                    {contributors.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.mobile}) - ৳{c.monthlyAmount}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold small">বছর</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="form-select"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <button type="button" onClick={() => window.print()} className="btn btn-info text-white fw-bold w-100">
                    <i className="fa-solid fa-print me-1"></i> খতিয়ান প্রিন্ট
                  </button>
                </div>
              </div>
            </div>
          </div>

          {currentIndividualDonor && (
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{currentIndividualDonor.name}</h5>
                    <p className="text-muted small mb-0">পিতা: {currentIndividualDonor.fatherName}</p>
                    <p className="text-muted small mb-0 font-mono">মোবাইল: {currentIndividualDonor.mobile} | ঠিকানা: {currentIndividualDonor.address}</p>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success fs-6 p-2">
                      প্রতিশ্রুত মাসিক চাঁদা: ৳ {currentIndividualDonor.monthlyAmount}
                    </span>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">মাসভিত্তিক চাঁদা আদায়ের বিবরণী ({selectedYear} ইং):</h6>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle text-center text-sm mb-0">
                    <thead className="table-light">
                      <tr className="fw-bold">
                        <th>মাসের নাম</th>
                        <th>নির্ধারিত হার</th>
                        <th>পরিশোধের স্থিতি</th>
                        <th>আদায়কৃত টাকা</th>
                        <th>রসিদ ভাউচার</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MONTH_NAMES.map((m, idx) => {
                        const payments = currentIndividualDonor.payments || {};
                        const paidAmt = payments[m];
                        const isPaid = paidAmt !== undefined && paidAmt > 0;

                        return (
                          <tr key={m}>
                            <td className="fw-bold">{m}</td>
                            <td className="font-mono">৳ {currentIndividualDonor.monthlyAmount}</td>
                            <td>
                              {isPaid ? (
                                <span className="badge bg-success">পরিশোধিত</span>
                              ) : idx < 10 ? (
                                <span className="badge bg-danger-subtle text-danger border">বকেয়া</span>
                              ) : (
                                <span className="text-muted">অপেক্ষমাণ</span>
                              )}
                            </td>
                            <td className="font-mono fw-bold text-success">
                              {isPaid ? `৳ ${paidAmt}` : '-'}
                            </td>
                            <td>
                              {isPaid ? (
                                <span className="font-mono small text-primary">VCH-2026-SUB</span>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: All Contributors 12-Month Grid (সকল) */}
      {activeMode === 'all' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark">
              মাসিক চাঁদা দানকারীদের সামগ্রিক তালিকা সন ২০২৬ ইং
            </h6>
            <button onClick={() => window.print()} className="btn btn-sm btn-info text-white fw-bold">
              <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-xs">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '40px' }}>ক্র.নং</th>
                    <th className="text-start" style={{ minWidth: '130px' }}>নাম</th>
                    <th>চাঁদার হার</th>
                    {MONTH_NAMES.map(m => (
                      <th key={m} style={{ minWidth: '55px' }}>{m.slice(0, 4)}</th>
                    ))}
                    <th className="bg-success-subtle text-success">মোট আদায়</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((c, idx) => {
                    const payments = c.payments || {};
                    let totalPaid = 0;
                    MONTH_NAMES.forEach(m => {
                      if (payments[m]) totalPaid += parseFloat(payments[m]);
                    });

                    return (
                      <tr key={c.id}>
                        <td className="font-mono fw-bold">{idx + 1}</td>
                        <td className="text-start fw-bold text-dark">{c.name}</td>
                        <td className="font-mono text-muted">৳ {c.monthlyAmount}</td>
                        {MONTH_NAMES.map(m => {
                          const paid = payments[m];
                          return (
                            <td key={m} className="p-1">
                              {paid ? (
                                <span className="badge bg-success-subtle text-success border border-success-subtle p-1 font-mono">
                                  ৳{paid}
                                </span>
                              ) : (
                                <span className="text-muted">০</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="font-mono fw-bold text-success bg-success-subtle">
                          ৳ {totalPaid.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: Monthly Subscription Receipts List (গ্রহণের লিস্ট) */}
      {activeMode === 'history' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-receipt text-primary me-2"></i>
              মাসিক চাঁদা গ্রহণের ভাউচার লিস্ট
            </h6>
            <button
              onClick={() => setActiveMode('add')}
              className="btn btn-sm btn-primary text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন চাঁদা গ্রহণ
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th>ভাউচার নং</th>
                    <th className="text-start">দাতার নাম</th>
                    <th>মাস ও বছর</th>
                    <th>তারিখ</th>
                    <th className="text-end">চাঁদার পরিমাণ</th>
                    <th>বই নং</th>
                    <th>রসিদ নং</th>
                    <th>গ্রহণকারী</th>
                    <th>স্লিপ</th>
                  </tr>
                </thead>
                <tbody>
                  {subTransactions.map((t, idx) => (
                    <tr key={t.id || idx}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="font-mono fw-bold text-primary">{t.voucherNo}</td>
                      <td className="text-start fw-bold text-dark">{t.donorOrStudent}</td>
                      <td><span className="badge bg-info-subtle text-info">{t.items[0]?.description || 'চলতি মাস'}</span></td>
                      <td className="font-mono">{t.date}</td>
                      <td className="text-end font-mono fw-bold text-success">৳ {t.totalAmount}</td>
                      <td className="font-mono text-muted">০২</td>
                      <td className="font-mono text-muted">{100 + idx}</td>
                      <td className="small">{t.receiver}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => setSelectedReceiptForPrint(t)}
                          className="btn btn-sm btn-outline-primary px-2 py-1"
                        >
                          <i className="fa-solid fa-receipt me-1"></i> রসিদ
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
