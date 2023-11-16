import { ConsumerDomain } from '../../domain/consumer.domain';

export interface ICreateConsumerApplication {
  create(
    createConsumerRequest: Partial<ConsumerDomain>,
  ): Promise<Partial<ConsumerDomain>>;
}
