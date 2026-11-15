/**
 * ===================================================================
 * MADRASHA MANAGEMENT SYSTEM — ENTERPRISE TYPESCRIPT DATA MODELS
 * ===================================================================
 * Complete Type-Safe Specifications for Database Entities, Models,
 * Relationships, Matrices, API Payloads, and Transactions.
 * ===================================================================
 */

// ----------------------------------------------------
// 1. Institution & Organization Profile
// ----------------------------------------------------
export interface MadrashaProfile {
  id?: string;
  name: string;
  nameEn?: string;
  address: string;
  phone1: string;
  phone2?: string;
  email: string;
  established: string;
  principal: string;
  logo: string;
  sidelogo?: string;
  watermark?: string;
  website?: string;
  code?: string;
  tagline?: string;
}

// ----------------------------------------------------
// 2. Academic: Jamat (Class/Department)
// ----------------------------------------------------
export interface Jamat {
  id: number | string;
  name: string;
  studentCount?: number;
  monthlyFee?: number;
  admissionFee?: number;
  session?: string;
  order?: number;
  description?: string;
  createdAt?: string;
}

// ----------------------------------------------------
// 3. Student Entity & Fee Matrix
// ----------------------------------------------------
export interface StudentFeeMonth {
  paid: boolean;
  amount: number;
  voucherNo?: string;
  date?: string;
  paymentMethod?: string;
}

export interface StudentFeeMatrix {
  [monthName: string]: StudentFeeMonth;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-' | 'জানা নেই';
export type ResidentialStatus = 'আবাসিক' | 'অনাবাসিক' | 'ডে-কেয়ার';

export interface Student {
  id: string;
  roll: string | number;
  admissionNumber?: string;
  name: string;
  nameEn?: string;
  jamat: string;
  fatherName: string;
  fatherOcc?: string;
  motherName: string;
  motherOcc?: string;
  guardianPhone: string;
  parentsPhone2?: string;
  address: string;
  bloodGroup: BloodGroup | string;
  dob: string;
  birthReg?: string;
  nid?: string;
  admissionDate: string;
  session: string;
  monthlyFee: number;
  khurakiFee?: number;
  admissionFee?: number;
  residential: ResidentialStatus | string;
  status: 'Active' | 'Inactive' | 'Passed' | 'Transferred' | string;
  photo?: string;
  feeMatrix?: StudentFeeMatrix;
  khurakiMatrix?: StudentFeeMatrix;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------------------------------------------
// 4. Faculty & Staff: Teacher Models
// ----------------------------------------------------
export interface Teacher {
  id: string | number;
  name: string;
  designation: string;
  phone: string;
  email?: string;
  jamat?: string;
  subject?: string;
  salary: number;
  joiningDate?: string;
  qualification?: string;
  bloodGroup?: string;
  address?: string;
  status: 'Active' | 'On Leave' | 'Resigned' | string;
  photo?: string;
  createdAt?: string;
}

export interface TeacherSalaryPayment {
  id: string;
  voucherNo: string;
  teacherId: string | number;
  teacherName: string;
  month: string;
  year: string | number;
  amount: number;
  date: string;
  account: string;
  receiver: string;
  method: string;
  remarks?: string;
  createdAt?: string;
}

// ----------------------------------------------------
// 5. Philanthropy: Monthly Contributors, Donors & Zakat
// ----------------------------------------------------
export interface Contributor {
  id: string | number;
  name: string;
  fatherName?: string;
  phone: string;
  address: string;
  monthlyAmount: number;
  occupation?: string;
  status: 'Active' | 'Inactive' | string;
  pledgeDate?: string;
  notes?: string;
  createdAt?: string;
}

export interface ContributorPayment {
  id: string;
  voucherNo: string;
  contributorId: string | number;
  contributorName: string;
  month: string;
  year: string | number;
  amount: number;
  date: string;
  account: string;
  receiver: string;
  method?: string;
  remarks?: string;
  createdAt?: string;
}

export interface GeneralDonor {
  id: string | number;
  voucherNo?: string;
  name: string;
  phone: string;
  address: string;
  amount: number;
  purpose: string;
  date: string;
  account: string;
  receiver: string;
  method?: string;
  remarks?: string;
  createdAt?: string;
}

export interface ZakatDonor {
  id: string | number;
  voucherNo?: string;
  name: string;
  phone: string;
  address: string;
  amount: number;
  distributionPurpose: string;
  date: string;
  account: string;
  receiver: string;
  method?: string;
  remarks?: string;
  createdAt?: string;
}

// ----------------------------------------------------
// 6. Kitchen & Mess: Weekly & Monthly Bazar
// ----------------------------------------------------
export interface BazarEntryItem {
  name: string;
  quantity?: string;
  unitPrice?: number;
  total: number;
}

export interface BazarRecord {
  id: string;
  voucherNo: string;
  date: string;
  type: 'weekly' | 'monthly';
  buyer: string;
  amount: number;
  items?: BazarEntryItem[];
  itemDescription?: string;
  account: string;
  receiver?: string;
  remarks?: string;
  receiptImage?: string;
  createdAt?: string;
}

// ----------------------------------------------------
// 7. Governance: Committee Members
// ----------------------------------------------------
export interface CommitteeMember {
  id: string | number;
  name: string;
  designation: string;
  phone: string;
  address: string;
  term?: string;
  photo?: string;
  status: 'Active' | 'Honorary' | 'Former';
  joinedDate?: string;
}

// ----------------------------------------------------
// 8. Academic Attendance & Examination Records
// ----------------------------------------------------
export type AttendanceStatus = 'present' | 'absent' | 'leave' | 'late';

export interface AttendanceRecord {
  id: string;
  date: string;
  type: 'student' | 'teacher';
  targetId: string | number;
  targetName?: string;
  jamat?: string;
  status: AttendanceStatus;
  recordedBy?: string;
  remarks?: string;
}

export interface SubjectMark {
  subjectName: string;
  fullMarks: number;
  obtainedMarks: number;
  grade?: string;
  gpa?: number;
}

export interface ExamResult {
  id: string;
  studentId: string;
  roll: string | number;
  studentName: string;
  jamat: string;
  examTerm: 'প্রথম সাময়িক' | 'দ্বিতীয় সাময়িক' | 'বার্ষিক' | 'নির্বাচনী' | string;
  session: string;
  subjects: SubjectMark[];
  totalMarks: number;
  gpa: number;
  grade: string;
  position?: number;
  resultStatus: 'Passed' | 'Failed';
  publishedDate?: string;
}

// ----------------------------------------------------
// 9. Finance & Vouchers: Income, Expense, Cash Ledger
// ----------------------------------------------------
export type VoucherType = 'deposit' | 'expense';

export interface Voucher {
  id: string;
  voucherNo: string;
  type: VoucherType;
  date: string;
  category: string;
  amount: number;
  amountInWords?: string;
  account: string;
  receiver: string;
  paidTo?: string;
  receivedFrom?: string;
  studentId?: string;
  teacherId?: string | number;
  remarks?: string;
  sourceModule?: 'student' | 'teacher' | 'donor' | 'zakat' | 'bazar' | 'general' | string;
  createdAt?: string;
}

// ----------------------------------------------------
// 10. Accounts & Banking
// ----------------------------------------------------
export type AccountType = 'cash' | 'bank' | 'mobile_banking';

export interface FinancialAccount {
  id: string;
  name: string;
  type: AccountType;
  accountNumber?: string;
  bankName?: string;
  branch?: string;
  initialBalance: number;
  currentBalance: number;
  status: 'Active' | 'Inactive';
  notes?: string;
  createdAt?: string;
}

export interface BalanceTransfer {
  id: string;
  transferNo: string;
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  amountInWords?: string;
  remarks?: string;
  initiatedBy?: string;
  createdAt?: string;
}

// ----------------------------------------------------
// 11. Security, Users & RBAC
// ----------------------------------------------------
export type UserRole = 'Super Admin' | 'Accountant / Cashier' | 'Teacher' | 'Staff' | string;

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: 'Active' | 'Suspended' | 'Pending';
  avatar?: string;
  password?: string;
  passwordHash?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface Role {
  id: number | string;
  name: string;
  desc: string;
  permissions?: string[];
}

// ----------------------------------------------------
// 12. Messaging: SMS System
// ----------------------------------------------------
export interface SmsLog {
  id: string;
  date: string;
  recipientType: 'student' | 'teacher' | 'contributor' | 'custom' | string;
  recipientsCount: number;
  message: string;
  smsCount: number;
  cost: number;
  status: 'Sent' | 'Failed' | 'Pending';
  sender: string;
}

export interface SmsBalance {
  balance: number;
  currency: string;
  unitPrice: number;
}
