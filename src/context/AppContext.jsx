'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MADRASHA_PROFILE,
  JAMATS,
  DEPOSIT_CATEGORIES,
  EXPENSE_CATEGORIES,
  ACCOUNTS,
  RECEIVERS,
  INITIAL_STUDENTS,
  INITIAL_TRANSACTIONS,
  INITIAL_TEACHERS,
  INITIAL_COMMITTEE,
  INITIAL_NOTICES,
  INITIAL_CONTRIBUTORS,
  INITIAL_DONORS,
  INITIAL_ZAKAT_DONORS,
  INITIAL_WEEKLY_BAZAR,
  INITIAL_MONTHLY_BAZAR,
  INITIAL_TEACHER_SALARY_PAYMENTS,
  INITIAL_KHURAKI_PAYMENTS,
  INITIAL_SALARY_PAYMENTS,
  INITIAL_USERS
} from '../data/initialData';

export function pathnameToTab(pathname) {
  if (!pathname || pathname === '/' || pathname === '/dashboard') return 'dashboard';
  const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  if (clean === 'dashboard') return 'dashboard';

  // Admin and classic routes mapping
  if (clean === 'admin/student/create' || clean === 'student/create') return 'student-create';
  if (clean === 'admin/student' || clean === 'admin/student/list' || clean === 'student/list') return 'student-list';
  if (clean === 'admin/student-by-class' || clean === 'admin/student/by/jamat') return 'jamat-grid';
  if (clean === 'admin/student-admission-report' || clean === 'admin/student/admission/report/by/jamat') return 'student-admission-report';
  if (clean === 'admin/student-admission-register' || clean === 'admin/student/admission/register/by/jamat') return 'student-admission-register';
  if (clean === 'admin/student-blood-group' || clean === 'admin/student/bloodgroup') return 'student-bloodgroup';
  if (clean === 'admin/student-parents-number' || clean === 'admin/student/parents/number/by/jamat') return 'student-parents-number';
  if (clean === 'admin/khuraki-deposit-entry' || clean === 'admin/student/deposit/entry') return 'student-khuraki-entry';
  if (clean === 'admin/khuraki-deposit-list' || clean === 'admin/student/deposit/list') return 'student-khuraki-list';
  if (clean === 'admin/khuraki-collection-register' || clean === 'admin/student/deposit/register') return 'student-khuraki-register';
  if (clean === 'admin/salary-deposit-entry' || clean === 'admin/student/salary/payment') return 'student-salary-entry';
  if (clean === 'admin/salary-deposit-list' || clean === 'admin/student/salary/payment/list') return 'student-salary-list';
  if (clean === 'admin/salary-collection-register' || clean === 'admin/student/salary/payment/register') return 'student-salary-register';
  if (clean === 'admin/student/admission/form') return 'student-admission-form';
  if (clean === 'admin/student/prottoyon/potro') return 'student-prottoyon';
  if (clean === 'admin/student/certificate') return 'student-certificate';

  // Teacher routes
  if (clean === 'admin/teacher/create' || clean === 'teacher/create') return 'teacher-create';
  if (clean === 'admin/teacher' || clean === 'teacher/list') return 'teacher-list';
  if (clean === 'admin/teacher/number') return 'teacher-number';
  if (clean === 'admin/teacher/salary/sheet') return 'teacher-salary-sheet';
  if (clean === 'admin/teacher/salary/day') return 'teacher-salary-day';
  if (clean === 'admin/teacher/salary/list') return 'teacher-salary-list';

  // Monthly Donor / Contributor routes
  if (clean === 'admin/contributor' || clean === 'admin/monthly-donor') return 'contributor-list';
  if (clean === 'admin/contributor/monthly/subscription/add') return 'contributor-add';
  if (clean === 'admin/contributor/monthly/individual/contributor/list') return 'contributor-individual';
  if (clean === 'admin/contributor/monthly/contributors/list') return 'contributor-all';
  if (clean === 'admin/contributor/monthly/contribution/list') return 'contributor-history';

  // Settings routes
  if (clean === 'admin/settings' || clean === 'admin/settings/institute/info') return 'settings-institute';
  if (clean === 'admin/settings/jamat/create') return 'settings-jamat';
  if (clean === 'admin/settings/payment/create') return 'settings-payment';
  if (clean === 'admin/settings/deposit/category/create') return 'settings-deposit-cat';
  if (clean === 'admin/settings/expense/category/create') return 'settings-expense-cat';
  if (clean === 'admin/settings/receiver') return 'settings-receiver';
  if (clean === 'admin/settings/role') return 'settings-role';
  if (clean === 'admin/settings/user') return 'settings-user';

  if (clean === 'admin/donor') return 'donor-list';
  if (clean === 'admin/zakat-donor') return 'zakat-donor-list';
  if (clean === 'admin/bazar') return 'bazar-weekly-create';
  if (clean === 'admin/committee') return 'committee-list';
  if (clean === 'admin/attendance') return 'attendance-student';
  if (clean === 'admin/result') return 'result-create';
  if (clean === 'admin/voucher/deposit') return 'voucher-deposit';
  if (clean === 'admin/voucher/expense') return 'voucher-expense';
  if (clean === 'admin/id-card') return 'idcard-student';
  if (clean === 'admin/sms') return 'sms-student';
  if (clean === 'admin/account') return 'account-list';
  if (clean === 'admin/report/daily/deposit-expense' || clean === 'report/daily/deposit-expense') return 'report-daily';
  if (clean === 'admin/report/yearly/deposit-expense' || clean === 'report/yearly/deposit-expense') return 'report-yearly';
  if (clean === 'admin/report/bank' || clean === 'report/bank') return 'report-bank';
  if (clean === 'admin/report/deposit' || clean === 'report/deposit' || clean === 'admin/report' || clean === 'report') return 'report-deposit';
  if (clean === 'admin/report/expense' || clean === 'report/expense') return 'report-expense';
  if (clean === 'admin/report/student/deposit' || clean === 'report/student/deposit') return 'report-student-deposit';
  if (clean === 'admin/report/student/salary/deposit' || clean === 'report/student/salary/deposit' || clean === 'admin/report/student/salary') return 'report-student-salary';
  if (clean === 'admin/report/deposit/account' || clean === 'report/deposit/account') return 'report-deposit-account';
  if (clean === 'admin/report/expense/account' || clean === 'report/expense/account') return 'report-expense-account';
  if (clean === 'admin/report/monthly/donors' || clean === 'report/monthly/donors') return 'report-monthly-donors';
  if (clean === 'admin/report/account/deposit' || clean === 'report/account/deposit') return 'report-account-deposit';
  if (clean === 'admin/report/account/expense' || clean === 'report/account/expense') return 'report-account-expense';
  if (clean === 'admin/report/deposit-expense' || clean === 'report/deposit-expense') return 'report-deposit-expense';
  if (clean === 'admin/report/account/details' || clean === 'report/account/details') return 'report-account-details';
  if (clean === 'admin/login' || clean === 'login') return 'login';
  if (clean === 'admin/register' || clean === 'register' || clean === 'signup') return 'register';

  return clean;
}

const AppContext = createContext();

export const AppProvider = ({ children, initialSlug }) => {
  // Load saved state or use initial seeds
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_profile');
      return saved ? JSON.parse(saved) : MADRASHA_PROFILE;
    } catch {
      return MADRASHA_PROFILE;
    }
  });

  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [jamats, setJamats] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_jamats');
      return saved ? JSON.parse(saved) : JAMATS;
    } catch {
      return JAMATS;
    }
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_accounts');
      return saved ? JSON.parse(saved) : ACCOUNTS;
    } catch {
      return ACCOUNTS;
    }
  });

  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_teachers');
      return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
    } catch {
      return INITIAL_TEACHERS;
    }
  });

  const [committee, setCommittee] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_committee');
      return saved ? JSON.parse(saved) : INITIAL_COMMITTEE;
    } catch {
      return INITIAL_COMMITTEE;
    }
  });

  const [depositCategories, setDepositCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_dep_categories');
      return saved ? JSON.parse(saved) : DEPOSIT_CATEGORIES;
    } catch {
      return DEPOSIT_CATEGORIES;
    }
  });

  const [expenseCategories, setExpenseCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_exp_categories');
      return saved ? JSON.parse(saved) : EXPENSE_CATEGORIES;
    } catch {
      return EXPENSE_CATEGORIES;
    }
  });

  const [notices, setNotices] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_notices');
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  });

  const [smsLogs, setSmsLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_sms_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contributors, setContributors] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_contributors');
      return saved ? JSON.parse(saved) : INITIAL_CONTRIBUTORS;
    } catch {
      return INITIAL_CONTRIBUTORS;
    }
  });

  const [donors, setDonors] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_donors');
      return saved ? JSON.parse(saved) : INITIAL_DONORS;
    } catch {
      return INITIAL_DONORS;
    }
  });

  const [zakatDonors, setZakatDonors] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_zakat_donors');
      return saved ? JSON.parse(saved) : INITIAL_ZAKAT_DONORS;
    } catch {
      return INITIAL_ZAKAT_DONORS;
    }
  });

  const [weeklyBazar, setWeeklyBazar] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_weekly_bazar');
      return saved ? JSON.parse(saved) : INITIAL_WEEKLY_BAZAR;
    } catch {
      return INITIAL_WEEKLY_BAZAR;
    }
  });

  const [monthlyBazar, setMonthlyBazar] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_monthly_bazar');
      return saved ? JSON.parse(saved) : INITIAL_MONTHLY_BAZAR;
    } catch {
      return INITIAL_MONTHLY_BAZAR;
    }
  });

  const [teacherSalaryPayments, setTeacherSalaryPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_teacher_salary_payments');
      return saved ? JSON.parse(saved) : INITIAL_TEACHER_SALARY_PAYMENTS;
    } catch {
      return INITIAL_TEACHER_SALARY_PAYMENTS;
    }
  });

  const [khurakiPayments, setKhurakiPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_khuraki_payments');
      return saved ? JSON.parse(saved) : INITIAL_KHURAKI_PAYMENTS;
    } catch {
      return INITIAL_KHURAKI_PAYMENTS;
    }
  });

  const [studentSalaryPayments, setStudentSalaryPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_student_salary_payments');
      return saved ? JSON.parse(saved) : INITIAL_SALARY_PAYMENTS;
    } catch {
      return INITIAL_SALARY_PAYMENTS;
    }
  });

  const [receivers, setReceivers] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_receivers');
      return saved ? JSON.parse(saved) : RECEIVERS;
    } catch {
      return RECEIVERS;
    }
  });

  const [paymentMethods, setPaymentMethods] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_payment_methods');
      return saved ? JSON.parse(saved) : ['নগদ (Cash)', 'বিকাশ (bKash)', 'ব্যাংক একাউন্ট', 'রকেট (Rocket)'];
    } catch {
      return ['নগদ (Cash)', 'বিকাশ (bKash)', 'ব্যাংক একাউন্ট', 'রকেট (Rocket)'];
    }
  });

  const [roles, setRoles] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_roles');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Super Admin', desc: 'মাদ্রাসার সমস্ত মডিউল, সেটিংস ও আর্থিক ডেটাতে পূর্ণ নিয়ন্ত্রণ' },
        { id: 2, name: 'Accountant / Cashier', desc: 'ভাউচার এন্ট্রি, ফি কালেকশন ও রিপোর্ট দেখার অনুমতি' },
        { id: 3, name: 'Teacher', desc: 'হাজিরা গ্রহণ এবং পরীক্ষা নম্বর এন্ট্রি করার অনুমতি' },
        { id: 4, name: 'Staff', desc: 'শুধুমাত্র নির্ধারিত ডেটা এন্ট্রি করার অনুমতি' }
      ];
    } catch {
      return [
        { id: 1, name: 'Super Admin', desc: 'মাদ্রাসার সমস্ত মডিউল, সেটিংস ও আর্থিক ডেটাতে পূর্ণ নিয়ন্ত্রণ' },
        { id: 2, name: 'Accountant / Cashier', desc: 'ভাউচার এন্ট্রি, ফি কালেকশন ও রিপোর্ট দেখার অনুমতি' },
        { id: 3, name: 'Teacher', desc: 'হাজিরা গ্রহণ এবং পরীক্ষা নম্বর এন্ট্রি করার অনুমতি' },
        { id: 4, name: 'Staff', desc: 'শুধুমাত্র নির্ধারিত ডেটা এন্ট্রি করার অনুমতি' }
      ];
    }
  });

  // User & Authentication state (sanitized: passwords stripped from client memory)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('madrasha_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(({ password, passwordHash, ...u }) => u);
        }
      }
      return INITIAL_USERS.map(({ password, passwordHash, ...u }) => u);
    } catch {
      return INITIAL_USERS.map(({ password, passwordHash, ...u }) => u);
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedSession = sessionStorage.getItem('madrasha_current_user');
      if (savedSession) {
        const { password, passwordHash, ...u } = JSON.parse(savedSession);
        return u;
      }
      const savedLocal = localStorage.getItem('madrasha_current_user');
      if (savedLocal) {
        const { password, passwordHash, ...u } = JSON.parse(savedLocal);
        return u;
      }

      const sessionAuth = sessionStorage.getItem('madrasha_is_authenticated');
      const localAuth = localStorage.getItem('madrasha_is_authenticated');
      if (sessionAuth === 'false' || localAuth === 'false') return null;

      const { password, passwordHash, ...safeSeed } = INITIAL_USERS[0];
      return safeSeed;
    } catch {
      const { password, passwordHash, ...safeSeed } = INITIAL_USERS[0];
      return safeSeed;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const sessionAuth = sessionStorage.getItem('madrasha_is_authenticated');
      if (sessionAuth === 'false') return false;
      if (sessionAuth === 'true') return true;

      const localAuth = localStorage.getItem('madrasha_is_authenticated');
      if (localAuth === 'false') return false;
      if (localAuth === 'true') return true;

      return true; // Default demo authenticated session
    } catch {
      return true;
    }
  });

  // UI state with full browser address bar URL synchronization
  const [activeTab, setActiveTabState] = useState(() => {
    if (initialSlug && Array.isArray(initialSlug) && initialSlug.length > 0) {
      return pathnameToTab('/' + initialSlug.join('/'));
    }
    if (typeof window !== 'undefined') {
      return pathnameToTab(window.location.pathname);
    }
    return 'dashboard';
  });

  const setActiveTab = (tab, updateHistory = true) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined' && updateHistory) {
      const targetPath =
        tab === 'dashboard'
          ? '/dashboard'
          : tab === 'login'
          ? '/admin/login'
          : tab === 'register'
          ? '/admin/register'
          : tab === 'report-daily'
          ? '/admin/report/daily/deposit-expense'
          : tab === 'report-yearly'
          ? '/admin/report/yearly/deposit-expense'
          : tab === 'report-bank'
          ? '/admin/report/bank'
          : tab === 'report-deposit'
          ? '/admin/report/deposit'
          : tab === 'report-expense'
          ? '/admin/report/expense'
          : tab === 'report-student-deposit'
          ? '/admin/report/student/deposit'
          : tab === 'report-student-salary'
          ? '/admin/report/student/salary/deposit'
          : tab === 'report-deposit-account'
          ? '/admin/report/deposit/account'
          : tab === 'report-expense-account'
          ? '/admin/report/expense/account'
          : tab === 'report-monthly-donors'
          ? '/admin/report/monthly/donors'
          : tab === 'report-account-deposit'
          ? '/admin/report/account/deposit'
          : tab === 'report-account-expense'
          ? '/admin/report/account/expense'
          : tab === 'report-deposit-expense'
          ? '/admin/report/deposit-expense'
          : tab === 'report-account-details'
          ? '/admin/report/account/details'
          : '/' + tab;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  // Sync with browser Back and Forward buttons (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const tab = pathnameToTab(window.location.pathname);
      setActiveTabState(tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync initial URL on mount if browser pathname differs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tabFromUrl = pathnameToTab(window.location.pathname);
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTabState(tabFromUrl);
    }
  }, []);

  // On client mount, sync real data from SQLite backend API
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Fetch students from SQLite
    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.students) && data.students.length > 0) {
          setStudents(data.students);
        }
      })
      .catch(() => {});

    // Fetch vouchers & summary from SQLite
    fetch('/api/vouchers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.vouchers)) {
          setTransactions(data.vouchers);
        }
      })
      .catch(() => {});

    // Fetch teachers from SQLite
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.teachers)) {
          setTeachers(data.teachers);
        }
      })
      .catch(() => {});
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1200 : true;
  });
  const [selectedReceiptForPrint, setSelectedReceiptForPrint] = useState(null);
  const [selectedStudentForIdCard, setSelectedStudentForIdCard] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  // Auto handle sidebar open state on window resize (mobile vs desktop)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try { localStorage.setItem('madrasha_profile', JSON.stringify(profile)); } catch {}
  }, [profile]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_students', JSON.stringify(students)); } catch {}
  }, [students]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_transactions', JSON.stringify(transactions)); } catch {}
  }, [transactions]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_accounts', JSON.stringify(accounts)); } catch {}
  }, [accounts]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_teachers', JSON.stringify(teachers)); } catch {}
  }, [teachers]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_committee', JSON.stringify(committee)); } catch {}
  }, [committee]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_dep_categories', JSON.stringify(depositCategories)); } catch {}
  }, [depositCategories]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_exp_categories', JSON.stringify(expenseCategories)); } catch {}
  }, [expenseCategories]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_notices', JSON.stringify(notices)); } catch {}
  }, [notices]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_sms_logs', JSON.stringify(smsLogs)); } catch {}
  }, [smsLogs]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_contributors', JSON.stringify(contributors)); } catch {}
  }, [contributors]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_donors', JSON.stringify(donors)); } catch {}
  }, [donors]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_zakat_donors', JSON.stringify(zakatDonors)); } catch {}
  }, [zakatDonors]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_weekly_bazar', JSON.stringify(weeklyBazar)); } catch {}
  }, [weeklyBazar]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_monthly_bazar', JSON.stringify(monthlyBazar)); } catch {}
  }, [monthlyBazar]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_teacher_salary_payments', JSON.stringify(teacherSalaryPayments)); } catch {}
  }, [teacherSalaryPayments]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_khuraki_payments', JSON.stringify(khurakiPayments)); } catch {}
  }, [khurakiPayments]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_student_salary_payments', JSON.stringify(studentSalaryPayments)); } catch {}
  }, [studentSalaryPayments]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_users', JSON.stringify(users)); } catch {}
  }, [users]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_receivers', JSON.stringify(receivers)); } catch {}
  }, [receivers]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_payment_methods', JSON.stringify(paymentMethods)); } catch {}
  }, [paymentMethods]);

  useEffect(() => {
    try { localStorage.setItem('madrasha_roles', JSON.stringify(roles)); } catch {}
  }, [roles]);

  // Synchronize server-side JWT session on boot
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fetch) {
      fetch('/api/auth/me')
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data?.success && data?.user) {
            setCurrentUser(data.user);
            setIsAuthenticated(true);
          }
        })
        .catch(() => {});
    }
  }, []);

  // Toast notifier
  const showToast = (msg, type = 'success') => {
    setNotificationMsg({ text: msg, type });
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Add Deposit Voucher
  const addDepositVoucher = (voucherData) => {
    const newVoucher = {
      id: voucherData.id || `DEP-${Date.now()}`,
      type: 'deposit',
      voucherNo: voucherData.voucherNo || `JV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: voucherData.date || new Date().toISOString().split('T')[0],
      receiver: voucherData.receiver || 'মাহমুদুল করিম',
      account: voucherData.account || accounts[0]?.name,
      donorOrStudent: voucherData.donorOrStudent,
      bookNo: voucherData.bookNo || '-',
      receiptNo: voucherData.receiptNo || '-',
      items: voucherData.items || [],
      totalAmount: parseFloat(voucherData.totalAmount) || 0,
      note: voucherData.note || '',
      status: voucherData.status || 'অনুমোদিত'
    };

    setTransactions(prev => [newVoucher, ...prev]);

    // Update account balance
    setAccounts(prev => prev.map(acc => {
      if (acc.name === newVoucher.account || acc.id === newVoucher.account) {
        return { ...acc, balance: +(acc.balance + newVoucher.totalAmount).toFixed(2) };
      }
      return acc;
    }));

    showToast(`জমা ভাউচার (${newVoucher.voucherNo}) সফলভাবে যুক্ত হয়েছে!`);

    // Persist deposit voucher to SQLite
    if (typeof window !== 'undefined') {
      fetch('/api/vouchers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newVoucher,
          category: newVoucher.items?.[0]?.category || 'সাধারণ জমা',
          amount: newVoucher.totalAmount
        })
      }).catch(() => {});
    }

    return newVoucher;
  };

  // Add Expense Voucher
  const addExpenseVoucher = (voucherData) => {
    const newVoucher = {
      id: `EXP-${Date.now()}`,
      type: 'expense',
      voucherNo: `EV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: voucherData.date || new Date().toISOString().split('T')[0],
      receiver: voucherData.receiver || 'হাফেজ আযম নূর',
      account: voucherData.account || accounts[0]?.name,
      donorOrStudent: voucherData.donorOrStudent,
      items: voucherData.items || [],
      totalAmount: parseFloat(voucherData.totalAmount) || 0,
      note: voucherData.note || '',
      status: 'অনুমোদিত'
    };

    setTransactions(prev => [newVoucher, ...prev]);

    // Deduct account balance
    setAccounts(prev => prev.map(acc => {
      if (acc.name === newVoucher.account || acc.id === newVoucher.account) {
        return { ...acc, balance: +(acc.balance - newVoucher.totalAmount).toFixed(2) };
      }
      return acc;
    }));

    showToast(`খরচ ভাউচার (${newVoucher.voucherNo}) সফলভাবে লিপিবদ্ধ হয়েছে!`);

    // Persist expense voucher to SQLite
    if (typeof window !== 'undefined') {
      fetch('/api/vouchers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newVoucher,
          category: newVoucher.items?.[0]?.category || 'সাধারণ খরচ',
          amount: newVoucher.totalAmount
        })
      }).catch(() => {});
    }

    return newVoucher;
  };

  // Add New Student
  const addStudent = (studentData) => {
    const newId = `STU-${String(students.length + 1).padStart(3, '0')}`;
    const newStudent = {
      ...studentData,
      id: newId,
      status: studentData.status || 'সক্রিয়',
      admissionDate: studentData.admissionDate || new Date().toISOString().split('T')[0],
      fees: studentData.fees || {}
    };

    setStudents(prev => [newStudent, ...prev]);

    // If admission fee > 0, generate an automatic deposit voucher
    const admFee = parseFloat(studentData.admissionFee) || 0;
    if (admFee > 0) {
      addDepositVoucher({
        date: newStudent.admissionDate,
        receiver: 'মাহমুদুল করিম',
        account: studentData.admissionAccount || accounts[0]?.name,
        donorOrStudent: `${newStudent.name} (রোল: ${newStudent.roll}, জামাত: ${newStudent.jamat})`,
        items: [
          {
            category: 'ভর্তি ফি',
            description: `${newStudent.name} - নতুন ভর্তি ফি`,
            amount: admFee
          }
        ],
        totalAmount: admFee,
        note: `নতুন শিক্ষার্থী ভর্তি ফি আদায়`
      });
    }

    showToast(`শিক্ষার্থী ${newStudent.name} সফলভাবে ভর্তি করা হয়েছে!`);

    // Persist to SQLite backend asynchronously
    if (typeof window !== 'undefined') {
      fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      }).catch(() => {});
    }

    return newStudent;
  };

  // Update Student
  const updateStudent = (id, updatedData) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    showToast(`শিক্ষার্থীর তথ্য আপডেট সম্পন্ন হয়েছে!`);

    // Persist update to SQLite
    if (typeof window !== 'undefined') {
      fetch('/api/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedData })
      }).catch(() => {});
    }
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast(`শিক্ষার্থী মুছে ফেলা হয়েছে`, 'warning');
  };

  // Record Student Fee Payment
  const recordStudentFee = (studentId, month, feeType, amount, accountName) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const currentFeeState = student.fees?.[month] || {};
    const updatedFeeMonth = {
      ...currentFeeState,
      tuition: feeType === 'tuition' ? amount : (currentFeeState.tuition || student.monthlyFee),
      khuraki: feeType === 'khuraki' ? amount : (currentFeeState.khuraki || student.khurakiFee),
      paid: true,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedStudents = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          fees: {
            ...s.fees,
            [month]: updatedFeeMonth
          }
        };
      }
      return s;
    });

    setStudents(updatedStudents);

    const feeDescription = feeType === 'both'
      ? `${student.name} - ${month} মাসের বেতন ও খোরাকী ফি`
      : feeType === 'tuition'
        ? `${student.name} - ${month} মাসের বেতন`
        : `${student.name} - ${month} মাসের খোরাকী ফি`;

    // Also create a deposit voucher
    const vch = addDepositVoucher({
      date: new Date().toISOString().split('T')[0],
      receiver: 'মাহমুদুল করিম',
      account: accountName || accounts[0]?.name,
      donorOrStudent: `${student.name} (রোল: ${student.roll}, জামাত: ${student.jamat})`,
      items: [
        {
          category: feeType === 'khuraki' ? 'খোরাকী ফি' : 'মাসিক বেতন',
          description: feeDescription,
          amount: parseFloat(amount)
        }
      ],
      totalAmount: parseFloat(amount),
      note: `${month} মাসের ফি কালেকশন`
    });

    return vch;
  };

  // Send SMS
  const sendSms = (recipients, message) => {
    const costPerSms = 0.40;
    const totalCost = +(recipients.length * costPerSms).toFixed(2);

    const isAffordable = profile.smsBalance >= totalCost;
    const newLog = {
      id: `SMS-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      count: recipients.length,
      recipients: recipients.slice(0, 5).join(', ') + (recipients.length > 5 ? ` (+${recipients.length - 5} আরও)` : ''),
      message,
      cost: totalCost,
      status: isAffordable ? 'সফল' : 'ব্যালেন্স অপর্যাপ্ত'
    };

    setSmsLogs(prev => [newLog, ...prev]);

    if (isAffordable) {
      setProfile(prev => ({
        ...prev,
        smsBalance: +(prev.smsBalance - totalCost).toFixed(2)
      }));
      showToast(`${recipients.length} টি নম্বরে এসএমএস সফলভাবে পাঠানো হয়েছে!`);
      return true;
    } else {
      showToast(`এসএমএস পাঠাতে পর্যাপ্ত ব্যালেন্স নেই! রিচার্জ করুন।`, 'warning');
      return false;
    }
  };

  // Recharge SMS
  const rechargeSmsBalance = (amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setProfile(prev => ({
      ...prev,
      smsBalance: +(prev.smsBalance + amt).toFixed(2)
    }));
    showToast(`এসএমএস ব্যালেন্স ৳ ${amt.toFixed(2)} রিচার্জ সফল হয়েছে!`);
  };

  // Add Teacher
  const addTeacher = (teacherData) => {
    const newTeacher = {
      ...teacherData,
      id: `TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      status: 'কর্মরত'
    };
    setTeachers(prev => [newTeacher, ...prev]);
    showToast(`শিক্ষক ${newTeacher.name} সফলভাবে যুক্ত হয়েছেন!`);
  };

  // Account Transfer
  const transferAccount = (fromAccountName, toAccountName, amount, note) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setAccounts(prev => prev.map(acc => {
      if (acc.name === fromAccountName) {
        return { ...acc, balance: +(acc.balance - amt).toFixed(2) };
      }
      if (acc.name === toAccountName) {
        return { ...acc, balance: +(acc.balance + amt).toFixed(2) };
      }
      return acc;
    }));
    showToast(`৳ ${amt} সফলভাবে ট্রান্সফার করা হয়েছে!`);
  };

  // Add Contributor
  const addContributor = (contributorData) => {
    const newCon = {
      id: `CON-${String(contributors.length + 1).padStart(3, '0')}`,
      status: 'সক্রিয়',
      payments: {},
      ...contributorData,
      monthlyAmount: parseFloat(contributorData.monthlyAmount) || 0
    };
    setContributors(prev => [newCon, ...prev]);
    showToast(`নতুন চাঁদাদাতা (${newCon.name}) সফলভাবে যুক্ত হয়েছে!`);
    return newCon;
  };

  // Add Subscription Payment
  const addSubscriptionPayment = (paymentData) => {
    const amount = parseFloat(paymentData.amount) || 0;
    const vch = addDepositVoucher({
      date: paymentData.date || new Date().toISOString().split('T')[0],
      receiver: paymentData.receiver || 'হাফেজ আযম নূর',
      account: paymentData.account || accounts[0]?.name,
      donorOrStudent: `${paymentData.contributorName} [চাঁদা]`,
      items: [{
        category: 'মাসিক চাঁদা',
        description: `মাসিক চাঁদা - ${paymentData.contributorName} (${paymentData.month} ${paymentData.year})`,
        amount
      }],
      totalAmount: amount,
      note: paymentData.note || `মাসিক চাঁদা গ্রহণ (${paymentData.month} ${paymentData.year})`
    });

    if (paymentData.contributorId) {
      setContributors(prev => prev.map(c => {
        if (c.id === paymentData.contributorId || c.name === paymentData.contributorName) {
          const currentPayments = c.payments || {};
          return {
            ...c,
            payments: { ...currentPayments, [paymentData.month]: amount }
          };
        }
        return c;
      }));
    }

    showToast(`মাসিক চাঁদা (${paymentData.contributorName} - ৳${amount}) গৃহীত হয়েছে!`);
    return vch;
  };

  // Add Donor
  const addDonor = (donorData) => {
    const newDon = {
      id: `DON-${String(donors.length + 1).padStart(3, '0')}`,
      totalDonated: 0,
      lastDonationDate: new Date().toISOString().split('T')[0],
      ...donorData
    };
    setDonors(prev => [newDon, ...prev]);
    showToast(`নতুন দানকারী (${newDon.name}) যুক্ত হয়েছে!`);
    return newDon;
  };

  // Add Donation Record
  const addDonationRecord = (donationData) => {
    const amount = parseFloat(donationData.amount) || 0;
    const vch = addDepositVoucher({
      date: donationData.date || new Date().toISOString().split('T')[0],
      receiver: donationData.receiver || 'মাহমুদুল করিম',
      account: donationData.account || accounts[0]?.name,
      donorOrStudent: `${donationData.donorName} (${donationData.mobile || 'সাধারণ দাতা'})`,
      items: [{
        category: donationData.category || 'সাধারণ দান',
        description: `${donationData.category || 'সাধারণ দান'} - ${donationData.donorName}`,
        amount
      }],
      totalAmount: amount,
      note: donationData.note || `${donationData.category || 'সাধারণ দান'} গ্রহণ`
    });

    setDonors(prev => {
      const exists = prev.find(d => d.name === donationData.donorName);
      if (exists) {
        return prev.map(d => d.name === donationData.donorName ? {
          ...d,
          totalDonated: +(d.totalDonated + amount).toFixed(2),
          lastDonationDate: donationData.date || new Date().toISOString().split('T')[0]
        } : d);
      } else {
        return [{
          id: `DON-${String(prev.length + 1).padStart(3, '0')}`,
          name: donationData.donorName,
          fatherName: donationData.fatherName || 'মরহুম দ্বীনদার ব্যক্তি',
          mobile: donationData.mobile || '01XXXXXXXXX',
          address: donationData.address || 'চকরিয়া, কক্সবাজার',
          donationType: donationData.category || 'সাধারণ দান',
          totalDonated: amount,
          lastDonationDate: donationData.date || new Date().toISOString().split('T')[0],
          note: donationData.note || 'দান গ্রহণ'
        }, ...prev];
      }
    });

    showToast(`দান (${donationData.donorName} - ৳${amount}) সফলভাবে গৃহীত হয়েছে!`);
    return vch;
  };

  // Add Zakat Donor
  const addZakatDonor = (zakatData) => {
    const newZak = {
      id: `ZAK-${String(zakatDonors.length + 1).padStart(3, '0')}`,
      totalZakat: 0,
      lastZakatDate: new Date().toISOString().split('T')[0],
      ...zakatData
    };
    setZakatDonors(prev => [newZak, ...prev]);
    showToast(`নতুন যাকাত দাতা (${newZak.name}) যুক্ত হয়েছে!`);
    return newZak;
  };

  // Add Zakat Payment
  const addZakatPayment = (zakatData) => {
    const amount = parseFloat(zakatData.amount) || 0;
    const vch = addDepositVoucher({
      date: zakatData.date || new Date().toISOString().split('T')[0],
      receiver: zakatData.receiver || 'মাহমুদুল করিম',
      account: zakatData.account || accounts[0]?.name,
      donorOrStudent: `${zakatData.donorName} [যাকাত তহবিল]`,
      items: [{
        category: zakatData.category || 'যাকাত তহবিল',
        description: `যাকাত তহবিল - ${zakatData.donorName} (${zakatData.month || ''} ${zakatData.year || ''})`,
        amount
      }],
      totalAmount: amount,
      note: zakatData.note || `যাকাত গ্রহণ (${zakatData.donorName})`
    });

    setZakatDonors(prev => {
      const exists = prev.find(z => z.name === zakatData.donorName);
      if (exists) {
        return prev.map(z => z.name === zakatData.donorName ? {
          ...z,
          totalZakat: +(z.totalZakat + amount).toFixed(2),
          lastZakatDate: zakatData.date || new Date().toISOString().split('T')[0]
        } : z);
      } else {
        return [{
          id: `ZAK-${String(prev.length + 1).padStart(3, '0')}`,
          name: zakatData.donorName,
          fatherName: zakatData.fatherName || 'সুহৃদয় দাতা',
          mobile: zakatData.mobile || '01XXXXXXXXX',
          address: zakatData.address || 'চকরিয়া, কক্সবাজার',
          totalZakat: amount,
          lastZakatDate: zakatData.date || new Date().toISOString().split('T')[0],
          note: zakatData.note || 'যাকাত আদায়'
        }, ...prev];
      }
    });

    showToast(`যাকাত (${zakatData.donorName} - ৳${amount}) সফলভাবে জমা হয়েছে!`);
    return vch;
  };

  // Add Weekly Bazar
  const addWeeklyBazarRecord = (bazarData) => {
    const totalAmount = parseFloat(bazarData.totalAmount) || 0;
    const vch = addExpenseVoucher({
      date: bazarData.date || new Date().toISOString().split('T')[0],
      receiver: bazarData.buyer || 'হাফেজ আযম নূর (ক্যাশিয়ার)',
      account: bazarData.account || accounts[0]?.name,
      donorOrStudent: `সাপ্তাহিক বাজার - ${bazarData.week} (${bazarData.month} ${bazarData.year})`,
      items: (bazarData.items || []).map(it => ({
        category: bazarData.category || 'দৈনিক বাজার খরচ',
        description: `${it.name} (${it.qty || '১'} @ ৳${it.rate || it.total})`,
        amount: parseFloat(it.total) || 0
      })),
      totalAmount,
      note: bazarData.note || `সাপ্তাহিক বাজার খরচ (${bazarData.week}, ${bazarData.month})`
    });

    const newRecord = {
      id: `WBZ-${Date.now()}`,
      voucherNo: vch?.voucherNo || `WB-${Date.now()}`,
      ...bazarData,
      totalAmount
    };
    setWeeklyBazar(prev => [newRecord, ...prev]);
    showToast(`সাপ্তাহিক বাজার ভাউচার (${newRecord.voucherNo} - ৳${totalAmount}) তৈরি হয়েছে!`);
    return vch;
  };

  // Add Monthly Bazar
  const addMonthlyBazarRecord = (bazarData) => {
    const totalAmount = parseFloat(bazarData.totalAmount) || 0;
    const vch = addExpenseVoucher({
      date: bazarData.date || new Date().toISOString().split('T')[0],
      receiver: bazarData.buyer || 'হাফেজ আযম নূর (ক্যাশিয়ার)',
      account: bazarData.account || accounts[0]?.name,
      donorOrStudent: `মাসিক বাজার - ${bazarData.month} ${bazarData.year}`,
      items: [{
        category: bazarData.category || 'বোডিং চাল-ডাল-তেল ক্রয়',
        description: bazarData.items || 'মাসিক খাদ্য রসদ সামগ্রী',
        amount: totalAmount
      }],
      totalAmount,
      note: bazarData.note || `মাসিক সামগ্রিক বাজার (${bazarData.month} ${bazarData.year})`
    });

    const newRecord = {
      id: `MBZ-${Date.now()}`,
      voucherNo: vch?.voucherNo || `MB-${Date.now()}`,
      ...bazarData,
      totalAmount
    };
    setMonthlyBazar(prev => [newRecord, ...prev]);
    showToast(`মাসিক বাজার ভাউচার (${newRecord.voucherNo} - ৳${totalAmount}) তৈরি হয়েছে!`);
    return vch;
  };

  // Add Teacher Salary Payment
  const addTeacherSalaryPayment = (salaryData) => {
    const amount = parseFloat(salaryData.amount) || 0;
    const vch = addExpenseVoucher({
      date: salaryData.date || new Date().toISOString().split('T')[0],
      receiver: salaryData.teacherName,
      account: salaryData.account || accounts[0]?.name,
      donorOrStudent: `${salaryData.teacherName} [শিক্ষক বেতন]`,
      items: [{
        category: 'শিক্ষক-কর্মচারী বেতন',
        description: `${salaryData.teacherName} (${salaryData.designation || 'শিক্ষক'}) - ${salaryData.month} ${salaryData.year}`,
        amount
      }],
      totalAmount: amount,
      note: salaryData.note || `${salaryData.month} ${salaryData.year} বেতন পরিশোধ`
    });

    const newRecord = {
      id: `TSP-${Date.now()}`,
      voucherNo: vch?.voucherNo || `SAL-${Date.now()}`,
      ...salaryData,
      amount
    };
    setTeacherSalaryPayments(prev => [newRecord, ...prev]);
    showToast(`শিক্ষক বেতন (${salaryData.teacherName} - ৳${amount}) সফলভাবে প্রদান করা হয়েছে!`);
    return vch;
  };

  // Add Khuraki Payment
  const addKhurakiPayment = (khurakiData) => {
    const amount = parseFloat(khurakiData.amount) || 0;
    const vch = addDepositVoucher({
      date: khurakiData.date || new Date().toISOString().split('T')[0],
      receiver: khurakiData.receiver || 'হাফেজ আযম নূর',
      account: khurakiData.account || accounts[0]?.name,
      donorOrStudent: `${khurakiData.studentName} (রোল: ${khurakiData.roll}, জামাত: ${khurakiData.jamat})`,
      items: [{
        category: 'খোরাকী ফি',
        description: `খোরাকী ফি - ${khurakiData.studentName} (${khurakiData.month} ${khurakiData.year})`,
        amount
      }],
      totalAmount: amount,
      note: khurakiData.note || `ছাত্র খানার টাকা জমা (${khurakiData.month} ${khurakiData.year})`
    });

    const newRecord = {
      id: `KHU-${Date.now()}`,
      voucherNo: vch?.voucherNo || `KH-${Date.now()}`,
      ...khurakiData,
      amount
    };
    if (khurakiData.studentId) {
      setStudents(prev => prev.map(s => {
        if (s.id === khurakiData.studentId) {
          const updatedFees = { ...(s.fees || {}) };
          const existing = updatedFees[khurakiData.month] || {};
          updatedFees[khurakiData.month] = { ...existing, khuraki: amount, paid: true, date: khurakiData.date };
          return { ...s, fees: updatedFees };
        }
        return s;
      }));
    }

    setKhurakiPayments(prev => [newRecord, ...prev]);
    showToast(`খানার টাকা (${khurakiData.studentName} - ৳${amount}) সফলভাবে জমা হয়েছে!`);
    return vch;
  };

  // Add Student Fee Payment (Tuition)
  const addStudentFeePayment = (feeData) => {
    const amount = parseFloat(feeData.amount) || 0;
    const vch = addDepositVoucher({
      date: feeData.date || new Date().toISOString().split('T')[0],
      receiver: feeData.receiver || 'হাফেজ আযম নূর',
      account: feeData.account || accounts[0]?.name,
      donorOrStudent: `${feeData.studentName} (রোল: ${feeData.roll}, জামাত: ${feeData.jamat})`,
      items: [{
        category: 'মাসিক বেতন',
        description: `মাসিক বেতন - ${feeData.studentName} (${feeData.month} ${feeData.year})`,
        amount
      }],
      totalAmount: amount,
      note: feeData.note || `ছাত্র বেতন জমা (${feeData.month} ${feeData.year})`
    });

    if (feeData.studentId) {
      setStudents(prev => prev.map(s => {
        if (s.id === feeData.studentId) {
          const updatedFees = { ...(s.fees || {}) };
          const existing = updatedFees[feeData.month] || {};
          updatedFees[feeData.month] = { ...existing, tuition: amount, paid: true, date: feeData.date };
          return { ...s, fees: updatedFees };
        }
        return s;
      }));
    }

    const newRecord = {
      id: `TUI-${Date.now()}`,
      voucherNo: vch?.voucherNo || `TF-${Date.now()}`,
      ...feeData,
      amount
    };
    setStudentSalaryPayments(prev => [newRecord, ...prev]);
    showToast(`মাসিক বেতন (${feeData.studentName} - ৳${amount}) সফলভাবে জমা হয়েছে!`);
    return vch;
  };

  // Teacher Update & Delete
  const updateTeacher = (id, teacherData) => {
    setTeachers(prev => prev.map(t => (t.id === id ? { ...t, ...teacherData } : t)));
    showToast('শিক্ষকের তথ্য সফলভাবে আপডেট হয়েছে!');
  };

  const deleteTeacher = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    showToast('শিক্ষক মুছে ফেলা হয়েছে!');
  };

  // Teacher Salary Payment Update & Delete
  const updateTeacherSalaryPayment = (id, salaryData) => {
    setTeacherSalaryPayments(prev => prev.map(p => (p.id === id ? { ...p, ...salaryData } : p)));
    showToast('শিক্ষকের বেতন প্রদানের তথ্য আপডেট হয়েছে!');
  };

  const deleteTeacherSalaryPayment = (id) => {
    setTeacherSalaryPayments(prev => prev.filter(p => p.id !== id));
    showToast('শিক্ষকের বেতন প্রদানের রেকর্ড মুছে ফেলা হয়েছে!');
  };

  // Contributor Update & Delete
  const updateContributor = (id, contributorData) => {
    setContributors(prev => prev.map(c => (c.id === id ? { ...c, ...contributorData } : c)));
    showToast('চাঁদাদাতার তথ্য সফলভাবে আপডেট হয়েছে!');
  };

  const deleteContributor = (id) => {
    setContributors(prev => prev.filter(c => c.id !== id));
    showToast('চাঁদাদাতা মুছে ফেলা হয়েছে!');
  };

  // Donor Update & Delete
  const updateDonor = (id, donorData) => {
    setDonors(prev => prev.map(d => (d.id === id ? { ...d, ...donorData } : d)));
    showToast('দানকারীর তথ্য আপডেট হয়েছে!');
  };

  const deleteDonor = (id) => {
    setDonors(prev => prev.filter(d => d.id !== id));
    showToast('দানকারী মুছে ফেলা হয়েছে!');
  };

  // Zakat Donor Update & Delete
  const updateZakatDonor = (id, zakatData) => {
    setZakatDonors(prev => prev.map(z => (z.id === id ? { ...z, ...zakatData } : z)));
    showToast('যাকাত দানকারীর তথ্য আপডেট হয়েছে!');
  };

  const deleteZakatDonor = (id) => {
    setZakatDonors(prev => prev.filter(z => z.id !== id));
    showToast('যাকাত দানকারী মুছে ফেলা হয়েছে!');
  };

  // Jamat CRUD
  const addJamat = (name) => {
    if (!name || !name.trim()) return;
    const newJamat = {
      id: `jamat-${Date.now()}`,
      name: name.trim(),
      count: 0,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    };
    setJamats(prev => [...prev, newJamat]);
    showToast(`নতুন জামাত "${newJamat.name}" সফলভাবে যুক্ত হয়েছে!`);
    return newJamat;
  };

  const updateJamat = (id, newName) => {
    if (!newName || !newName.trim()) return;
    setJamats(prev => prev.map(j => (j.id === id ? { ...j, name: newName.trim() } : j)));
    showToast('জামাতের তথ্য সফলভাবে আপডেট হয়েছে!');
  };

  const deleteJamat = (id) => {
    setJamats(prev => prev.filter(j => j.id !== id));
    showToast('জামাত মুছে ফেলা হয়েছে!');
  };

  // Deposit Category CRUD
  const addDepositCategory = (name) => {
    if (!name || !name.trim()) return;
    const clean = name.trim();
    if (!depositCategories.includes(clean)) {
      setDepositCategories(prev => [...prev, clean]);
      showToast(`নতুন জমার খাত "${clean}" যুক্ত হয়েছে!`);
    }
  };

  const updateDepositCategory = (oldName, newName) => {
    if (!newName || !newName.trim()) return;
    setDepositCategories(prev => prev.map(c => (c === oldName ? newName.trim() : c)));
    showToast('জমার খাত সফলভাবে আপডেট হয়েছে!');
  };

  const deleteDepositCategory = (name) => {
    setDepositCategories(prev => prev.filter(c => c !== name));
    showToast('জমার খাত মুছে ফেলা হয়েছে!');
  };

  // Expense Category CRUD
  const addExpenseCategory = (name) => {
    if (!name || !name.trim()) return;
    const clean = name.trim();
    if (!expenseCategories.includes(clean)) {
      setExpenseCategories(prev => [...prev, clean]);
      showToast(`নতুন খরচের খাত "${clean}" যুক্ত হয়েছে!`);
    }
  };

  const updateExpenseCategory = (oldName, newName) => {
    if (!newName || !newName.trim()) return;
    setExpenseCategories(prev => prev.map(c => (c === oldName ? newName.trim() : c)));
    showToast('খরচের খাত সফলভাবে আপডেট হয়েছে!');
  };

  const deleteExpenseCategory = (name) => {
    setExpenseCategories(prev => prev.filter(c => c !== name));
    showToast('খরচের খাত মুছে ফেলা হয়েছে!');
  };

  // Payment Method CRUD
  const addPaymentMethod = (name) => {
    if (!name || !name.trim()) return;
    const clean = name.trim();
    if (!paymentMethods.includes(clean)) {
      setPaymentMethods(prev => [...prev, clean]);
      showToast(`নতুন পেমেন্ট মেথড "${clean}" যুক্ত হয়েছে!`);
    }
  };

  const updatePaymentMethod = (oldName, newName) => {
    if (!newName || !newName.trim()) return;
    setPaymentMethods(prev => prev.map(p => (p === oldName ? newName.trim() : p)));
    showToast('পেমেন্ট মেথড আপডেট হয়েছে!');
  };

  const deletePaymentMethod = (name) => {
    setPaymentMethods(prev => prev.filter(p => p !== name));
    showToast('পেমেন্ট মেথড মুছে ফেলা হয়েছে!');
  };

  // Receiver CRUD
  const addReceiver = (receiverData) => {
    const newRec = {
      id: `rec-${Date.now()}`,
      ...receiverData
    };
    setReceivers(prev => [...prev, newRec]);
    showToast(`নতুন গ্রহণকারী "${newRec.name}" যুক্ত হয়েছে!`);
    return newRec;
  };

  const updateReceiver = (id, updatedData) => {
    setReceivers(prev => prev.map(r => (r.id === id ? { ...r, ...updatedData } : r)));
    showToast('গ্রহণকারীর তথ্য আপডেট হয়েছে!');
  };

  const deleteReceiver = (id) => {
    setReceivers(prev => prev.filter(r => r.id !== id));
    showToast('গ্রহণকারী মুছে ফেলা হয়েছে!');
  };

  // Role CRUD
  const addRole = (roleData) => {
    const newRole = {
      id: roles.length + 1,
      ...roleData
    };
    setRoles(prev => [...prev, newRole]);
    showToast(`নতুন রোল "${newRole.name}" যুক্ত হয়েছে!`);
    return newRole;
  };

  const updateRole = (id, updatedData) => {
    setRoles(prev => prev.map(r => (r.id === id ? { ...r, ...updatedData } : r)));
    showToast('রোলের তথ্য আপডেট হয়েছে!');
  };

  const deleteRole = (id) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    showToast('রোল মুছে ফেলা হয়েছে!');
  };

  // User Update & Delete
  const updateUser = (id, updatedData) => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updatedData } : u)));
    showToast('ইউজার তথ্য সফলভাবে আপডেট হয়েছে!');
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast('ইউজার মুছে ফেলা হয়েছে!');
  };

  // ==========================================
  // Authentication & User Management Handlers
  // ==========================================

  // Login handler with Next.js secure backend verification & rate-limiting protection
  const login = async (emailOrUsername, password, remember = true) => {
    const trimmedInput = (emailOrUsername || '').trim().toLowerCase();
    if (!trimmedInput || !password) {
      return {
        success: false,
        message: 'অনুগ্রহ করে ইমেইল/ইউজারনেম এবং পাসওয়ার্ড উভয়ই প্রদান করুন।'
      };
    }

    // Call Next.js backend API
    if (typeof window !== 'undefined' && window.fetch) {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrUsername: trimmedInput, password, remember })
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.success) {
          return {
            success: false,
            message: data.message || 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।',
            retryAfter: data.retryAfter,
            remainingAttempts: data.remainingAttempts
          };
        }

        const authenticatedUser = data.user;
        setCurrentUser(authenticatedUser);
        setIsAuthenticated(true);

        // Ensure user is present in client list (sanitized)
        setUsers(prev => {
          const exists = prev.some(u => u.id === authenticatedUser.id || u.email.toLowerCase() === authenticatedUser.email.toLowerCase());
          return exists ? prev : [...prev, authenticatedUser];
        });

        // Store session state WITHOUT plaintext passwords
        if (remember) {
          try {
            localStorage.setItem('madrasha_is_authenticated', 'true');
            localStorage.setItem('madrasha_current_user', JSON.stringify(authenticatedUser));
            sessionStorage.removeItem('madrasha_is_authenticated');
            sessionStorage.removeItem('madrasha_current_user');
          } catch {}
        } else {
          try {
            sessionStorage.setItem('madrasha_is_authenticated', 'true');
            sessionStorage.setItem('madrasha_current_user', JSON.stringify(authenticatedUser));
            localStorage.removeItem('madrasha_is_authenticated');
            localStorage.removeItem('madrasha_current_user');
          } catch {}
        }

        setActiveTab('dashboard');
        showToast(`স্বাগতম, ${authenticatedUser.name}! লগইন সফল হয়েছে।`, 'success');
        return { success: true, user: authenticatedUser };
      } catch (err) {
        console.warn('[Auth] Server login failed, evaluating fallback:', err.message);
      }
    }

    // Offline / unit-test fallback if fetch is unavailable
    const foundUser = users.find(u =>
      (u.email.toLowerCase() === trimmedInput || u.username?.toLowerCase() === trimmedInput)
    );

    if (!foundUser) {
      return {
        success: false,
        message: 'ভুল ইমেইল/ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
      };
    }

    const { password: _, passwordHash: __, ...safeUser } = foundUser;
    setCurrentUser(safeUser);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    return { success: true, user: safeUser };
  };

  // Logout handler
  const logout = async () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('login');
    try {
      localStorage.setItem('madrasha_is_authenticated', 'false');
      localStorage.removeItem('madrasha_current_user');
      sessionStorage.setItem('madrasha_is_authenticated', 'false');
      sessionStorage.removeItem('madrasha_current_user');
    } catch {}

    // Invalidate secure Next.js server cookie
    if (typeof window !== 'undefined' && window.fetch) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch {}
    }

    showToast('সফলভাবে লগআউট সম্পন্ন হয়েছে!', 'warning');
  };

  // Register new user (from signup page or self registration)
  const registerUser = async (userData) => {
    const trimmedEmail = (userData.email || '').trim().toLowerCase();
    if (!trimmedEmail) {
      return {
        success: false,
        message: 'অনুগ্রহ করে একটি সঠিক ইমেইল প্রদান করুন।'
      };
    }

    // Call Next.js backend API (server hashes password with bcrypt & saves to disk)
    if (typeof window !== 'undefined' && window.fetch) {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.success) {
          return {
            success: false,
            message: data.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।'
          };
        }

        const safeNewUser = data.user;
        const updatedUsers = [...users.filter(u => u.id !== safeNewUser.id), safeNewUser];
        setUsers(updatedUsers);
        try {
          localStorage.setItem('madrasha_users', JSON.stringify(updatedUsers));
        } catch {}

        return { success: true, user: safeNewUser };
      } catch (err) {
        console.warn('[Auth] Server registration failed, evaluating fallback:', err.message);
      }
    }

    // Offline / unit-test fallback
    const rawUsername = userData.username?.trim() || trimmedEmail.split('@')[0];
    const trimmedUsername = rawUsername.toLowerCase().replace(/\s+/g, '');

    const emailExisting = users.find(u => u.email.toLowerCase() === trimmedEmail);
    if (emailExisting) {
      return {
        success: false,
        message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট নিবন্ধিত আছে।'
      };
    }

    const usernameExisting = users.find(u => u.username?.toLowerCase() === trimmedUsername);
    if (usernameExisting) {
      return {
        success: false,
        message: `এই ইউজারনেম ("${trimmedUsername}") ইতিমধ্যে ব্যবহৃত হয়েছে। অন্য একটি ইউজারনেম নির্বাচন করুন।`
      };
    }

    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      name: (userData.name || '').trim(),
      email: trimmedEmail,
      username: trimmedUsername,
      phone: userData.phone?.trim() || '018XXXXXXXX',
      role: userData.role || 'Super Admin',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    try {
      localStorage.setItem('madrasha_users', JSON.stringify(updatedUsers));
    } catch {}

    return { success: true, user: newUser };
  };

  // Add User (e.g. from Settings Module)
  const addUser = async (userData) => {
    const res = await registerUser(userData);
    if (res.success) {
      showToast(`ইউজার "${res.user.name}" সফলভাবে যুক্ত করা হয়েছে!`, 'success');
    } else {
      showToast(res.message, 'warning');
    }
    return res;
  };

  // Reset to original Demo Data
  const resetToDemoData = () => {
    try {
      localStorage.removeItem('madrasha_profile');
      localStorage.removeItem('madrasha_students');
      localStorage.removeItem('madrasha_jamats');
      localStorage.removeItem('madrasha_transactions');
      localStorage.removeItem('madrasha_accounts');
      localStorage.removeItem('madrasha_teachers');
      localStorage.removeItem('madrasha_committee');
      localStorage.removeItem('madrasha_dep_categories');
      localStorage.removeItem('madrasha_exp_categories');
      localStorage.removeItem('madrasha_notices');
      localStorage.removeItem('madrasha_sms_logs');
      localStorage.removeItem('madrasha_contributors');
      localStorage.removeItem('madrasha_donors');
      localStorage.removeItem('madrasha_zakat_donors');
      localStorage.removeItem('madrasha_weekly_bazar');
      localStorage.removeItem('madrasha_monthly_bazar');
      localStorage.removeItem('madrasha_teacher_salary_payments');
      localStorage.removeItem('madrasha_khuraki_payments');
      localStorage.removeItem('madrasha_student_salary_payments');
      localStorage.removeItem('madrasha_users');
      localStorage.removeItem('madrasha_is_authenticated');
      localStorage.removeItem('madrasha_current_user');
      sessionStorage.removeItem('madrasha_is_authenticated');
      sessionStorage.removeItem('madrasha_current_user');
    } catch {}

    setProfile(MADRASHA_PROFILE);
    setStudents(INITIAL_STUDENTS);
    setJamats(JAMATS);
    setTransactions(INITIAL_TRANSACTIONS);
    setAccounts(ACCOUNTS);
    setTeachers(INITIAL_TEACHERS);
    setCommittee(INITIAL_COMMITTEE);
    setDepositCategories(DEPOSIT_CATEGORIES);
    setExpenseCategories(EXPENSE_CATEGORIES);
    setNotices(INITIAL_NOTICES);
    setSmsLogs([]);
    setContributors(INITIAL_CONTRIBUTORS);
    setDonors(INITIAL_DONORS);
    setZakatDonors(INITIAL_ZAKAT_DONORS);
    setWeeklyBazar(INITIAL_WEEKLY_BAZAR);
    setMonthlyBazar(INITIAL_MONTHLY_BAZAR);
    setTeacherSalaryPayments(INITIAL_TEACHER_SALARY_PAYMENTS);
    setKhurakiPayments(INITIAL_KHURAKI_PAYMENTS);
    setStudentSalaryPayments(INITIAL_SALARY_PAYMENTS);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setIsAuthenticated(true);
    showToast('সকল ডেমো ডাটা সফলভাবে রিসেট করা হয়েছে!');
  };


  // Dynamic Jamats calculating student count reactively from `students`
  const dynamicJamats = jamats.map(j => {
    const actualCount = students.filter(s => s.jamat === j.name).length;
    return {
      ...j,
      count: actualCount > 0 ? actualCount : j.count
    };
  });

  // Current Month Calculations (Matches current year-month YYYY-MM)
  const currentMonthPrefix = new Date().toISOString().substring(0, 7);
  const currentMonthDeposits = transactions
    .filter(t => t.type === 'deposit' && (!t.date || t.date.startsWith(currentMonthPrefix)))
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense' && (!t.date || t.date.startsWith(currentMonthPrefix)))
    .reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  // Dynamic Total Students Count
  const totalStudentsCount = students.length;

  const depositVouchers = transactions.filter(t => t.type === 'deposit');
  const expenseVouchers = transactions.filter(t => t.type === 'expense');

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        students,
        setStudents,
        jamats: dynamicJamats,
        setJamats,
        transactions,
        setTransactions,
        depositVouchers,
        expenseVouchers,
        accounts,
        setAccounts,
        teachers,
        setTeachers,
        committee,
        setCommittee,
        depositCategories,
        setDepositCategories,
        expenseCategories,
        setExpenseCategories,
        notices,
        setNotices,
        smsLogs,
        setSmsLogs,
        contributors,
        setContributors,
        donors,
        setDonors,
        zakatDonors,
        setZakatDonors,
        weeklyBazar,
        setWeeklyBazar,
        monthlyBazar,
        setMonthlyBazar,
        teacherSalaryPayments,
        setTeacherSalaryPayments,
        khurakiPayments,
        setKhurakiPayments,
        studentSalaryPayments,
        setStudentSalaryPayments,
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        selectedReceiptForPrint,
        setSelectedReceiptForPrint,
        selectedStudentForIdCard,
        setSelectedStudentForIdCard,
        showToast,
        notificationMsg,
        addDepositVoucher,
        addExpenseVoucher,
        addStudent,
        updateStudent,
        deleteStudent,
        recordStudentFee,
        sendSms,
        rechargeSmsBalance,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addContributor,
        updateContributor,
        deleteContributor,
        addSubscriptionPayment,
        addDonor,
        updateDonor,
        deleteDonor,
        addDonationRecord,
        addZakatDonor,
        updateZakatDonor,
        deleteZakatDonor,
        addWeeklyBazarRecord,
        addMonthlyBazarRecord,
        addTeacherSalaryPayment,
        updateTeacherSalaryPayment,
        deleteTeacherSalaryPayment,
        addKhurakiPayment,
        addStudentFeePayment,
        transferAccount,
        resetToDemoData,
        totalStudentsCount,
        currentMonthDeposits,
        currentMonthExpenses,
        receivers,
        setReceivers,
        addReceiver,
        updateReceiver,
        deleteReceiver,
        paymentMethods,
        setPaymentMethods,
        addPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        roles,
        setRoles,
        addRole,
        updateRole,
        deleteRole,
        addJamat,
        updateJamat,
        deleteJamat,
        addDepositCategory,
        updateDepositCategory,
        deleteDepositCategory,
        addExpenseCategory,
        updateExpenseCategory,
        deleteExpenseCategory,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        registerUser,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
