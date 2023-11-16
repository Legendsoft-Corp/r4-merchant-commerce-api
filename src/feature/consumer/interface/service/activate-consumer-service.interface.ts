import { ConsumerDomain } from '../../domain/consumer.domain';

export interface IActivateConsumerService {
  activate(activateConsumerRequest: Partial<ConsumerDomain>): Promise<boolean>;
}
