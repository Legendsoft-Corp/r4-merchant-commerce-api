import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetBranchByIdService } from '../interface/service/get-branch-by-id-service.interface';
import { BranchDomain } from '../domain/branch.domain';
import { Branch } from '../domain/branch.entity';

@Injectable()
export class GetBranchByIdService implements IGetBranchByIdService {
  constructor(
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
  ) {}

  /**
   * @method get
   * @param id string
   * @returns Promise<BranchDomain>
   * @throws BadRequestException
   */
  async get(id: string): Promise<BranchDomain> {
    const branch = await this._branchRepository
      .findOne({ where: { id: id } })
      .then((result) => result)
      .catch((error) => {
        error;
      });

    if (!branch) {
      throw new BadRequestException('Sucursal no encontrada');
    }

    return branch;
  }
}
