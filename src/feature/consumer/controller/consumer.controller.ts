import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TYPES } from '../interface/types';
import { ICreateConsumerApplication } from '../interface/application/create-consumer-application.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateConsumerRequestDTO } from './DTO/create-consumer-request.dto';
import { AuthorizationGuard } from 'src/common/guard/authorization.guard';
import { ConsumerDomain } from '../domain/consumer.domain';
import { ActivateConsumerRequestDTO } from './DTO/activate-consumer-request.dto';
import { IActivateConsumerApplication } from '../interface/application/activate-consumer-aplication.interface';

@ApiTags('Consumers')
@UseGuards(AuthorizationGuard)
@Controller('consumers')
export class ConsumerController {
  private readonly _logger = new Logger();

  constructor(
    @Inject(TYPES.application.ICreateConsumerApplication)
    private _createConsumerApp: ICreateConsumerApplication,
    @Inject(TYPES.application.IActivateConsumerApplication)
    private _activateConsumerApp: IActivateConsumerApplication,
  ) {}

  /**
   * @method create
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param createConsumerRequest CreateConsumerRequestDTO
   * @returns Response
   */
  @Post()
  async create(
    @Req() req,
    @Res() res,
    @Headers('x-api-key') apiKey: string,
    @Headers('x-consumer-id') id: string,
    @Body() createConsumerRequest: CreateConsumerRequestDTO,
  ) {
    this._logger.log(
      { id: 'create-consumer-request', body: req.body },
      'Create Consumer',
    );
    const stock = await this._createConsumerApp.create(
      createConsumerRequest as Partial<ConsumerDomain>,
    );
    return res.status(HttpStatus.OK).json(stock);
  }

  /**
   * @method activate
   * @param res Response
   * @param apiKey string
   * @param id string
   * @param activateConsumerRequest ActivateConsumerRequestDTO
   * @returns Response
   */
  @Put('/activate')
  async activate(
    @Req() req,
    @Res() res,
    @Headers('x-api-key') apiKey: string,
    @Headers('x-consumer-id') id: string,
    @Body() activateConsumerRequest: ActivateConsumerRequestDTO,
  ) {
    this._logger.log(
      { id: 'activate-consumer-request', body: req.body },
      'Activate Consumer',
    );
    const stock = await this._activateConsumerApp.activate(
      activateConsumerRequest,
    );
    return res.status(HttpStatus.OK).json(stock);
  }
}
