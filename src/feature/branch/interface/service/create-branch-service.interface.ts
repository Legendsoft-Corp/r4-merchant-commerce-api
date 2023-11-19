import { BranchDomain } from '../../domain/branch.domain';

export interface ICreateBranchService {
  create(branch: Partial<BranchDomain>): Promise<Error | BranchDomain>;
}
