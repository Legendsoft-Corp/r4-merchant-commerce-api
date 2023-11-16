import { ConsumerDomain } from '../../domain/consumer.domain';

export interface IActivateConsumerApplication {
  activate(consumer: Partial<ConsumerDomain>): Promise<boolean>;
}
