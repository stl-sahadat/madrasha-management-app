/**
 * ===================================================================
 * HIGH-QUALITY TYPED ORM MODEL REPOSITORIES
 * ===================================================================
 */

import { ModelRepository } from './database';
import type {
  Student,
  Jamat,
  Teacher,
  Voucher,
  FinancialAccount,
  User,
  Contributor,
  GeneralDonor,
  ZakatDonor,
  BazarRecord
} from '../../types/models';

export { ModelRepository };
export * from '../../types/models';

// Typed Entity Models
export class StudentModel extends ModelRepository<Student> {
  constructor(initialData: Student[] = []) {
    super('students', initialData);
  }

  public getByJamat(jamatName: string): Student[] {
    return this.query({ where: { jamat: jamatName } }).data;
  }

  public getByRoll(roll: string | number): Student | undefined {
    return this.findAll().find(s => String(s.roll) === String(roll));
  }
}

export class VoucherModel extends ModelRepository<Voucher> {
  constructor(initialData: Voucher[] = []) {
    super('transactions', initialData);
  }

  public getDeposits(): Voucher[] {
    return this.query({ where: { type: 'deposit' } }).data;
  }

  public getExpenses(): Voucher[] {
    return this.query({ where: { type: 'expense' } }).data;
  }

  public getCategoryTotal(category: string): number {
    return this.findAll()
      .filter(v => v.category === category)
      .reduce((sum, v) => sum + (Number(v.amount) || 0), 0);
  }
}

export class AccountModel extends ModelRepository<FinancialAccount> {
  constructor(initialData: FinancialAccount[] = []) {
    super('accounts', initialData);
  }

  public getTotalLiquidity(): number {
    return this.findAll().reduce((sum, a) => sum + (Number(a.currentBalance) || 0), 0);
  }
}

export class TeacherModel extends ModelRepository<Teacher> {
  constructor(initialData: Teacher[] = []) {
    super('teachers', initialData);
  }
}

export class ContributorModel extends ModelRepository<Contributor> {
  constructor(initialData: Contributor[] = []) {
    super('donors', initialData);
  }
}
