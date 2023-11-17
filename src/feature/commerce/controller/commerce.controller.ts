import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { TYPES } from '../interface/types';
import { ICreateCommerceApplication } from '../interface/application/create-commerce-application.interface';
import { CreateCommerceRequestDTO, CreateCommerceResponseDTO } from './DTO';
import {
  BadRequestErrorResponseDTO,
  InternalServerErrorResponseDTO,
  UnauthorizedErrorResponseDTO,
} from 'src/common/DTO';
import { IGetCommerceByIdApplication } from '../interface/application/get-commerce-by-id-application.interface';
import { GetCommerceByIdRequestDTO } from './DTO/get-commerce-by-id-request.dto';
import { GetCommerceByIdResponseDTO } from './DTO/get-commerce-by-id-response.dto';

@ApiTags('Commerces')
@UseGuards(AuthorizationGuard)
@Controller('commerces')
export class CommerceController {
  private readonly _logger = new Logger();

  constructor(
    @Inject(TYPES.application.ICreateCommerceApplication)
    private _createCommerceApp: ICreateCommerceApplication,
    @Inject(TYPES.application.IGetCommerceByIdApplication)
    private _getCommerceByIdApp: IGetCommerceByIdApplication,
  ) {}

  /**
   * @method create
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param createCommerceRequest CreateCommerceRequestDTO
   * @returns Response
   */
  @ApiOperation({ summary: 'Crear un comercio' })
  @Post()
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiBody({ type: CreateCommerceRequestDTO })
  @ApiCreatedResponse({
    description: 'Comercio creado exitosamente',
    type: CreateCommerceResponseDTO,
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
  async create(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Body()
    createCommerceRequest: CreateCommerceRequestDTO,
  ) {
    this._logger.log(
      { id: 'create-commerce-request', body: req.body },
      'Create Commerce Request',
    );
    const stock = await this._createCommerceApp
      .create(createCommerceRequest)
      .catch((error) => error);
    this._logger.log(
      { id: 'create-commerce-response', body: stock },
      'Create Commerce Response',
    );
    return res.status(HttpStatus.CREATED).json(stock);
  }

  /**
   * @method getById
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param getCommerceByIdRequest GetCommerceByIdRequestDTO
   * @returns Response
   */
  @ApiOperation({ summary: 'Consultar un comercio por su ID' })
  @Post(':id')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiBody({ type: GetCommerceByIdRequestDTO })
  @ApiCreatedResponse({
    description: 'Comercio Encontrado',
    type: GetCommerceByIdResponseDTO,
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
  async getById(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Body()
    getCommerceByIdRequest: GetCommerceByIdRequestDTO,
  ) {
    this._logger.log(
      { id: 'get-commerce-by-id-request', body: req.body },
      'Get Commerce Request',
    );
    const stock = await this._getCommerceByIdApp.get(getCommerceByIdRequest.id);
    this._logger.log(
      { id: 'get-commerce-by-id-response', body: stock },
      'Get Commerce Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }
}
