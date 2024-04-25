import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth.module';
import { HttpExceptionFilter } from './other/filtters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const swaggerPath = '/api-docs';
  const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.7.2';

  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addServer('http://localhost:4000/', 'Local environment')
    .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPath, app, document, {
    customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
    customJs: [
      `${swaggerCDN}/swagger-ui-bundle.js`,
      `${swaggerCDN}/swagger-ui-standalone-preset.js`,
    ],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}

bootstrap();
