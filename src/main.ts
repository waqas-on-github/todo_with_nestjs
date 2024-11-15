import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //this will prevent user to posting extra data for melicious purposes
      transform: true, // request body bydefault is not typesafe and not compatable with
      //created dto class. So we need to transform the request body to the created dto class
      //for example createUserDto: CreateUserDto this one in users controller
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
