import { CashierDomain } from '../../domain/cashier.domain';

export interface IUpdateService {
  update(
    id: string,
    cashier: Partial<CashierDomain>,
  ): Promise<Error | CashierDomain>;
}
