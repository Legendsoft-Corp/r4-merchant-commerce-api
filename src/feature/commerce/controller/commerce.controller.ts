import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Logger,
  Param,
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
  ApiParam,
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
import { GetCommerceByIdResponseDTO } from './DTO/get-commerce-by-id-response.dto';
import { IGetCommerceByUserApplication } from '../interface/application/get-commerce-by-user-application.interface';
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
    @Inject(TYPES.application.IGetCommerceByUserApplication)
    private _getCommerceByUserApp: IGetCommerceByUserApplication,
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
  @Get(':id')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiParam({ name: 'id', description: 'Identificador del comercio' })
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
    @Param('uuid')
    commerceId: string,
  ) {
    this._logger.log(
      { id: 'get-commerce-by-id-request', body: req.body },
      'Get Commerce Request',
    );
    const stock = await this._getCommerceByIdApp.get(commerceId);
    this._logger.log(
      { id: 'get-commerce-by-id-response', body: stock },
      'Get Commerce Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }

  /**
   * @method getByUser
   * @param res Response
   * @param apiKey string
   * @param user string
   * @param getCommerceByIdRequest GetCommerceByIdRequestDTO
   * @returns Response
   */
  @ApiOperation({ summary: 'Consultar un comercio por su usuario asociado' })
  @Get('users/:user')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiParam({
    name: 'user',
    description: 'Identificador del usuario asociado al comercio',
  })
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
  async getByUser(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Param('uuid')
    user: string,
  ) {
    this._logger.log(
      { id: 'get-commerce-by-user-request', body: req.body },
      'Get Commerce Request',
    );
    const stock = await this._getCommerceByUserApp.get(user);
    this._logger.log(
      { id: 'get-commerce-by-user-response', body: stock },
      'Get Commerce Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }
}
