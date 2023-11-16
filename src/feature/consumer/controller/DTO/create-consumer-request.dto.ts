import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateConsumerRequestDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  createdBy: string;
}
