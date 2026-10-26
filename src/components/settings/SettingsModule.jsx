import React, { useState } from 'react';
import {
  Settings,
  Building,
  ListPlus,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Users,
  CreditCard,
  Layers,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
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

  // Category States
  const [newDepCategory, setNewDepCategory] = useState('');
  const [newExpCategory, setNewExpCategory] = useState('');

  // Jamat State
  const [jamatList, setJamatList] = useState([...jamats]);
  const [newJamatName, setNewJamatName] = useState('');
  const [newJamatFee, setNewJamatFee] = useState('500');

  // Receiver State
  const [receiverList, setReceiverList] = useState([...receivers]);
  const [newReceiverName, setNewReceiverName] = useState('');
  const [newReceiverPhone, setNewReceiverPhone] = useState('');

  // Users & Roles State
  const usersList = users || [];
  const [newUser, setNewUser] = useState({ name: '', username: '', role: 'Teacher', phone: '' });


  const roles = [
    { name: 'Super Admin', desc: 'মাদ্রাসার সমস্ত মডিউল, সেটিংস ও আর্থিক ডেটাতে পূর্ণ নিয়ন্ত্রণ' },
    { name: 'Accountant / Cashier', desc: 'ভাউচার এন্ট্রি, ফি কালেকশন ও রিপোর্ট দেখার অনুমতি' },
    { name: 'Teacher', desc: 'হাজিরা গ্রহণ এবং পরীক্ষা নম্বর এন্ট্রি করার অনুমতি' },
    { name: 'Staff', desc: 'শুধুমাত্র নির্ধারিত ডেটা এন্ট্রি করার অনুমতি' }
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfile(profileData);
    showToast('মাদ্রাসা প্রোফাইল সফলভাবে আপডেট করা হয়েছে!');
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
    showToast('নতুন জমা খাত যোগ করা হয়েছে');
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
    showToast('নতুন খরচ খাত যোগ করা হয়েছে');
  };

  const handleRemoveDepCat = (catName) => {
    setDepositCategories(depositCategories.filter(c => c !== catName));
  };

  const handleRemoveExpCat = (catName) => {
    setExpenseCategories(expenseCategories.filter(c => c !== catName));
  };

  const handleAddJamat = (e) => {
    e.preventDefault();
    if (!newJamatName.trim()) return;
    const newJ = {
      id: `jamat-${Date.now()}`,
      name: newJamatName.trim(),
      monthlyFee: Number(newJamatFee) || 500,
      totalStudents: 0
    };
    const updated = [...jamatList, newJ];
    setJamatList(updated);
    if (setJamats) setJamats(updated);
    setNewJamatName('');
    showToast(`নতুন জামাত "${newJ.name}" তৈরি করা হয়েছে`);
  };

  const handleAddReceiver = (e) => {
    e.preventDefault();
    if (!newReceiverName.trim()) return;
    const newRec = {
      id: `rec-${Date.now()}`,
      name: newReceiverName.trim(),
      phone: newReceiverPhone.trim() || '01800-000000'
    };
    const updated = [...receiverList, newRec];
    setReceiverList(updated);
    if (setReceivers) setReceivers(updated);
    setNewReceiverName('');
    setNewReceiverPhone('');
    showToast(`নতুন গ্রহণকারী "${newRec.name}" যুক্ত করা হয়েছে`);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.username.trim()) return;
    const cleanUsername = newUser.username.trim().toLowerCase();
    const email = `${cleanUsername}@gmail.com`;
    if (addUser) {
      addUser({
        name: newUser.name.trim(),
        username: cleanUsername,
        email: email,
        role: newUser.role,
        phone: newUser.phone.trim() || '01800-000000',
        password: 'admin1234'
      });
    }
    setNewUser({ name: '', username: '', role: 'Teacher', phone: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <Settings className="w-6 h-6 text-[#0f626a]" />
            <span>সিস্টেম সেটিংস ও কনফিগারেশন (Settings)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            প্রতিষ্ঠানের প্রোফাইল, জামাত, পেমেন্ট মেথড, জমা-খরচ খাত ও ইউজার রোল পরিচালনা
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1.5 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('institute')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'institute' || activeTab === 'profile' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            প্রতিষ্ঠানের তথ্য
          </button>
          <button
            onClick={() => setActiveTab('jamat')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'jamat' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            জামাত তৈরি
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'payment' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            পেমেন্ট মাধ্যম
          </button>
          <button
            onClick={() => setActiveTab('deposit-cat')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'deposit-cat' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            জমার খাত
          </button>
          <button
            onClick={() => setActiveTab('expense-cat')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'expense-cat' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            খরচের খাত
          </button>
          <button
            onClick={() => setActiveTab('receiver')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'receiver' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            অর্থ গ্রহণকারী
          </button>
          <button
            onClick={() => setActiveTab('role')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'role' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            রোল (Role)
          </button>
          <button
            onClick={() => setActiveTab('user')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'user' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            ইউজার
          </button>
        </div>
      </div>

      {/* 1. INSTITUTE PROFILE */}
      {(activeTab === 'institute' || activeTab === 'profile') && (
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b border-gray-100 flex items-center space-x-2">
            <Building className="w-4 h-4 text-[#0f626a]" />
            <span>মাদ্রাসার প্রাতিষ্ঠানিক তথ্য ও যোগাযোগ</span>
          </h3>

          <form onSubmit={handleProfileSubmit} className="mt-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">মাদ্রাসার নাম (বাংলায়) *</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">মাদ্রাসার নাম (ইংরেজি)</label>
                <input
                  type="text"
                  value={profileData.nameEn || ''}
                  onChange={(e) => setProfileData({ ...profileData, nameEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ঠিকানা / অবস্থান *</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">প্রতিষ্ঠা সন</label>
                <input
                  type="text"
                  value={profileData.establishedYear || '১৯৯০'}
                  onChange={(e) => setProfileData({ ...profileData, establishedYear: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">অফিস মোবাইল নং ১ *</label>
                <input
                  type="text"
                  value={profileData.phone1}
                  onChange={(e) => setProfileData({ ...profileData, phone1: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">অফিস মোবাইল নং ২</label>
                <input
                  type="text"
                  value={profileData.phone2 || ''}
                  onChange={(e) => setProfileData({ ...profileData, phone2: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  value={profileData.email || ''}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ওয়েবসাইট ইউআরএল</label>
                <input
                  type="text"
                  value={profileData.website || ''}
                  onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow transition flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>মাদ্রাসা তথ্য সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 2. JAMAT SETTINGS */}
      {activeTab === 'jamat' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
            <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#0f626a]" />
              <span>নতুন জামাত তৈরি ফরম</span>
            </h3>

            <form onSubmit={handleAddJamat} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">জামাতের নাম *</label>
                <input
                  type="text"
                  value={newJamatName}
                  onChange={(e) => setNewJamatName(e.target.value)}
                  placeholder="যেমন: মেশকাত জামাত"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">মাসিক নির্ধারিত বেতন (৳)</label>
                <input
                  type="number"
                  value={newJamatFee}
                  onChange={(e) => setNewJamatFee(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow transition flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>জামাত তৈরি করুন</span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#f0f9fa] border-b">
              <h3 className="font-bold text-sm text-[#082f32]">সকল জামাত তালিকা ({jamatList.length} টি)</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b font-bold text-gray-800">
                <tr>
                  <th className="py-2.5 px-4">ক্রমিক</th>
                  <th className="py-2.5 px-4">জামাতের নাম</th>
                  <th className="py-2.5 px-4 text-center">মাসিক বেতন (টাকা ৳)</th>
                  <th className="py-2.5 px-4 text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jamatList.map((j, idx) => (
                  <tr key={j.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-mono text-gray-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-bold text-gray-800">{j.name}</td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold text-[#0f626a]">৳ {j.monthlyFee}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">সক্রিয়</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PAYMENT METHODS */}
      {activeTab === 'payment' && (
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-bold text-sm text-[#082f32] flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-[#0f626a]" />
                <span>পেমেন্ট মাধ্যম ও অ্যাকাউন্ট তালিকা</span>
              </h3>
              <p className="text-xs text-gray-500">লেনদেন গ্রহণের জন্য অনুমোদিত অর্থ পরিশোধ মাধ্যম</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map(acc => (
              <div key={acc.id} className="p-4 border rounded-2xl bg-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-100 text-[#0f626a] rounded-full uppercase">
                    {acc.type}
                  </span>
                  <h4 className="font-bold text-sm text-gray-800 mt-1">{acc.name}</h4>
                  <p className="text-xs text-gray-500 font-mono">ব্যালেন্স: ৳ {acc.balance.toLocaleString()}</p>
                </div>
                <span className="text-emerald-700 text-xs font-bold flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>সক্রিয় মাধ্যম</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DEPOSIT CATEGORIES */}
      {activeTab === 'deposit-cat' && (
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-bold text-sm text-[#082f32]">জমার খাতসমূহ ({depositCategories.length} টি সক্রিয় খাত)</h3>
              <p className="text-xs text-gray-500">মাদ্রাসার সমস্ত আর্থিক রাজস্ব ও অর্থ আদায়ের খাত</p>
            </div>
          </div>

          <form onSubmit={handleAddDepCat} className="flex gap-2">
            <input
              type="text"
              value={newDepCategory}
              onChange={(e) => setNewDepCategory(e.target.value)}
              placeholder="নতুন জমার খাত লিখুন (যেমন: লাইব্রেরি দান)..."
              className="flex-1 px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>খাত যোগ</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs pt-2">
            {depositCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-teal-50/40 border border-teal-100 rounded-xl">
                <span className="font-semibold text-teal-900">{idx + 1}. {cat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveDepCat(cat)}
                  className="text-gray-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. EXPENSE CATEGORIES */}
      {activeTab === 'expense-cat' && (
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b">
            <div>
              <h3 className="font-bold text-sm text-[#082f32]">খরচের খাতসমূহ ({expenseCategories.length} টি সক্রিয় খাত)</h3>
              <p className="text-xs text-gray-500">প্রতিষ্ঠানের প্রাত্যহিক ব্যয় নির্বাহের খাত</p>
            </div>
          </div>

          <form onSubmit={handleAddExpCat} className="flex gap-2">
            <input
              type="text"
              value={newExpCategory}
              onChange={(e) => setNewExpCategory(e.target.value)}
              placeholder="নতুন খরচের খাত লিখুন (যেমন: আইসিটি ও কম্পিউটার সামগ্রী)..."
              className="flex-1 px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl shadow flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>খাত যোগ</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs pt-2">
            {expenseCategories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-rose-50/30 border border-rose-100 rounded-xl">
                <span className="font-semibold text-rose-950">{idx + 1}. {cat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveExpCat(cat)}
                  className="text-gray-400 hover:text-rose-600 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. RECEIVERS */}
      {activeTab === 'receiver' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
            <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-[#0f626a]" />
              <span>নতুন অর্থ গ্রহণকারী যোগ ফরম</span>
            </h3>

            <form onSubmit={handleAddReceiver} className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">গ্রহণকারীর নাম *</label>
                <input
                  type="text"
                  value={newReceiverName}
                  onChange={(e) => setNewReceiverName(e.target.value)}
                  placeholder="যেমন: হাফেজ মোহাম্মদ জাবের"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="text"
                  value={newReceiverPhone}
                  onChange={(e) => setNewReceiverPhone(e.target.value)}
                  placeholder="01800-000000"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow transition flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>যুক্ত করুন</span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#f0f9fa] border-b">
              <h3 className="font-bold text-sm text-[#082f32]">অনুমোদিত গ্রহণকারী তালিকা</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b font-bold text-gray-800">
                <tr>
                  <th className="py-2.5 px-4">ক্রমিক</th>
                  <th className="py-2.5 px-4">নাম</th>
                  <th className="py-2.5 px-4">মোবাইল</th>
                  <th className="py-2.5 px-4 text-center">অনুমোদন স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {receiverList.map((rec, idx) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-mono text-gray-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-bold text-gray-800">{rec.name}</td>
                    <td className="py-2.5 px-4 font-mono text-gray-600">{rec.phone || '01815-527299'}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">সক্রিয় ক্যাশিয়ার</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. ROLES */}
      {activeTab === 'role' && (
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm space-y-4">
          <div className="pb-3 border-b">
            <h3 className="font-bold text-sm text-[#082f32] flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#0f626a]" />
              <span>ইউজার রোল ও পারমিশন কন্ট্রোল (Role-Based Access)</span>
            </h3>
            <p className="text-xs text-gray-500">মাদ্রাসার সফটওয়্যার ইউজারদের নিরাপত্তা লেভেল ও অ্যাক্সেস রোল</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r, idx) => (
              <div key={idx} className="p-4 border rounded-2xl bg-gray-50/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{r.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-100 text-[#0f626a] rounded-full">সক্রিয় রোল</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. USERS */}
      {activeTab === 'user' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
            <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#0f626a]" />
              <span>নতুন সফটওয়্যার ইউজার তৈরি</span>
            </h3>

            <form onSubmit={handleAddUser} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">ব্যবহারকারীর পুরো নাম *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="নাম"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">ইউজারনেম (লগইন আইডি) *</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  placeholder="username"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">নির্ধারিত রোল *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Accountant / Cashier">Accountant / Cashier</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow transition flex items-center justify-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>ইউজার তৈরি করুন</span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#f0f9fa] border-b">
              <h3 className="font-bold text-sm text-[#082f32]">সকল ইউজার তালিকা</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b font-bold text-gray-800">
                <tr>
                  <th className="py-2.5 px-4">নাম</th>
                  <th className="py-2.5 px-4">ইউজারনেম</th>
                  <th className="py-2.5 px-4">রোল</th>
                  <th className="py-2.5 px-4">মোবাইল</th>
                  <th className="py-2.5 px-4 text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-bold text-gray-800">{u.name}</td>
                    <td className="py-2.5 px-4 font-mono text-gray-600">{u.username}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-gray-600">{u.phone}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
