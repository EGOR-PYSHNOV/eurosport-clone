import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`SERVER WAS RANNED ${PORT}`);
  });
}
bootstrap();
