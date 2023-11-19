import { BranchDomain } from '../../domain/branch.domain';

export interface IGetBranchByIdApplication {
  get(id: string): Promise<BranchDomain>;
}
