import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.development.env',

    }),
    DatabaseModule,
    UsersModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
