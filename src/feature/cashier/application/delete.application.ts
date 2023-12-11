import { Inject, Injectable } from '@nestjs/common';
import { IDeleteApplication } from '../interface/application/delete-application.interface';
import { TYPES } from '../interface/types';
import { IDeleteService } from '../interface/service/delete-service.interface';

@Injectable()
export class DeleteApplication implements IDeleteApplication {
  constructor(
    @Inject(TYPES.service.IDeleteService)
    private readonly _deleteService: IDeleteService,
  ) {}

  /**
   * @method delete
   * @param id string
   * @returns Promise<boolean | Error>
   */
  delete(id: string): Promise<boolean | Error> {
    return this._deleteService.delete(id);
  }
}
