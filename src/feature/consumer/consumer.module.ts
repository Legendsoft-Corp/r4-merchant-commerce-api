import { Global, Module } from '@nestjs/common';
import { ConsumerController } from './controller/consumer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from './domain/consumer.entity';
import { CreateConsumerApplication } from './application/create-consumer.application';
import { TYPES } from './interface/types';
import { CreateConsumerService } from './service/create-consumer.service';
import { ValidateConsumerAPIKeyApplication } from './application/validate-consumer-api-key-application';
import { ValidateConsumerAPIKeyService } from './service/validate-consumer-api-key.service';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { ActivateConsumerApplication } from './application/activate-consumer.application';
import { ActivateConsumerService } from './service/activate-consumer.service';

const createConsumerApp = {
  provide: TYPES.application.ICreateConsumerApplication,
  useClass: CreateConsumerApplication,
};

const validateConsumerAPIKeyApp = {
  provide: TYPES.application.IValidateConsumerAPIKeyApplication,
  useClass: ValidateConsumerAPIKeyApplication,
};

const activateConsumerApp = {
  provide: TYPES.application.IActivateConsumerApplication,
  useClass: ActivateConsumerApplication,
};

const createConsumerService = {
  provide: TYPES.service.ICreateConsumerService,
  useClass: CreateConsumerService,
};

const validateConsumerAPIKeyService = {
  provide: TYPES.service.IValidateConsumerAPIKeyService,
  useClass: ValidateConsumerAPIKeyService,
};

const activateConsumerService = {
  provide: TYPES.service.IActivateConsumerService,
  useClass: ActivateConsumerService,
};

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Consumer])],
  providers: [
    AuthorizationGuard,
    createConsumerApp,
    createConsumerService,
    validateConsumerAPIKeyApp,
    validateConsumerAPIKeyService,
    activateConsumerApp,
    activateConsumerService,
  ],
  controllers: [ConsumerController],
  exports: [validateConsumerAPIKeyApp],
})
export class ConsumerModule {}
