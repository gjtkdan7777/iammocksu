import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/http-exception.filter';

const PORT = process.env.LOCAL_PORT || 8080
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter()); // 모든곳에서 쓰고 싶을떄 주석 해제

  await app.listen(PORT, ()=>{
    Logger.log(`success listen http://localhost:${PORT}`)
  });
}
try {
  bootstrap();
  
} catch (error) {
  console.error(error)
}
