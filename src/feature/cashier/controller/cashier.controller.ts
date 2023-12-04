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
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { TYPES } from '../interface/types';
import { ICreateApplication } from '../interface/application/create-application.interface';
import { CreateCashierRequestDTO } from './DTO/create-cashier-request.dto';
import { GetAllByBranchResponseDTO } from './DTO/get-all-by-branch-response.dto';
import {
  BadRequestErrorResponseDTO,
  InternalServerErrorResponseDTO,
  UnauthorizedErrorResponseDTO,
} from 'src/common/DTO';
import { IGetByBranchApplication } from '../interface/application/get-by-branch-application.interface';

@ApiTags('Cashiers')
@UseGuards(AuthorizationGuard)
@Controller('cashiers')
export class CashierController {
  private readonly _logger = new Logger();

  constructor(
    @Inject(TYPES.application.ICreateApplication)
    private readonly _createApp: ICreateApplication,
    @Inject(TYPES.application.IGetByBranchApplication)
    private readonly _getByBranchApp: IGetByBranchApplication,
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

  /**
   * @method getAll
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param commerce: string
   * @returns Response
   */
  @ApiOperation({ summary: 'Consultar cajas por sucursal' })
  @Get('branches/:branch')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiParam({ name: 'branch', description: 'Identificador de la sucursal' })
  @ApiCreatedResponse({
    description: 'Cajas Encontradas',
    type: GetAllByBranchResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Error en la validación de los datos enviados',
    type: BadRequestErrorResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Error de autenticación',
    type: UnauthorizedErrorResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno del servidor',
    type: InternalServerErrorResponseDTO,
  })
  async getAll(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Param('branch')
    branch: string,
  ) {
    this._logger.log(
      { id: 'get-cashier-by-branch-request', body: req.body },
      'Get Cashier Request',
    );
    const stock = await this._getByBranchApp.get(branch);
    this._logger.log(
      { id: 'get-cashier-by-branch-response', body: stock },
      'Get Cashier Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }
}
