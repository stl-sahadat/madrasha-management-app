import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SettingsModule = ({ initialTab = 'institute' }) => {
  const {
    profile,
    setProfile,
    depositCategories,
    addDepositCategory,
    updateDepositCategory,
    deleteDepositCategory,
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    jamats,
    addJamat,
    updateJamat,
    deleteJamat,
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    receivers,
    addReceiver,
    updateReceiver,
    deleteReceiver,
    roles,
    addRole,
    updateRole,
    deleteRole,
    users,
    addUser,
    updateUser,
    deleteUser,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [profileData, setProfileData] = useState({ ...profile });

  // Creation form states
  const [newJamatName, setNewJamatName] = useState('');
  const [newPaymentName, setNewPaymentName] = useState('');
  const [newDepCategory, setNewDepCategory] = useState('');
  const [newExpCategory, setNewExpCategory] = useState('');
  const [newReceiver, setNewReceiver] = useState({ name: '', phone: '' });
  const [newRole, setNewRole] = useState({ name: '', desc: '' });
  const [newUser, setNewUser] = useState({ name: '', username: '', role: 'Teacher', phone: '' });

  // Unified Edit Modal State
  // { type: 'jamat'|'payment'|'depCat'|'expCat'|'receiver'|'role'|'user', data: {...} }
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setProfileData({ ...profile });
  }, [profile]);

  // Open Edit Modal
  const handleOpenEdit = (type, data) => {
    setEditingItem({ type, data });
    if (type === 'jamat') {
      setEditForm({ name: data.name || '' });
    } else if (type === 'payment') {
      setEditForm({ oldName: data, name: data });
    } else if (type === 'depCat') {
      setEditForm({ oldName: data, name: data });
    } else if (type === 'expCat') {
      setEditForm({ oldName: data, name: data });
    } else if (type === 'receiver') {
      setEditForm({ name: data.name || '', phone: data.phone || '' });
    } else if (type === 'role') {
      setEditForm({ name: data.name || '', desc: data.desc || '' });
    } else if (type === 'user') {
      setEditForm({
        name: data.name || '',
        username: data.username || '',
        role: data.role || 'Teacher',
        phone: data.phone || ''
      });
    }
  };

  // Submit Edit Modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const { type, data } = editingItem;

    if (type === 'jamat') {
      if (updateJamat) updateJamat(data.id, editForm.name);
    } else if (type === 'payment') {
      if (updatePaymentMethod) updatePaymentMethod(editForm.oldName, editForm.name);
    } else if (type === 'depCat') {
      if (updateDepositCategory) updateDepositCategory(editForm.oldName, editForm.name);
    } else if (type === 'expCat') {
      if (updateExpenseCategory) updateExpenseCategory(editForm.oldName, editForm.name);
    } else if (type === 'receiver') {
      if (updateReceiver) updateReceiver(data.id, { name: editForm.name, phone: editForm.phone });
    } else if (type === 'role') {
      if (updateRole) updateRole(data.id, { name: editForm.name, desc: editForm.desc });
    } else if (type === 'user') {
      if (updateUser) updateUser(data.id, {
        name: editForm.name,
        username: editForm.username,
        role: editForm.role,
        phone: editForm.phone
      });
    }

    setEditingItem(null);
  };

  // Handlers for Adding
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfile(profileData);
    showToast('মাদ্রাসা প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
  };

  const handleAddJamatSubmit = (e) => {
    e.preventDefault();
    if (!newJamatName.trim()) return;
    if (addJamat) addJamat(newJamatName.trim());
    setNewJamatName('');
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    if (!newPaymentName.trim()) return;
    if (addPaymentMethod) addPaymentMethod(newPaymentName.trim());
    setNewPaymentName('');
  };

  const handleAddDepCatSubmit = (e) => {
    e.preventDefault();
    if (!newDepCategory.trim()) return;
    if (addDepositCategory) addDepositCategory(newDepCategory.trim());
    setNewDepCategory('');
  };

  const handleAddExpCatSubmit = (e) => {
    e.preventDefault();
    if (!newExpCategory.trim()) return;
    if (addExpenseCategory) addExpenseCategory(newExpCategory.trim());
    setNewExpCategory('');
  };

  const handleAddReceiverSubmit = (e) => {
    e.preventDefault();
    if (!newReceiver.name.trim()) return;
    if (addReceiver) addReceiver({ name: newReceiver.name.trim(), phone: newReceiver.phone.trim() });
    setNewReceiver({ name: '', phone: '' });
  };

  const handleAddRoleSubmit = (e) => {
    e.preventDefault();
    if (!newRole.name.trim()) return;
    if (addRole) addRole({ name: newRole.name.trim(), desc: newRole.desc.trim() });
    setNewRole({ name: '', desc: '' });
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

      {/* 1. INSTITUTE PROFILE */}
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
                  <label className="form-label fw-bold">মোবাইল নম্বর *</label>
                  <input
                    type="text"
                    className="form-control font-monospace"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">ইমেইল</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.email || ''}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">মুহতামিম / প্রধান শিক্ষকের নাম</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.principalName || ''}
                    onChange={(e) => setProfileData({ ...profileData, principalName: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">স্লোগান / বাণী</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.slogan || ''}
                    onChange={(e) => setProfileData({ ...profileData, slogan: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">মাদ্রাসার ব্যানার (প্রিন্ট হেড)</label>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={profileData.banner || '/storage/institute/banners/Nn41tAOrEkJExjPWHQgOL8DElvFavVh1oR3RVNJq.jpg'}
                      alt="Banner Preview"
                      className="img-thumbnail"
                      style={{ maxHeight: '60px', maxWidth: '180px', objectFit: 'contain' }}
                    />
                    <label className="btn btn-outline-primary btn-sm mb-0">
                      <i className="fa-solid fa-upload me-1"></i> ব্যানার পরিবর্তন
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setProfileData({ ...profileData, banner: ev.target.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">মাদ্রাসার লোগো</label>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={profileData.logo || '/storage/institute/logos/3kzAKNfcQQrk9Zh5YJC02lWsjNO3QhcDRHKmHDAx.png'}
                      alt="Logo Preview"
                      className="img-thumbnail"
                      style={{ maxHeight: '60px', maxWidth: '60px', objectFit: 'contain' }}
                    />
                    <label className="btn btn-outline-primary btn-sm mb-0">
                      <i className="fa-solid fa-upload me-1"></i> লোগো পরিবর্তন
                      <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setProfileData({ ...profileData, logo: ev.target.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary px-4 fw-bold">
                  <i className="fa-solid fa-save me-1"></i> প্রোফাইল সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. JAMAT SETTINGS (2-Column Side-by-Side Layout) */}
      {activeTab === 'jamat' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন জামাত তৈরি</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddJamatSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">জামাতের নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="জামাতের নাম লিখুন"
                      value={newJamatName}
                      onChange={(e) => setNewJamatName(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>সকল জামাতের তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>জামাতের নাম</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jamats.map((j, idx) => (
                        <tr key={j.id || idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{j.name}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('jamat', j)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('আপনি কি এই জামাতটি মুছে ফেলতে চান?')) {
                                  deleteJamat(j.id);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="ডিলিট"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* 3. PAYMENT METHOD (2-Column Side-by-Side Layout) */}
      {activeTab === 'payment' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন পেমেন্ট মাধ্যম</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddPaymentSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">পেমেন্ট মেথডের নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="যেমন: নগদ, ব্যাংক, বিকাশ"
                      value={newPaymentName}
                      onChange={(e) => setNewPaymentName(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>পেমেন্ট মাধ্যমের তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>পেমেন্ট মাধ্যম</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentMethods.map((p, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{p}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('payment', p)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('আপনি কি এই পেমেন্ট মেথডটি মুছতে চান?')) {
                                  deletePaymentMethod(p);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="ডিলিট"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* 4. DEPOSIT CATEGORY (2-Column Side-by-Side Layout) */}
      {activeTab === 'deposit-cat' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন জমার খাত</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddDepCatSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">জমার খাতের নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="খাতের নাম লিখুন"
                      value={newDepCategory}
                      onChange={(e) => setNewDepCategory(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>জমার খাতের তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>খাতের নাম</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depositCategories.map((cat, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{cat}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('depCat', cat)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`আপনি কি "${cat}" খাতটি মুছে ফেলতে চান?`)) {
                                  deleteDepositCategory(cat);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="মুছে ফেলুন"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* 5. EXPENSE CATEGORY (2-Column Side-by-Side Layout) */}
      {activeTab === 'expense-cat' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন খরচের খাত</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddExpCatSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">খরচের খাতের নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="খাতের নাম লিখুন"
                      value={newExpCategory}
                      onChange={(e) => setNewExpCategory(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>খরচের খাতের তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>খাতের নাম</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseCategories.map((cat, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{cat}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('expCat', cat)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`আপনি কি "${cat}" খাতটি মুছে ফেলতে চান?`)) {
                                  deleteExpenseCategory(cat);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="মুছে ফেলুন"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* 6. RECEIVER (2-Column Side-by-Side Layout) */}
      {activeTab === 'receiver' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন গ্রহণকারী</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddReceiverSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">গ্রহণকারীর নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="নাম লিখুন"
                      value={newReceiver.name}
                      onChange={(e) => setNewReceiver({ ...newReceiver, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      placeholder="০১৮..."
                      value={newReceiver.phone}
                      onChange={(e) => setNewReceiver({ ...newReceiver, phone: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>গ্রহণকারীর তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>নাম</th>
                        <th>মোবাইল নম্বর</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivers.map((r, idx) => (
                        <tr key={r.id || idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{r.name}</td>
                          <td className="font-monospace">{r.phone || '-'}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('receiver', r)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('আপনি কি এই গ্রহণকারীকে মুছে ফেলতে চান?')) {
                                  deleteReceiver(r.id);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="ডিলিট"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* 7. ROLE (2-Column Side-by-Side Layout) */}
      {activeTab === 'role' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন রোল যোগ করুন</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddRoleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">রোলের নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="রোলের নাম লিখুন"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">বিবরণ</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="বিবরণ লিখুন"
                      value={newRole.desc}
                      onChange={(e) => setNewRole({ ...newRole, desc: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>রোল (Role) তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>রোল</th>
                        <th>বিবরণ</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((ro, idx) => (
                        <tr key={ro.id || idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{ro.name}</td>
                          <td className="text-muted small">{ro.desc}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('role', ro)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('আপনি কি এই রোলটি মুছে ফেলতে চান?')) {
                                  deleteRole(ro.id);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="ডিলিট"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* 8. USER (2-Column Side-by-Side Layout) */}
      {activeTab === 'user' && (
        <div className="row">
          <div className="col-lg-4 col-md-5 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <h6 className="mb-0 fw-bold"><i className="fas fa-plus me-2"></i>নতুন ইউজার যোগ করুন</h6>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleAddUserSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">ইউজারের নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="নাম লিখুন"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">ইউজারনেম / ইমেইল <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      placeholder="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
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
                  <div className="mb-3">
                    <label className="form-label fw-bold">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      placeholder="01..."
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    <i className="fas fa-save me-1"></i> সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-7 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-primary"><i className="fas fa-list me-2"></i>ইউজারের তালিকা</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>নং</th>
                        <th>নাম</th>
                        <th>ইউজারনেম</th>
                        <th>রোল</th>
                        <th>মোবাইল</th>
                        <th style={{ width: '150px' }}>কার্যক্রম</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, idx) => (
                        <tr key={u.id || idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold">{u.name}</td>
                          <td className="font-monospace">{u.username}</td>
                          <td>
                            <span className="badge bg-primary">{u.role}</span>
                          </td>
                          <td className="font-monospace">{u.phone || '-'}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit('user', u)}
                              className="btn btn-sm btn-primary me-1"
                              title="এডিট"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('আপনি কি এই ইউজারকে মুছে ফেলতে চান?')) {
                                  deleteUser(u.id);
                                }
                              }}
                              className="btn btn-sm btn-danger delete-btn"
                              title="ডিলিট"
                            >
                              <i className="fas fa-trash"></i>
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
        </div>
      )}

      {/* Universal Dynamic Edit Modal for Settings */}
      {editingItem && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog">
            <form onSubmit={handleEditSubmit} className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <i className="fa-solid fa-pen-to-square me-2"></i>
                  {editingItem.type === 'jamat' && 'জামাতের নাম সম্পাদন'}
                  {editingItem.type === 'payment' && 'পেমেন্ট মেথড সম্পাদন'}
                  {editingItem.type === 'depCat' && 'জমার খাত সম্পাদন'}
                  {editingItem.type === 'expCat' && 'খরচের খাত সম্পাদন'}
                  {editingItem.type === 'receiver' && 'গ্রহণকারীর তথ্য সম্পাদন'}
                  {editingItem.type === 'role' && 'রোলের বিবরণ সম্পাদন'}
                  {editingItem.type === 'user' && 'ইউজারের তথ্য সম্পাদন'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditingItem(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                {/* For single-name items: jamat, payment, depCat, expCat */}
                {(['jamat', 'payment', 'depCat', 'expCat'].includes(editingItem.type)) && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">নাম <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                    />
                  </div>
                )}

                {/* Receiver */}
                {editingItem.type === 'receiver' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-bold">গ্রহণকারীর নাম <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">মোবাইল নম্বর</label>
                      <input
                        type="text"
                        className="form-control font-monospace"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Role */}
                {editingItem.type === 'role' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-bold">রোলের নাম <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">বিবরণ</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={editForm.desc || ''}
                        onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                      ></textarea>
                    </div>
                  </>
                )}

                {/* User */}
                {editingItem.type === 'user' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label fw-bold">ইউজারের নাম <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">ইউজারনেম / ইমেইল <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control font-monospace"
                        value={editForm.username || ''}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">রোল</label>
                      <select
                        className="form-select"
                        value={editForm.role || 'Teacher'}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">মোবাইল নম্বর</label>
                      <input
                        type="text"
                        className="form-control font-monospace"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingItem(null)}
                >
                  বাতিল
                </button>
                <button type="submit" className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-save me-1"></i> আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
