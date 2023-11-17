import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateCommerceApplication } from './application/create-commerce.application';
import { CreateCommerceService } from './service/create-commerce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from './domain/commerce.entity';
import { CommerceController } from './controller/commerce.controller';
import { GetCommerceByIdApplication } from './application/get-commerce-by-id.application';
import { GetCommerceByIdService } from './service/get-commerce-by-id.service';

const createCommerceApp = {
  provide: TYPES.application.ICreateCommerceApplication,
  useClass: CreateCommerceApplication,
};

const createCommerceService = {
  provide: TYPES.service.ICreateCommerceService,
  useClass: CreateCommerceService,
};

const getCommerceByIdApp = {
  provide: TYPES.application.IGetCommerceByIdApplication,
  useClass: GetCommerceByIdApplication,
};

const getCommerceByIdService = {
  provide: TYPES.service.IGetCommerceByIdService,
  useClass: GetCommerceByIdService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Commerce])],
  providers: [
    createCommerceApp,
    createCommerceService,
    getCommerceByIdApp,
    getCommerceByIdService,
  ],
  controllers: [CommerceController],
})
export class CommerceModule {}
