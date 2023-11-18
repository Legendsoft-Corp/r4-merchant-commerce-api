import { Catch, Injectable } from '@nestjs/common';
import { ICreateCommerceService } from '../interface/service/create-commerce-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Commerce } from '../domain/commerce.entity';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { CommerceDomain } from '../domain/commerce.domain';

@Catch(QueryFailedError, EntityNotFoundError)
@Injectable()
export class CreateCommerceService implements ICreateCommerceService {
  private _regex = /\(([^)]+)\)/;

  constructor(
    @InjectRepository(Commerce)
    private readonly _commerceRepository: Repository<Commerce>,
  ) {}

  /**
   * @method create
   * @param commerce Partial<CommerceDomain>
   * @returns Promise<CommerceDomain>
   */
  async create(
    commerce: Partial<CommerceDomain>,
  ): Promise<Error | CommerceDomain> {
    const commerceEntity = await this._commerceRepository.create(commerce);
    return await this._commerceRepository
      .save(commerceEntity)
      .catch((error) => {
        const valueError = this._regex.exec(
          error.driverError.originalError.info.message,
        );
        return `El valor ${
          valueError![1]
        } ya se encuentra registrado` as unknown as Error;
      });
  }
}
