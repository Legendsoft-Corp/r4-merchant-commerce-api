import { Inject, Injectable } from '@nestjs/common';
import { ICreateBranchApplication } from '../interface/application/create-branch-application.interface';
import { TYPES } from '../interface/types';
import { ICreateBranchService } from '../interface/service/create-branch-service.interface';
import { BranchDomain } from '../domain/branch.domain';

@Injectable()
export class CreateBranchApplication implements ICreateBranchApplication {
  constructor(
    @Inject(TYPES.service.ICreateBranchService)
    private readonly _createBranchService: ICreateBranchService,
  ) {}

  /**
   * @method create
   * @param branch Partial<BranchDomain>
   * @returns Promise<BranchDomain>
   */
  create(branch: Partial<BranchDomain>): Promise<Error | BranchDomain> {
    return this._createBranchService.create(branch);
  }
}
