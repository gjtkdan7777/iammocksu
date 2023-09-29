import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.LOCAL_PORT || 8080
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  Logger.log(`success listen http://localhost:${PORT}`)
  await app.listen(PORT);
}
try {
  bootstrap();
  
} catch (error) {
  console.error(error)
}
