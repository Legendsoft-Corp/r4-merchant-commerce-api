import { ConsumerDomain } from '../../domain/consumer.domain';

export interface ICreateConsumerService {
  create(
    createConsumerRequest: Partial<ConsumerDomain>,
  ): Promise<Partial<ConsumerDomain>>;
}
