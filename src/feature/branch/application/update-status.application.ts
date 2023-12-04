import { Inject, Injectable } from '@nestjs/common';
import { IUpdateStatusApplication } from '../interface/application/update-status-application.interface';
import { TYPES } from '../interface/types';
import { IUpdateStatusService } from '../interface/service/update-status-service.interface';
import { BRANCH_STATUS } from '../domain/branch.entity';

@Injectable()
export class UpdateStatusApplication implements IUpdateStatusApplication {
  constructor(
    @Inject(TYPES.service.IUpdateStatusService)
    private readonly _updateStatusService: IUpdateStatusService,
  ) {}

  /**
   * @method updateStatus
   * @param id string
   * @param status BRANCH_STATUS
   * @returns boolean
   */
  updateStatus(id: string, status: BRANCH_STATUS): Promise<boolean> {
    return this._updateStatusService.updateStatus(id, status);
  }
}
