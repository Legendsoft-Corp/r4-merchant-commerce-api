import {
  UseGuards,
  Controller,
  Inject,
  Req,
  Res,
  Body,
  Headers,
  Logger,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { TYPES } from '../interface/types';
import { ICreateApplication } from '../interface/application/create-application.interface';
import { CreateCashierRequestDTO } from './DTO/create-cashier-request.dto';

@ApiTags('Cashiers')
@UseGuards(AuthorizationGuard)
@Controller('cashiers')
export class CashierController {
  private readonly _logger = new Logger();

  constructor(
    @Inject(TYPES.application.ICreateApplication)
    private readonly _createApp: ICreateApplication,
  ) {}

  @ApiOperation({ summary: 'Crear una caja' })
  @Post()
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiBody({ type: CreateCashierRequestDTO })
  async create(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Body()
    createCashierRequest: CreateCashierRequestDTO,
  ) {
    this._logger.log(
      { id: 'create-cashier-request', body: req.body },
      'Create Cashier Request',
    );
    const stock = await this._createApp
      .create(createCashierRequest)
      .catch((error) => error);
    this._logger.log(
      { id: 'create-cashier-response', body: stock },
      'Create Cashier Response',
    );
    return res.status(HttpStatus.CREATED).json(stock);
  }
}
