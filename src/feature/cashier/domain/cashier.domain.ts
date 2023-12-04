import { IsString } from 'class-validator';

export class CashierDomain {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
