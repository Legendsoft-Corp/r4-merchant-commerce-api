import { Inject, Injectable } from '@nestjs/common';
import { ICreateCommerceApplication } from '../interface/application/create-commerce-application.interface';
import { TYPES } from '../interface/types';
import { ICreateCommerceService } from '../interface/service/create-commerce-service.interface';
import { CommerceDomain } from '../domain/commerce.domain';

@Injectable()
export class CreateCommerceApplication implements ICreateCommerceApplication {
  constructor(
    @Inject(TYPES.service.ICreateCommerceService)
    private readonly _createCommerceService: ICreateCommerceService,
  ) {}

  /**
   * @method create
   * @param commerce Partial<CommerceDomain>
   * @returns Promise<CommerceDomain>
   */
  create(commerce: Partial<CommerceDomain>): Promise<Error | CommerceDomain> {
    return this._createCommerceService.create(commerce);
  }
}
