import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cashier } from '../domain/cashier.entity';
import { Repository } from 'typeorm';
import { IUpdateService } from '../interface/service/update-service.interface';
import { CashierDomain } from '../domain/cashier.domain';

@Injectable()
export class UpdateService implements IUpdateService {
  constructor(
    @InjectRepository(Cashier)
    private readonly _cashierRepository: Repository<Cashier>,
  ) {}

  async update(
    id: string,
    data: Partial<CashierDomain>,
  ): Promise<CashierDomain | Error> {
    let cashier = await this._cashierRepository.findOne({
      where: { id: id },
    });
    if (!cashier) {
      throw new BadRequestException(`Caja con ${id} no existe`);
    }
    cashier = { ...cashier, ...data };
    const updatedBranch = await this._cashierRepository.save(cashier);
    return updatedBranch;
  }
}
