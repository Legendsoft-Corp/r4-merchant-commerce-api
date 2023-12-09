import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { RIF_TYPE } from '../../domain/commerce.entity';

export class CreateCommerceRequestDTO {
  @ApiProperty({
    enum: RIF_TYPE,
    enumName: 'RIF_TYPE',
    description: 'Prefijo del RIF del comercio',
    example: RIF_TYPE.J,
    required: true,
  })
  @IsEnum(RIF_TYPE, { message: 'rifType debe ser un valor del enum RIF_TYPE' })
  // @Max(0, { message: 'rifType debe tener una longitud máxima de 1 caracter' })
  rifType: RIF_TYPE;

  @ApiProperty({
    minLength: 9,
    maxLength: 9,
    description: 'Número del RIF del comercio',
    example: '123456789',
    required: true,
  })
  @IsString({ message: 'rif debe ser un una cadena de caracteres' })
  @Length(9, 9, { message: 'rif debe tener una longitud de 9 caracteres' })
  rif: string;

  @ApiProperty({
    maxLength: 50,
    description: 'Nombre del comercio',
    example: 'Mi Comercio S.R.L',
    required: true,
  })
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
  @IsPhoneNumber('VE', {
    message: 'phoneNumber debe ser un número de teléfono válido',
  })
  phoneNumber: string;

  @ApiProperty({
    maxLength: 36,
    description: 'Identificador del usuario asociado al comercio',
    example: '61e47ad9-adb2-4dd2-90b4-1afca2948bee',
    required: true,
  })
  @IsUUID('all', { message: 'user debe ser un UUID válido' })
  user: string;
}
