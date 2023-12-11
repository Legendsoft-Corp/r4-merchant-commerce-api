import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { CASHIER_STATUS } from '../../domain/cashier.entity';

export class CreateCashierRequestDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  branch: string;

  @ApiProperty()
  @IsEnum(CASHIER_STATUS)
  status: CASHIER_STATUS;
}
