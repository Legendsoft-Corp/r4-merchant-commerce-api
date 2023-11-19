import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { BRANCH_STATUS } from '../../domain/branch.entity';

export class CreateBranchResponseDTO {
  @ApiProperty({
    maxLength: 36,
    description: 'Identificador de la sucursal',
    example: '61e47ad9-adb2-4dd2-90b4-1afca2948bee',
  })
  @IsUUID()
  id: string;

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
    maxLength: 36,
    description: 'Identificador del comercio asociado a la sucursal',
    example: '61e47ad9-adb2-4dd2-90b4-1afca2948bee',
    required: true,
  })
  @IsUUID('all', { message: 'commerce debe ser un UUID válido' })
  commerce: string;

  @ApiProperty({
    enum: BRANCH_STATUS,
    enumName: 'BRANCH_STATUS',
    description: 'Estatus de la sucursal',
    example: BRANCH_STATUS.ACTIVE,
    required: true,
  })
  @IsEnum(BRANCH_STATUS, {
    message: 'status debe ser un valor del enum BRANCH_STATUS',
  })
  status: BRANCH_STATUS;
}
