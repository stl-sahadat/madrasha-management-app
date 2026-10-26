import React from 'react';
import { Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrintReceiptModal = () => {
  const {
    profile,
    selectedReceiptForPrint,
    setSelectedReceiptForPrint
  } = useApp();

  if (!selectedReceiptForPrint) return null;

  const receipt = selectedReceiptForPrint;
  const isDeposit = receipt.type !== 'expense';

  // Number to words in Bengali (simple helper)
  const numberToWordsBn = (num) => {
    return `${Math.round(num)} টাকা মাত্র`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative print:shadow-none print:p-0 print:border-none print:w-full">
        {/* Modal Controls - Hidden during print */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 no-print">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-sm text-[#082f32]">
              {isDeposit ? 'মানি রশিদ প্রিভিউ ও প্রিন্ট' : 'খরচ ভাউচার প্রিভিউ ও প্রিন্ট'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#0f626a] hover:bg-[#0c5259] text-white text-xs font-bold rounded-lg shadow transition flex items-center space-x-1"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন</span>
            </button>
            <button
              onClick={() => setSelectedReceiptForPrint(null)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Memo Area */}
        <div className="mt-4 p-6 border border-gray-300 rounded-xl bg-white print:border-2 print:border-gray-800">
          {/* Header */}
          <div className="text-center pb-3 border-b-2 border-[#0f626a]">
            <span className="text-xs font-semibold text-[#0f626a] tracking-widest uppercase">
              বিসমিল্লাহির রাহমানির রাহিম
            </span>
            <h2 className="text-lg font-extrabold text-[#082f32] mt-1 font-bangla">
              {profile.name}
            </h2>
            <p className="text-[11px] text-gray-600 mt-0.5">{profile.address}</p>
            <p className="text-[10px] text-gray-500 font-mono">
              ফোন: {profile.phone1} | ইমেইল: {profile.email}
            </p>
            <div className="inline-block mt-2 px-3 py-0.5 bg-[#0f626a] text-white text-[11px] font-bold rounded-full">
              {isDeposit ? 'অর্থ প্রাপ্তির অফিসিয়াল রশিদ' : 'অফিসিয়াল ব্যয় ও পেমেন্ট ভাউচার'}
            </div>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-2 gap-2 text-xs py-3 border-b border-gray-200">
            <div>
              <span className="text-gray-500">ভাউচার / রশিদ নং: </span>
              <strong className="font-mono text-gray-800">{receipt.voucherNo}</strong>
            </div>
            <div className="text-right">
              <span className="text-gray-500">তারিখ: </span>
              <strong className="font-mono text-gray-800">{receipt.date}</strong>
            </div>
            <div>
              <span className="text-gray-500">{isDeposit ? 'দাতা / শিক্ষার্থী: ' : 'প্রাপক / প্রতিষ্ঠান: '}</span>
              <strong className="text-[#082f32]">{receipt.donorOrStudent || '—'}</strong>
            </div>
            <div className="text-right">
              <span className="text-gray-500">মাধ্যম: </span>
              <strong className="text-gray-800">{receipt.account}</strong>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mt-3">
            <table className="w-full text-left text-xs border border-gray-200">
              <thead className="bg-[#f0f9fa] border-b border-gray-200">
                <tr>
                  <th className="py-2 px-2 border-r text-center w-10">নং</th>
                  <th className="py-2 px-3 border-r">খাত ও বিবরণ</th>
                  <th className="py-2 px-3 text-right w-28">পরিমাণ (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {receipt.items && receipt.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 px-2 border-r text-center font-mono">{idx + 1}</td>
                    <td className="py-1.5 px-3 border-r">
                      <span className="font-bold text-gray-800">{item.category}</span>
                      {item.description && (
                        <span className="text-gray-600 block text-[11px]">{item.description}</span>
                      )}
                    </td>
                    <td className="py-1.5 px-3 text-right font-mono font-bold">
                      ৳ {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-50 font-bold">
                  <td colSpan="2" className="py-2 px-3 border-r text-right">সর্বমোট টাকা:</td>
                  <td className="py-2 px-3 text-right font-mono text-sm text-[#0f626a]">
                    ৳ {receipt.totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Words */}
          <div className="mt-2 text-[11px] text-gray-700">
            <span>কথায়: </span>
            <strong className="font-bangla">{numberToWordsBn(receipt.totalAmount)}</strong>
          </div>

          {receipt.note && (
            <p className="mt-1 text-[10px] text-gray-500 italic">নোট: {receipt.note}</p>
          )}

          {/* Signatures */}
          <div className="mt-10 pt-4 flex justify-between items-end text-xs text-gray-600">
            <div className="text-center">
              <div className="h-6 flex items-end justify-center font-mono text-[11px]">
                {receipt.receiver || 'ক্যাশিয়ার'}
              </div>
              <span className="border-t border-gray-400 pt-1 block text-[10px] font-semibold">
                আদায়কারী / ক্যাশিয়ার স্বাক্ষর
              </span>
            </div>
            <div className="text-center">
              <div className="h-6 flex items-end justify-center font-bold text-[#0f626a]">
                {profile.principal}
              </div>
              <span className="border-t border-gray-400 pt-1 block text-[10px] font-semibold text-[#0f626a]">
                মুহতামিম / অনুমোদকের স্বাক্ষর
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
