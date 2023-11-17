import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BadRequestErrorResponseDTO {
  @ApiProperty({
    maxLength: 3,
    description: 'Código del error',
    example: '400',
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Tipo de error',
    example: 'Bad Request',
  })
  @IsString()
  error: string;

  @ApiProperty({
    description: 'Mensaje del error',
    example: 'Error en la validación de los datos enviados',
  })
  @IsString()
  message: string;
}
