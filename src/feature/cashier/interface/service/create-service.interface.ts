import { CashierDomain } from '../../domain/cashier.domain';

export interface ICreateService {
  create(cashier: Partial<CashierDomain>): Promise<Error | CashierDomain>;
}
