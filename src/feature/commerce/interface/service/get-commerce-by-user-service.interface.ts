import { CommerceDomain } from '../../domain/commerce.domain';

export interface IGetCommerceByUserService {
  get(user: string): Promise<CommerceDomain>;
}
