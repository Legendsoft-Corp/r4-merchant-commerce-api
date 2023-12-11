import { Inject, Injectable } from '@nestjs/common';
import { IUpdateApplication } from '../interface/application/update-application.interface';
import { TYPES } from '../interface/types';
import { IUpdateService } from '../interface/service/update-service.interface';
import { CashierDomain } from '../domain/cashier.domain';

@Injectable()
export class UpdateApplication implements IUpdateApplication {
  constructor(
    @Inject(TYPES.service.IUpdateService)
    private readonly _updateService: IUpdateService,
  ) {}

  /**
   * @method update
   * @param id string
   * @param data: Partial<CashierDomain>
   * @returns Promise<CashierDomain | Error>
   */
  update(
    id: string,
    data: Partial<CashierDomain>,
  ): Promise<CashierDomain | Error> {
    return this._updateService.update(id, data);
  }
}
