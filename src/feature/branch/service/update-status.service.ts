import { Injectable } from '@nestjs/common';
import { IUpdateStatusService } from '../interface/service/update-status-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BRANCH_STATUS, Branch } from '../domain/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateStatusService implements IUpdateStatusService {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  /**
   * @method updateStatus
   * @param id string
   * @param status BRANCH_STATUS
   * @returns boolean
   */
  async updateStatus(id: string, status: BRANCH_STATUS): Promise<boolean> {
    if (status !== BRANCH_STATUS.DELETED) {
      const branch = await this._branchRepository.findOne({ where: { id } });
      if (!branch) {
        throw new Error('Branch not found');
      }
      branch.status = status;
      const updatedBranch = await this._branchRepository.save(branch);
      return updatedBranch ? true : false;
    } else {
      return false;
    }
  }
}
