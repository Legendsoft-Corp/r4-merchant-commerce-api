import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateBranchRequestDTO {
  @ApiProperty({
    maxLength: 50,
    description: 'Nombre de la sucursal',
    example: 'Guayacán',
    required: true,
  })
  @IsString()
  @Length(5, 50, {
    message: 'name debe tener una longitud desde 5 hasta 50 caracteres',
  })
  name: string;

  @ApiProperty({
    maxLength: 70,
    description: 'Dirección física de la sucursal',
    example: 'Av. 1 con Calle 2',
    required: true,
  })
  @IsString()
  @Length(5, 70, {
    message: 'address debe tener una longitud desde 5 hasta 70 caracteres',
  })
  address: string;

  @ApiProperty({
    maxLength: 11,
    description: 'Número de teléfono de la sucursal',
    example: '04141234567',
    required: true,
  })
  @IsPhoneNumber('VE', {
    message: 'phoneNumber debe ser un número de teléfono válido',
  })
  phoneNumber: string;

  @ApiProperty({
    maxLength: 50,
    description: 'Correo electrónico asociado a la sucursal',
    example: 'sucursal@micomercio.com',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  email: string;

  @ApiProperty({
    maxLength: 36,
    description: 'Comercio a la sucursal',
    example: '61e47ad9-adb2-4dd2-90b4-1afca2948bee',
    required: true,
  })
  @IsUUID('all', { message: 'commerce debe ser un UUID válido' })
  commerce: string;
}
