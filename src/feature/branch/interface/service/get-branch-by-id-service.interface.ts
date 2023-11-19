import { BranchDomain } from '../../domain/branch.domain';

export interface IGetBranchByIdService {
  get(id: string): Promise<BranchDomain>;
}
