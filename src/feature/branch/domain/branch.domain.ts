import { IsEmail, IsString } from 'class-validator';
import { BRANCH_STATUS } from './branch.entity';

export class BranchDomain {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  status: BRANCH_STATUS;

  @IsString()
  commerce: string;
}
