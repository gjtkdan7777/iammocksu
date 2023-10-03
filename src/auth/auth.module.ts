import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { UserProviders } from 'src/user/user.providers';
import { DatabaseModule } from '../database/database.module';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config'; 
import { SessionSerializer } from './session.serializer';
@Module({
  imports: [
    ConfigModule,
    DatabaseModule, 
    UsersModule, 
    PassportModule.register({
      session:true
    }),
  ],
  controllers:[],
  providers: [AuthService, UserService, ...UserProviders, LocalStrategy, SessionSerializer],
  exports:[LocalStrategy, PassportModule]
})
export class AuthModule {}
