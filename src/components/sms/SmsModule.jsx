import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  PlusCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SmsModule = ({ defaultView = 'compose', defaultRecipientTarget = 'all_students' }) => {
  const {
    profile,
    students,
    teachers,
    committee,
    jamats,
    sendSms,
    smsLogs,
    rechargeSmsBalance
  } = useApp();

  const [recipientTarget, setRecipientTarget] = useState(defaultRecipientTarget);
  const [selectedJamat, setSelectedJamat] = useState(jamats[0]?.name || 'হিফজ বিভাগ');
  const [customNumbers, setCustomNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState('100');

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    if (!rechargeAmount || isNaN(rechargeAmount)) return;
    rechargeSmsBalance(rechargeAmount);
    setShowRechargeModal(false);
  };

  // Pre-defined Templates
  const templates = [
    {
      title: 'ফি বকেয়া তাগাদা',
      text: `আসসালামু আলাইকুম। জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসার পক্ষ থেকে জানানো যাচ্ছে যে, আপনার সন্তানের চলতি মাসের বেতন ও খোরাকী ফি বাকি রয়েছে। অতিসত্বর মাদ্রাসার অফিসে পরিশোধের অনুরোধ করা হলো। মোবা: ${profile.phone1}`
    },
    {
      title: 'পরীক্ষার নোটিশ',
      text: `মুহতারাম অভিভাবক, জব্বর নগর স্বতন্ত্র ইবতেদায়ী মাদ্রাসার বার্ষিক মূল্যায়ন পরীক্ষা আগামী ১৫ নভেম্বর থেকে শুরু হতে যাচ্ছে। আপনার সন্তানকে নিয়মিত মাদ্রাসায় উপস্থিত রাখুন। পরীক্ষক: মাহমুদুল করিম।`
    },
    {
      title: 'ছুটির বিজ্ঞপ্তি',
      text: `আসসালামু আলাইকুম। পবিত্র রমজান ও ঈদ উপলক্ষে মাদ্রাসার সকল জামাত আগামী কাল থেকে বন্ধ থাকবে। খোলার সঠিক তারিখ যথাসময়ে জানানো হবে। মুহতামিম, জব্বর নগর মাদ্রাসা।`
    },
    {
      title: 'জরুরি অভিভাবক সমাবেশ',
      text: `সম্মানিত অভিভাবক, আগামী শুক্রবার বাদ আছর মাদ্রাসার মিলনায়তনে বিশেষ জরুরি অভিভাবক সমাবেশ অনুষ্ঠিত হবে। আপনার উপস্থিতি একান্ত কাম্য।`
    }
  ];

  // Calculate recipients count
  const getRecipientsList = () => {
    if (recipientTarget === 'all_students') {
      return students.map(s => s.guardianPhone);
    }
    if (recipientTarget === 'by_jamat') {
      return students.filter(s => s.jamat === selectedJamat).map(s => s.guardianPhone);
    }
    if (recipientTarget === 'teachers') {
      return teachers.map(t => t.mobile);
    }
    if (recipientTarget === 'committee') {
      return committee.map(c => c.phone);
    }
    if (recipientTarget === 'custom') {
      return customNumbers.split(',').map(n => n.trim()).filter(Boolean);
    }
    return [];
  };

  const recipientList = getRecipientsList();
  const costPerSms = 0.40;
  const estimatedCost = +(recipientList.length * costPerSms).toFixed(2);
  const charCount = message.length;
  const smsSegments = Math.ceil(charCount / 70) || 1; // Standard Bangla Unicode SMS segment length

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('অনুগ্রহ করে মেসেজের বিবরণ লিখুন');
      return;
    }
    if (recipientList.length === 0) {
      alert('কোন প্রাপক নম্বর পাওয়া যায়নি');
      return;
    }

    sendSms(recipientList, message);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-[#0f626a]" />
            <span>বাল্ক ও ইনস্ট্যান্ট এসএমএস ম্যানেজমেন্ট (SMS Gateway)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            অভিভাবক, শিক্ষক ও কমিটির নিকট প্রাতিষ্ঠানিক বাংলা নোটিশ ও জরুরি বার্তা প্রেরণ
          </p>
        </div>

        {/* Live Balance & Recharge */}
        <div className="flex items-center space-x-3 bg-[#f0f9fa] border border-[#0f626a]/30 p-2.5 rounded-xl shadow-xs">
          <div className="text-right">
            <span className="text-[10px] text-gray-500 block leading-none">বর্তমান এসএমএস ব্যালেন্স</span>
            <span className="font-extrabold text-base text-[#0f626a] font-mono leading-tight">
              {profile.smsBalance.toFixed(2)} ৳
            </span>
          </div>
          <button
            onClick={() => setShowRechargeModal(true)}
            className="px-3 py-1.5 bg-[#0f626a] text-white text-xs font-bold rounded-lg hover:bg-[#0c5259] transition flex items-center space-x-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>রিচার্জ</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SMS Composer */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm">
          <h3 className="font-bold text-sm text-[#082f32] pb-3 border-b border-gray-100 flex items-center space-x-2">
            <Send className="w-4 h-4 text-[#0f626a]" />
            <span>নতুন এসএমএস রচনা করুন (Compose SMS)</span>
          </h3>

          <form onSubmit={handleSend} className="mt-4 space-y-4 text-xs">
            {/* Target Selector */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">প্রাপক গ্রুপ নির্বাচন করুন: *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'all_students', label: 'সকল অভিভাবক (১৯৭ জন)' },
                  { id: 'by_jamat', label: 'জামাতভিত্তিক অভিভাবক' },
                  { id: 'teachers', label: 'সকল শিক্ষক (৫ জন)' },
                  { id: 'committee', label: 'পরিচালনা কমিটি (৬ জন)' },
                  { id: 'custom', label: 'কাস্টম মোবাইল নম্বর' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRecipientTarget(opt.id)}
                    className={`p-2 rounded-xl border text-center font-semibold transition ${
                      recipientTarget === opt.id
                        ? 'bg-[#0f626a] text-white border-[#0f626a]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jamat dropdown if by_jamat */}
            {recipientTarget === 'by_jamat' && (
              <div>
                <label className="block font-semibold text-gray-700 mb-1">জামাত নির্বাচন করুন:</label>
                <select
                  value={selectedJamat}
                  onChange={(e) => setSelectedJamat(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
                >
                  {jamats.map(j => (
                    <option key={j.id} value={j.name}>{j.name} ({j.count} জন)</option>
                  ))}
                </select>
              </div>
            )}

            {/* Custom numbers field if custom */}
            {recipientTarget === 'custom' && (
              <div>
                <label className="block font-semibold text-gray-700 mb-1">কমা দিয়ে মোবাইল নম্বরসমূহ লিখুন:</label>
                <input
                  type="text"
                  value={customNumbers}
                  onChange={(e) => setCustomNumbers(e.target.value)}
                  placeholder="01820050095, 01847657580, 01711223344"
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono"
                />
              </div>
            )}

            {/* Templates Quick Load */}
            <div>
              <span className="block font-semibold text-gray-700 mb-1">তৈরি টেমপ্লেট নির্বাচন করুন (ঐচ্ছিক):</span>
              <div className="flex flex-wrap gap-1.5">
                {templates.map((tpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(tpl.text)}
                    className="px-2.5 py-1 bg-gray-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg text-[11px] font-medium border border-gray-200 transition"
                  >
                    {tpl.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-gray-700">এসএমএস বার্তা (বাংলা ভাষায়): *</label>
                <span className="text-[10px] text-gray-400 font-mono">
                  অক্ষর: {charCount} | অংশ: {smsSegments} টি এসএমএস
                </span>
              </div>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="এখানে মেসেজ লিখুন..."
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none text-xs leading-relaxed"
              ></textarea>
            </div>

            {/* Cost Summary Box */}
            <div className="p-3 bg-gray-50 rounded-xl border flex items-center justify-between">
              <div>
                <span className="text-gray-500">মোট নির্বাচিত নম্বর: </span>
                <strong className="text-gray-900 font-mono">{recipientList.length}</strong> টি
              </div>
              <div>
                <span className="text-gray-500">মোট আনুমানিক খরচ: </span>
                <strong className="text-[#0f626a] font-mono text-sm">৳ {estimatedCost}</strong>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0f626a] hover:bg-[#0c5259] text-white font-bold rounded-xl shadow-lg transition flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>এসএমএস পাঠিয়ে দিন</span>
              </button>
            </div>
          </form>
        </div>

        {/* SMS Rules & Recharge Guide */}
        <div className="space-y-4">
          <div className="bg-[#f0f9fa] rounded-2xl p-5 border border-[#0f626a]/30">
            <h4 className="font-bold text-sm text-[#082f32] pb-2 border-b border-[#0f626a]/20 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#0f626a]" />
              <span>এসএমএস সার্ভার নির্দেশিকা</span>
            </h4>
            <div className="text-xs text-gray-700 mt-3 space-y-2 leading-relaxed">
              <p>• প্রতিটি বাংলা ইউনিকোড এসএমএস ৭০ অক্ষরে ১টি হিসেবে গণনা হয়।</p>
              <p>• সফলভাবে পাঠানো এসএমএস অবিলম্বে প্রাপকের মোবাইলে পৌঁছাবে।</p>
              <p>• বিকাশ / নগদে পেমেন্ট করে সরাসরি একাউন্ট রিচার্জ করা যায়।</p>
              <p>• প্রতি এসএমএস খরচ মাত্র <strong>০.৪০ টাকা</strong>।</p>
            </div>
          </div>
        </div>
      </div>

      {/* SMS Sent Logs Table */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#082f32]">প্রেরিত এসএমএস লগ ও ডেলিভারি হিস্ট্রি</h3>
          <span className="text-xs text-gray-400 font-mono">সর্বমোট {smsLogs.length} টি ক্যাম্পেইন</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f0f9fa] text-gray-800 font-semibold border-b">
              <tr>
                <th className="py-2.5 px-3">তারিখ ও সময়</th>
                <th className="py-2.5 px-3">প্রাপক সংখ্যা</th>
                <th className="py-2.5 px-3">মেসেজের সারমর্ম</th>
                <th className="py-2.5 px-3 text-right">খরচ (৳)</th>
                <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {smsLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    এখনো কোনো এসএমএস পাঠানো হয়নি
                  </td>
                </tr>
              ) : (
                smsLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-mono text-gray-600">{log.date}</td>
                    <td className="py-2.5 px-3 font-bold font-mono text-[#0f626a]">{log.count} টি</td>
                    <td className="py-2.5 px-3 text-gray-700 max-w-sm truncate">{log.message}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-gray-900">৳ {log.cost.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'সফল'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMS Balance Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 no-print">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#082f32]">এসএমএস ব্যালেন্স রিচার্জ করুন</h3>
              <button
                onClick={() => setShowRechargeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRechargeSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  রিচার্জের পরিমাণ (টাকা ৳):
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {['100', '250', '500'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRechargeAmount(val)}
                      className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition ${
                        rechargeAmount === val ? 'bg-[#0f626a] text-white border-[#0f626a]' : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      ৳{val}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="অন্য অংক লিখুন..."
                  required
                  className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-[#0f626a] focus:outline-none font-mono font-bold text-base"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border space-y-1 text-[11px] text-gray-600">
                <p>• রিচার্জ রেট: ৳ ০.৪০ / প্রতি বাংলা এসএমএস</p>
                <p>• আনুমানিক প্রাপ্য: <strong>{Math.floor(parseFloat(rechargeAmount || 0) / 0.40)}</strong> টি মেসেজ</p>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRechargeModal(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl font-semibold text-gray-600 hover:bg-gray-200"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0f626a] hover:bg-[#0c5259] text-white rounded-xl font-bold shadow transition"
                >
                  রিচার্জ সম্পন্ন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
