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
import { ICreateBranchApplication } from '../interface/application/create-branch-application.interface';
import { CreateBranchRequestDTO, CreateBranchResponseDTO } from './DTO';
import {
  BadRequestErrorResponseDTO,
  InternalServerErrorResponseDTO,
  UnauthorizedErrorResponseDTO,
} from 'src/common/DTO';
import { IGetBranchByIdApplication } from '../interface/application/get-branch-by-id-application.interface';
import { GetBranchByIdResponseDTO } from './DTO/get-branch-by-id-response.dto';
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
}
