/**
 * ===================================================================
 * MADRASHA MANAGEMENT SYSTEM — MAIN TYPESCRIPT DEFINITIONS
 * ===================================================================
 */

export * from './models';

// Context State Definition
import type {
  MadrashaProfile,
  Student,
  Jamat,
  Teacher,
  TeacherSalaryPayment,
  Contributor,
  ContributorPayment,
  GeneralDonor,
  ZakatDonor,
  BazarRecord,
  CommitteeMember,
  AttendanceRecord,
  ExamResult,
  Voucher,
  FinancialAccount,
  BalanceTransfer,
  User,
  Role,
  SmsLog
} from './models';

export interface AppContextType {
  profile: MadrashaProfile;
  setProfile: (profile: MadrashaProfile) => void;
  students: Student[];
  jamats: Jamat[];
  teachers: Teacher[];
  contributors: Contributor[];
  donors: GeneralDonor[];
  zakatDonors: ZakatDonor[];
  weeklyBazar: BazarRecord[];
  monthlyBazar: BazarRecord[];
  committee: CommitteeMember[];
  attendanceRecords: AttendanceRecord[];
  examResults: ExamResult[];
  transactions: Voucher[];
  accounts: FinancialAccount[];
  balanceTransfers: BalanceTransfer[];
  users: User[];
  roles: Role[];
  smsLogs: SmsLog[];
  smsBalance: number;
  isAuthenticated: boolean;
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string, updateHistory?: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  login: (emailOrUsername?: string, password?: string, remember?: boolean) => Promise<{ success: boolean; user?: User; message?: string }>;
  logout: () => Promise<void>;
  registerUser: (userData: Partial<User> & { password?: string }) => Promise<{ success: boolean; user?: User; message?: string }>;
  showToast: (text: string, type?: 'success' | 'warning' | 'error') => void;
}
