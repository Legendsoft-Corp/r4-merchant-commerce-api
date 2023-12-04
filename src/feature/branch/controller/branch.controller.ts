import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
  Put,
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
import { ICreateBranchApplication } from '../interface/application/create-branch-application.interface';
import { CreateBranchRequestDTO, CreateBranchResponseDTO } from './DTO';
import {
  BadRequestErrorResponseDTO,
  InternalServerErrorResponseDTO,
  UnauthorizedErrorResponseDTO,
} from 'src/common/DTO';
import { IGetBranchByIdApplication } from '../interface/application/get-branch-by-id-application.interface';
import { GetBranchByIdResponseDTO } from './DTO/get-branch-by-id-response.dto';
import { GetAllByCommerceResponseDTO } from './DTO/get-all-by-commerce-response.dto';
import { IGetAllApplication } from '../interface/application/get-all-application.interface';
import { IDeleteByIdApplication } from '../interface/application/delete-by-id-application.interface';
import { IUpdateStatusApplication } from '../interface/application/update-status-application.interface';
import { UpdateStatusRequestDTO } from './DTO/update-status-request.dto';
@ApiTags('Branches')
@UseGuards(AuthorizationGuard)
@Controller('branches')
export class BranchController {
  private readonly _logger = new Logger();

  constructor(
    @Inject(TYPES.application.ICreateBranchApplication)
    private _createBranchApp: ICreateBranchApplication,
    @Inject(TYPES.application.IGetBranchByIdApplication)
    private _getBranchByIdApp: IGetBranchByIdApplication,
    @Inject(TYPES.application.IGetAllApplication)
    private _getAllApp: IGetAllApplication,
    @Inject(TYPES.application.IDeleteByIdApplication)
    private _deleteByIdApp: IDeleteByIdApplication,
    @Inject(TYPES.application.IUpdateStatusApplication)
    private _updateStatusApp: IUpdateStatusApplication,
  ) {}

  /**
   * @method create
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param createBranchRequest CreateBranchRequestDTO
   * @returns Response
   */
  @ApiOperation({ summary: 'Crear una sucursal' })
  @Post()
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiBody({ type: CreateBranchRequestDTO })
  @ApiCreatedResponse({
    description: 'Sucursal creada exitosamente',
    type: CreateBranchResponseDTO,
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
    createBranchRequest: CreateBranchRequestDTO,
  ) {
    this._logger.log(
      { id: 'create-branch-request', body: req.body },
      'Create Branch Request',
    );
    const stock = await this._createBranchApp
      .create(createBranchRequest)
      .catch((error) => error);
    this._logger.log(
      { id: 'create-branch-response', body: stock },
      'Create Branch Response',
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
  @ApiOperation({ summary: 'Consultar un sucursales por comercio' })
  @Get('by-commerce/:commerce')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiParam({ name: 'commerce', description: 'Identificador del comercio' })
  @ApiCreatedResponse({
    description: 'Sucursales Encontradas',
    type: GetAllByCommerceResponseDTO,
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
    @Param('commerce')
    commerce: string,
  ) {
    this._logger.log(
      { id: 'get-branch-by-id-request', body: req.body },
      'Get Branch Request',
    );
    const stock = await this._getAllApp.get(commerce);
    this._logger.log(
      { id: 'get-branch-by-id-response', body: stock },
      'Get Branch Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }

  /**
   * @method getById
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param getBranchByIdRequest GetBranchByIdRequestDTO
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
    type: GetBranchByIdResponseDTO,
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
    @Param('id')
    branchId: string,
  ) {
    this._logger.log(
      { id: 'get-branch-by-id-request', body: req.body },
      'Get Branch Request',
    );
    const stock = await this._getBranchByIdApp.get(branchId);
    this._logger.log(
      { id: 'get-branch-by-id-response', body: stock },
      'Get Branch Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }

  /**
   * @method deleteById
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param branchId string
   * @returns Response
   */
  @ApiOperation({ summary: 'Eliminar una sucursal por ID' })
  @Delete(':id')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumer autorizado',
  })
  @ApiParam({ name: 'id', description: 'Identificador de la sucursal' })
  @ApiCreatedResponse({
    description: 'Comercio Encontrado',
    type: GetBranchByIdResponseDTO,
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
  async deleteById(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Param('id')
    branchId: string,
  ) {
    this._logger.log(
      { id: 'delete-branch-by-id-request', body: req.body },
      'Delete Branch Request',
    );
    const stock = await this._deleteByIdApp.delete(branchId);
    this._logger.log(
      { id: 'delete-branch-by-id-response', body: stock },
      'Delete Branch Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }

  /**
   * @method updateStatus
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param branchId string
   * @returns Response
   */
  @ApiOperation({ summary: 'Actualizar el estado de una sucursal por ID' })
  @Put('status/:id')
  @ApiHeader({
    name: 'x-consumer-id',
    description: 'Identificador del consumidor autorizado',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key del consumidor autorizado',
  })
  @ApiParam({ name: 'id', description: 'Identificador de la sucursal' })
  @ApiCreatedResponse({
    description: 'Sucursal Actualizada',
    type: GetBranchByIdResponseDTO,
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
  async updateStatus(
    @Req() req,
    @Res() res,
    @Headers('x-consumer-id') id: string,
    @Headers('x-api-key') apiKey: string,
    @Param('id')
    branchId: string,
    @Body() updateBranchStatusRequest: UpdateStatusRequestDTO,
  ) {
    this._logger.log(
      { id: 'update-branch-status-request', body: req.body },
      'Update Branch Request',
    );
    const stock = await this._updateStatusApp.updateStatus(
      branchId,
      updateBranchStatusRequest.status,
    );
    this._logger.log(
      { id: 'update-branch-status-response', body: stock },
      'Update Branch Response',
    );
    return res.status(HttpStatus.OK).json(stock);
  }
}
