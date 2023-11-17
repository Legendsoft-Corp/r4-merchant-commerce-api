import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ErrorResponseDTO {
  @ApiProperty({
    maxLength: 3,
    description: 'Código del error',
    example: '400 | 401 | 500',
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje del error',
    example:
      'Error en la validación de los datos enviados | Error de autenticación | Error interno del servidor',
  })
  @IsString()
  message: string;
}
