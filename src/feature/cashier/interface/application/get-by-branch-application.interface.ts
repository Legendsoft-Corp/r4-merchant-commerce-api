import { CashierDomain } from '../../domain/cashier.domain';

export interface IGetByBranchApplication {
  get(branch: string): Promise<CashierDomain[]>;
}
