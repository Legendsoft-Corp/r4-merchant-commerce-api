import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CASHIER_STATUS } from '../../domain/cashier.entity';

export class UpdateCashierRequestDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  branch: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(CASHIER_STATUS)
  status: CASHIER_STATUS;
}
