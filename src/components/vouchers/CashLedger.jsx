import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Printer,
  Eye,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Landmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CashLedger = ({ initialFilter = 'all' }) => {
  const {
    transactions,
    accounts,
    setActiveTab,
    setSelectedReceiptForPrint
  } = useApp();

  const [filterType, setFilterType] = useState(initialFilter); // all, deposit, expense
  const [filterAccount, setFilterAccount] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter transactions
  const filtered = transactions.filter(tx => {
    const matchType = filterType === 'all' || tx.type === filterType;
    const matchAccount = filterAccount === 'all' || tx.account.includes(filterAccount);
    const matchSearch =
      tx.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.donorOrStudent?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ((tx.items || []).some(i => i.category.toLowerCase().includes(searchTerm.toLowerCase()) || (i.description || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
       (tx.category && tx.category.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchType && matchAccount && matchSearch;
  });

  const totalDeposits = filtered
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const totalExpenses = filtered
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const netBalance = totalDeposits - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <FileSpreadsheet className="w-6 h-6 text-[#0f626a]" />
            <span>দৈনিক ক্যাশ লেজার ও ভাউচার রেজিস্টার</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            মাদ্রাসার সমস্ত আর্থিক জমা ও খরচ লেনদেনের পূর্ণাঙ্গ হিসাব ও খতিয়ান
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>লেজার প্রিন্ট</span>
          </button>
          <button
            onClick={() => setActiveTab('voucher-deposit')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center space-x-1 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>+ জমা ভাউচার</span>
          </button>
          <button
            onClick={() => setActiveTab('voucher-expense')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition flex items-center space-x-1 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>+ খরচ ভাউচার</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">মোট জমা (ফিল্টারকৃত)</span>
            <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 font-mono mt-2">
            ৳ {totalDeposits.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800">মোট খরচ (ফিল্টারকৃত)</span>
            <ArrowUpRight className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-2xl font-extrabold text-rose-700 font-mono mt-2">
            ৳ {totalExpenses.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#0f626a]/30 bg-[#f0f9fa] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#082f32]">নিট স্থিতি / অবশিষ্ট ব্যালেন্স</span>
            <Landmark className="w-5 h-5 text-[#0f626a]" />
          </div>
          <p className="text-2xl font-extrabold text-[#0f626a] font-mono mt-2">
            ৳ {netBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ভাউচার নং, নাম বা খাত খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          />
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          >
            <option value="all">সকল লেনদেন (জমা ও খরচ)</option>
            <option value="deposit">শুধুমাত্র জমা (Deposits)</option>
            <option value="expense">শুধুমাত্র খরচ (Expenses)</option>
          </select>
        </div>

        <div>
          <select
            value={filterAccount}
            onChange={(e) => setFilterAccount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          >
            <option value="all">সকল একাউন্ট (All Accounts)</option>
            {accounts.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f0f9fa] text-[#082f32] font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">ভাউচার নং</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">ধরণ</th>
                <th className="py-3 px-4">খাত ও বিবরণ</th>
                <th className="py-3 px-4">দাতা / গ্রহীতা</th>
                <th className="py-3 px-4">হিসাব মাধ্যম</th>
                <th className="py-3 px-4 text-right">জমা (৳)</th>
                <th className="py-3 px-4 text-right">খরচ (৳)</th>
                <th className="py-3 px-4 text-center">মেমো</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-gray-500">
                    কোন লেনদেন পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-gray-800">
                      {tx.voucherNo}
                    </td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-[11px]">
                      {tx.date}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.type === 'deposit'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {tx.type === 'deposit' ? 'জমা' : 'খরচ'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-800">{tx.items[0]?.category}</div>
                      {tx.items[0]?.description && (
                        <div className="text-[11px] text-gray-500">{tx.items[0].description}</div>
                      )}
                      {tx.items.length > 1 && (
                        <span className="text-[10px] text-teal-700 bg-teal-50 px-1 rounded">
                          +{tx.items.length - 1} আরও খাত
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {tx.donorOrStudent || '—'}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-[11px]">
                      {tx.account}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">
                      {tx.type === 'deposit' ? `৳ ${tx.totalAmount.toFixed(2)}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                      {tx.type === 'expense' ? `৳ ${tx.totalAmount.toFixed(2)}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedReceiptForPrint(tx)}
                        className="p-1.5 text-[#0f626a] hover:bg-[#eaf4f5] rounded-lg transition"
                        title="রশিদ দেখুন ও প্রিন্ট করুন"
                      >
                        <Eye className="w-4 h-4" />
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
  );
};
