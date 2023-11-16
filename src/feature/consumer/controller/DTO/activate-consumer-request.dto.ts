import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ActivateConsumerRequestDTO {
  @ApiProperty()
  @IsUUID()
  id: string;
}
