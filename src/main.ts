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
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}

bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import * as path from 'path';
// import { AuthModule } from './auth.module';
// import { AllRpcExceptionFilter } from './other/filtters/rpc-exception.filter';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AuthModule);
//
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.GRPC,
//     options: {
//       url: '127.0.0.1:8001',
//       package: 'grpc',
//       protoPath: path.join(__dirname, './io/grpc/proto/auth.proto'),
//     },
//   });
//   //app.useGlobalFilters(new RPCExceptionFilter());
//   app.useGlobalFilters(new AllRpcExceptionFilter());
//   await app.init();
//   await app.startAllMicroservices();
// }
// bootstrap();
