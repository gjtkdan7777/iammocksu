import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.LOCAL_PORT || 8080
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
try {
  bootstrap();
  Logger.log(`success listen http://localhost:${PORT}`)
} catch (error) {
  console.error(error)
}
