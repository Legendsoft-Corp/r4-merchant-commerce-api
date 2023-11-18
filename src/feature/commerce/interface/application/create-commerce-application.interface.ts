import { CommerceDomain } from '../../domain/commerce.domain';

export interface ICreateCommerceApplication {
  create(commerce: Partial<CommerceDomain>): Promise<Error | CommerceDomain>;
}
