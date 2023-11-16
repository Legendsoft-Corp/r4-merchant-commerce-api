import { ConsumerDomain } from '../../domain/consumer.domain';

export interface IValidateConsumerAPIKeyService {
  validate(
    validateConsumerAPIKeyRequest: Partial<ConsumerDomain>,
  ): Promise<boolean>;
}
