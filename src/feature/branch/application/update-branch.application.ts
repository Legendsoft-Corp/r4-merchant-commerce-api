import { Inject, Injectable } from '@nestjs/common';
import { IUpdateBranchApplication } from '../interface/application/update-branch-application.interface';
import { TYPES } from '../interface/types';
import { IUpdateBranchService } from '../interface/service/update-branch-service.interface';
import { BranchDomain } from '../domain/branch.domain';

@Injectable()
export class UpdateBranchApplication implements IUpdateBranchApplication {
  constructor(
    @Inject(TYPES.service.IUpdateBranchService)
    private readonly _updateBranchService: IUpdateBranchService,
  ) {}

  /**
   * @method update
   * @param id string
   * @param data Partial<BranchDomain>
   * @returns Partial<BranchDomain>
   */
  update(
    id: string,
    data: Partial<BranchDomain>,
  ): Promise<Partial<BranchDomain>> {
    return this._updateBranchService.update(id, data);
  }
}
