import { CommerceDomain } from '../../domain/commerce.domain';

export interface IGetCommerceByIdService {
  get(id: string): Promise<CommerceDomain>;
}
