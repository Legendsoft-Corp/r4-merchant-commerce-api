import { CommerceDomain } from '../../domain/commerce.domain';

export interface IGetCommerceByIdApplication {
  get(id: string): Promise<CommerceDomain>;
}
