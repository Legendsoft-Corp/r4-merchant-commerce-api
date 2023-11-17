import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateCommerceApplication } from './application/create-commerce.application';
import { CreateCommerceService } from './service/create-commerce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './domain/commerce.entity';
import { CommerceController } from './controller/commerce.controller';

const createCommerceApp = {
  provide: TYPES.application.ICreateCommerceApplication,
  useClass: CreateCommerceApplication,
};

const createCommerceService = {
  provide: TYPES.service.ICreateCommerceService,
  useClass: CreateCommerceService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Commerce])],
  providers: [createCommerceApp, createCommerceService],
  controllers: [CommerceController],
})
export class CommerceModule {}
