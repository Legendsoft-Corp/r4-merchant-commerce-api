import { CommerceDomain } from '../../domain/commerce.domain';

export interface IGetCommerceByUserApplication {
  get(user: string): Promise<CommerceDomain>;
}
