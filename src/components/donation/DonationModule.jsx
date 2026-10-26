import React, { useState } from 'react';
import {
  HeartHandshake,
  DollarSign,
  Plus,
  Printer,
  Search,
  CheckCircle,
  Award,
  Calendar,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DonationModule = ({ defaultMode = 'zakat' }) => {
  const {
    transactions,
    accounts,
    receivers,
    addDepositVoucher,
    setSelectedReceiptForPrint
  } = useApp();

  const [mode, setMode] = useState(defaultMode); // 'zakat' or 'general'
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [category, setCategory] = useState(defaultMode === 'zakat' ? 'যাকাত তহবিল' : 'সাধারণ দান');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [receiver, setReceiver] = useState(receivers[0]?.name || 'মাহমুদুল করিম');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || !donorName) {
      alert('অনুগ্রহ করে দাতার নাম এবং সঠিক পরিমাণ উল্লেখ করুন');
      return;
    }

    const vch = addDepositVoucher({
      date: new Date().toISOString().split('T')[0],
      receiver,
      account,
      donorOrStudent: `${donorName} (${donorPhone || donorAddress || 'সুহৃদয় দাতা'})`,
      items: [
        {
          category,
          description: `${category} - ${donorName}`,
          amount: parseFloat(amount)
        }
      ],
      totalAmount: parseFloat(amount),
      note: note || `${category} গ্রহণ`
    });

    setDonorName('');
    setDonorPhone('');
    setDonorAddress('');
    setAmount('');
    setNote('');

    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  // Filter donation transactions
  const donationTxs = transactions.filter(t =>
    t.type === 'deposit' &&
    t.items.some(i =>
      i.category.includes('যাকাত') ||
      i.category.includes('দান') ||
      i.category.includes('ফিতরা') ||
      i.category.includes('সদস্য') ||
      i.category.includes('চামড়া')
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <HeartHandshake className="w-6 h-6 text-[#0f626a]" />
            <span>দান, অনুদান ও যাকাত তহবিল ব্যবস্থাপনা</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            দ্বীনি মাদ্রাসার সার্বিক উন্নয়ন, লিল্লা বোডিং ও এতিম তহবিলে অর্থ সংগ্রহ ও রসিদ তৈরি
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => {
              setMode('zakat');
              setCategory('যাকাত তহবিল');
            }}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
              mode === 'zakat' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600'
            }`}
          >
            যাকাত ও ফিতরা
          </button>
          <button
            onClick={() => {
              setMode('general');
              setCategory('সাধারণ দান');
            }}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${
              mode === 'general' ? 'bg-[#0f626a] text-white shadow' : 'text-gray-600'
            }`}
          >
            সাধারণ দান ও আজীবন চাঁদা
          </button>
        </div>
      </div>

      {/* Donation Collection Form & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b border-gray-100 flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-[#0f626a]" />
            <span>নতুন অনুদান গ্রহণ ও মানি রশিদ তৈরি</span>
          </h3>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">দাতার পূর্ণ নাম *</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="যেমন: আলহাজ্ব রফিকুল ইসলাম"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="text"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="018XXXXXXXX"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">দাতার ঠিকানা / এলাকা</label>
                <input
                  type="text"
                  value={donorAddress}
                  onChange={(e) => setDonorAddress(e.target.value)}
                  placeholder="চকরিয়া, কক্সবাজার"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">তহবিল / খাতের ধরণ *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white font-medium"
                >
                  <option value="যাকাত তহবিল">যাকাত তহবিল (Zakat Fund)</option>
                  <option value="ফিতরা">ফিতরা (Fitra)</option>
                  <option value="সাধারণ দান">সাধারণ দান ও সদকা</option>
                  <option value="এতিম তহবিল">এতিম ও দুঃস্থ ছাত্র তহবিল</option>
                  <option value="আজীবন সদস্য চাঁদা">আজীবন সদস্য মাসিক/বার্ষিক চাঁদা</option>
                  <option value="উন্নয়ন ফান্ড">মাদ্রাসা ভবন উন্নয়ন ফান্ড</option>
                  <option value="মসজিদ ফান্ড">মসজিদ ও লাইব্রেরি ফান্ড</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">টাকার পরিমাণ (৳) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono font-bold text-sm text-[#0f626a]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">জমা গ্রহণের মাধ্যম / অ্যাকাউন্ট *</label>
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white font-medium"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.name}>{acc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">মন্তব্য / খাস দোয়া ও উদ্দেশ্য</label>
              <textarea
                rows="2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="যেমন: পিতা-মাতার ইসালে সাওয়াবের নিয়তে"
                className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow-md transition flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>অনুদান জমা নিন ও রশিদ প্রিন্ট করুন</span>
              </button>
            </div>
          </form>
        </div>

        {/* Informational Guidelines Card */}
        <div className="space-y-4">
          <div className="bg-[#f0f9fa] rounded-2xl p-5 border border-[#0f626a]/30">
            <h4 className="font-bold text-sm text-[#082f32] flex items-center space-x-1.5 pb-2 border-b border-[#0f626a]/20">
              <Award className="w-4 h-4 text-[#0f626a]" />
              <span>যাকাত ও দান তহবিলের মূলনীতি</span>
            </h4>
            <div className="text-xs text-gray-700 mt-3 space-y-2 leading-relaxed">
              <p>• যাকাতের সমুদয় অর্থ শুধুমাত্র উপযুক্ত গরীব, এতিম ও অনাথ শিক্ষার্থীদের অন্ন, বস্ত্র ও শিক্ষার ব্যয়ভার বহনে খরচ করা হয়।</p>
              <p>• প্রতিটি দাতার অর্থ সরাসরি নির্ধারিত ক্যাশ বা ডিজিটাল লেজারে অন্তর্ভুক্ত হয়।</p>
              <p>• রসিদের ক্রমিক নম্বর ও তারিখ স্বয়ংক্রিয়ভাবে অডিট ভাউচারে যুক্ত থাকে।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#082f32]">সাম্প্রতিক অনুদান রেজিস্টার</h3>
          <span className="text-xs text-gray-500 font-mono">সর্বমোট {donationTxs.length} টি</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f0f9fa] text-gray-800 font-semibold border-b">
              <tr>
                <th className="py-2.5 px-3">রশিদ নং</th>
                <th className="py-2.5 px-3">তারিখ</th>
                <th className="py-2.5 px-3">দাতার নাম ও পরিচয়</th>
                <th className="py-2.5 px-3">খাত</th>
                <th className="py-2.5 px-3">হিসাব মাধ্যম</th>
                <th className="py-2.5 px-3 text-right">পরিমাণ (৳)</th>
                <th className="py-2.5 px-3 text-center">রশিদ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donationTxs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-6 text-center text-gray-500">
                    এখনো কোনো অনুদান ভাউচার নথিভুক্ত হয়নি
                  </td>
                </tr>
              ) : (
                donationTxs.map(tx => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-gray-700">{tx.voucherNo}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-500">{tx.date}</td>
                    <td className="py-2.5 px-3 font-bold text-gray-800">{tx.donorOrStudent}</td>
                    <td className="py-2.5 px-3 text-teal-700 font-semibold">{tx.items[0]?.category}</td>
                    <td className="py-2.5 px-3 text-gray-600">{tx.account}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                      ৳ {tx.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedReceiptForPrint(tx)}
                        className="p-1 text-[#0f626a] hover:bg-[#eaf4f5] rounded"
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
