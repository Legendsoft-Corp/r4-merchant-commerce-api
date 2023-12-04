import { Inject, Injectable } from '@nestjs/common';
import { TYPES } from '../interface/types';
import { ICreateService } from '../interface/service/create-service.interface';
import { ICreateApplication } from '../interface/application/create-application.interface';
import { CashierDomain } from '../domain/cashier.domain';

@Injectable()
export class CreateApplication implements ICreateApplication {
  constructor(
    @Inject(TYPES.service.ICreateService)
    private readonly _createService: ICreateService,
  ) {}

  /**
   * @method create
   * @param cashier Partial<CashierDomain>
   * @returns Promis<CashierDomain>
   */
  create(cashier: Partial<CashierDomain>): Promise<CashierDomain | Error> {
    return this._createService.create(cashier);
  }
}
