import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UsersProviders } from 'src/users/users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, PassportModule],
  providers: [AuthService, UsersService, ...UsersProviders],
})
export class AuthModule {}
