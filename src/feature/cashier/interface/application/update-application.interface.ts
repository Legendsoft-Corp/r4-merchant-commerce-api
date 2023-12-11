import { CashierDomain } from '../../domain/cashier.domain';

export interface IUpdateApplication {
  update(
    id: string,
    application: Partial<CashierDomain>,
  ): Promise<Error | CashierDomain>;
}
