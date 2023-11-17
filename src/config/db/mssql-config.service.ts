import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IDatabaseConfig } from '../database-config.interface';
import { Consumer } from 'src/feature/consumer/domain/consumer.entity';
import { Commerce } from 'src/feature/commerce/domain/commerce.entity';

@Injectable()
export class MSSQLConfigService implements TypeOrmOptionsFactory {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;

  constructor(private _configService: ConfigService) {
    const dbConfig = this._configService.get<IDatabaseConfig>('database');
    if (!dbConfig) {
      throw new Error(`DB Environment variables are missing`);
    }
    this.host = dbConfig.host;
    this.port = +dbConfig.port;
    this.username = dbConfig.username;
    this.password = dbConfig.password;
    this.database = dbConfig.database;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      schema: 'dbo',
      entities: [Consumer, Commerce],
      synchronize: true,
      options: { encrypt: false, trustServerCertificate: true },
      retryAttempts: 2,
    };
  }
}
