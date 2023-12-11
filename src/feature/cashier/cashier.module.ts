import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateApplication } from './application/create.application';
import { CreateService } from './service/create.service';
import { CashierController } from './controller/cashier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './domain/cashier.entity';
import { GetByBranchApplication } from './application/get-by-branch.application';
import { GetByBranchService } from './service/get-by-branch.service';
import { UpdateApplication } from './application/update.application';
import { DeleteApplication } from './application/delete.application';
import { UpdateService } from './service/update.service';
import { DeleteService } from './service/delete.service';

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

const updateCashierApp = {
  provide: TYPES.application.IUpdateApplication,
  useClass: UpdateApplication,
};

const updateCashierService = {
  provide: TYPES.service.IUpdateService,
  useClass: UpdateService,
};

const deletedCashierApp = {
  provide: TYPES.application.IDeleteApplication,
  useClass: DeleteApplication,
};

const deletedCashierService = {
  provide: TYPES.service.IDeleteService,
  useClass: DeleteService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Cashier])],
  controllers: [CashierController],
  providers: [
    createCashierApp,
    createCashierService,
    getCashiersByBranchApp,
    getCashiersByBranchService,
    updateCashierApp,
    updateCashierService,
    deletedCashierApp,
    deletedCashierService,
  ],
})
export class CashierModule {}
