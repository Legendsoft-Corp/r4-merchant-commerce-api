import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SpelunkerModule } from 'nestjs-spelunker';
import { otelSDK } from './config/tracing/tracing-config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Otel
  await otelSDK.start();

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  // Swagger Config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('R4 Merchant Commerce API')
    .setDescription(`Commerce Management for R4 Merchant's services`)
    .setVersion('1.0')
    .addTag('R4 Merchant')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Spelunker
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges.map(
    ({ from, to }) => `  ${from.module.name}-->${to.module.name}`,
  );
  if (configService.get<string>('NODE_ENV') === 'development') {
    console.log('graph LR');
    console.log(mermaidEdges.join('\n'));
  }

  const port = configService.get<number>('PORT');
  if (!port) {
    throw new Error(`Environment variables are missing`);
  }

  // Logger
  app.useLogger(app.get(Logger));

  // ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  //this.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
