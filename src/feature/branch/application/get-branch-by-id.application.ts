import { Inject, Injectable } from '@nestjs/common';
import { IGetBranchByIdApplication } from '../interface/application/get-branch-by-id-application.interface';
import { TYPES } from '../interface/types';
import { IGetBranchByIdService } from '../interface/service/get-branch-by-id-service.interface';
import { BranchDomain } from '../domain/branch.domain';

@Injectable()
export class GetBranchByIdApplication implements IGetBranchByIdApplication {
  constructor(
    @Inject(TYPES.service.IGetBranchByIdService)
    private readonly _getBranchByIdService: IGetBranchByIdService,
  ) {}

  /**
   * @method get
   * @param id string
   * @returns Promise<BranchDomain>
   */
  get(id: string): Promise<BranchDomain> {
    return this._getBranchByIdService.get(id);
  }
}
