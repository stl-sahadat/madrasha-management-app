import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SettingsModule = ({ initialTab = 'institute' }) => {
  const {
    profile,
    setProfile,
    depositCategories,
    setDepositCategories,
    expenseCategories,
    setExpenseCategories,
    jamats,
    setJamats,
    accounts,
    receivers,
    setReceivers,
    showToast,
    users,
    addUser
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [profileData, setProfileData] = useState({ ...profile });

  // Toggle create forms
  const [showJamatForm, setShowJamatForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showDepCatForm, setShowDepCatForm] = useState(false);
  const [showExpCatForm, setShowExpCatForm] = useState(false);
  const [showReceiverForm, setShowReceiverForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  // Form Fields
  const [newJamatName, setNewJamatName] = useState('');
  const [newPaymentName, setNewPaymentName] = useState('');
  const [paymentMethods, setPaymentMethods] = useState(['নগদ (Cash)', 'বিকাশ (bKash)', 'ব্যাংক একাউন্ট', 'রকেট (Rocket)']);
  const [newDepCategory, setNewDepCategory] = useState('');
  const [newExpCategory, setNewExpCategory] = useState('');
  const [newReceiverName, setNewReceiverName] = useState('');
  const [newReceiverPhone, setNewReceiverPhone] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', desc: 'মাদ্রাসার সমস্ত মডিউল, সেটিংস ও আর্থিক ডেটাতে পূর্ণ নিয়ন্ত্রণ' },
    { id: 2, name: 'Accountant / Cashier', desc: 'ভাউচার এন্ট্রি, ফি কালেকশন ও রিপোর্ট দেখার অনুমতি' },
    { id: 3, name: 'Teacher', desc: 'হাজিরা গ্রহণ এবং পরীক্ষা নম্বর এন্ট্রি করার অনুমতি' },
    { id: 4, name: 'Staff', desc: 'শুধুমাত্র নির্ধারিত ডেটা এন্ট্রি করার অনুমতি' }
  ]);
  const [newUser, setNewUser] = useState({ name: '', username: '', role: 'Teacher', phone: '' });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfile(profileData);
    showToast('মাদ্রাসা প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
  };

  const handleAddJamat = (e) => {
    e.preventDefault();
    if (!newJamatName.trim()) return;
    const newJ = {
      id: `jamat-${Date.now()}`,
      name: newJamatName.trim(),
      count: 0
    };
    setJamats([...jamats, newJ]);
    setNewJamatName('');
    setShowJamatForm(false);
    showToast(`নতুন জামাত "${newJ.name}" সফলভাবে যোগ করা হয়েছে!`);
  };

  const handleRemoveJamat = (id) => {
    if (confirm('আপনি কি নিশ্চিত যে এই জামাতটি মুছে ফেলতে চান?')) {
      setJamats(jamats.filter(j => j.id !== id));
      showToast('জামাত মুছে ফেলা হয়েছে!');
    }
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!newPaymentName.trim()) return;
    setPaymentMethods([...paymentMethods, newPaymentName.trim()]);
    setNewPaymentName('');
    setShowPaymentForm(false);
    showToast(`নতুন পেমেন্ট মেথড "${newPaymentName.trim()}" যোগ হয়েছে!`);
  };

  const handleRemovePayment = (name) => {
    if (confirm('আপনি কি এই পেমেন্ট মেথডটি মুছতে চান?')) {
      setPaymentMethods(paymentMethods.filter(p => p !== name));
      showToast('পেমেন্ট মেথড মুছে ফেলা হয়েছে!');
    }
  };

  const handleAddDepCat = (e) => {
    e.preventDefault();
    if (!newDepCategory.trim()) return;
    if (depositCategories.includes(newDepCategory.trim())) {
      alert('এই খাতটি ইতিমধ্যে বিদ্যমান');
      return;
    }
    setDepositCategories([...depositCategories, newDepCategory.trim()]);
    setNewDepCategory('');
    setShowDepCatForm(false);
    showToast('নতুন জমা খাত যোগ করা হয়েছে');
  };

  const handleRemoveDepCat = (catName) => {
    if (confirm(`আপনি কি "${catName}" খাতটি মুছে ফেলতে চান?`)) {
      setDepositCategories(depositCategories.filter(c => c !== catName));
      showToast('জমার খাত মুছে ফেলা হয়েছে!');
    }
  };

  const handleAddExpCat = (e) => {
    e.preventDefault();
    if (!newExpCategory.trim()) return;
    if (expenseCategories.includes(newExpCategory.trim())) {
      alert('এই খাতটি ইতিমধ্যে বিদ্যমান');
      return;
    }
    setExpenseCategories([...expenseCategories, newExpCategory.trim()]);
    setNewExpCategory('');
    setShowExpCatForm(false);
    showToast('নতুন খরচ খাত যোগ করা হয়েছে');
  };

  const handleRemoveExpCat = (catName) => {
    if (confirm(`আপনি কি "${catName}" খাতটি মুছে ফেলতে চান?`)) {
      setExpenseCategories(expenseCategories.filter(c => c !== catName));
      showToast('খরচের খাত মুছে ফেলা হয়েছে!');
    }
  };

  const handleAddReceiver = (e) => {
    e.preventDefault();
    if (!newReceiverName.trim()) return;
    const newR = {
      id: `rec-${Date.now()}`,
      name: newReceiverName.trim(),
      phone: newReceiverPhone.trim() || '01800-000000'
    };
    setReceivers([...receivers, newR]);
    setNewReceiverName('');
    setNewReceiverPhone('');
    setShowReceiverForm(false);
    showToast(`নতুন অর্থ গ্রহণকারী "${newR.name}" যুক্ত হয়েছে!`);
  };

  const handleRemoveReceiver = (id) => {
    if (confirm('আপনি কি এই গ্রহণকারীকে মুছে ফেলতে চান?')) {
      setReceivers(receivers.filter(r => r.id !== id));
      showToast('গ্রহণকারী মুছে ফেলা হয়েছে!');
    }
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    setRoles([...roles, {
      id: Date.now(),
      name: newRoleName.trim(),
      desc: newRoleDesc.trim() || 'ব্যবহারকারীর অধিকার'
    }]);
    setNewRoleName('');
    setNewRoleDesc('');
    setShowRoleForm(false);
    showToast(`নতুন রোল "${newRoleName.trim()}" তৈরি হয়েছে!`);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.username.trim()) return;
    if (addUser) {
      addUser({
        id: `user-${Date.now()}`,
        name: newUser.name.trim(),
        username: newUser.username.trim(),
        role: newUser.role,
        phone: newUser.phone.trim() || '01800-000000',
        password: 'admin1234'
      });
    }
    setNewUser({ name: '', username: '', role: 'Teacher', phone: '' });
    setShowUserForm(false);
    showToast(`নতুন ইউজার "${newUser.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Settings Navigation Pills (no-print) */}
      <div className="d-flex flex-wrap gap-1 bg-white p-2 rounded shadow-sm border mb-4 no-print">
        <button
          type="button"
          onClick={() => setActiveTab('institute')}
          className={`btn btn-sm ${activeTab === 'institute' || activeTab === 'profile' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-university me-1"></i> প্রতিষ্ঠানের তথ্য
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('jamat')}
          className={`btn btn-sm ${activeTab === 'jamat' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-layer-group me-1"></i> জামাত তৈরি
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('payment')}
          className={`btn btn-sm ${activeTab === 'payment' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-credit-card me-1"></i> পেমেন্ট মাধ্যম
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('deposit-cat')}
          className={`btn btn-sm ${activeTab === 'deposit-cat' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-arrow-down-left me-1"></i> জমার খাত
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('expense-cat')}
          className={`btn btn-sm ${activeTab === 'expense-cat' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-arrow-up-right me-1"></i> খরচের খাত
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('receiver')}
          className={`btn btn-sm ${activeTab === 'receiver' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-user-check me-1"></i> গ্রহণকারী
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('role')}
          className={`btn btn-sm ${activeTab === 'role' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-shield-halved me-1"></i> রোল (Role)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('user')}
          className={`btn btn-sm ${activeTab === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
        >
          <i className="fa-solid fa-users me-1"></i> ইউজার
        </button>
      </div>

      {/* 1. INSTITUTE PROFILE (Matches settings_institute.html) */}
      {(activeTab === 'institute' || activeTab === 'profile') && (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white py-3">
            <h5 className="mb-0 text-white">
              <i className="fas fa-university me-2"></i>প্রতিষ্ঠান প্রোফাইল সম্পাদনা করুন
            </h5>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleProfileSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">মাদ্রাসার নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">মাদ্রাসার নাম (ইংরেজি)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.nameEn || ''}
                    onChange={(e) => setProfileData({ ...profileData, nameEn: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">ঠিকানা / অবস্থান *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">প্রতিষ্ঠা সন</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    value={profileData.establishedYear || '১৯৯০'}
                    onChange={(e) => setProfileData({ ...profileData, establishedYear: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">অফিস মোবাইল নং ১ *</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    value={profileData.phone1}
                    onChange={(e) => setProfileData({ ...profileData, phone1: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">অফিস মোবাইল নং ২</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    value={profileData.phone2 || ''}
                    onChange={(e) => setProfileData({ ...profileData, phone2: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.email || ''}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">ওয়েবসাইট ইউআরএল</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.website || ''}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-save me-1"></i> তথ্য সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. JAMAT SETTINGS (Matches settings_jamat.html) */}
      {activeTab === 'jamat' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">জামাত তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowJamatForm(!showJamatForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showJamatForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddJamat}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label htmlFor="jamatName" className="form-label fw-bold">নতুন জামাত</label>
                    <input
                      type="text"
                      className="form-control"
                      id="jamatName"
                      placeholder="জামাতের নাম লিখুন"
                      value={newJamatName}
                      onChange={(e) => setNewJamatName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowJamatForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th>জামাত</th>
                    <th width="200">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {jamats.map((j) => (
                    <tr key={j.id}>
                      <td className="align-middle fw-bold">{j.name}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveJamat(j.id)}
                          className="btn btn-sm btn-danger delete-btn"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i> মুছে ফেলুন
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

      {/* 3. PAYMENT METHOD (Matches settings_payment.html) */}
      {activeTab === 'payment' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">পেমেন্ট মেথড তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowPaymentForm(!showPaymentForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showPaymentForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddPayment}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label className="form-label fw-bold">পেমেন্ট মেথডের নাম</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="যেমন: নগদ, ব্যাংক"
                      value={newPaymentName}
                      onChange={(e) => setNewPaymentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowPaymentForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th>পেমেন্ট মাধ্যম</th>
                    <th width="200">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((p, idx) => (
                    <tr key={idx}>
                      <td className="align-middle fw-bold">{p}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemovePayment(p)}
                          className="btn btn-sm btn-danger delete-btn"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i> মুছে ফেলুন
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

      {/* 4. DEPOSIT CATEGORY (Matches settings_deposit_category.html) */}
      {activeTab === 'deposit-cat' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">জমার খাতের তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowDepCatForm(!showDepCatForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showDepCatForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddDepCat}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label className="form-label fw-bold">জমার খাত</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="খাতের নাম লিখুন"
                      value={newDepCategory}
                      onChange={(e) => setNewDepCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowDepCatForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th width="80">নং</th>
                    <th>খাতের নাম</th>
                    <th width="200">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {depositCategories.map((cat, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="align-middle fw-bold">{cat}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveDepCat(cat)}
                          className="btn btn-sm btn-danger delete-btn"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i> মুছে ফেলুন
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

      {/* 5. EXPENSE CATEGORY (Matches settings_expense_category.html) */}
      {activeTab === 'expense-cat' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">খরচের খাতের তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowExpCatForm(!showExpCatForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showExpCatForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddExpCat}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-8">
                    <label className="form-label fw-bold">খরচের খাত</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="খাতের নাম লিখুন"
                      value={newExpCategory}
                      onChange={(e) => setNewExpCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowExpCatForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th width="80">নং</th>
                    <th>খাতের নাম</th>
                    <th width="200">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseCategories.map((cat, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="align-middle fw-bold">{cat}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveExpCat(cat)}
                          className="btn btn-sm btn-danger delete-btn"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i> মুছে ফেলুন
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

      {/* 6. RECEIVER (Matches settings_receiver.html) */}
      {activeTab === 'receiver' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">গ্রহণকারীর তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowReceiverForm(!showReceiverForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showReceiverForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddReceiver}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">গ্রহণকারীর নাম</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="নাম লিখুন"
                      value={newReceiverName}
                      onChange={(e) => setNewReceiverName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      placeholder="০১৮..."
                      value={newReceiverPhone}
                      onChange={(e) => setNewReceiverPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowReceiverForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th>নাম</th>
                    <th>মোবাইল নম্বর</th>
                    <th width="200">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {receivers.map((r) => (
                    <tr key={r.id}>
                      <td className="align-middle fw-bold">{r.name}</td>
                      <td className="align-middle font-monospace">{r.phone || '-'}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveReceiver(r.id)}
                          className="btn btn-sm btn-danger delete-btn"
                          title="ডিলিট"
                        >
                          <i className="fa-solid fa-trash"></i> মুছে ফেলুন
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

      {/* 7. ROLE (Matches settings_role.html) */}
      {activeTab === 'role' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">রোল (Role) তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowRoleForm(!showRoleForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showRoleForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddRole}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">রোলের নাম</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="রোলের নাম লিখুন"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">বিবরণ</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="বিবরণ লিখুন"
                      value={newRoleDesc}
                      onChange={(e) => setNewRoleDesc(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowRoleForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th>রোল</th>
                    <th>বিবরণ</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((ro) => (
                    <tr key={ro.id}>
                      <td className="align-middle fw-bold">{ro.name}</td>
                      <td className="align-middle text-muted">{ro.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 8. USER (Matches settings_user.html) */}
      {activeTab === 'user' && (
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">ইউজারের তালিকা</h5>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowUserForm(!showUserForm)}
              >
                <i className="fas fa-plus me-1"></i> নতুন যোগ করুন
              </button>
            </div>
          </div>

          {showUserForm && (
            <div className="card-body border-bottom bg-light">
              <form onSubmit={handleAddUserSubmit}>
                <div className="row g-3 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label fw-bold">ইউজারের নাম</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="নাম লিখুন"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-bold">ইউজারনেম / ইমেইল</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      placeholder="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-bold">রোল</label>
                    <select
                      className="form-select"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <button type="submit" className="btn btn-success me-2">
                      <i className="fas fa-check me-1"></i> সংরক্ষণ
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowUserForm(false)}
                    >
                      বাতিল
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mb-0 text-center">
                <thead className="table bg-primary text-white">
                  <tr>
                    <th>নাম</th>
                    <th>ইউজারনেম</th>
                    <th>রোল</th>
                    <th>মোবাইল</th>
                  </tr>
                </thead>
                <tbody>
                  {(users || [
                    { id: 1, name: 'Super Admin', username: 'admin@gmail.com', role: 'Super Admin', phone: '01820050095' },
                    { id: 2, name: 'Maulana Mahmudul Karim', username: 'karim@gmail.com', role: 'Teacher', phone: '01711288382' }
                  ]).map((u) => (
                    <tr key={u.id}>
                      <td className="align-middle fw-bold">{u.name}</td>
                      <td className="align-middle font-monospace">{u.username}</td>
                      <td className="align-middle">
                        <span className="badge bg-primary">{u.role}</span>
                      </td>
                      <td className="align-middle font-monospace">{u.phone || '-'}</td>
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
