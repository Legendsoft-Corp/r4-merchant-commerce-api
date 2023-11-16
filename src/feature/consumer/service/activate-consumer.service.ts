import { BadRequestException, Injectable } from '@nestjs/common';
import { IActivateConsumerService } from '../interface/service/activate-consumer-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumer } from '../domain/consumer.entity';
import { ConsumerDomain } from '../domain/consumer.domain';
import { TYPES } from '../interface/types';
@Injectable()
export class ActivateConsumerService implements IActivateConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private readonly _consumerRepository: Repository<Consumer>,
  ) {}

  /**
   * @method activate
   * @param activateConsumerRequest Partial<ConsumerDomain>
   * @returns
   */
  async activate(
    activateConsumerRequest: Partial<ConsumerDomain>,
  ): Promise<boolean> {
    const consumer = await this._consumerRepository.findOne({
      where: { id: activateConsumerRequest.id },
    });

    if (!consumer) {
      throw new BadRequestException(
        `Consumer ${activateConsumerRequest.id} no existe`,
      );
    }

    consumer.status = TYPES.consumerStatus.ACTIVE;

    const updatedConsumer = await this._consumerRepository.save(consumer);

    return updatedConsumer.status === TYPES.consumerStatus.ACTIVE;
  }
}
