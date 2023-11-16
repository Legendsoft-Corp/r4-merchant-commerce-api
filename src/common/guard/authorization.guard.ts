import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConsumerDomain } from 'src/feature/consumer/domain/consumer.domain';
import { IValidateConsumerAPIKeyApplication } from 'src/feature/consumer/interface/application/validate-consumer-api-key-application.interface';
import { TYPES } from 'src/feature/consumer/interface/types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    @Inject(TYPES.application.IValidateConsumerAPIKeyApplication)
    private readonly _validateConsumerAPIKeyApp: IValidateConsumerAPIKeyApplication,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const id = request.headers['x-consumer-id'];
    const validateConsumerAPIKeyRequest = {
      id,
      apiKey,
    } as ConsumerDomain;

    return this._validateConsumerAPIKeyApp.validate(
      validateConsumerAPIKeyRequest,
    );
  }
}
