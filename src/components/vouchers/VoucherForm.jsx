import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Trash2,
  CheckCircle,
  Landmark,
  Calendar,
  User,
  ArrowRight,
  Printer,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoucherForm = ({ defaultType = 'deposit' }) => {
  const {
    depositCategories,
    expenseCategories,
    accounts,
    receivers,
    addDepositVoucher,
    addExpenseVoucher,
    setSelectedReceiptForPrint,
    setActiveTab
  } = useApp();

  const [voucherType, setVoucherType] = useState(defaultType); // 'deposit' or 'expense'
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [receiver, setReceiver] = useState(receivers[0]?.name || 'মাহমুদুল করিম');
  const [account, setAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [donorOrStudent, setDonorOrStudent] = useState('');
  const [note, setNote] = useState('');

  // Multi-line line items
  const [items, setItems] = useState([
    {
      category: defaultType === 'deposit' ? depositCategories[0] : expenseCategories[0],
      description: '',
      amount: ''
    }
  ]);

  const activeCategories = voucherType === 'deposit' ? depositCategories : expenseCategories;

  // Add line item row
  const handleAddRow = () => {
    setItems([
      ...items,
      {
        category: activeCategories[0] || '',
        description: '',
        amount: ''
      }
    ]);
  };

  // Remove row
  const handleRemoveRow = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Change row value
  const handleRowChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // Total amount calculation
  const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // Instant Balance Preview
  const selectedAccObj = accounts.find(a => a.name === account) || accounts[0];
  const currentAccBalance = selectedAccObj ? selectedAccObj.balance : 0;
  const projectedBalance = voucherType === 'deposit'
    ? currentAccBalance + totalAmount
    : currentAccBalance - totalAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      alert('অনুগ্রহ করে সঠিক টাকার অংক প্রদান করুন');
      return;
    }

    if (!donorOrStudent) {
      alert(voucherType === 'deposit' ? 'দাতা বা শিক্ষার্থীর নাম উল্লেখ করুন' : 'প্রাপক বা খরচের বিবরণ উল্লেখ করুন');
      return;
    }

    const payload = {
      date,
      receiver,
      account,
      donorOrStudent,
      items: items.map(it => ({
        ...it,
        amount: parseFloat(it.amount) || 0
      })),
      totalAmount,
      note
    };

    let createdVoucher;
    if (voucherType === 'deposit') {
      createdVoucher = addDepositVoucher(payload);
    } else {
      createdVoucher = addExpenseVoucher(payload);
    }

    // Reset items
    setItems([{
      category: activeCategories[0] || '',
      description: '',
      amount: ''
    }]);
    setDonorOrStudent('');
    setNote('');

    // Open print preview
    if (createdVoucher) {
      setSelectedReceiptForPrint(createdVoucher);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
              voucherType === 'deposit'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {voucherType === 'deposit' ? 'জমা ভাউচার ফরম' : 'খরচ ভাউচার ফরম'}
            </span>
            <h2 className="text-xl font-bold text-[#082f32]">
              {voucherType === 'deposit' ? 'নগদ / ডিজিটাল অর্থ জমা গ্রহণ' : 'নগদ / অফিসিয়াল ব্যয় ভাউচার'}
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            একাধিক খাত ও লাইন-আইটেম যুক্ত করে নির্ভুল আর্থিক ভাউচার সংরক্ষণ করুন
          </p>
        </div>

        {/* Toggle between Deposit & Expense */}
        <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={() => {
              setVoucherType('deposit');
              setItems([{ category: depositCategories[0], description: '', amount: '' }]);
            }}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
              voucherType === 'deposit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            + জমা ভাউচার
          </button>
          <button
            type="button"
            onClick={() => {
              setVoucherType('expense');
              setItems([{ category: expenseCategories[0], description: '', amount: '' }]);
            }}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
              voucherType === 'expense'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            - খরচ ভাউচার
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Details Section */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b border-gray-100 flex items-center space-x-2">
            <Receipt className="w-4 h-4 text-[#0f626a]" />
            <span>ভাউচার প্রাথমিক বিবরণ</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                ভাউচারের তারিখ *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {voucherType === 'deposit' ? 'গ্রহণকারী কর্মকর্তা *' : 'অনুমোদনকারী কর্মকর্তা *'}
              </label>
              <select
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
              >
                {receivers.map(r => (
                  <option key={r.id} value={r.name}>{r.name} ({r.designation})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                লেনদেনের একাউন্ট (মাধ্যম) *
              </label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white font-medium"
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.name}>
                    {acc.name} (বর্তমান: ৳ {acc.balance.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {voucherType === 'deposit' ? 'দাতা / শিক্ষার্থীর নাম *' : 'ব্যয় গ্রহণকারী / প্রতিষ্ঠান *'}
              </label>
              <input
                type="text"
                value={donorOrStudent}
                onChange={(e) => setDonorOrStudent(e.target.value)}
                placeholder={voucherType === 'deposit' ? 'যেমন: মুহাম্মদ আবু বকর' : 'যেমন: চকরিয়া বাজার স্টোর'}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Multi-line Line Items Section */}
        <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-sm text-[#082f32]">
                ভাউচার লাইন আইটেম তালিকা (Dynamic Row Items)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                একটি ভাউচারে একাধিক খাতের হিসাব যোগ করতে "+ আরও যোগ করুন" বাটনে ক্লিক করুন
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddRow}
              className="px-3 py-1.5 bg-[#eaf4f5] text-[#0f626a] hover:bg-[#d5edf0] font-bold text-xs rounded-xl border border-[#0f626a]/30 transition flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ আরও যোগ করুন</span>
            </button>
          </div>

          <div className="space-y-3 mt-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl items-center"
              >
                {/* Category Selector */}
                <div className="md:col-span-4">
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">
                    খাত নির্বাচন ({index + 1})
                  </label>
                  <select
                    value={item.category}
                    onChange={(e) => handleRowChange(index, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white font-medium"
                  >
                    {activeCategories.map((cat, cIdx) => (
                      <option key={cIdx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description Note */}
                <div className="md:col-span-5">
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">
                    নির্দিষ্ট বিবরণ / রসিদ নোট
                  </label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                    placeholder="বিবরণ লিখুন..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
                  />
                </div>

                {/* Amount */}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">
                    পরিমাণ (টাকা ৳) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white font-mono font-bold text-right"
                  />
                </div>

                {/* Delete Row Button */}
                <div className="md:col-span-1 flex justify-center pt-4 md:pt-0">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    disabled={items.length === 1}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="সারি মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={handleAddRow}
              className="text-xs font-bold text-[#0f626a] hover:underline flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ আরও একটি খাত / লাইন যোগ করুন</span>
            </button>
          </div>
        </div>

        {/* Live Balance Preview & Remarks Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              সার্বিক মন্তব্য / ভাউচার নোট
            </label>
            <textarea
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="অতিরিক্ত কোনো তথ্য বা অনুমোদনের রেফারেন্স থাকলে এখানে লিখুন..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
            />
          </div>

          {/* Instant Balance Preview Card */}
          <div className="bg-[#f0f9fa] rounded-2xl p-5 border border-[#0f626a]/30 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#082f32] block pb-2 border-b border-[#0f626a]/20">
                তাৎক্ষণিক ব্যালেন্স প্রিভিউ (Instant Balance)
              </span>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>বর্তমান ব্যালেন্স:</span>
                  <span className="font-mono font-bold text-gray-800">৳ {currentAccBalance.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold">
                  <span>ভাউচার মোট অংক:</span>
                  <span className={`font-mono text-sm ${voucherType === 'deposit' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {voucherType === 'deposit' ? '+' : '-'} ৳ {totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#0f626a]/20 flex justify-between font-extrabold text-[#082f32]">
                  <span>লেনদেন পরবর্তী ব্যালেন্স:</span>
                  <span className="font-mono text-base text-[#0f626a]">
                    ৳ {projectedBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {projectedBalance < 0 && voucherType === 'expense' && (
              <div className="mt-3 p-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-[11px] flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>সতর্কতা: অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স নেই!</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('cash-ledger')}
            className="px-5 py-2.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            বাতিল ও খতিয়ানে ফিরুন
          </button>
          <button
            type="submit"
            className={`px-7 py-2.5 text-xs font-bold text-white rounded-xl shadow-lg transition flex items-center space-x-2 ${
              voucherType === 'deposit'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>ভাউচার সংরক্ষণ ও রসিদ প্রিন্ট করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};
