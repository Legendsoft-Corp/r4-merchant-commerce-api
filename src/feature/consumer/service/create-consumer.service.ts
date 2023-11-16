import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumer } from '../domain/consumer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ICreateConsumerService } from '../interface/service/create-consumer-service.interface';
import { TYPES } from '../interface/types';
import { ConsumerDomain } from '../domain/consumer.domain';

@Injectable()
export class CreateConsumerService implements ICreateConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private readonly _consumerRepository: Repository<Consumer>,
  ) {}

  private readonly SALT_ROUNDS: number = 10;

  /**
   * @method create
   * @param consumer Partial<ConsumerDomain>
   * @returns Partial<ConsumerDomain>
   */
  async create(
    createConsumerRequest: Partial<ConsumerDomain>,
  ): Promise<Partial<ConsumerDomain>> {
    const token = crypto.randomUUID();
    const hashedToken = await bcrypt.hash(token, this.SALT_ROUNDS);

    createConsumerRequest.id = crypto.randomUUID();
    createConsumerRequest.apiKey = hashedToken;
    createConsumerRequest.status = TYPES.consumerStatus.INACTIVE;

    const persistedConsumer = await this._consumerRepository.save(
      createConsumerRequest,
    );

    const createConsumerResponse = new ConsumerDomain();
    createConsumerResponse.id = persistedConsumer.id;
    createConsumerResponse.apiKey = token;
    createConsumerResponse.status = persistedConsumer.status;
    createConsumerResponse.type = persistedConsumer.type;

    return createConsumerResponse;
  }
}
