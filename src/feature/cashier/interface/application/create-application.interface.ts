import { CashierDomain } from '../../domain/cashier.domain';

export interface ICreateApplication {
  create(cashier: Partial<CashierDomain>): Promise<Error | CashierDomain>;
}
