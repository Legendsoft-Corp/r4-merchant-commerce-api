import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BRANCH_STATUS } from '../../domain/branch.entity';

export class UpdateStatusRequestDTO {
  @ApiProperty()
  @IsEnum(BRANCH_STATUS)
  status: BRANCH_STATUS;
}
