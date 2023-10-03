import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import * as session from 'express-session';
import * as passport from 'passport';

const PORT = process.env.LOCAL_PORT || 8080
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // http-exception.filter.ts 모든곳에서 쓰고 싶을떄 주석 해제
  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT, ()=>{
    Logger.log(`success listen http://localhost:${PORT}`)
  });
}
try {
  bootstrap();
  
} catch (error) {
  console.error(error)
}
