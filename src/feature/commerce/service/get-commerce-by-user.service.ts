import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Commerce } from '../domain/commerce.entity';
import { Repository } from 'typeorm';
import { CommerceDomain } from '../domain/commerce.domain';
import { IGetCommerceByUserService } from '../interface/service/get-commerce-by-user-service.interface';

@Injectable()
export class GetCommerceByUserService implements IGetCommerceByUserService {
  constructor(
    @InjectRepository(Commerce)
    private readonly _commerceRepository: Repository<Commerce>,
  ) {}

  /**
   * @method get
   * @param user string
   * @returns Promise<CommerceDomain>
   * @throws BadRequestException
   */
  async get(user: string): Promise<CommerceDomain> {
    const commerce = await this._commerceRepository
      .findOne({ where: { user } })
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
