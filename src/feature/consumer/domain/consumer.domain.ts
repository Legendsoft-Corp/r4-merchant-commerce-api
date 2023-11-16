import { IsString } from 'class-validator';

export class ConsumerDomain {
  @IsString()
  id: string;

  @IsString()
  apiKey: string;

  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  type: string;

  @IsString()
  createdBy: string;

  @IsString()
  createdAt: string;
}
