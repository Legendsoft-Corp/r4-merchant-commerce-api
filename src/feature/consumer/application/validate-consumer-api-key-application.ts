import { Inject, Injectable } from '@nestjs/common';
import { IValidateConsumerAPIKeyApplication } from '../interface/application/validate-consumer-api-key-application.interface';
import { TYPES } from '../interface/types';
import { ValidateConsumerAPIKeyService } from '../service/validate-consumer-api-key.service';
import { ConsumerDomain } from '../domain/consumer.domain';

@Injectable()
export class ValidateConsumerAPIKeyApplication
  implements IValidateConsumerAPIKeyApplication
{
  constructor(
    @Inject(TYPES.service.IValidateConsumerAPIKeyService)
    private _validateConsumerAPIKeyService: ValidateConsumerAPIKeyService,
  ) {}

  /**
   * @method validate
   * @param validateConsumerAPIKeyRequest
   * @returns
   */
  validate(validateConsumerAPIKeyRequest: ConsumerDomain): Promise<boolean> {
    return this._validateConsumerAPIKeyService.validate(
      validateConsumerAPIKeyRequest,
    );
  }
}
