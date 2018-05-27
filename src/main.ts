import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOpt = new DocumentBuilder()
  .setTitle("our app")
  .setDescription("We r going to test it")
  .setVersion("1")
  .build();

  const swaggerDoc = SwaggerModule.createDocument(app,swaggerOpt);
  SwaggerModule.setup("/swagger",app,swaggerDoc);

  await app.listen(3000);
}
bootstrap();
