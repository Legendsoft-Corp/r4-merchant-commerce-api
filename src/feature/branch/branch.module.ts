import { Module } from '@nestjs/common';
import { TYPES } from './interface/types';
import { CreateBranchApplication } from './application/create-branch.application';
import { CreateBranchService } from './service/create-branch.service';
import { GetBranchByIdApplication } from './application/get-branch-by-id.application';
import { GetBranchByIdService } from './service/get-branch-by-id.service';
import { BranchController } from './controller/branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './domain/branch.entity';
import { GetAllApplication } from './application/get-all.application';
import { GetAllService } from './service/get-all.service';
import { DeleteByIdApplication } from './application/delete-by-id.application';
import { DeleteByIdService } from './service/delete-by-id.service';
import { UpdateStatusApplication } from './application/update-status.application';
import { UpdateStatusService } from './service/update-status.service';
import { UpdateBranchApplication } from './application/update-branch.application';
import { UpdateBranchService } from './service/update-branch.service';

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

const getAllApp = {
  provide: TYPES.application.IGetAllApplication,
  useClass: GetAllApplication,
};

const getAllService = {
  provide: TYPES.service.IGetAllService,
  useClass: GetAllService,
};

const deleteByIdApp = {
  provide: TYPES.application.IDeleteByIdApplication,
  useClass: DeleteByIdApplication,
};

const deleteByIdService = {
  provide: TYPES.service.IDeleteByIdService,
  useClass: DeleteByIdService,
};

const updateStatusApp = {
  provide: TYPES.application.IUpdateStatusApplication,
  useClass: UpdateStatusApplication,
};

const updateStatusService = {
  provide: TYPES.service.IUpdateStatusService,
  useClass: UpdateStatusService,
};

const updateBranchApplication = {
  provide: TYPES.application.IUpdateBranchApplication,
  useClass: UpdateBranchApplication,
};

const updateBranchService = {
  provide: TYPES.service.IUpdateBranchService,
  useClass: UpdateBranchService,
};

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  providers: [
    createBranchApp,
    createBranchService,
    getBranchByIdApplication,
    getBranchByIdService,
    getAllApp,
    getAllService,
    deleteByIdApp,
    deleteByIdService,
    updateStatusApp,
    updateStatusService,
    updateBranchApplication,
    updateBranchService,
  ],
  controllers: [BranchController],
})
export class BranchModule {}
