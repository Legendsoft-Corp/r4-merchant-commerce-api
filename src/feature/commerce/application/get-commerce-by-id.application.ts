import { Inject, Injectable } from '@nestjs/common';
import { IGetCommerceByIdApplication } from '../interface/application/get-commerce-by-id-application.interface';
import { TYPES } from '../interface/types';
import { IGetCommerceByIdService } from '../interface/service/get-commerce-by-id-service.interface';
import { CommerceDomain } from '../domain/commerce.domain';

@Injectable()
export class GetCommerceByIdApplication implements IGetCommerceByIdApplication {
  constructor(
    @Inject(TYPES.service.IGetCommerceByIdService)
    private readonly _getCommerceByIdService: IGetCommerceByIdService,
  ) {}

  /**
   * @method get
   * @param id string
   * @returns Promise<CommerceDomain>
   */
  get(id: string): Promise<CommerceDomain> {
    return this._getCommerceByIdService.get(id);
  }
}
