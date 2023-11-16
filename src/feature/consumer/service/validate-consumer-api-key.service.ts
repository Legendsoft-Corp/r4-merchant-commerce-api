import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IValidateConsumerAPIKeyService } from '../interface/service/validate-consumer-api-key-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumer } from '../domain/consumer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TYPES } from '../interface/types';
import { ConsumerDomain } from '../domain/consumer.domain';

@Injectable()
export class ValidateConsumerAPIKeyService
  implements IValidateConsumerAPIKeyService
{
  constructor(
    @InjectRepository(Consumer)
    private readonly _consumerRepository: Repository<Consumer>,
  ) {}

  /**
   * @method validate
   * @param validateConsumerAPIKeyRequest Partial<ConsumerDomain>
   * @returns boolean
   */
  async validate(
    validateConsumerAPIKeyRequest: ConsumerDomain,
  ): Promise<boolean> {
    const consumer = await this._consumerRepository
      .findOne({
        where: { id: validateConsumerAPIKeyRequest.id },
      })
      .then((result) => result)
      .catch((error) => {
        throw new UnauthorizedException(error);
      });

    if (!consumer || consumer.status === TYPES.consumerStatus.INACTIVE) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const APIKeyIsValid = bcrypt.compare(
      validateConsumerAPIKeyRequest.apiKey,
      consumer.apiKey,
    );

    if (!APIKeyIsValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return true;
  }
}
