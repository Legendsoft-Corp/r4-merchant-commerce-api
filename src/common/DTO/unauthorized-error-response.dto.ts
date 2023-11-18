import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UnauthorizedErrorResponseDTO {
  @ApiProperty({
    maxLength: 3,
    description: 'Código del error',
    example: '401',
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Tipo de error',
    example: 'Unauthorized',
  })
  @IsString()
  error: string;

  @ApiProperty({
    description: 'Mensaje del error',
    example: 'Error de autorización del consumidor',
  })
  @IsString()
  message: string;
}
