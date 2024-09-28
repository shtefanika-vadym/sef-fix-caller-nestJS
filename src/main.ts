import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');
  const cfg = app.get(ConfigService);

  const port = cfg.get<number>('PORT') || 3000;

  await app.listen(port);
  logger.log(`Application is running on: ${port}`);
}

bootstrap();
