import { Injectable } from '@nestjs/common';
import { ICreateBranchService } from '../interface/service/create-branch-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../domain/branch.entity';
import { Repository } from 'typeorm';
import { BranchDomain } from '../domain/branch.domain';

@Injectable()
export class CreateBranchService implements ICreateBranchService {
  private _regex = /\(([^)]+)\)/;

  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  /**
   * @method create
   * @param branch Partial<BranchDomain>
   * @returns Promise<BranchDomain>
   */
  async create(branch: Partial<BranchDomain>): Promise<Error | BranchDomain> {
    const commerceEntity = await this._branchRepository.create(branch);
    return await this._branchRepository.save(commerceEntity).catch((error) => {
      const valueError = this._regex.exec(
        error.driverError.originalError.info.message,
      );
      return `El valor ${
        valueError![1]
      } ya se encuentra registrado` as unknown as Error;
    });
  }
}
