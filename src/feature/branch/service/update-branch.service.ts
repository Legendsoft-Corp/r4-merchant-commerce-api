import { BadRequestException, Injectable } from '@nestjs/common';
import { IUpdateBranchService } from '../interface/service/update-branch-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../domain/branch.entity';
import { Repository } from 'typeorm';
import { BranchDomain } from '../domain/branch.domain';

@Injectable()
export class UpdateBranchService implements IUpdateBranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  /**
   * @method update
   * @param id string
   * @param data Partial<BranchDomain>
   * @returns Partial<BranchDomain>
   */
  async update(
    id: string,
    data: Partial<BranchDomain>,
  ): Promise<Partial<BranchDomain>> {
    let branch = await this._branchRepository.findOne({
      where: { id: id },
    });
    if (!branch) {
      throw new BadRequestException(`Sucursal con ${id} no existe`);
    }
    branch = { ...branch, ...data };
    const updatedBranch = await this._branchRepository.save(branch);
    return updatedBranch;
  }
}
