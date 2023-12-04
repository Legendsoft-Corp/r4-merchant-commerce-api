import { CashierDomain } from '../../domain/cashier.domain';

export interface IGetByBranchService {
  get(branch: string): Promise<CashierDomain[]>;
}
