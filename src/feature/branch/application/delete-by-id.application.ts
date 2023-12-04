import { Inject, Injectable } from '@nestjs/common';
import { IDeleteByIdApplication } from '../interface/application/delete-by-id-application.interface';
import { TYPES } from '../interface/types';
import { IDeleteByIdService } from '../interface/service/delete-by-id-service.interface';

@Injectable()
export class DeleteByIdApplication implements IDeleteByIdApplication {
  constructor(
    @Inject(TYPES.service.IDeleteByIdService)
    private readonly _deleteByIdService: IDeleteByIdService,
  ) {}

  /**
   * @method delete
   * @param id string
   * @returns boolean
   */
  delete(id: string): Promise<boolean> {
    return this._deleteByIdService.delete(id);
  }
}
