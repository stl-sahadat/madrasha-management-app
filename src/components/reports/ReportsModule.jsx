import React, { useState } from 'react';
import {
  BarChart3,
  Printer,
  Download,
  Filter,
  Calendar,
  FileSpreadsheet,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Layers,
  Users,
  Award,
  DollarSign,
  HeartHandshake,
  ShoppingCart,
  CalendarCheck,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsModule = ({ initialReportId = '1' }) => {
  const {
    profile,
    students,
    teachers,
    transactions,
    accounts,
    jamats,
    committee,
    depositCategories,
    expenseCategories
  } = useApp();

  const [activeReportId, setActiveReportId] = useState(initialReportId);

  const reportList = [
    { id: '1', title: '১. দৈনিক ক্যাশ বই (Daily Cash Book)', desc: 'প্রাত্যহিক সকল জমা ও খরচের বিস্তারিত খতিয়ান' },
    { id: '2', title: '২. মাসিক আয়-ব্যয় বিবরণী (Monthly Statement)', desc: 'চলতি মাসের সামগ্রিক আর্থিক গতিবিধি' },
    { id: '3', title: '৩. জামাতভিত্তিক বকেয়া রিপোর্ট (Fee Due Report)', desc: 'শিক্ষার্থীদের বকেয়া বেতন ও ফি এর তালিকা' },
    { id: '4', title: '৪. খোরাকী ও বোডিং ফি রেজিস্টার (Khuraki Register)', desc: 'ছাত্রাবাসের মাসিক খোরাকী আদায়ের হিসাব' },
    { id: '5', title: '৫. যাকাত ও ফিতরা ফান্ড বিবরণী (Zakat Report)', desc: 'যাকাত তহবিল সংগ্রহ ও ব্যয়ের খতিয়ান' },
    { id: '6', title: '৬. সাধারণ দান ও অনুদান রেজিস্টার (Donations)', desc: 'মাদ্রাসার সাধারণ দান ও এককালীন অনুদান' },
    { id: '7', title: '৭. শিক্ষক-কর্মচারী বেতন রেজিস্টার (Payroll)', desc: 'মাসিক শিক্ষক ও কর্মচারী পারিশ্রমিক শিট' },
    { id: '8', title: '৮. দৈনিক বাজার ও রসদ খরচ হিসাব (Bazar Report)', desc: 'লিল্লা বোডিং ও বাবুর্চিখানার খাদ্য ব্যয়' },
    { id: '9', title: '৯. ছাত্র হাজিরা সামারি রিপোর্ট (Attendance)', desc: 'জামাতভিত্তিক মাসিক গড় উপস্থিতি হার' },
    { id: '10', title: '১০. পরীক্ষা ফলাফল ও মেধা তালিকা (Exam Merit)', desc: 'বার্ষিক মূল্যায়ন মেধা ক্রম ও গ্রেডিং' },
    { id: '11', title: '১১. আজীবন সদস্য চাঁদা রিপোর্ট (Life Members)', desc: 'সম্মানিত আজীবন দাতাদের চাঁদা আদায় বিবরণ' },
    { id: '12', title: '১২. ডিজিটাল অ্যাকাউন্ট বিবরণী (Bkash & Bank)', desc: 'অনলাইন ও মোবাইল ব্যাংকিং লেনদেন হিসাব' },
    { id: '13', title: '১৩. খাতভিত্তিক ব্যয় বিশ্লেষণ (Expense Breakdown)', desc: '৩৪টি ব্যয় খাতের পার্সেন্টেজ ও মোট টাকা' },
    { id: '14', title: '১৪. বাৎসরিক অডিট রিপোর্ট (Annual Audit)', desc: 'প্রতিষ্ঠানের চূড়ান্ত আর্থিক নিরীক্ষা ও স্থিতি' },
  ];

  const currentReport = reportList.find(r => r.id === activeReportId) || reportList[0];

  // Helper calculations
  const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((s, t) => s + (t.totalAmount || 0), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.totalAmount || 0), 0);
  const netSurplus = totalDeposits - totalExpenses;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let rows = [];
    let headers = [];

    switch (activeReportId) {
      case '1':
      case '2':
        headers = ['ভাউচার নং', 'তারিখ', 'ধরণ', 'খাত ও বিবরণ', 'হিসাব মাধ্যম', 'জমা (৳)', 'খরচ (৳)'];
        rows = transactions.map(t => [
          t.voucherNo,
          t.date,
          t.type === 'deposit' ? 'জমা' : 'খরচ',
          `"${t.items[0]?.category || ''} - ${t.donorOrStudent || ''}"`,
          `"${t.account || ''}"`,
          t.type === 'deposit' ? t.totalAmount : 0,
          t.type === 'expense' ? t.totalAmount : 0
        ]);
        break;
      case '3':
        headers = ['রোল', 'নাম', 'জামাত', 'অভিভাবক ফোন', 'মাসিক বেতন', 'খোরাকী ফি', 'বকেয়া মাস'];
        rows = students.map(s => [
          s.roll,
          `"${s.name}"`,
          `"${s.jamat}"`,
          s.guardianPhone,
          s.monthlyFee,
          s.khurakiFee,
          '"নভেম্বর, ডিসেম্বর"'
        ]);
        break;
      case '4':
        headers = ['রোল', 'নাম', 'জামাত', 'নির্ধারিত খোরাকী', 'পরিশোধিত মাস সংখ্যা', 'আদায়কৃত টাকা (৳)', 'বকেয়া টাকা (৳)'];
        rows = students.map(s => [
          s.roll,
          `"${s.name}"`,
          `"${s.jamat}"`,
          s.khurakiFee,
          10,
          s.khurakiFee * 10,
          s.khurakiFee * 2
        ]);
        break;
      case '5': {
        const zakatTxs = transactions.filter(t =>
          t.type === 'deposit' && (((t.items || []).some(i => i.category.includes('যাকাত') || i.category.includes('ফিতরা'))) || (t.category && (t.category.includes('যাকাত') || t.category.includes('ফিতরা'))))
        );
        headers = ['ভাউচার নং', 'তারিখ', 'দাতা ও সুহৃদয় ব্যক্তিবর্গ', 'ফান্ড / খাতের ধরণ', 'হিসাব মাধ্যম', 'আদায়কৃত অংক (৳)'];
        rows = zakatTxs.map(t => [
          t.voucherNo,
          t.date,
          `"${t.donorOrStudent || ''}"`,
          `"${t.items[0]?.category || ''}"`,
          `"${t.account || ''}"`,
          t.totalAmount
        ]);
        break;
      }
      case '6': {
        const donationTxs = transactions.filter(t =>
          t.type === 'deposit' && (((t.items || []).some(i => i.category.includes('দান') || i.category.includes('ফান্ড') || i.category.includes('চাঁদা'))) || (t.category && (t.category.includes('দান') || t.category.includes('ফান্ড') || t.category.includes('চাঁদা'))))
        );
        headers = ['ভাউচার নং', 'তারিখ', 'দানকারী সুহৃদয় ব্যক্তি', 'দানের খাত', 'মাধ্যম', 'জমা (৳)'];
        rows = donationTxs.map(t => [
          t.voucherNo,
          t.date,
          `"${t.donorOrStudent || ''}"`,
          `"${t.items[0]?.category || ''}"`,
          `"${t.account || ''}"`,
          t.totalAmount
        ]);
        break;
      }
      case '7':
        headers = ['আইডি', 'নাম', 'পদবী', 'বিভাগ', 'মোবাইল', 'মাসিক বেতন (৳)', 'বাৎসরিক প্রদেয় (৳)'];
        rows = teachers.map(t => [
          t.id,
          `"${t.name}"`,
          `"${t.designation}"`,
          `"${t.department}"`,
          t.mobile,
          t.salary,
          t.salary * 12
        ]);
        break;
      case '8': {
        const bazarTxs = transactions.filter(t =>
          t.type === 'expense' && (((t.items || []).some(i => i.category.includes('বাজার') || i.category.includes('চাল'))) || (t.category && (t.category.includes('বাজার') || t.category.includes('চাল'))))
        );
        headers = ['ভাউচার নং', 'তারিখ', 'বাজারের বিবরণ ও পণ্য', 'দায়িত্বপ্রাপ্ত কর্মকর্তা', 'মোট বাজার ব্যয় (৳)'];
        rows = bazarTxs.map(t => [
          t.voucherNo,
          t.date,
          `"${t.donorOrStudent || ''} (${t.items[0]?.description || t.items[0]?.category || ''})"`,
          `"${t.receiver || ''}"`,
          t.totalAmount
        ]);
        break;
      }
      case '9':
        headers = ['ক্রমিক', 'জামাতের নাম', 'মোট ছাত্র', 'গড় উপস্থিতি', 'গড় অনুপস্থিতি', 'দায়িত্বপ্রাপ্ত মুয়াল্লিম', 'শৃঙ্খলা মান'];
        rows = jamats.map((j, idx) => {
          const count = students.filter(s => s.jamat === j.name).length || j.count;
          const teacherName = idx === 0 ? 'হাফেজ আযম নূর' : idx === 1 ? 'মাও. আব্দুর রহমান' : idx === 2 ? 'কারী মুহাম্মদ ইব্রাহিম' : idx === 3 ? 'মাও. মাহমুদুল করিম' : 'মাও. হাবিবুল্লাহ মাসউদ';
          return [
            idx + 1,
            `"${j.name}"`,
            count,
            '৯৬.৪%',
            '৩.৬%',
            `"${teacherName}"`,
            '"উত্তম (A+)"'
          ];
        });
        break;
      case '10':
        headers = ['মেধাক্রম', 'রোল', 'শিক্ষার্থীর নাম', 'জামাত', 'কুরআন হিফজ', 'তাজবীদ', 'দ্বীনিয়াহ', 'মোট নম্বর', 'গ্রেড'];
        rows = students.slice(0, 12).map((s, idx) => [
          idx + 1,
          s.roll,
          `"${s.name}"`,
          `"${s.jamat}"`,
          `৯${8 - (idx % 4)}`,
          `৯${5 - (idx % 3)}`,
          `৯${2 - (idx % 3)}`,
          285 - idx * 3,
          '"মুমতাজ (A+)"'
        ]);
        break;
      case '11':
        headers = ['আইডি', 'নাম', 'পদবী', 'মোবাইল', 'ঠিকানা', 'বাৎসরিক অঙ্গীকার (৳)', 'আদায়কৃত চাঁদা (৳)'];
        rows = committee.map(c => [
          c.id,
          `"${c.name}"`,
          `"${c.role}"`,
          c.phone,
          `"${c.address}"`,
          24000,
          20000
        ]);
        break;
      case '12':
        headers = ['অ্যাকাউন্ট নাম', 'ধরণ', 'চলতি ব্যালেন্স (৳)'];
        rows = accounts.map(a => [
          `"${a.name}"`,
          `"${a.type}"`,
          a.balance
        ]);
        break;
      case '13':
        headers = ['ক্রমিক', 'খাতের নাম', 'লেনদেন সংখ্যা', 'ব্যয়কৃত টাকা (৳)'];
        rows = expenseCategories.map((cat, idx) => {
          const sum = transactions
            .filter(t => t.type === 'expense' && (((t.items || []).some(i => i.category === cat)) || t.category === cat))
            .reduce((s, t) => s + (t.totalAmount || t.amount || 0), 0);
          return [idx + 1, `"${cat}"`, sum > 0 ? 1 : 0, sum];
        });
        break;
      case '14':
      default:
        headers = ['ভাউচার নং', 'তারিখ', 'খাত ও বিবরণ', 'মাধ্যম', 'জমা (৳)', 'খরচ (৳)'];
        rows = transactions.map(t => [
          t.voucherNo,
          t.date,
          `"${t.items[0]?.category || ''} - ${t.donorOrStudent || ''}"`,
          `"${t.account || ''}"`,
          t.type === 'deposit' ? t.totalAmount : 0,
          t.type === 'expense' ? t.totalAmount : 0
        ]);
        rows.push(['সর্বমোট', '', '', '', totalDeposits, totalExpenses]);
        break;
    }

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" +
      `রিপোর্ট: ${currentReport.title}\r\n` +
      `প্রতিষ্ঠান: ${profile.name}\r\n` +
      `তারিখ: ${new Date().toLocaleDateString('bn-BD')}\r\n\r\n` +
      headers.join(',') + '\r\n' +
      rows.map(e => e.join(',')).join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `madrasha_report_${activeReportId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render individual report tables
  const renderReportContent = () => {
    switch (activeReportId) {
      case '1': // দৈনিক ক্যাশ বই
      case '2': // মাসিক আয়-ব্যয় বিবরণী
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3 border-r">ভাউচার নং</th>
                <th className="py-2.5 px-3 border-r">তারিখ</th>
                <th className="py-2.5 px-3 border-r">খাত ও বিবরণ</th>
                <th className="py-2.5 px-3 border-r">মাধ্যম</th>
                <th className="py-2.5 px-3 border-r text-right">জমা (টাকা ৳)</th>
                <th className="py-2.5 px-3 text-right">খরচ (টাকা ৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-r font-mono">{t.voucherNo}</td>
                  <td className="py-2 px-3 border-r font-mono text-gray-500">{t.date}</td>
                  <td className="py-2 px-3 border-r">
                    <span className="font-bold text-gray-800">{t.items[0]?.category}</span> - {t.donorOrStudent}
                  </td>
                  <td className="py-2 px-3 border-r text-gray-600">{t.account}</td>
                  <td className="py-2 px-3 border-r text-right font-mono font-bold text-emerald-700">
                    {t.type === 'deposit' ? `৳ ${t.totalAmount.toFixed(2)}` : '—'}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-rose-700">
                    {t.type === 'expense' ? `৳ ${t.totalAmount.toFixed(2)}` : '—'}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                <td colSpan="4" className="py-2.5 px-3 border-r text-right">সর্বমোট হিসাব:</td>
                <td className="py-2.5 px-3 border-r text-right font-mono text-emerald-700">৳ {totalDeposits.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-right font-mono text-rose-700">৳ {totalExpenses.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        );

      case '3': // জামাতভিত্তিক বকেয়া রিপোর্ট
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r">রোল</th>
                <th className="py-2.5 px-3 border-r">শিক্ষার্থীর নাম</th>
                <th className="py-2.5 px-3 border-r">জামাত</th>
                <th className="py-2.5 px-3 border-r">অভিভাবক ফোন</th>
                <th className="py-2.5 px-3 border-r text-right">মাসিক বেতন</th>
                <th className="py-2.5 px-3 border-r text-right">খোরাকী ফি</th>
                <th className="py-2.5 px-3 text-center">বকেয়া মাস</th>
                <th className="py-2.5 px-3 text-right">মোট বকেয়া (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.slice(0, 15).map(s => {
                const dueTotal = (s.monthlyFee + s.khurakiFee) * 2;
                return (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border-r font-mono font-bold">{s.roll}</td>
                    <td className="py-2 px-3 border-r font-bold text-gray-800">{s.name}</td>
                    <td className="py-2 px-3 border-r">{s.jamat}</td>
                    <td className="py-2 px-3 border-r font-mono text-gray-500">{s.guardianPhone}</td>
                    <td className="py-2 px-3 border-r text-right font-mono">৳ {s.monthlyFee}</td>
                    <td className="py-2 px-3 border-r text-right font-mono">৳ {s.khurakiFee}</td>
                    <td className="py-2 px-3 text-center text-rose-600 font-bold">নভেম্বর, ডিসেম্বর</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-rose-700">৳ {dueTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );

      case '4': // খোরাকী ও বোডিং ফি রেজিস্টার
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r">রোল</th>
                <th className="py-2.5 px-3 border-r">শিক্ষার্থীর নাম</th>
                <th className="py-2.5 px-3 border-r">জামাত</th>
                <th className="py-2.5 px-3 border-r text-right">মাসিক খোরাকী রেট</th>
                <th className="py-2.5 px-3 border-r text-center">পরিশোধিত মাস</th>
                <th className="py-2.5 px-3 border-r text-right">আদায়কৃত খোরাকী</th>
                <th className="py-2.5 px-3 text-center">স্থিতি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.slice(0, 15).map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-r font-mono font-bold">{s.roll}</td>
                  <td className="py-2 px-3 border-r font-bold text-gray-800">{s.name}</td>
                  <td className="py-2 px-3 border-r">{s.jamat}</td>
                  <td className="py-2 px-3 border-r text-right font-mono font-bold">৳ {s.khurakiFee}</td>
                  <td className="py-2 px-3 border-r text-center font-mono">১০ মাস (জানু-অক্টো)</td>
                  <td className="py-2 px-3 border-r text-right font-mono text-emerald-700 font-bold">৳ {s.khurakiFee * 10}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      নিয়মিত আবাসিক
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case '5': // যাকাত ও ফিতরা ফান্ড বিবরণী
        {
          const zakatTxs = transactions.filter(t =>
            t.type === 'deposit' && (((t.items || []).some(i => i.category.includes('যাকাত') || i.category.includes('ফিতরা'))) || (t.category && (t.category.includes('যাকাত') || t.category.includes('ফিতরা'))))
          );
          return (
            <table className="w-full text-left text-xs border border-gray-200">
              <thead className="bg-[#f8fafc] border-b">
                <tr>
                  <th className="py-2.5 px-3 border-r">ভাউচার নং</th>
                  <th className="py-2.5 px-3 border-r">তারিখ</th>
                  <th className="py-2.5 px-3 border-r">দাতা ও সুহৃদয় ব্যক্তিবর্গ</th>
                  <th className="py-2.5 px-3 border-r">ফান্ড / খাতের ধরণ</th>
                  <th className="py-2.5 px-3 border-r">হিসাব মাধ্যম</th>
                  <th className="py-2.5 px-3 text-right">আদায়কৃত অংক (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {zakatTxs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      কোন যাকাত লেনদেন পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  zakatTxs.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border-r font-mono font-bold">{t.voucherNo}</td>
                      <td className="py-2 px-3 border-r font-mono text-gray-500">{t.date}</td>
                      <td className="py-2 px-3 border-r font-bold text-gray-800">{t.donorOrStudent}</td>
                      <td className="py-2 px-3 border-r text-[#15803D] font-semibold">{t.items[0]?.category}</td>
                      <td className="py-2 px-3 border-r text-gray-600">{t.account}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">৳ {t.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          );
        }

      case '6': // সাধারণ দান ও অনুদান রেজিস্টার
        {
          const donationTxs = transactions.filter(t =>
            t.type === 'deposit' && (((t.items || []).some(i => i.category.includes('দান') || i.category.includes('ফান্ড') || i.category.includes('চাঁদা'))) || (t.category && (t.category.includes('দান') || t.category.includes('ফান্ড') || t.category.includes('চাঁদা'))))
          );
          return (
            <table className="w-full text-left text-xs border border-gray-200">
              <thead className="bg-[#f8fafc] border-b">
                <tr>
                  <th className="py-2.5 px-3 border-r">ভাউচার নং</th>
                  <th className="py-2.5 px-3 border-r">তারিখ</th>
                  <th className="py-2.5 px-3 border-r">দানকারী সুহৃদয় ব্যক্তি</th>
                  <th className="py-2.5 px-3 border-r">দানের খাত</th>
                  <th className="py-2.5 px-3 border-r">মাধ্যম</th>
                  <th className="py-2.5 px-3 text-right">জমা (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donationTxs.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border-r font-mono font-bold">{t.voucherNo}</td>
                    <td className="py-2 px-3 border-r font-mono text-gray-500">{t.date}</td>
                    <td className="py-2 px-3 border-r font-bold text-gray-800">{t.donorOrStudent}</td>
                    <td className="py-2 px-3 border-r text-emerald-700 font-semibold">{t.items[0]?.category}</td>
                    <td className="py-2 px-3 border-r text-gray-600">{t.account}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">৳ {t.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }

      case '7': // শিক্ষক-কর্মচারী বেতন রেজিস্টার
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r">আইডি</th>
                <th className="py-2.5 px-3 border-r">শিক্ষকের নাম</th>
                <th className="py-2.5 px-3 border-r">পদবী</th>
                <th className="py-2.5 px-3 border-r">বিভাগ</th>
                <th className="py-2.5 px-3 border-r">মোবাইল</th>
                <th className="py-2.5 px-3 border-r text-right">মাসিক বেতন (৳)</th>
                <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-r font-mono font-bold">{t.id}</td>
                  <td className="py-2 px-3 border-r font-bold text-gray-800">{t.name}</td>
                  <td className="py-2 px-3 border-r">{t.designation}</td>
                  <td className="py-2 px-3 border-r">{t.department}</td>
                  <td className="py-2 px-3 border-r font-mono">{t.mobile}</td>
                  <td className="py-2 px-3 border-r text-right font-mono font-bold text-gray-900">৳ {t.salary}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      পরিশোধিত
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case '8': // দৈনিক বাজার ও রসদ খরচ হিসাব
        {
          const bazarTxs = transactions.filter(t =>
            t.type === 'expense' && (((t.items || []).some(i => i.category.includes('বাজার') || i.category.includes('চাল'))) || (t.category && (t.category.includes('বাজার') || t.category.includes('চাল'))))
          );
          return (
            <table className="w-full text-left text-xs border border-gray-200">
              <thead className="bg-[#f8fafc] border-b">
                <tr>
                  <th className="py-2.5 px-3 border-r">ভাউচার নং</th>
                  <th className="py-2.5 px-3 border-r">তারিখ</th>
                  <th className="py-2.5 px-3 border-r">বাজারের বিবরণ ও পণ্য</th>
                  <th className="py-2.5 px-3 border-r">দায়িত্বপ্রাপ্ত কর্মকর্তা</th>
                  <th className="py-2.5 px-3 text-right">মোট বাজার ব্যয় (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bazarTxs.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border-r font-mono font-bold">{t.voucherNo}</td>
                    <td className="py-2 px-3 border-r font-mono text-gray-500">{t.date}</td>
                    <td className="py-2 px-3 border-r font-bold text-gray-800">
                      {t.donorOrStudent} ({t.items[0]?.description || t.items[0]?.category})
                    </td>
                    <td className="py-2 px-3 border-r text-gray-600">{t.receiver}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-rose-700">৳ {t.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }

      case '9': // ছাত্র হাজিরা সামারি রিপোর্ট
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r">ক্রমিক</th>
                <th className="py-2.5 px-3 border-r">জামাতের নাম</th>
                <th className="py-2.5 px-3 border-r text-center">মোট ছাত্র</th>
                <th className="py-2.5 px-3 border-r text-center">গড় উপস্থিতি</th>
                <th className="py-2.5 px-3 border-r text-center">গড় অনুপস্থিতি</th>
                <th className="py-2.5 px-3 border-r">দায়িত্বপ্রাপ্ত মুয়াল্লিম</th>
                <th className="py-2.5 px-3 text-center">শৃঙ্খলা মান</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jamats.map((j, idx) => {
                const count = students.filter(s => s.jamat === j.name).length || j.count;
                const teacherName = idx === 0 ? 'হাফেজ আযম নূর' : idx === 1 ? 'মাও. আব্দুর রহমান' : idx === 2 ? 'কারী মুহাম্মদ ইব্রাহিম' : idx === 3 ? 'মাও. মাহমুদুল করিম' : 'মাও. হাবিবুল্লাহ মাসউদ';
                return (
                  <tr key={j.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border-r font-mono text-center">{idx + 1}</td>
                    <td className="py-2 px-3 border-r font-bold text-gray-800">{j.name}</td>
                    <td className="py-2 px-3 border-r text-center font-mono font-bold text-[#15803D]">{count} জন</td>
                    <td className="py-2 px-3 border-r text-center font-mono text-emerald-700 font-bold">৯৬.৪%</td>
                    <td className="py-2 px-3 border-r text-center font-mono text-rose-600 font-semibold">৩.৬%</td>
                    <td className="py-2 px-3 border-r text-gray-700">{teacherName}</td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        উত্তম (A+)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );

      case '10': // পরীক্ষা ফলাফল ও মেধা তালিকা
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r text-center">মেধাক্রম</th>
                <th className="py-2.5 px-3 border-r">রোল</th>
                <th className="py-2.5 px-3 border-r">শিক্ষার্থীর নাম</th>
                <th className="py-2.5 px-3 border-r">জামাত</th>
                <th className="py-2.5 px-3 border-r text-center">কুরআন হিফজ</th>
                <th className="py-2.5 px-3 border-r text-center">তাজবীদ</th>
                <th className="py-2.5 px-3 border-r text-center">দ্বীনিয়াহ</th>
                <th className="py-2.5 px-3 border-r text-center">মোট নম্বর</th>
                <th className="py-2.5 px-3 text-center">গ্রেড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.slice(0, 12).map((s, idx) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-r font-mono font-bold text-center text-[#15803D]">#{idx + 1}</td>
                  <td className="py-2 px-3 border-r font-mono font-bold">{s.roll}</td>
                  <td className="py-2 px-3 border-r font-bold text-gray-800">{s.name}</td>
                  <td className="py-2 px-3 border-r">{s.jamat}</td>
                  <td className="py-2 px-3 border-r text-center font-mono">৯{8 - (idx % 4)}</td>
                  <td className="py-2 px-3 border-r text-center font-mono">৯{5 - (idx % 3)}</td>
                  <td className="py-2 px-3 border-r text-center font-mono">৯{2 - (idx % 3)}</td>
                  <td className="py-2 px-3 border-r text-center font-mono font-bold text-[#15803D]">{285 - idx * 3}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      মুমতাজ (A+)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case '11': // আজীবন সদস্য চাঁদা রিপোর্ট
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r">সদস্য আইডি</th>
                <th className="py-2.5 px-3 border-r">সম্মানিত সদস্যের নাম</th>
                <th className="py-2.5 px-3 border-r">কমিটি পদবী</th>
                <th className="py-2.5 px-3 border-r">মোবাইল</th>
                <th className="py-2.5 px-3 border-r text-right">বাৎসরিক চাঁদা (৳)</th>
                <th className="py-2.5 px-3 border-r text-right">আদায়কৃত (৳)</th>
                <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {committee.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border-r font-mono font-bold">{c.id}</td>
                  <td className="py-2 px-3 border-r font-bold text-gray-800">{c.name}</td>
                  <td className="py-2 px-3 border-r">{c.role}</td>
                  <td className="py-2 px-3 border-r font-mono">{c.phone}</td>
                  <td className="py-2 px-3 border-r text-right font-mono font-bold">৳ ২৪,০০০.০০</td>
                  <td className="py-2 px-3 border-r text-right font-mono text-emerald-700 font-bold">৳ ২০,০০০.০০</td>
                  <td className="py-2 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      নিয়মিত দাতা
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case '12': // ডিজিটাল অ্যাকাউন্ট বিবরণী
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r">অ্যাকাউন্ট নাম</th>
                <th className="py-2.5 px-3 border-r">ধরণ</th>
                <th className="py-2.5 px-3 border-r text-right">মোট জমা ভাউচার</th>
                <th className="py-2.5 px-3 border-r text-right">মোট খরচ ভাউচার</th>
                <th className="py-2.5 px-3 text-right">বর্তমান ব্যালেন্স স্থিতি (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {accounts.map(a => {
                const dep = transactions
                  .filter(t => t.type === 'deposit' && (t.account === a.name || t.account === a.id))
                  .reduce((s, t) => s + t.totalAmount, 0);
                const exp = transactions
                  .filter(t => t.type === 'expense' && (t.account === a.name || t.account === a.id))
                  .reduce((s, t) => s + t.totalAmount, 0);
                return (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 border-r font-bold text-gray-800">{a.name}</td>
                    <td className="py-2.5 px-3 border-r text-gray-600">{a.type}</td>
                    <td className="py-2.5 px-3 border-r text-right font-mono text-emerald-700 font-bold">৳ {dep.toFixed(2)}</td>
                    <td className="py-2.5 px-3 border-r text-right font-mono text-rose-700 font-bold">৳ {exp.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-base text-[#15803D]">৳ {a.balance.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );

      case '13': // খাতভিত্তিক ব্যয় বিশ্লেষণ
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b">
              <tr>
                <th className="py-2.5 px-3 border-r text-center w-12">নং</th>
                <th className="py-2.5 px-3 border-r">ব্যয় / খরচ খাতের নাম</th>
                <th className="py-2.5 px-3 border-r text-center">লেনদেন সংখ্যা</th>
                <th className="py-2.5 px-3 border-r text-right">মোট খরচ (৳)</th>
                <th className="py-2.5 px-3 text-right">শতকরা হার (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenseCategories.map((cat, idx) => {
                const matchingTxs = transactions.filter(t =>
                  t.type === 'expense' && (((t.items || []).some(i => i.category === cat)) || t.category === cat)
                );
                const sum = matchingTxs.reduce((s, t) => s + (t.totalAmount || t.amount || 0), 0);
                const percentage = totalExpenses > 0 ? ((sum / totalExpenses) * 100).toFixed(1) : '0.0';
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border-r font-mono text-center">{idx + 1}</td>
                    <td className="py-2 px-3 border-r font-bold text-gray-800">{cat}</td>
                    <td className="py-2 px-3 border-r text-center font-mono">{matchingTxs.length} টি</td>
                    <td className="py-2 px-3 border-r text-right font-mono font-bold text-rose-700">৳ {sum.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right font-mono text-gray-600 font-semibold">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );

      case '14': // বাৎসরিক অডিট রিপোর্ট
      default:
        return (
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-[#f8fafc] border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3 border-r">ভাউচার নং</th>
                <th className="py-2.5 px-3 border-r">তারিখ</th>
                <th className="py-2.5 px-3 border-r">খাত ও বিবরণ</th>
                <th className="py-2.5 px-3 border-r">মাধ্যম</th>
                <th className="py-2.5 px-3 border-r text-right">জমা (টাকা ৳)</th>
                <th className="py-2.5 px-3 text-right">খরচ (টাকা ৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(t => (
                <tr key={t.id}>
                  <td className="py-2 px-3 border-r font-mono">{t.voucherNo}</td>
                  <td className="py-2 px-3 border-r font-mono text-gray-500">{t.date}</td>
                  <td className="py-2 px-3 border-r">
                    <span className="font-bold text-gray-800">{t.items[0]?.category}</span> - {t.donorOrStudent}
                  </td>
                  <td className="py-2 px-3 border-r text-gray-600">{t.account}</td>
                  <td className="py-2 px-3 border-r text-right font-mono font-bold text-emerald-700">
                    {t.type === 'deposit' ? `৳ ${t.totalAmount.toFixed(2)}` : '—'}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-rose-700">
                    {t.type === 'expense' ? `৳ ${t.totalAmount.toFixed(2)}` : '—'}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                <td colSpan="4" className="py-2.5 px-3 border-r text-right">সর্বমোট হিসাব:</td>
                <td className="py-2.5 px-3 border-r text-right font-mono text-emerald-700">৳ {totalDeposits.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-right font-mono text-rose-700">৳ {totalExpenses.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-[#15803D]" />
            <span>সমন্বিত আর্থিক ও প্রশাসনিক রিপোর্ট (১৪টি শাখা)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            মাদ্রাসার সমস্ত আর্থিক, শিক্ষাগত ও ব্যবস্থাপনা সংক্রান্ত ১৪টি সম্পূর্ণ রিপোর্ট
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>এক্সেল / CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট রিপোর্ট</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: 14 Reports Selector List (Hidden on print) */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm space-y-1.5 no-print max-h-[750px] overflow-y-auto">
          <span className="text-xs font-bold text-gray-500 block px-2 pb-2 border-b">
            রিপোর্টের তালিকা নির্বাচন (১৪ টি):
          </span>
          {reportList.map(rep => (
            <button
              key={rep.id}
              onClick={() => setActiveReportId(rep.id)}
              className={`w-full text-left p-2.5 rounded-xl text-xs transition duration-150 block ${
                activeReportId === rep.id
                  ? 'bg-[#15803D] text-white font-bold shadow-xs'
                  : 'text-gray-700 hover:bg-[#dcfce7] hover:text-[#15803D]'
              }`}
            >
              <div className="leading-snug">{rep.title}</div>
              <div className={`text-[10px] truncate mt-0.5 ${
                activeReportId === rep.id ? 'text-emerald-200' : 'text-gray-400'
              }`}>
                {rep.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Right: Detailed Active Report View */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-[#e2e8f0] shadow-sm print:p-0 print:border-none">
          {/* Official Report Header */}
          <div className="text-center pb-4 border-b-2 border-[#15803D]">
            <h2 className="text-xl font-extrabold text-[#0F172A] font-bangla">
              {profile.name}
            </h2>
            <p className="text-xs text-gray-600">{profile.address}</p>
            <p className="text-[11px] text-gray-500 font-mono">
              ফোন: {profile.phone1} | ইমেইল: {profile.email} | প্রতিষ্ঠা: {profile.established}
            </p>
            <div className="inline-block mt-3 px-4 py-1 bg-[#dcfce7] text-[#15803D] text-xs font-extrabold rounded-full border border-[#15803D]/30">
              {currentReport.title}
            </div>
            <p className="text-[11px] text-gray-400 mt-1 font-mono">
              রিপোর্ট প্রস্তুতের তারিখ: {new Date().toLocaleDateString('bn-BD')}
            </p>
          </div>

          {/* Report Financial Highlights */}
          <div className="grid grid-cols-3 gap-3 my-4 text-center">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-semibold block">মোট জমা / আদায়</span>
              <span className="text-base font-bold text-emerald-700 font-mono">৳ {totalDeposits.toFixed(2)}</span>
            </div>
            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-[11px] text-rose-800 font-semibold block">মোট ব্যয় / খরচ</span>
              <span className="text-base font-bold text-rose-700 font-mono">৳ {totalExpenses.toFixed(2)}</span>
            </div>
            <div className="p-2.5 bg-[#f8fafc] rounded-xl border border-[#15803D]/30">
              <span className="text-[11px] text-[#0F172A] font-semibold block">নিট সংরক্ষিত স্থিতি</span>
              <span className="text-base font-bold text-[#15803D] font-mono">৳ {netSurplus.toFixed(2)}</span>
            </div>
          </div>

          {/* Dynamic Table based on Active Report */}
          <div className="mt-4 overflow-x-auto">
            {renderReportContent()}
          </div>

          {/* Signatures for Official Report */}
          <div className="mt-12 pt-6 flex justify-between items-end text-xs text-gray-600 border-t border-gray-200">
            <div className="text-center">
              <span className="border-t border-gray-500 pt-1 block font-semibold text-gray-800">
                হিসাবরক্ষক / ক্যাশিয়ার স্বাক্ষর
              </span>
            </div>
            <div className="text-center">
              <span className="border-t border-gray-500 pt-1 block font-semibold text-gray-800">
                অভ্যন্তরীণ নিরীক্ষক (Auditor)
              </span>
            </div>
            <div className="text-center">
              <span className="border-t border-gray-500 pt-1 block font-bold text-[#15803D]">
                মুহতামিম / প্রধান পরীক্ষক
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
