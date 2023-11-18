import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../interface/types';
import { CommerceDomain } from '../domain/commerce.domain';
import { IGetCommerceByUserApplication } from '../interface/application/get-commerce-by-user-application.interface';
import { IGetCommerceByUserService } from '../interface/service/get-commerce-by-user-service.interface';

@Injectable()
export class GetCommerceByUserApplication
  implements IGetCommerceByUserApplication
{
  constructor(
    @Inject(TYPES.service.IGetCommerceByUserService)
    private readonly _getCommerceByUserService: IGetCommerceByUserService,
  ) {}

  /**
   * @method get
   * @param id string
   * @returns Promise<CommerceDomain>
   */
  get(user: string): Promise<CommerceDomain> {
    return this._getCommerceByUserService.get(user);
  }
}
