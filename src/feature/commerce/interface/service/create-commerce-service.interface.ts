import { CommerceDomain } from '../../domain/commerce.domain';

export interface ICreateCommerceService {
  create(commerce: Partial<CommerceDomain>): Promise<Error | CommerceDomain>;
}
