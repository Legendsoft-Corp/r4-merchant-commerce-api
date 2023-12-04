import { BRANCH_STATUS } from '../../domain/branch.entity';

export interface IUpdateStatusService {
  updateStatus(id: string, status: BRANCH_STATUS): Promise<boolean>;
}
