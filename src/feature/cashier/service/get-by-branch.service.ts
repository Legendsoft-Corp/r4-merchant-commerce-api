import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetByBranchService } from '../interface/service/get-by-branch.interface';
import { CASHIER_STATUS, Cashier } from '../domain/cashier.entity';
import { CashierDomain } from '../domain/cashier.domain';

@Injectable()
export class GetByBranchService implements IGetByBranchService {
  constructor(
    @InjectRepository(Cashier)
    private readonly _cashierRepository: Repository<Cashier>,
  ) {}

  /**
   * @method get
   * @param branch string
   * @returns Promise<CashierDomain[]>
   */
  async get(branch: string): Promise<CashierDomain[]> {
    const cashiers = await this._cashierRepository
      .find({ where: { branch, status } })
      .then((result) => result)
      .catch((error) => {
        error;
      });

    if (!cashiers) {
      throw new BadRequestException('No existen cajas para esta sucursal');
    }

    return cashiers.filter(
      (cashier) => cashier.status !== CASHIER_STATUS.DELETED,
    );
  }
}
