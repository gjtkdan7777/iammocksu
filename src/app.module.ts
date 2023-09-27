import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.development.env',

    }),
    DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
