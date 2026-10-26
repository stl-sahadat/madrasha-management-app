import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
  Printer,
  Calendar,
  Receipt,
  User,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MONTH_NAMES } from '../../data/initialData';

export const StudentFeeMatrix = () => {
  const {
    students,
    recordStudentFee,
    accounts,
    setSelectedReceiptForPrint
  } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.name || 'নগদ ক্যাশ (Hand Cash)');
  const [payingMonth, setPayingMonth] = useState(null);
  const [payFeeType, setPayFeeType] = useState('both'); // tuition, khuraki, both

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handlePayClick = (month) => {
    setPayingMonth(month);
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    if (!currentStudent || !payingMonth) return;

    let totalAmount = 0;
    if (payFeeType === 'tuition' || payFeeType === 'both') {
      totalAmount += currentStudent.monthlyFee;
    }
    if (payFeeType === 'khuraki' || payFeeType === 'both') {
      totalAmount += currentStudent.khurakiFee;
    }

    const vch = recordStudentFee(
      currentStudent.id,
      payingMonth,
      payFeeType,
      totalAmount,
      selectedAccount
    );

    setPayingMonth(null);
    if (vch) {
      setSelectedReceiptForPrint(vch);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#082f32] flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-[#0f626a]" />
            <span>১২ মাসের মাসিক বেতন ও খোরাকী ফি রেজিস্টার</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            শিক্ষার্থীভিত্তিক জানুয়ারি হতে ডিসেম্বর পর্যন্ত ১২ মাসের ফি কালেকশন ম্যাট্রিক্স
          </p>
        </div>

        {/* Student Quick Search & Picker */}
        <div className="w-full sm:w-72">
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0f626a] focus:outline-none"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} (রোল: {s.roll}) - {s.jamat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentStudent && (
        <>
          {/* Student Profile Card for Fee Collection */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentStudent.photo}
                  alt={currentStudent.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0f626a]"
                />
                <div>
                  <h3 className="text-base font-bold text-gray-900">{currentStudent.name}</h3>
                  <p className="text-xs text-gray-500">
                    জামাত: <span className="font-bold text-[#0f626a]">{currentStudent.jamat}</span> |
                    রোল: <span className="font-bold text-gray-800">{currentStudent.roll}</span> |
                    পিতা: {currentStudent.fatherName}
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    মোবাইল: {currentStudent.guardianPhone}
                  </p>
                </div>
              </div>

              {/* Fee Rates */}
              <div className="flex items-center space-x-3 text-xs bg-[#f0f9fa] p-3 rounded-xl border border-[#0f626a]/20">
                <div className="text-center px-3 border-r border-[#0f626a]/20">
                  <span className="text-gray-500 block text-[10px]">নির্ধারিত মাসিক বেতন</span>
                  <span className="font-bold text-[#0f626a] text-sm font-mono">
                    ৳ {currentStudent.monthlyFee}
                  </span>
                </div>
                <div className="text-center px-3 border-r border-[#0f626a]/20">
                  <span className="text-gray-500 block text-[10px]">নির্ধারিত খোরাকী ফি</span>
                  <span className="font-bold text-[#0f626a] text-sm font-mono">
                    ৳ {currentStudent.khurakiFee}
                  </span>
                </div>
                <div className="text-center px-3">
                  <span className="text-gray-500 block text-[10px]">মোট মাসিক দেয়</span>
                  <span className="font-extrabold text-gray-900 text-sm font-mono">
                    ৳ {currentStudent.monthlyFee + currentStudent.khurakiFee}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 12-Month Matrix Grid Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 bg-[#f0f9fa] border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-[#082f32]">
                শিক্ষাবর্ষ ২০২৬: ১২ মাসের ফি পরিশোধের পূর্ণাঙ্গ রেকর্ড
              </span>
              <span className="text-xs text-gray-500">
                পরিশোধের পর তাৎক্ষণিক প্রিন্টযোগ্য মানি রশিদ পাওয়া যাবে
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">ক্রমিক</th>
                    <th className="py-3 px-4">মাস (Month)</th>
                    <th className="py-3 px-4 text-right">বেতন (৳)</th>
                    <th className="py-3 px-4 text-right">খোরাকী (৳)</th>
                    <th className="py-3 px-4 text-right">সর্বমোট (৳)</th>
                    <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
                    <th className="py-3 px-4 text-center">পরিশোধের তারিখ</th>
                    <th className="py-3 px-4 text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {MONTH_NAMES.map((month, idx) => {
                    const feeRecord = currentStudent.fees?.[month] || {};
                    const isPaid = feeRecord.paid;
                    const totalMonth = currentStudent.monthlyFee + currentStudent.khurakiFee;

                    return (
                      <tr key={month} className={`hover:bg-gray-50 transition ${isPaid ? 'bg-emerald-50/20' : ''}`}>
                        <td className="py-3 px-4 text-gray-500 font-mono">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-800">
                          {month}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-gray-700">
                          ৳ {currentStudent.monthlyFee}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-gray-700">
                          ৳ {currentStudent.khurakiFee}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                          ৳ {totalMonth}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isPaid ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              পরিশোধিত
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              বকেয়া
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-gray-500 font-mono text-[11px]">
                          {feeRecord.date || '—'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isPaid ? (
                            <button
                              onClick={() => {
                                setSelectedReceiptForPrint({
                                  voucherNo: `REC-${currentStudent.roll}-${idx + 1}`,
                                  date: feeRecord.date || '2026-10-18',
                                  receiver: 'মাহমুদুল করিম',
                                  account: 'নগদ ক্যাশ',
                                  donorOrStudent: `${currentStudent.name} (রোল: ${currentStudent.roll})`,
                                  items: [
                                    { category: 'মাসিক বেতন ও খোরাকী', description: `${month} মাসের ফি`, amount: totalMonth }
                                  ],
                                  totalAmount: totalMonth,
                                  note: `${month} মাসের আদায় রশিদ`
                                });
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-[#0f626a] hover:bg-[#eaf4f5] rounded-lg transition inline-flex items-center space-x-1"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>রশিদ প্রিন্ট</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePayClick(month)}
                              className="px-3 py-1 text-[11px] font-bold text-white bg-[#0f626a] hover:bg-[#0c5259] rounded-lg shadow transition inline-flex items-center space-x-1"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>ফি জমা নিন</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Payment Confirmation Modal */}
      {payingMonth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-[#082f32]">
                ফি আদায় ফরম: {payingMonth} মাস
              </h3>
              <button
                onClick={() => setPayingMonth(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmPayment} className="mt-4 space-y-4">
              <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                <p>শিক্ষার্থী: <strong className="text-gray-900">{currentStudent.name}</strong></p>
                <p>জামাত: <strong>{currentStudent.jamat}</strong> (রোল: {currentStudent.roll})</p>
                <p>মাস: <strong className="text-[#0f626a]">{payingMonth}</strong></p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  ফি এর ধরণ নির্বাচন করুন:
                </label>
                <select
                  value={payFeeType}
                  onChange={(e) => setPayFeeType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
                >
                  <option value="both">উভয় (বেতন ৳{currentStudent.monthlyFee} + খোরাকী ৳{currentStudent.khurakiFee} = ৳{currentStudent.monthlyFee + currentStudent.khurakiFee})</option>
                  <option value="tuition">শুধু বেতন (৳{currentStudent.monthlyFee})</option>
                  <option value="khuraki">শুধু খোরাকী ফি (৳{currentStudent.khurakiFee})</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  জমা গ্রহণের একাউন্ট:
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0f626a] focus:outline-none bg-white"
                >
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.name}>{acc.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPayingMonth(null)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0f626a] hover:bg-[#0c5259] rounded-xl shadow-md transition"
                >
                  আদায় সম্পন্ন ও রশিদ তৈরি
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
