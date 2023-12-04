import { Injectable } from '@nestjs/common';
import { IDeleteByIdService } from '../interface/service/delete-by-id-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BRANCH_STATUS, Branch } from '../domain/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteByIdService implements IDeleteByIdService {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  /**
   * @method delete
   * @param id string
   * @returns boolean
   */
  async delete(id: string): Promise<boolean> {
    const branch = await this._branchRepository.findOne({ where: { id } });
    if (!branch) {
      return false;
    }
    branch.status = BRANCH_STATUS.DELETED;

    const deletedBranch = this._branchRepository
      .save(branch)
      .then((result) => !!result);

    return deletedBranch;
  }
}
