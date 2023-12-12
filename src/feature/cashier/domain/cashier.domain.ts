import { IsString, IsUUID } from 'class-validator';
import { CASHIER_STATUS } from './cashier.entity';

export class CashierDomain {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  branch: string;

  @IsString()
  status: CASHIER_STATUS;
}
