import { Injectable } from '@nestjs/common';
import { ICreateService } from '../interface/service/create.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Cashier } from '../domain/cashier.entity';
import { Repository } from 'typeorm';
import { CashierDomain } from '../domain/cashier.domain';

@Injectable()
export class CreateService implements ICreateService {
  private _regex = /\(([^)]+)\)/;

  constructor(
    @InjectRepository(Cashier)
    private readonly _cashierRepository: Repository<Cashier>,
  ) {}

  /**
   * @method create
   * @param cashier Partial<CashierDomain>
   * @returns Promise<Error | CashierDomain>
   */
  async create(
    cashier: Partial<CashierDomain>,
  ): Promise<Error | CashierDomain> {
    const cashierEntity = await this._cashierRepository.create(cashier);
    return await this._cashierRepository.save(cashierEntity).catch((error) => {
      const valueError = this._regex.exec(
        error.driverError.originalError.info.message,
      );
      return `El valor ${
        valueError![1]
      } ya se encuentra registrado` as unknown as Error;
    });
  }
}
