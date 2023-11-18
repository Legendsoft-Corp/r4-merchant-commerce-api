import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetCommerceByUserRequestDTO {
  @ApiProperty({
    maxLength: 36,
    description: 'Identificador del usuario asociado al comercio',
    example: '61e47ad9-adb2-4dd2-90b4-1afca2948bee',
    required: true,
  })
  @IsUUID('all', { message: 'user debe ser un UUID válido' })
  user: string;
}
