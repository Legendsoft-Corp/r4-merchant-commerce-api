import { BadRequestException, Injectable } from '@nestjs/common';
import { IGetCommerceByIdService } from '../interface/service/get-commerce-by-id-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Commerce } from '../domain/commerce.entity';
import { Repository } from 'typeorm';
import { CommerceDomain } from '../domain/commerce.domain';

@Injectable()
export class GetCommerceByIdService implements IGetCommerceByIdService {
  constructor(
    @InjectRepository(Commerce)
    private readonly _commerceRepository: Repository<Commerce>,
  ) {}

  /**
   * @method get
   * @param id string
   * @returns Promise<CommerceDomain>
   * @throws BadRequestException
   */
  async get(id: string): Promise<CommerceDomain> {
    const commerce = await this._commerceRepository
      .findOne({ where: { id } })
      .then((result) => result)
      .catch((error) => {
        error;
      });

    if (!commerce) {
      throw new BadRequestException('Comercio no encontrado');
    }

    return commerce;
  }
}
