import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InternalServerErrorResponseDTO {
  @ApiProperty({
    maxLength: 3,
    description: 'Código del error',
    example: '500',
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje del error',
    example: 'Error interno del servidor',
  })
  @IsString()
  message: string;
}
