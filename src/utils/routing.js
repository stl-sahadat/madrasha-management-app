/**
 * URL and Routing utilities for Madrasha Management App
 * Maps URL paths to active tabs and vice versa matching madrasha.hostzonebd.com
 */

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
  if (clean === 'admin/student/admission/form' || clean === 'student-admission-form' || clean === 'admin/student-admission-form') return 'student-admission-form';
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

  // Attendance routes (exact 1:1 matching madrasha.hostzonebd.com)
  if (clean === 'admin/attendance/student/report' || clean === 'attendance/student/report') return 'attendance-student-report';
  if (clean === 'admin/attendance/student' || clean === 'attendance/student' || clean === 'admin/attendance' || clean === 'attendance') return 'attendance-student';
  if (clean === 'admin/attendance/teacher/report' || clean === 'attendance/teacher/report') return 'attendance-teacher-report';
  if (clean === 'admin/attendance/teacher' || clean === 'attendance/teacher') return 'attendance-teacher';
  if (clean === 'admin/result') return 'result-create';
  if (clean === 'admin/voucher/deposit') return 'voucher-deposit';
  // ID Card routes (exact 1:1 matching madrasha.hostzonebd.com)
  if (clean === 'admin/id-card/teacher' || clean === 'id-card/teacher' || clean === 'admin/id-card-teacher' || clean === 'idcard-teacher') return 'idcard-teacher';
  if (clean === 'admin/id-card' || clean === 'id-card' || clean === 'admin/id-card/student' || clean === 'id-card/student' || clean === 'admin/id-card-student' || clean === 'idcard-student') return 'idcard-student';

  // SMS routes (exact 1:1 matching madrasha.hostzonebd.com)
  if (clean === 'admin/sms/send-to-client' || clean === 'sms/send-to-client') return 'sms-student';
  if (clean === 'admin/sms/send-to-teacher' || clean === 'sms/send-to-teacher') return 'sms-teacher';
  if (clean === 'admin/sms' || clean === 'sms' || clean === 'sms-send') return 'sms-student';
  if (clean === 'admin/sms/history' || clean === 'sms/history' || clean === 'sms-logs') return 'sms-logs';

  // Account routes
  const editMatch = clean.match(/^(?:admin\/)?account\/([^/]+)\/edit$/);
  if (editMatch) return `account-edit:${editMatch[1]}`;

  if (clean === 'admin/account/create' || clean === 'account/create') return 'account-create';
  if (clean === 'admin/account' || clean === 'admin/account/list' || clean === 'account/list' || clean === 'account') return 'account-list';
  if (clean === 'admin/account/account/report' || clean === 'admin/account/report' || clean === 'account/report' || clean === 'account/account/report' || clean === 'account-report') return 'account-report';
  if (clean === 'admin/account/balance/transfer' || clean === 'admin/balance/transfer' || clean === 'admin/balance-transfer' || clean === 'balance-transfer' || clean === 'accounts-transfer') return 'accounts-transfer';
  if (clean === 'admin/account/balancesheet' || clean === 'admin/balance/sheet' || clean === 'admin/balancesheet' || clean === 'balancesheet') return 'balancesheet';

  // Report routes
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
