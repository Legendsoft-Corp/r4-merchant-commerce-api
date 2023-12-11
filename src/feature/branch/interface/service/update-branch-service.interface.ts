import { BranchDomain } from '../../domain/branch.domain';

export interface IUpdateBranchService {
  update(
    id: string,
    data: Partial<BranchDomain>,
  ): Promise<Partial<BranchDomain>>;
}
