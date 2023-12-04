import { Inject, Injectable } from '@nestjs/common';
import { IGetAllApplication } from '../interface/application/get-all-application.interface';
import { TYPES } from '../interface/types';
import { GetAllService } from '../service/get-all.service';
import { BranchDomain } from '../domain/branch.domain';

@Injectable()
export class GetAllApplication implements IGetAllApplication {
  constructor(
    @Inject(TYPES.service.IGetAllService)
    private readonly _getAllService: GetAllService,
  ) {}

  /**
   * @method get
   * @param commerce string
   * @returns Promise<BranchDomain[]>
   */
  get(commerce: string): Promise<BranchDomain[]> {
    return this._getAllService.get(commerce);
  }
}
