import { IsString } from 'class-validator';

export class ValidateConsumerAPIKeyRequestDTO {
  @IsString()
  id: string;

  @IsString()
  apiKey: string;
}
