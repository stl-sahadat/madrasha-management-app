import React, { useState } from 'react';
import {
  Landmark,
  ArrowRightLeft,
  Plus,
  DollarSign,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Printer,
  FileSpreadsheet,
  Search,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AccountsModule = ({ defaultView = 'list' }) => {
  const { accounts, setAccounts, transferAccount, transactions, profile, showToast } = useApp();

  const [activeView, setActiveView] = useState(defaultView);
  const [fromAccount, setFromAccount] = useState(accounts[0]?.name || '');
  const [toAccount, setToAccount] = useState(accounts[1]?.name || '');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferNote, setTransferNote] = useState('');

  const [showAddAccountModal, setShowAddAccountModal] = useState(defaultView === 'create');
  const [newAccName, setNewAccName] = useState('');
  const [newAccType, setNewAccType] = useState('ব্যাংক অ্যাকাউন্ট');
  const [newAccBalance, setNewAccBalance] = useState('0');

  const [selectedReportAccount, setSelectedReportAccount] = useState('all');

  const totalFunds = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (fromAccount === toAccount) {
      alert('একই একাউন্টে ট্রান্সফার করা সম্ভব নয়');
      return;
    }
    const amt = parseFloat(transferAmount);
    if (!amt || amt <= 0) {
      alert('সঠিক টাকার অংক লিখুন');
      return;
    }

    const sourceAcc = accounts.find(a => a.name === fromAccount);
    if (sourceAcc && sourceAcc.balance < amt) {
      alert('উৎস অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই');
      return;
    }

    transferAccount(fromAccount, toAccount, amt, transferNote);
    setTransferAmount('');
    setTransferNote('');
    showToast(`৳ ${amt} সফলভাবে ${fromAccount} থেকে ${toAccount}-এ ট্রান্সফার করা হয়েছে!`);
  };

  const handleAddAccountSubmit = (e) => {
    e.preventDefault();
    if (!newAccName.trim()) return;

    const newAcc = {
      id: `acc-${Date.now()}`,
      name: newAccName.trim(),
      type: newAccType,
      balance: parseFloat(newAccBalance) || 0
    };

    setAccounts([...accounts, newAcc]);
    setShowAddAccountModal(false);
    setNewAccName('');
    setNewAccBalance('0');
    showToast(`নতুন অ্যাকাউন্ট "${newAcc.name}" সফলভাবে যুক্ত করা হয়েছে!`);
    setActiveView('list');
  };

  // Filter transactions for report
  const reportTransactions = transactions.filter(t => {
    if (selectedReportAccount === 'all') return true;
    return t.account.includes(selectedReportAccount);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <Landmark className="w-6 h-6 text-[#0f626a]" />
            <span>অ্যাকাউন্টস ও আর্থিক ফান্ড ব্যবস্থাপনা (Accounts Management)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            মাদ্রাসার নগদ ক্যাশ (Hand Cash), বিকাশ ও ব্যাংক একাউন্টের লাইভ ব্যালেন্স ও ট্রান্সফার
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveView('list')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeView === 'list' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            অ্যাকাউন্ট তালিকা
          </button>
          <button
            onClick={() => { setActiveView('create'); setShowAddAccountModal(true); }}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeView === 'create' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            + নতুন অ্যাকাউন্ট
          </button>
          <button
            onClick={() => setActiveView('transfer')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeView === 'transfer' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            ব্যালেন্স ট্রান্সফার
          </button>
          <button
            onClick={() => setActiveView('report')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeView === 'report' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            অ্যাকাউন্ট বিবরণী
          </button>
          <button
            onClick={() => setActiveView('balancesheet')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeView === 'balancesheet' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600 hover:text-black'
            }`}
          >
            ব্যালেন্স শিট
          </button>
        </div>
      </div>

      {/* Total Funds Banner */}
      <div className="bg-gradient-to-r from-[#0f626a] to-[#0a474d] text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs text-teal-200 uppercase font-semibold tracking-wider">
            সর্বমোট প্রাতিষ্ঠানিক নগদ ও ডিজিটাল স্থিতি
          </span>
          <h3 className="text-3xl font-extrabold font-mono mt-1 text-white">
            ৳ {totalFunds.toFixed(2)}
          </h3>
          <p className="text-xs text-teal-100 mt-1">
            বিকাশ ও হ্যান্ড ক্যাশের সমন্বিত সংরক্ষিত নগদ তহবিল
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white/10 rounded-xl border border-white/20">
            <span className="text-teal-200 block text-[10px]">অ্যাকাউন্ট সংখ্যা</span>
            <span className="font-bold text-sm font-mono">{accounts.length} টি সক্রিয়</span>
          </div>
          <button
            onClick={() => { setActiveView('create'); setShowAddAccountModal(true); }}
            className="px-3.5 py-2 bg-white text-[#0f626a] hover:bg-teal-50 font-bold rounded-xl transition shadow"
          >
            + নতুন একাউন্ট
          </button>
        </div>
      </div>

      {/* 1. ACCOUNTS LIST VIEW */}
      {activeView === 'list' && (
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-[#082f32]">সকল সক্রিয় অ্যাকাউন্ট ও বর্তমান ব্যালেন্স</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accounts.map(acc => (
              <div
                key={acc.id}
                className="bg-white p-5 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
                      {acc.type}
                    </span>
                    <Landmark className="w-4 h-4 text-[#0f626a]" />
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 mt-2">{acc.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">আইডি: {acc.id}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">বর্তমান স্থিতি:</span>
                  <span className="text-lg font-extrabold text-[#0f626a] font-mono">
                    ৳ {acc.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TRANSFER VIEW */}
      {activeView === 'transfer' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b border-gray-100 flex items-center space-x-2">
            <ArrowRightLeft className="w-5 h-5 text-[#0f626a]" />
            <span>অ্যাকাউন্ট টু অ্যাকাউন্ট ব্যালেন্স স্থানান্তর ফরম</span>
          </h3>

          <form onSubmit={handleTransferSubmit} className="mt-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">উৎস অ্যাকাউন্ট (হতে কাটবে):</label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-gray-50"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name} (স্থিতি: ৳{a.balance})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">গন্তব্য অ্যাকাউন্ট (জমা হবে):</label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-gray-50"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name} (স্থিতি: ৳{a.balance})</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">স্থানান্তরের টাকার পরিমাণ (৳): *</label>
              <input
                type="number"
                step="0.01"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="0.00"
                required
                className="w-full px-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">ট্রান্সফার নোট / রেফারেন্স:</label>
              <input
                type="text"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                placeholder="যেমন: ব্যাংক শাখা থেকে নগদ ক্যাশ উত্তোলন"
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow transition text-sm flex items-center justify-center space-x-1"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>ব্যালেন্স ট্রান্সফার সম্পন্ন করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. ACCOUNT REPORT / STATEMENT */}
      {activeView === 'report' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">অ্যাকাউন্ট ফিল্টার:</label>
                <select
                  value={selectedReportAccount}
                  onChange={(e) => setSelectedReportAccount(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  <option value="all">সকল অ্যাকাউন্ট (সমন্বিত)</option>
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>বিবরণী প্রিন্ট করুন</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#f0f9fa] border-b border-[#e2e8f0] flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#082f32]">অ্যাকাউন্ট লেনদেন বিবরণী খতিয়ান</h3>
              <span className="text-xs font-mono font-bold text-[#0f626a]">মোট লেনদেন: {reportTransactions.length} টি</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-800 font-bold border-b">
                  <tr>
                    <th className="py-3 px-4">ভাউচার</th>
                    <th className="py-3 px-4">তারিখ</th>
                    <th className="py-3 px-4">অ্যাকাউন্ট মাধ্যম</th>
                    <th className="py-3 px-4">খাত ও বিবরণ</th>
                    <th className="py-3 px-4 text-right">জমা (টাকা ৳)</th>
                    <th className="py-3 px-4 text-right">খরচ (টাকা ৳)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reportTransactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-gray-50 font-mono">
                      <td className="py-2.5 px-4 font-bold text-[#0f626a]">{tx.voucherNo}</td>
                      <td className="py-2.5 px-4 text-gray-600">{tx.date}</td>
                      <td className="py-2.5 px-4 font-sans font-semibold text-gray-800">{tx.account}</td>
                      <td className="py-2.5 px-4 font-sans text-gray-700">
                        {tx.items[0]?.category} {tx.donorOrStudent ? `(${tx.donorOrStudent})` : ''}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700">
                        {tx.type === 'deposit' ? `৳ ${tx.totalAmount.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-rose-600">
                        {tx.type === 'expense' ? `৳ ${tx.totalAmount.toLocaleString()}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. BALANCESHEET VIEW */}
      {activeView === 'balancesheet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#082f32]">বাৎসরিক ব্যালেন্স শিট ও আর্থিক স্থিতি (Balance Sheet ২০২৬)</h3>
              <p className="text-xs text-gray-500">মাদ্রাসার সমস্ত সংরক্ষিত নগদ ফান্ড, ব্যাংক স্থিতি ও মোট দায়ের প্রতিবেদন</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#0f626a] text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>ব্যালেন্স শিট প্রিন্ট</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 space-y-6">
            <div className="text-center pb-4 border-b">
              <h2 className="text-xl font-bold text-[#082f32]">{profile.name}</h2>
              <p className="text-xs text-gray-600">{profile.address} • শিক্ষাবর্ষ: ২০২৬</p>
              <span className="inline-block mt-2 px-4 py-1 bg-teal-100 text-[#0f626a] rounded-full text-xs font-bold">
                সম্পদ ও তহবিল বিবরণী (Balance Sheet)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assets / Funds Side */}
              <div className="border rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-xs uppercase text-teal-800 tracking-wider border-b pb-2">
                  সম্পদ ও নগদ তহবিল (Assets & Bank Balances)
                </h4>
                <div className="space-y-2 text-xs">
                  {accounts.map(acc => (
                    <div key={acc.id} className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-700">{acc.name} ({acc.type})</span>
                      <span className="font-mono font-bold text-gray-900">৳ {acc.balance.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-700">স্থায়ী আসবাবপত্র ও লাইব্রেরি সম্পদ</span>
                    <span className="font-mono font-bold text-gray-900">৳ ৪,৫০,০০০.০০</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm font-bold bg-[#f0f9fa] px-3 rounded-xl text-[#0f626a]">
                    <span>মোট সম্পদ:</span>
                    <span className="font-mono">৳ {(totalFunds + 450000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Liabilities & Reserves */}
              <div className="border rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-xs uppercase text-teal-800 tracking-wider border-b pb-2">
                  দায় ও সংরক্ষিত ফান্ড (Liabilities & Reserves)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-700">যাকাত ও ফিতরা সংরক্ষিত ফান্ড</span>
                    <span className="font-mono font-bold text-gray-900">৳ ১,২০,০০০.০০</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-700">ভবন নির্মাণ ও মসজিদ ফান্ড</span>
                    <span className="font-mono font-bold text-gray-900">৳ ৩,০০,০০০.০০</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-700">সাধারণ উদ্বৃত্ত সঞ্চয় (Net Surplus)</span>
                    <span className="font-mono font-bold text-gray-900">৳ {(totalFunds + 30000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-sm font-bold bg-[#f0f9fa] px-3 rounded-xl text-[#0f626a]">
                    <span>মোট দায় ও তহবিল:</span>
                    <span className="font-mono">৳ {(totalFunds + 450000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 grid grid-cols-3 text-center text-xs font-bold text-gray-700">
              <div>
                <div className="border-t border-gray-400 w-36 mx-auto pt-1">হিসাবরক্ষক</div>
              </div>
              <div>
                <div className="border-t border-gray-400 w-36 mx-auto pt-1">নিরীক্ষক (অডিটর)</div>
              </div>
              <div>
                <div className="border-t border-gray-400 w-36 mx-auto pt-1">মুহতামিম / সভাপতি</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#082f32]">নতুন অ্যাকাউন্ট যুক্ত করুন</h3>
              <button onClick={() => setShowAddAccountModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleAddAccountSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">অ্যাকাউন্টের নাম ও বিবরণ *</label>
                <input
                  type="text"
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  placeholder="যেমন: ইসলামী ব্যাংক (হিসাব নং: ২০৫০...)"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">অ্যাকাউন্টের ধরণ</label>
                <select
                  value={newAccType}
                  onChange={(e) => setNewAccType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
                >
                  <option value="ব্যাংক অ্যাকাউন্ট">ব্যাংক অ্যাকাউন্ট</option>
                  <option value="মোবাইল ব্যাংকিং">মোবাইল ব্যাংকিং (বিকাশ/নগদ/রকেট)</option>
                  <option value="ক্যাশ ইন হ্যান্ড">ক্যাশ ইন হ্যান্ড (পেটি ক্যাশ)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">প্রারম্ভিক স্থিতি (টাকা ৳)</label>
                <input
                  type="number"
                  value={newAccBalance}
                  onChange={(e) => setNewAccBalance(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAccountModal(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0f626a] text-white rounded-xl font-bold shadow"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
