import { BranchDomain } from '../../domain/branch.domain';

export interface IGetAllService {
  get(commerce: string): Promise<BranchDomain[]>;
}
