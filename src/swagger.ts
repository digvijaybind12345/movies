import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from './config/services/config.service';
import { UserModule } from './auth/user/user.module';


export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
) {
  const options = new DocumentBuilder()
  // NOTE: you can put the swagger infos here directly, no need to put this in environment variables
    .setTitle(configService.get('SWAGGER_TITLE'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('SWAGGER_VERSION'))
    .addBearerAuth()
    .build();

  // NOTE: No need to include the modules explicitely
  const document = SwaggerModule.createDocument(app, options, {
    include: [UserModule],
  });
  SwaggerModule.setup('documentation', app, document);
}
