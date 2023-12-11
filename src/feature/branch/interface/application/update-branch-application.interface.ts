import { BranchDomain } from '../../domain/branch.domain';

export interface IUpdateBranchApplication {
  update(
    id: string,
    data: Partial<BranchDomain>,
  ): Promise<Partial<BranchDomain>>;
}
