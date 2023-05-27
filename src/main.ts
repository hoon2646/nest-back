import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('Cat')
    .setVersion('1.0.0')
    .build()
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Cors
  // 배포시에는 origin 프론트 주소로 변경
  app.enableCors({
    origin: true,
    credentials: true
  })

  const PORT = process.env.PORT;
  await app.listen(PORT);
}

bootstrap();
