'use client';

import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';

// Student Components
import { StudentList } from './components/student/StudentList';
import { StudentCreate } from './components/student/StudentCreate';
import { StudentFeeMatrix } from './components/student/StudentFeeMatrix';
import { JamatGrid } from './components/student/JamatGrid';
import { StudentAdmissionReport } from './components/student/StudentAdmissionReport';
import { StudentAdmissionRegister } from './components/student/StudentAdmissionRegister';
import { StudentBloodGroup } from './components/student/StudentBloodGroup';
import { StudentParentsNumber } from './components/student/StudentParentsNumber';
import { StudentKhurakiEntry } from './components/student/StudentKhurakiEntry';
import { StudentKhurakiList } from './components/student/StudentKhurakiList';
import { StudentKhurakiRegister } from './components/student/StudentKhurakiRegister';
import { StudentSalaryEntry } from './components/student/StudentSalaryEntry';
import { StudentSalaryList } from './components/student/StudentSalaryList';
import { StudentSalaryRegister } from './components/student/StudentSalaryRegister';
import { StudentAdmissionForm } from './components/student/StudentAdmissionForm';
import { StudentProttoyonPotro } from './components/student/StudentProttoyonPotro';
import { StudentCertificate } from './components/student/StudentCertificate';
import { Breadcrumbs } from './components/layout/Breadcrumbs';

// Teacher Module
import { TeacherModule } from './components/teacher/TeacherModule';

// Donation & Bazar Modules
import { ContributorModule } from './components/donation/ContributorModule';
import { DonorModule } from './components/donation/DonorModule';
import { ZakatModule } from './components/donation/ZakatModule';
import { BazarModule } from './components/bazar/BazarModule';

// Committee & Attendance Modules
import { CommitteeModule } from './components/committee/CommitteeModule';
import { AttendanceModule } from './components/attendance/AttendanceModule';

// Vouchers & Accounts Modules
import { VoucherForm } from './components/vouchers/VoucherForm';
import { CashLedger } from './components/vouchers/CashLedger';
import { IdCardGenerator } from './components/idcard/IdCardGenerator';
import { SmsModule } from './components/sms/SmsModule';
import { AccountsModule } from './components/accounts/AccountsModule';
import { ReportsModule } from './components/reports/ReportsModule';
import { DepositReport } from './components/reports/DepositReport';
import { DailyReport } from './components/reports/DailyReport';
import { YearlyReport } from './components/reports/YearlyReport';
import { BankReport } from './components/reports/BankReport';
import { SettingsModule } from './components/settings/SettingsModule';
import { PrintReceiptModal } from './components/common/PrintReceiptModal';
import { AuthPage } from './components/auth/AuthPage';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export const App = () => {
  const { activeTab, notificationMsg, isAuthenticated } = useApp();

  // If not authenticated or visiting login/register routes, render authentic Login & Sign Up page
  if (!isAuthenticated || activeTab === 'login' || activeTab === 'register') {
    return (
      <div className="auth-root-container">
        {/* Toast Notification */}
        {notificationMsg && (
          <div
            className="fixed top-5 right-5 z-50 flex items-center space-x-2 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-top-5 no-print"
            style={{ zIndex: 9999 }}
          >
            {notificationMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span className="text-xs font-semibold">{notificationMsg.text}</span>
          </div>
        )}
        <AuthPage initialMode={activeTab === 'register' ? 'register' : 'login'} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      // ড্যাশবোর্ড
      case 'dashboard':
        return <Dashboard />;

      // ছাত্র/ছাত্রী সাব-মেনু
      case 'student-create':
        return <StudentCreate />;
      case 'student-list':
        return <StudentList />;
      case 'jamat-grid':
        return <JamatGrid />;
      case 'student-admission-report':
        return <StudentAdmissionReport />;
      case 'student-admission-register':
        return <StudentAdmissionRegister />;
      case 'student-bloodgroup':
        return <StudentBloodGroup />;
      case 'student-parents-number':
        return <StudentParentsNumber />;
      case 'student-khuraki-entry':
        return <StudentKhurakiEntry />;
      case 'student-khuraki-list':
        return <StudentKhurakiList />;
      case 'student-khuraki-register':
        return <StudentKhurakiRegister />;
      case 'student-salary-entry':
        return <StudentSalaryEntry />;
      case 'student-salary-list':
        return <StudentSalaryList />;
      case 'student-salary-register':
        return <StudentSalaryRegister />;
      case 'student-fees':
        return <StudentFeeMatrix />;
      case 'student-admission-form':
        return <StudentAdmissionForm />;
      case 'student-prottoyon':
        return <StudentProttoyonPotro />;
      case 'student-certificate':
        return <StudentCertificate />;

      // শিক্ষক সাব-মেনু
      case 'teacher-create':
        return <TeacherModule key="teacher-create" defaultTab="create" />;
      case 'teacher-list':
        return <TeacherModule key="teacher-list" defaultTab="list" />;
      case 'teacher-number':
        return <TeacherModule key="teacher-number" defaultTab="number" />;
      case 'teacher-salary-sheet':
        return <TeacherModule key="teacher-salary-sheet" defaultTab="salary-sheet" />;
      case 'teacher-salary-day':
        return <TeacherModule key="teacher-salary-day" defaultTab="salary-day" />;
      case 'teacher-salary-list':
        return <TeacherModule key="teacher-salary-list" defaultTab="salary-list" />;
      case 'teacher-attendance':
        return <TeacherModule key="teacher-attendance" defaultTab="attendance" />;

      // মাসিক চাঁদাদাতা সাব-মেনু
      case 'contributor-create':
        return <ContributorModule key="contributor-create" defaultMode="create" />;
      case 'contributor-list':
        return <ContributorModule key="contributor-list" defaultMode="list" />;
      case 'contributor-add':
        return <ContributorModule key="contributor-add" defaultMode="add" />;
      case 'contributor-individual':
        return <ContributorModule key="contributor-individual" defaultMode="individual" />;
      case 'contributor-all':
        return <ContributorModule key="contributor-all" defaultMode="all" />;
      case 'contributor-history':
        return <ContributorModule key="contributor-history" defaultMode="history" />;

      // দানকারী সাব-মেনু
      case 'donor-create':
        return <DonorModule key="donor-create" defaultMode="create-donor" />;
      case 'donor-list':
        return <DonorModule key="donor-list" defaultMode="list" />;
      case 'donation-create':
        return <DonorModule key="donation-create" defaultMode="create" />;
      case 'donor-individual':
        return <DonorModule key="donor-individual" defaultMode="individual" />;
      case 'donor-all':
        return <DonorModule key="donor-all" defaultMode="all" />;
      case 'donation-history':
      case 'donation-general':
        return <DonorModule key="donation-history" defaultMode="history" />;

      // যাকাত দাতা সাব-মেনু
      case 'zakat-donor-create':
        return <ZakatModule key="zakat-donor-create" defaultMode="create-donor" />;
      case 'zakat-donor-list':
      case 'donation-zakat':
        return <ZakatModule key="zakat-donor-list" defaultMode="list" />;
      case 'zakat-donation-create':
        return <ZakatModule key="zakat-donation-create" defaultMode="create" />;
      case 'zakat-donor-individual':
        return <ZakatModule key="zakat-donor-individual" defaultMode="individual" />;
      case 'zakat-donor-all':
        return <ZakatModule key="zakat-donor-all" defaultMode="all" />;
      case 'zakat-donation-history':
        return <ZakatModule key="zakat-donation-history" defaultMode="history" />;

      // বাজার সাব-মেনু
      case 'bazar-weekly-create':
      case 'bazar-daily':
        return <BazarModule key="bazar-weekly-create" defaultView="weekly-create" />;
      case 'bazar-weekly-report':
      case 'bazar-summary':
        return <BazarModule key="bazar-weekly-report" defaultView="weekly-report" />;
      case 'bazar-weekly-list':
        return <BazarModule key="bazar-weekly-list" defaultView="weekly-list" />;
      case 'bazar-monthly-create':
        return <BazarModule key="bazar-monthly-create" defaultView="monthly-create" />;
      case 'bazar-monthly-report':
        return <BazarModule key="bazar-monthly-report" defaultView="monthly-report" />;
      case 'bazar-monthly-list':
        return <BazarModule key="bazar-monthly-list" defaultView="monthly-list" />;

      // কমিটি
      case 'committee-list':
        return <CommitteeModule />;

      // হাজিরা সাব-মেনু
      case 'attendance-student':
      case 'attendance-daily':
        return <AttendanceModule key="attendance-student" defaultMode="attendance-student" />;
      case 'attendance-student-report':
        return <AttendanceModule key="attendance-student-report" defaultMode="attendance-student-report" />;
      case 'attendance-teacher':
        return <AttendanceModule key="attendance-teacher" defaultMode="attendance-teacher" />;
      case 'attendance-teacher-report':
        return <AttendanceModule key="attendance-teacher-report" defaultMode="attendance-teacher-report" />;

      // রেজাল্ট সাব-মেনু
      case 'result-create':
        return <AttendanceModule key="result-create" defaultMode="result-create" />;
      case 'result-sheet':
      case 'exam-results':
        return <AttendanceModule key="result-sheet" defaultMode="result-sheet" />;
      case 'result-student':
        return <AttendanceModule key="result-student" defaultMode="result-student" />;

      // জমা/খরচ হিসাব সমূহ
      case 'voucher-deposit':
        return <VoucherForm defaultType="deposit" />;
      case 'deposit-list':
        return <CashLedger key="deposit-list" initialFilter="deposit" />;
      case 'voucher-expense':
        return <VoucherForm defaultType="expense" />;
      case 'expense-list':
        return <CashLedger key="expense-list" initialFilter="expense" />;
      case 'cash-ledger':
        return <CashLedger key="cash-ledger" initialFilter="all" />;

      // আইডি কার্ড
      case 'idcard-student':
        return <IdCardGenerator defaultType="student" />;
      case 'idcard-teacher':
        return <IdCardGenerator defaultType="teacher" />;

      // এসএমএস
      case 'sms-student':
        return <SmsModule key="sms-student" defaultRecipientTarget="all_students" />;
      case 'sms-teacher':
        return <SmsModule key="sms-teacher" defaultRecipientTarget="all_teachers" />;
      case 'sms-send':
        return <SmsModule defaultView="compose" />;
      case 'sms-logs':
        return <SmsModule defaultView="logs" />;

      // অ্যাকাউন্ট সাব-মেনু
      case 'account-create':
        return <AccountsModule key="account-create" defaultView="create" />;
      case 'account-list':
      case 'accounts-list':
        return <AccountsModule key="account-list" defaultView="list" />;
      case 'account-report':
        return <AccountsModule key="account-report" defaultView="report" />;
      case 'accounts-transfer':
      case 'balance-transfer':
        return <AccountsModule key="accounts-transfer" defaultView="transfer" />;
      case 'balancesheet':
        return <AccountsModule key="balancesheet" defaultView="balancesheet" />;

      // রিপোর্ট সাব-মেনু
      case 'report-deposit':
        return <DepositReport key="report-deposit" />;
      case 'report-student-deposit':
        return <ReportsModule key="report-student-deposit" initialReportId="4" />;
      case 'report-student-salary':
        return <ReportsModule key="report-student-salary" initialReportId="3" />;
      case 'report-deposit-account':
        return <ReportsModule key="report-deposit-account" initialReportId="6" />;
      case 'report-monthly-donors':
        return <ReportsModule key="report-monthly-donors" initialReportId="11" />;
      case 'report-account-deposit':
        return <ReportsModule key="report-account-deposit" initialReportId="12" />;
      case 'report-expense':
      case 'report-expense-account':
        return <ReportsModule key="report-expense" initialReportId="13" />;
      case 'report-account-expense':
        return <ReportsModule key="report-account-expense" initialReportId="12" />;
      case 'report-deposit-expense':
        return <ReportsModule key="report-deposit-expense" initialReportId="2" />;
      case 'report-account-details':
        return <ReportsModule key="report-account-details" initialReportId="12" />;
      case 'report-daily':
        return <DailyReport key="report-daily" />;
      case 'report-yearly':
        return <YearlyReport key="report-yearly" />;
      case 'report-bank':
        return <BankReport key="report-bank" />;
      case 'reports-view':
        return <ReportsModule />;

      // সেটিং সাব-মেনু
      case 'settings-institute':
      case 'settings-profile':
        return <SettingsModule key="settings-institute" initialTab="institute" />;
      case 'settings-jamat':
        return <SettingsModule key="settings-jamat" initialTab="jamat" />;
      case 'settings-payment':
        return <SettingsModule key="settings-payment" initialTab="payment" />;
      case 'settings-deposit-cat':
        return <SettingsModule key="settings-deposit-cat" initialTab="deposit-cat" />;
      case 'settings-expense-cat':
        return <SettingsModule key="settings-expense-cat" initialTab="expense-cat" />;
      case 'settings-receiver':
        return <SettingsModule key="settings-receiver" initialTab="receiver" />;
      case 'settings-role':
        return <SettingsModule key="settings-role" initialTab="role" />;
      case 'settings-user':
        return <SettingsModule key="settings-user" initialTab="user" />;
      case 'settings':
        return <SettingsModule />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-wrapper" style={{ boxShadow: 'none' }}>
      {/* Toast Notification */}
      {notificationMsg && (
        <div
          className="fixed top-5 right-5 z-50 flex items-center space-x-2 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-top-5 no-print"
          style={{ zIndex: 9999 }}
        >
          {notificationMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{notificationMsg.text}</span>
        </div>
      )}

      {/* 1:1 Matching Navigation Sidebar */}
      <Sidebar />

      {/* 1:1 Matching App Content */}
      <div className="app-content" style={{ boxShadow: 'none' }}>
        <div>
          <Header />
          <main key={activeTab}>
            <div className="container-fluid">
              <Breadcrumbs />
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      <PrintReceiptModal />
    </div>
  );
};
