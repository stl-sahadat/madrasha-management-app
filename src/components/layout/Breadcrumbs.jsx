import React from 'react';
import { useApp } from '../../context/AppContext';

const TAB_METADATA = {
  // ড্যাশবোর্ড
  'dashboard': { section: '', title: 'ড্যাশবোর্ড', parentTab: 'dashboard' },

  // ছাত্র/ছাত্রী
  'student-create': { section: 'ছাত্র/ছাত্রী', title: 'ছাত্র/ছাত্রী তৈরি', parentTab: 'student-list' },
  'student-list': { section: 'ছাত্র/ছাত্রী', title: 'ছাত্র/ছাত্রী লিস্ট', parentTab: 'student-list' },
  'jamat-grid': { section: 'ছাত্র/ছাত্রী', title: 'জামাত অনুসারে ছাত্র/ছাত্রী', parentTab: 'student-list' },
  'student-admission-report': { section: 'ছাত্র/ছাত্রী', title: 'জামাত অনুসারে ভর্তি প্রতিবেদন', parentTab: 'student-list' },
  'student-admission-register': { section: 'ছাত্র/ছাত্রী', title: 'জামাত অনুসারে ভর্তি রেজিষ্টার', parentTab: 'student-list' },
  'student-bloodgroup': { section: 'ছাত্র/ছাত্রী', title: 'রক্তের গ্রুপ অনুসারে ছাত্র/ছাত্রী', parentTab: 'student-list' },
  'student-parents-number': { section: 'ছাত্র/ছাত্রী', title: 'জামাত অনুযায়ী অভিভাবকের মোবাঃ নাম্বার', parentTab: 'student-list' },
  'student-khuraki-entry': { section: 'ছাত্র/ছাত্রী', title: 'খানার টাকা জমার এন্ট্রি সিস্টেম', parentTab: 'student-khuraki-list' },
  'student-khuraki-list': { section: 'ছাত্র/ছাত্রী', title: 'খানার টাকা জমার তালিকা', parentTab: 'student-khuraki-list' },
  'student-khuraki-register': { section: 'ছাত্র/ছাত্রী', title: 'খোরাকীর টাকা আদায়ের রেজিস্টার', parentTab: 'student-khuraki-list' },
  'student-salary-entry': { section: 'ছাত্র/ছাত্রী', title: 'বেতন জমার এন্ট্রি সিস্টেম', parentTab: 'student-salary-list' },
  'student-salary-list': { section: 'ছাত্র/ছাত্রী', title: 'বেতনের টাকা জমার তালিকা', parentTab: 'student-salary-list' },
  'student-salary-register': { section: 'ছাত্র/ছাত্রী', title: 'বেতনের টাকা আদায়ের রেজিস্টার', parentTab: 'student-salary-list' },
  'student-fees': { section: 'ছাত্র/ছাত্রী', title: '১২ মাসের বেতন ও খোরাকী ফি কার্ড', parentTab: 'student-salary-register' },
  'student-admission-form': { section: 'ছাত্র/ছাত্রী', title: 'ভর্তি ফর্ম', parentTab: 'student-list' },
  'student-prottoyon': { section: 'ছাত্র/ছাত্রী', title: 'প্রত্যয়ন পত্র', parentTab: 'student-list' },
  'student-certificate': { section: 'ছাত্র/ছাত্রী', title: 'সার্টিফিকেট / প্রশংসাপত্র', parentTab: 'student-list' },

  // শিক্ষক
  'teacher-create': { section: 'শিক্ষক', title: 'শিক্ষক তৈরি', parentTab: 'teacher-list' },
  'teacher-list': { section: 'শিক্ষক', title: 'শিক্ষক তালিকা', parentTab: 'teacher-list' },
  'teacher-number': { section: 'শিক্ষক', title: 'শিক্ষকগণের মোবাইল নম্বর', parentTab: 'teacher-list' },
  'teacher-salary-sheet': { section: 'শিক্ষক', title: 'শিক্ষকগণের বেতন তালিকা', parentTab: 'teacher-list' },
  'teacher-salary-day': { section: 'শিক্ষক', title: 'শিক্ষকগণের বেতন দিন', parentTab: 'teacher-salary-sheet' },
  'teacher-salary-list': { section: 'শিক্ষক', title: 'শিক্ষকের বেতন প্রদানের লিস্ট', parentTab: 'teacher-salary-sheet' },

  // মাসিক চাঁদাদাতা
  'contributor-list': { section: 'মাসিক চাঁদাদাতা', title: 'মাসিক চাঁদাদাতার তালিকা', parentTab: 'contributor-list' },
  'contributor-create': { section: 'মাসিক চাঁদাদাতা', title: 'নতুন চাঁদাদাতা তৈরি', parentTab: 'contributor-list' },
  'contributor-add': { section: 'মাসিক চাঁদাদাতা', title: 'মাসিক চাঁদা গ্রহণ', parentTab: 'contributor-list' },
  'contributor-individual': { section: 'মাসিক চাঁদাদাতা', title: 'মাসিক চাঁদাদাতার তালিকা (একক ভাবে)', parentTab: 'contributor-list' },
  'contributor-all': { section: 'মাসিক চাঁদাদাতা', title: 'মাসিক চাঁদাদাতাদের তালিকা (সকল)', parentTab: 'contributor-list' },
  'contributor-history': { section: 'মাসিক চাঁদাদাতা', title: 'মাসিক চাঁদা গ্রহণের লিস্ট', parentTab: 'contributor-list' },

  // দানকারী
  'donor-list': { section: 'দানকারী', title: 'দানকারীর তালিকা', parentTab: 'donor-list' },
  'donor-create': { section: 'দানকারী', title: 'নতুন দানকারী তৈরি', parentTab: 'donor-list' },
  'donation-create': { section: 'দানকারী', title: 'দান গ্রহণ', parentTab: 'donor-list' },
  'donor-individual': { section: 'দানকারী', title: 'দানকারীর তালিকা (একক ভাবে)', parentTab: 'donor-list' },
  'donor-all': { section: 'দানকারী', title: 'দানকারীর তালিকা (সকল)', parentTab: 'donor-list' },
  'donation-history': { section: 'দানকারী', title: 'দান গ্রহণের লিস্ট', parentTab: 'donor-list' },

  // যাকাত দাতা
  'zakat-donor-list': { section: 'যাকাত দাতা', title: 'যাকাত দাতার তালিকা', parentTab: 'zakat-donor-list' },
  'zakat-donor-create': { section: 'যাকাত দাতা', title: 'নতুন যাকাত দাতা তৈরি', parentTab: 'zakat-donor-list' },
  'zakat-donation-create': { section: 'যাকাত দাতা', title: 'যাকাত গ্রহণ', parentTab: 'zakat-donor-list' },
  'zakat-donor-individual': { section: 'যাকাত দাতা', title: 'যাকাত দাতার তালিকা (একক ভাবে)', parentTab: 'zakat-donor-list' },
  'zakat-donor-all': { section: 'যাকাত দাতা', title: 'যাকাত দাতার তালিকা (সকল)', parentTab: 'zakat-donor-list' },
  'zakat-donation-history': { section: 'যাকাত দাতা', title: 'যাকাত গ্রহণের লিস্ট', parentTab: 'zakat-donor-list' },

  // বাজার
  'bazar-weekly-create': { section: 'বাজার', title: 'সাপ্তাহিক বাজার এন্ট্রি', parentTab: 'bazar-weekly-create' },
  'bazar-weekly-report': { section: 'বাজার', title: 'সাপ্তাহিক বাজার রিপোর্ট', parentTab: 'bazar-weekly-create' },
  'bazar-weekly-list': { section: 'বাজার', title: 'সাপ্তাহিক বাজার লিস্ট', parentTab: 'bazar-weekly-create' },
  'bazar-monthly-create': { section: 'বাজার', title: 'মাসিক বাজার এন্ট্রি', parentTab: 'bazar-weekly-create' },
  'bazar-monthly-report': { section: 'বাজার', title: 'মাসিক বাজার রিপোর্ট', parentTab: 'bazar-weekly-create' },
  'bazar-monthly-list': { section: 'বাজার', title: 'মাসিক বাজার লিস্ট', parentTab: 'bazar-weekly-create' },

  // কমিটি
  'committee-list': { section: 'কমিটি', title: 'কমিটির সদস্যগণ', parentTab: 'committee-list' },

  // হাজিরা
  'attendance-student': { section: 'হাজিরা', title: 'ছাত্র-ছাত্রী হাজিরা', parentTab: 'attendance-student' },
  'attendance-student-report': { section: 'হাজিরা', title: 'ছাত্র-ছাত্রী হাজিরা প্রতিবেদন', parentTab: 'attendance-student' },
  'attendance-teacher': { section: 'হাজিরা', title: 'শিক্ষক হাজিরা', parentTab: 'attendance-student' },
  'attendance-teacher-report': { section: 'হাজিরা', title: 'শিক্ষক হাজিরা রিপোর্ট', parentTab: 'attendance-student' },

  // রেজাল্ট
  'result-create': { section: 'রেজাল্ট', title: 'মার্কস এনট্রি/আপডেট', parentTab: 'result-sheet' },
  'result-sheet': { section: 'রেজাল্ট', title: 'রেজাল্ট শীট', parentTab: 'result-sheet' },
  'result-student': { section: 'রেজাল্ট', title: 'ছাত্র-ছাত্রী ভিত্তিক রেজাল্ট', parentTab: 'result-sheet' },

  // জমা/খরচ হিসাব সমূহ
  'voucher-deposit': { section: 'জমা/খরচ হিসাব সমূহ', title: 'নতুন অর্থ জমা করুন', parentTab: 'deposit-list' },
  'deposit-list': { section: 'জমা/খরচ হিসাব সমূহ', title: 'জমার লিস্ট', parentTab: 'deposit-list' },
  'voucher-expense': { section: 'জমা/খরচ হিসাব সমূহ', title: 'নতুন খরচ', parentTab: 'expense-list' },
  'expense-list': { section: 'জমা/খরচ হিসাব সমূহ', title: 'খরচের লিস্ট', parentTab: 'expense-list' },

  // আইডি কার্ড
  'idcard-student': { section: 'আইডি কার্ড', title: 'ছাএ-ছাএীর আইডি কার্ড', parentTab: 'idcard-student' },
  'idcard-teacher': { section: 'আইডি কার্ড', title: 'শিক্ষকদের আইডি কার্ড', parentTab: 'idcard-teacher' },

  // এসএমএস
  'sms-student': { section: 'এসএমএস', title: 'ছাত্র/ছাত্রীদের এসএমএস', parentTab: 'sms-student' },
  'sms-teacher': { section: 'এসএমএস', title: 'শিক্ষকদের এসএমএস', parentTab: 'sms-teacher' },

  // অ্যাকাউন্ট
  'account-create': { section: 'অ্যাকাউন্ট', title: 'নতুন অ্যাকাউন্ট তৈরি', parentTab: 'account-list' },
  'account-list': { section: 'অ্যাকাউন্ট', title: 'অ্যাকাউন্ট তালিকা', parentTab: 'account-list' },
  'account-report': { section: 'অ্যাকাউন্ট', title: 'অ্যাকাউন্ট বিবরণী', parentTab: 'account-list' },
  'accounts-transfer': { section: 'অ্যাকাউন্ট', title: 'ব্যলেন্স ট্রান্সফার', parentTab: 'account-list' },
  'balancesheet': { section: 'অ্যাকাউন্ট', title: 'ব্যলেন্স সিট', parentTab: 'account-list' },

  // রিপোর্ট
  'report-deposit': { section: 'রিপোর্ট', title: 'জমার রিপোর্ট', parentTab: 'report-deposit' },
  'report-student-deposit': { section: 'রিপোর্ট', title: 'ছাত্র/ছাত্রী জমার রিপোর্ট', parentTab: 'report-deposit' },
  'report-student-salary': { section: 'রিপোর্ট', title: 'ছাত্র/ছাত্রীর মাসিক বেতন জমার রিপোর্ট', parentTab: 'report-deposit' },
  'report-deposit-account': { section: 'রিপোর্ট', title: 'জমার খাতের রিপোর্ট', parentTab: 'report-deposit' },
  'report-monthly-donors': { section: 'রিপোর্ট', title: 'মাসিক চাদাদাতার রিপোর্ট', parentTab: 'report-deposit' },
  'report-account-deposit': { section: 'রিপোর্ট', title: 'এ্যাকাউন্টে জমার রিপোর্ট', parentTab: 'report-deposit' },
  'report-expense': { section: 'রিপোর্ট', title: 'খরচের রিপোর্ট', parentTab: 'report-deposit' },
  'report-expense-account': { section: 'রিপোর্ট', title: 'খরচের খাতের রিপোর্ট', parentTab: 'report-deposit' },
  'report-account-expense': { section: 'রিপোর্ট', title: 'এ্যাকাউন্টে খরচের রিপোর্ট', parentTab: 'report-deposit' },
  'report-deposit-expense': { section: 'রিপোর্ট', title: 'জমা ও খরচের রিপোর্ট', parentTab: 'report-deposit' },
  'report-account-details': { section: 'রিপোর্ট', title: 'এ্যাকাউন্টে বিবরণ', parentTab: 'report-deposit' },
  'report-daily': { section: 'রিপোর্ট', title: 'দৈনিক আয়-ব্যয়ের প্রতিবেদন', parentTab: 'report-deposit' },
  'report-yearly': { section: 'রিপোর্ট', title: 'বার্ষিক আয়-ব্যয়ের প্রতিবেদন', parentTab: 'report-deposit' },
  'report-bank': { section: 'রিপোর্ট', title: 'ব্যাংক প্রতিবেদন', parentTab: 'report-deposit' },

  // সেটিং
  'settings-institute': { section: 'সেটিং', title: 'প্রতিষ্ঠানের তথ্য', parentTab: 'settings-institute' },
  'settings-jamat': { section: 'সেটিং', title: 'জামাত তৈরি', parentTab: 'settings-institute' },
  'settings-payment': { section: 'সেটিং', title: 'পেমেন্ট মাধ্যম তৈরি', parentTab: 'settings-institute' },
  'settings-deposit-cat': { section: 'সেটিং', title: 'জমার খাত', parentTab: 'settings-institute' },
  'settings-expense-cat': { section: 'সেটিং', title: 'খরচের খাত', parentTab: 'settings-institute' },
  'settings-receiver': { section: 'সেটিং', title: 'গ্রহণকারী', parentTab: 'settings-institute' },
  'settings-role': { section: 'সেটিং', title: 'রোল (Role)', parentTab: 'settings-institute' },
  'settings-user': { section: 'সেটিং', title: 'ইউজার', parentTab: 'settings-institute' }
};

export const Breadcrumbs = () => {
  const { activeTab, setActiveTab } = useApp();

  if (
    !activeTab ||
    activeTab === 'dashboard' ||
    ['report-daily', 'report-yearly', 'report-bank'].includes(activeTab) ||
    activeTab === 'report-deposit' ||
    activeTab.startsWith('report-')
  ) {
    return null;
  }

  const meta = TAB_METADATA[activeTab] || {
    section: 'মডিউল',
    title: activeTab,
    parentTab: 'dashboard'
  };

  return (
    <div className="row mb-3 no-print">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body py-2 px-3 d-flex flex-wrap justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <span className="badge bg-primary me-2 px-2 py-1 font-mono">2026</span>
              {meta.title}
            </h6>
            <div aria-label="breadcrumb" className="breadcrumb-nav">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item">
                  <a
                    href="#dashboard"
                    onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
                    className="text-decoration-none text-muted"
                  >
                    <i className="fa-regular fa-house me-1"></i> ড্যাশবোর্ড
                  </a>
                </li>
                {meta.section && (
                  <li className="breadcrumb-item">
                    <a
                      href={`#${meta.parentTab}`}
                      onClick={(e) => { e.preventDefault(); setActiveTab(meta.parentTab); }}
                      className="text-decoration-none text-muted"
                    >
                      {meta.section}
                    </a>
                  </li>
                )}
                <li className="breadcrumb-item active text-primary fw-bold" aria-current="page">
                  {meta.title}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
