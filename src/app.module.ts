import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MSSQLConfigService } from './config/db/mssql-config.service';
import { ConsumerModule } from './feature/consumer/consumer.module';
import configuration from './config/configuration';
import { LoggerModule } from 'nestjs-pino';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './common/guard/authorization.guard';
import { CommerceModule } from './feature/commerce/commerce.module';
import { BranchModule } from './feature/branch/branch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: MSSQLConfigService,
      inject: [MSSQLConfigService],
    }),
    ConsumerModule,
    CommerceModule,
    BranchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MSSQLConfigService,
    { provide: APP_GUARD, useClass: AuthorizationGuard },
  ],
})
export class AppModule {}
