import { BranchDomain } from '../../domain/branch.domain';

export interface IGetAllApplication {
  get(commerce: string): Promise<BranchDomain[]>;
}
