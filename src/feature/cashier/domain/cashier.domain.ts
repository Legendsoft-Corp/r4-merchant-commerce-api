import { IsString, IsUUID } from 'class-validator';

export class CashierDomain {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  branch: string;

  @IsString()
  status: string;
}
