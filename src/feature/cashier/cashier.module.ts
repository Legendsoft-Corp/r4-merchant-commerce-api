import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateApplication } from './application/create.application';
import { CreateService } from './service/create.service';
import { CashierController } from './controller/cashier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './domain/cashier.entity';
import { GetByBranchApplication } from './application/get-by-branch.application';
import { GetByBranchService } from './service/get-by-branch.service';

const createCashierApp = {
  provide: TYPES.application.ICreateApplication,
  useClass: CreateApplication,
};

const createCashierService = {
  provide: TYPES.service.ICreateService,
  useClass: CreateService,
};

const getCashiersByBranchApp = {
  provide: TYPES.application.IGetByBranchApplication,
  useClass: GetByBranchApplication,
};

const getCashiersByBranchService = {
  provide: TYPES.service.IGetByBranchService,
  useClass: GetByBranchService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Cashier])],
  controllers: [CashierController],
  providers: [
    createCashierApp,
    createCashierService,
    getCashiersByBranchApp,
    getCashiersByBranchService,
  ],
})
export class CashierModule {}
