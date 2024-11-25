import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //this will prevent user to posting extra data for melicious purposes
      transform: true, // request body by default is not typesafe and not compatable with
      //created dto class. So we need to transform the request body to the created dto class
      //for example createUserDto: CreateUserDto this one in users controller
    }),
  );

  // swagger confugration
  const config = new DocumentBuilder()
    .setTitle('Nestjs bolg API')
    .setDescription('use the  base api  url  http://localhost:3000')
    .setTermsOfService('https://github.com/waqasbhatti/nestjs-todo-app')
    .setLicense('MIT', 'https://github.com/waqasbhatti/nestjs-todo-app')
    .addServer('http://localhost:3000')
    .setVersion('1.0.0')
    .build();
  // instentiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
