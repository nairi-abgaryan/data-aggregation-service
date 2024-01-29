import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

const SWAGGER_API_ROOT = 'api/docs';
const SWAGGER_API_NAME = 'Aggregator API';
const SWAGGER_API_DESCRIPTION =
  'The aggregator is a service, which has a simple purpose - aggregating data from transaction API';
const SWAGGER_API_CURRENT_VERSION = '1.0';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .addBasicAuth({
      type: 'http',
      scheme: 'basic',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
};
