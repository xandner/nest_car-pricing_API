import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
const cookie_session=require("cookie-session");


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookie_session({
    keys:['xander'],
    // name: 'session',

  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  )
  await app.listen(3300);
}
bootstrap();
