import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // app that is instantiated here
  app.useGlobalPipes( new ValidationPipe)//built in pipe by nestjs
  await app.listen(3459);//launch server on this port
}
bootstrap();
 