import { BadRequestException, Injectable } from '@nestjs/common';
import { IGetAllService } from '../interface/service/get-all-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchDomain } from '../domain/branch.domain';
import { Repository } from 'typeorm';
import { BRANCH_STATUS, Branch } from '../domain/branch.entity';

@Injectable()
export class GetAllService implements IGetAllService {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  /**
   * @method get
   * @param commerce string
   * @returns Promise<BranchDomain[]>
   */
  async get(commerce: string): Promise<BranchDomain[]> {
    const branches = await this._branchRepository
      .find({
        where: {
          commerce,
        },
      })
      .then((result) => result)
      .catch((error) => {
        error;
      });

    if (!branches) {
      throw new BadRequestException('No existen sucursales para este comercio');
    }

    return branches.filter((branch) => branch.status !== BRANCH_STATUS.DELETED);
  }
}
