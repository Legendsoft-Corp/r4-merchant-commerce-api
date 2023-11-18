import { IsString } from 'class-validator';
import { COMMERCE_STATUS, RIF_TYPE } from './commerce.entity';

export class CommerceDomain {
  @IsString()
  rifType: RIF_TYPE;

  @IsString()
  rif: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  user: string;

  @IsString()
  status: COMMERCE_STATUS;
}
