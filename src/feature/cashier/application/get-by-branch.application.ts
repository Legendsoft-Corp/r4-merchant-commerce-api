import { Inject, Injectable } from '@nestjs/common';
import { IGetByBranchApplication } from '../interface/application/get-by-branch-application.interface';
import { TYPES } from '../interface/types';
import { IGetByBranchService } from '../interface/service/get-by-branch.interface';
import { CashierDomain } from '../domain/cashier.domain';

@Injectable()
export class GetByBranchApplication implements IGetByBranchApplication {
  constructor(
    @Inject(TYPES.service.IGetByBranchService)
    private readonly _getByBranchService: IGetByBranchService,
  ) {}

  get(branch: string): Promise<CashierDomain[]> {
    return this._getByBranchService.get(branch);
  }
}
