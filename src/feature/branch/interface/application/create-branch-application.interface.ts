import { BranchDomain } from '../../domain/branch.domain';

export interface ICreateBranchApplication {
  create(commerce: Partial<BranchDomain>): Promise<Error | BranchDomain>;
}
