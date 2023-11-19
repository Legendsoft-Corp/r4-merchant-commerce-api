import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateBranchApplication } from './application/create-branch.application';
import { CreateBranchService } from './service/create-branch.service';
import { GetBranchByIdApplication } from './application/get-branch-by-id.application';
import { GetBranchByIdService } from './service/get-branch-by-id.service';
import { BranchController } from './controller/branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './domain/branch.entity';

const createBranchApp = {
  provide: TYPES.application.ICreateBranchApplication,
  useClass: CreateBranchApplication,
};

const createBranchService = {
  provide: TYPES.service.ICreateBranchService,
  useClass: CreateBranchService,
};

const getBranchByIdApplication = {
  provide: TYPES.application.IGetBranchByIdApplication,
  useClass: GetBranchByIdApplication,
};

const getBranchByIdService = {
  provide: TYPES.service.IGetBranchByIdService,
  useClass: GetBranchByIdService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [
    createBranchApp,
    createBranchService,
    getBranchByIdApplication,
    getBranchByIdService,
  ],
  controllers: [BranchController],
})
export class BranchModule {}
