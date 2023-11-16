import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateConsumerResponseDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  apiKey: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  status: string;
}
