import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateBranchRequestDTO {
  @ApiProperty({
    maxLength: 50,
    description: 'Nombre de la sucursal',
    example: 'Guayacán',
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50, {
    message: 'name debe tener una longitud desde 3 hasta 50 caracteres',
  })
  name: string;

  @ApiProperty({
    maxLength: 70,
    description: 'Dirección física del comercio',
    example: 'Av. 1 con Calle 2',
    required: true,
  })
  @IsOptional()
  @IsString()
  @Length(5, 70, {
    message: 'address debe tener una longitud desde 5 hasta 70 caracteres',
  })
  address: string;

  @ApiProperty({
    maxLength: 11,
    description: 'Número de teléfono del comercio',
    example: '04141234567',
    required: true,
  })
  @IsOptional()
  @IsPhoneNumber('VE', {
    message: 'phoneNumber debe ser un número de teléfono válido',
  })
  phoneNumber: string;

  @ApiProperty({
    maxLength: 50,
    description: 'Correo electrónico de acceso',
    example: 'usuario@micomercio.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @ApiProperty()
  email: string;

  commerce?: string;
}
