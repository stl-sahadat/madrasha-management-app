import React, { useState } from 'react';
import {
  HeartHandshake,
  Plus,
  Printer,
  Search,
  Eye,
  CreditCard,
  User,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const DonorModule = ({ defaultMode = 'list' }) => {
  const {
    donors,
    addDonor,
    addDonationRecord,
    transactions,
    accounts,
    receivers,
    setSelectedReceiptForPrint,
    depositCategories
  } = useApp();

  const [activeMode, setActiveMode] = useState(defaultMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonorId, setSelectedDonorId] = useState(donors[0]?.id || '');
  const [selectedYear, setSelectedYear] = useState('2026');

  // Add Donor Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDonorForm, setNewDonorForm] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    address: 'চকরিয়া, কক্সবাজার',
    donationType: 'সাধারণ দান',
    note: ''
  });

  // Collect Donation Form State
  const [donationForm, setDonationForm] = useState({
    donorName: donors[0]?.name || '',
    mobile: donors[0]?.mobile || '',
    address: donors[0]?.address || 'চকরিয়া, কক্সবাজার',
    date: new Date().toISOString().split('T')[0],
    month: 'অক্টোবর',
    year: '2026',
    category: 'সাধারণ দান',
    account: accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)',
    receiver: receivers[0]?.name || 'মাহমুদুল করিম',
    amount: '',
    note: ''
  });

  // Handle Add Donor
  const handleAddDonorSubmit = (e) => {
    e.preventDefault();
    if (!newDonorForm.name || !newDonorForm.mobile) {
      alert('নাম এবং মোবাইল নম্বর দিন');
      return;
    }
    addDonor(newDonorForm);
    setShowAddModal(false);
    setNewDonorForm({
      name: '',
      fatherName: '',
      mobile: '',
      address: 'চকরিয়া, কক্সবাজার',
      donationType: 'সাধারণ দান',
      note: ''
    });
  };

  // Handle Donation Submit
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(donationForm.amount);
    if (!amount || amount <= 0) {
      alert('সঠিক টাকার অংক উল্লেখ করুন');
      return;
    }

    const vch = addDonationRecord({
      donorName: donationForm.donorName,
      mobile: donationForm.mobile,
      address: donationForm.address,
      category: donationForm.category,
      amount,
      date: donationForm.date,
      account: donationForm.account,
      receiver: donationForm.receiver,
      note: donationForm.note || `${donationForm.category} গ্রহণ (${donationForm.month} ${donationForm.year})`
    });

    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  const currentIndividualDonor = donors.find(d => d.id === selectedDonorId) || donors[0];

  // Donation transactions
  const donationTransactions = transactions.filter(t =>
    t.type === 'deposit' &&
    ((t.items && t.items.some(i => i.category.includes('দান') || i.category.includes('ফান্ড') || i.category.includes('সদকা'))) ||
     (t.category && (t.category.includes('দান') || t.category.includes('ফান্ড') || t.category.includes('সদকা'))))
  );

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="card shadow-sm border-0 mb-3 no-print">
        <div className="card-header bg-primary py-3 d-flex flex-wrap justify-content-between align-items-center">
          <h5 className="mb-0 text-white font-bold d-flex align-items-center">
            <i className="fa-solid fa-hand-holding-heart me-2"></i>
            দানকারী ও সাধারণ অনুদান ব্যবস্থাপনা (General Donors)
          </h5>
          <div className="d-flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-sm btn-danger text-white fw-bold d-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-user-plus"></i> নতুন দানকারী
            </button>
            <button
              onClick={() => setActiveMode('create')}
              className={`btn btn-sm ${activeMode === 'create' ? 'btn-light text-primary' : 'btn-success text-white'} fw-bold d-flex align-items-center gap-1`}
            >
              <i className="fa-solid fa-hand-holding-dollar"></i> দান গ্রহণ
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
              onClick={() => setActiveMode('create-donor')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'create-donor' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-user-plus me-1"></i> নতুন দানকারী তৈরি
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('list')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'list' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-list me-1"></i> দানকারীর তালিকা ({donors.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('create')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'create' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-plus-circle me-1"></i> দান গ্রহণ এন্ট্রি
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('individual')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'individual' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-user me-1"></i> একক ভাবে তালিকা
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('all')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'all' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-table me-1"></i> দানকারীর তালিকা (সকল)
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('history')}
              className={`btn btn-sm rounded-pill px-3 ${activeMode === 'history' ? 'btn-primary' : 'btn-outline-secondary bg-white'}`}
            >
              <i className="fa-solid fa-receipt me-1"></i> দান গ্রহণের লিস্ট
            </button>
          </div>
        </div>
      </div>

      {/* Add Donor Modal */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title font-bold">নতুন দানকারী যুক্ত করুন</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleAddDonorSubmit}>
                <div className="modal-body row g-3">
                  <div className="col-12">
                    <label className="form-label fw-bold small">দানকারীর নাম *</label>
                    <input
                      type="text"
                      value={newDonorForm.name}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, name: e.target.value })}
                      placeholder="উদা: মোহাম্মদ আলী সওদাগর"
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
                  <div className="col-12">
                    <label className="form-label fw-bold small">দানের ধরণ *</label>
                    <select
                      value={newDonorForm.donationType}
                      onChange={(e) => setNewDonorForm({ ...newDonorForm, donationType: e.target.value })}
                      className="form-select"
                    >
                      <option value="সাধারণ দান">সাধারণ দান</option>
                      <option value="মসজিদ ফান্ড">মসজিদ ফান্ড</option>
                      <option value="এককালীন অনুদান">এককালীন অনুদান</option>
                      <option value="সদকা ও মেহমানদারি">সদকা ও মেহমানদারি</option>
                    </select>
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

      {/* VIEW 0: Create Donor Form */}
      {activeMode === 'create-donor' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-user-plus text-primary me-2"></i>
              নতুন সাধারণ দানকারী নিবন্ধন ফরম (New General Donor)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => { handleAddDonorSubmit(e); setActiveMode('list'); }} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">দানকারীর নাম *</label>
                <input
                  type="text"
                  value={newDonorForm.name}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, name: e.target.value })}
                  placeholder="উদা: আলহাজ্ব রফিকুল ইসলাম"
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
                <label className="form-label fw-bold small">দানের ধরণ</label>
                <select
                  value={newDonorForm.donationType}
                  onChange={(e) => setNewDonorForm({ ...newDonorForm, donationType: e.target.value })}
                  className="form-select"
                >
                  <option value="সাধারণ দান">সাধারণ দান</option>
                  <option value="মসজিদ ও মাদরাসা ফান্ড">মসজিদ ও মাদরাসা ফান্ড</option>
                  <option value="এককালীন অনুদান">এককালীন অনুদান</option>
                  <option value="লিল্লা বোডিং খাদ্য সাহায্য">লিল্লা বোডিং খাদ্য সাহায্য</option>
                </select>
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

      {/* VIEW 1: Donors List (দানকারীর তালিকা) */}
      {activeMode === 'list' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark">দানকারীর তালিকা সন: ২০২৬ ইং</h6>
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
                    <th className="text-start">দানকারীর নাম</th>
                    <th>পিতার নাম</th>
                    <th>মোবাইল</th>
                    <th className="text-start">ঠিকানা</th>
                    <th>দানের ধরণ</th>
                    <th className="text-end">মোট দান</th>
                    <th>মন্তব্য</th>
                    <th>ক্রিয়া</th>
                  </tr>
                </thead>
                <tbody>
                  {donors
                    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.mobile.includes(searchTerm))
                    .map((d, idx) => (
                      <tr key={d.id}>
                        <td className="font-mono fw-bold">{idx + 1}</td>
                        <td className="text-start fw-bold text-dark">{d.name}</td>
                        <td className="text-muted small">{d.fatherName}</td>
                        <td className="font-mono">{d.mobile}</td>
                        <td className="text-start small">{d.address}</td>
                        <td><span className="badge bg-primary-subtle text-primary">{d.donationType}</span></td>
                        <td className="text-end font-mono fw-bold text-success">৳ {d.totalDonated.toLocaleString('en-IN')}</td>
                        <td className="small text-muted">{d.note || '-'}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setDonationForm(prev => ({
                                  ...prev,
                                  donorName: d.name,
                                  mobile: d.mobile,
                                  address: d.address,
                                  category: d.donationType
                                }));
                                setActiveMode('create');
                              }}
                              className="btn btn-sm btn-outline-success px-2 py-0.5"
                            >
                              দান গ্রহণ
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDonorId(d.id);
                                setActiveMode('individual');
                              }}
                              className="btn btn-sm btn-outline-primary px-2 py-0.5"
                            >
                              স্টেটমেন্ট
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

      {/* VIEW 2: Donation Create Form (দান গ্রহণ) */}
      {activeMode === 'create' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-hand-holding-dollar text-success me-2"></i>
              দান ও অনুদান গ্রহণ ফরম (Donation Entry)
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleDonationSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">দানকারীর নাম *</label>
                <input
                  type="text"
                  value={donationForm.donorName}
                  onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                  placeholder="উদা: আলহাজ্ব দেলোয়ার হোসেন"
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small">কোন মাসে দিচ্ছে *</label>
                <select
                  value={donationForm.month}
                  onChange={(e) => setDonationForm({ ...donationForm, month: e.target.value })}
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
                  value={donationForm.year}
                  onChange={(e) => setDonationForm({ ...donationForm, year: e.target.value })}
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
                  value={donationForm.date}
                  onChange={(e) => setDonationForm({ ...donationForm, date: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">জমার ধরন / ফান্ড *</label>
                <select
                  value={donationForm.category}
                  onChange={(e) => setDonationForm({ ...donationForm, category: e.target.value })}
                  className="form-select"
                >
                  <option value="সাধারণ দান">সাধারণ দান</option>
                  <option value="মসজিদ ফান্ড">মসজিদ ফান্ড</option>
                  <option value="উন্নয়ন ফান্ড">উন্নয়ন ফান্ড</option>
                  <option value="এতিম তহবিল">এতিম তহবিল</option>
                  <option value="এককালীন অনুদান">এককালীন অনুদান</option>
                  <option value="সদকা ও মেহমানদারি">সদকা ও মেহমানদারি</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold small">পেমেন্ট একাউন্ট *</label>
                <select
                  value={donationForm.account}
                  onChange={(e) => setDonationForm({ ...donationForm, account: e.target.value })}
                  className="form-select"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">দানের পরিমাণ (টাকা) *</label>
                <div className="input-group">
                  <span className="input-group-text">৳</span>
                  <input
                    type="number"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                    placeholder="5000"
                    className="form-control font-mono fw-bold text-success fs-6"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">গ্রহণকারী *</label>
                <select
                  value={donationForm.receiver}
                  onChange={(e) => setDonationForm({ ...donationForm, receiver: e.target.value })}
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
                  value={donationForm.note}
                  onChange={(e) => setDonationForm({ ...donationForm, note: e.target.value })}
                  placeholder="দানের কারণ বা বিশেষ বিবরণ..."
                  className="form-control"
                />
              </div>

              <div className="col-12 mt-4 pt-2 border-top text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                >
                  <i className="fa-solid fa-check-circle"></i>
                  দান জমা করুন ও রসিদ প্রিন্ট
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 3: Individual Donor Statement (একক ভাবে) */}
      {activeMode === 'individual' && (
        <div className="space-y-4">
          <div className="card shadow-sm border-0 no-print">
            <div className="card-header bg-white py-3 border-bottom">
              <h6 className="mb-0 fw-bold text-dark">দানকারীর তালিকা (একক ভাবে)</h6>
            </div>
            <div className="card-body bg-light py-3">
              <div className="row g-3 align-items-end">
                <div className="col-md-6">
                  <label className="form-label fw-bold small">দানকারী নির্বাচন করুন</label>
                  <select
                    value={selectedDonorId}
                    onChange={(e) => setSelectedDonorId(e.target.value)}
                    className="form-select"
                  >
                    {donors.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.mobile}) - মোট: ৳{d.totalDonated}
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
                    <i className="fa-solid fa-print me-1"></i> স্টেটমেন্ট প্রিন্ট
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
                      সর্বমোট দান: ৳ {currentIndividualDonor.totalDonated.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <h6 className="fw-bold mb-3">দান ও অনুদানের পূর্ববর্তী রেকর্ডসমূহ:</h6>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle text-center text-sm mb-0">
                    <thead className="table-light">
                      <tr className="fw-bold">
                        <th>ভাউচার নং</th>
                        <th>তারিখ</th>
                        <th>খাত</th>
                        <th>বিবরণ</th>
                        <th className="text-end">পরিমাণ</th>
                        <th>রসিদ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono text-primary fw-bold">JV-2026-DON</td>
                        <td className="font-mono">{currentIndividualDonor.lastDonationDate}</td>
                        <td><span className="badge bg-primary-subtle text-primary">{currentIndividualDonor.donationType}</span></td>
                        <td className="text-start">{currentIndividualDonor.note || 'মাদ্রাসার উন্নয়ন ফান্ডে দান'}</td>
                        <td className="text-end font-mono fw-bold text-success">৳ {currentIndividualDonor.totalDonated.toLocaleString('en-IN')}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedReceiptForPrint({
                                id: currentIndividualDonor.id,
                                type: 'deposit',
                                voucherNo: 'JV-2026-DON',
                                date: currentIndividualDonor.lastDonationDate,
                                receiver: 'মাহমুদুল করিম',
                                account: 'নগদ ক্যাশ (Hand Cash)',
                                donorOrStudent: `${currentIndividualDonor.name} (${currentIndividualDonor.mobile})`,
                                items: [{ category: currentIndividualDonor.donationType, description: currentIndividualDonor.donationType, amount: currentIndividualDonor.totalDonated }],
                                totalAmount: currentIndividualDonor.totalDonated,
                                note: currentIndividualDonor.note
                              });
                            }}
                            className="btn btn-sm btn-outline-primary px-2 py-0.5"
                          >
                            রসিদ
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: All Donors Consolidated (দানকারীর তালিকা সকল) */}
      {activeMode === 'all' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark">
              দানকারীর তালিকা (সকল) সন ২০২৬ ইং
            </h6>
            <button onClick={() => window.print()} className="btn btn-sm btn-info text-white fw-bold">
              <i className="fa-solid fa-print me-1"></i> প্রিন্ট করুন
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover align-middle mb-0 text-center text-sm">
                <thead className="table-light">
                  <tr className="fw-bold">
                    <th style={{ width: '45px' }}>নং</th>
                    <th className="text-start">দানকারীর নাম</th>
                    <th>পিতা / অভিভাবক</th>
                    <th>মোবাইল নম্বর</th>
                    <th>ঠিকানা</th>
                    <th>খাত</th>
                    <th className="text-end">সর্বমোট দান</th>
                    <th>সর্বশেষ অনুদানের তারিখ</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((d, idx) => (
                    <tr key={d.id}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="text-start fw-bold text-dark">{d.name}</td>
                      <td className="text-muted small">{d.fatherName}</td>
                      <td className="font-mono text-primary">{d.mobile}</td>
                      <td className="text-start small">{d.address}</td>
                      <td><span className="badge bg-light text-dark border">{d.donationType}</span></td>
                      <td className="text-end font-mono fw-bold text-success fs-6">৳ {d.totalDonated.toLocaleString('en-IN')}</td>
                      <td className="font-mono text-muted">{d.lastDonationDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: Donation Receipts List (দান গ্রহণের লিস্ট) */}
      {activeMode === 'history' && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <i className="fa-solid fa-receipt text-primary me-2"></i>
              দান গ্রহণের ভাউচার লিস্ট
            </h6>
            <button
              onClick={() => setActiveMode('create')}
              className="btn btn-sm btn-primary text-white fw-bold"
            >
              <i className="fa-solid fa-plus me-1"></i> নতুন দান গ্রহণ
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
                    <th>খাত</th>
                    <th>তারিখ</th>
                    <th className="text-end">দানের পরিমাণ</th>
                    <th>হিসাব মাধ্যম</th>
                    <th>গ্রহণকারী</th>
                    <th>স্লিপ</th>
                  </tr>
                </thead>
                <tbody>
                  {donationTransactions.map((t, idx) => (
                    <tr key={t.id || idx}>
                      <td className="font-mono fw-bold">{idx + 1}</td>
                      <td className="font-mono fw-bold text-primary">{t.voucherNo}</td>
                      <td className="text-start fw-bold text-dark">{t.donorOrStudent}</td>
                      <td><span className="badge bg-info-subtle text-info">{t.items[0]?.category}</span></td>
                      <td className="font-mono">{t.date}</td>
                      <td className="text-end font-mono fw-bold text-success">৳ {t.totalAmount}</td>
                      <td><span className="badge bg-light text-dark border">{t.account}</span></td>
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
