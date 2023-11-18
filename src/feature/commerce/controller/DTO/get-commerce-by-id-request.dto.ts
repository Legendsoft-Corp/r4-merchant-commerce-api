import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetCommerceByIdRequestDTO {
  @ApiProperty({
    maxLength: 36,
    description: 'Identificador del comercio',
    example: '61e47ad9-adb2-4dd2-90b4-1afca2948bee',
    required: true,
  })
  @IsUUID('all', { message: 'id debe ser un UUID válido' })
  id: string;
}
