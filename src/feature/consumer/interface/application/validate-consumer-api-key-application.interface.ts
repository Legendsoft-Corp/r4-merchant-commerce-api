import { ConsumerDomain } from '../../domain/consumer.domain';

export interface IValidateConsumerAPIKeyApplication {
  validate(validateConsumerAPIKeyRequest: ConsumerDomain): Promise<boolean>;
}
