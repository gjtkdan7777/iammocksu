import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UsersProviders } from 'src/users/users.providers';
import { DatabaseModule } from '../database/database.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
@Module({
  imports: [
    ConfigModule,
    DatabaseModule, 
    UsersModule, 
    PassportModule.register({
      defaultStrategy: 'local'
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'), // .env에서 시크릿 키 가져옴
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], // ConfigService 주입

    })
  ],
  controllers:[AuthController],
  providers: [AuthService, UsersService, ...UsersProviders, LocalStrategy],
  exports:[LocalStrategy, PassportModule]
})
export class AuthModule {}
