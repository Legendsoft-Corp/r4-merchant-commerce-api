import { Inject, Injectable } from '@nestjs/common';
import { IActivateConsumerApplication } from '../interface/application/activate-consumer-aplication.interface';
import { TYPES } from '../interface/types';
import { ConsumerDomain } from '../domain/consumer.domain';
import { IActivateConsumerService } from '../interface/service/activate-consumer-service.interface';

@Injectable()
export class ActivateConsumerApplication
  implements IActivateConsumerApplication
{
  constructor(
    @Inject(TYPES.service.IActivateConsumerService)
    private _activateConsumerService: IActivateConsumerService,
  ) {}

  /**
   * @method activate
   * @param consumer Partial<ConsumerDomain>
   * @returns
   */
  activate(consumer: Partial<ConsumerDomain>): Promise<boolean> {
    return this._activateConsumerService.activate(consumer);
  }
}
