import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {  //fonction qui démarre notre appli
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  //console.log(join(__dirname, '..', 'uploads'));
  
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  const config = new DocumentBuilder()
    .setTitle('voyager_dans_le_temps')
    .setDescription(`API album photo`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.useGlobalPipes(new ValidationPipe({

    whitelist: true,
    forbidNonWhitelisted: false,

  }))
  await app.listen (8000);
};

bootstrap();
