import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


// import { AppClusterService } from './app-cluster.service'

import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import { UserModule } from './auth/user/user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('auth')
    .setDescription('auth')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  app.setViewEngine('hbs');
  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule],
  });
  SwaggerModule.setup('documentation', app, document);


  app.use(cors()); // NOTE: Use either the cors() package or app.enabeCors()
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
}

bootstrap();
