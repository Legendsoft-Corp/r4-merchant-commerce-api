import { BadRequestException, Injectable } from '@nestjs/common';
import { IDeleteService } from '../interface/service/delete-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CASHIER_STATUS, Cashier } from '../domain/cashier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteService implements IDeleteService {
  constructor(
    @InjectRepository(Cashier)
    private readonly _cashierRepository: Repository<Cashier>,
  ) {}

  async delete(id: string): Promise<Error | boolean> {
    const cashier = await this._cashierRepository.findOne({ where: { id } });
    if (!cashier) {
      throw new BadRequestException(`Cashier ${id} no existe`);
    }
    cashier.status = CASHIER_STATUS.DELETED;

    const deletedCashier = this._cashierRepository
      .save(cashier)
      .then((result) => !!result);

    return deletedCashier;
  }
}
