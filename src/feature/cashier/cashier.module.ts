import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateApplication } from './application/create.application';
import { CreateService } from './service/create.service';
import { CashierController } from './controller/cashier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './domain/cashier.entity';

const createCashierApp = {
  provide: TYPES.application.ICreateApplication,
  useClass: CreateApplication,
};

const createCashierService = {
  provide: TYPES.service.ICreateService,
  useClass: CreateService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Cashier])],
  controllers: [CashierController],
  providers: [createCashierApp, createCashierService],
})
export class CashierModule {}
