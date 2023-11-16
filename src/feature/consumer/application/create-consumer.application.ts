import { Inject, Injectable } from '@nestjs/common';
import { ICreateConsumerApplication } from '../interface/application/create-consumer-application.interface';
import { ICreateConsumerService } from '../interface/service/create-consumer-service.interface';
import { TYPES } from '../interface/types';
import { ConsumerDomain } from '../domain/consumer.domain';

@Injectable()
export class CreateConsumerApplication implements ICreateConsumerApplication {
  constructor(
    @Inject(TYPES.service.ICreateConsumerService)
    private _createConsumerService: ICreateConsumerService,
  ) {}

  /**
   * @method create
   * @param consumer
   * @returns
   */
  create(consumer: ConsumerDomain): Promise<Partial<ConsumerDomain>> {
    return this._createConsumerService.create(consumer);
  }
}
