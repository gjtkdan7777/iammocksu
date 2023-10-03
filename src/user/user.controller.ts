import { Controller, Get, Post, Body, Param, UseFilters, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interfaces';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('user')
// @UseFilters(new HttpExceptionFilter)
export class UserController {
  constructor(private readonly usersService: UserService) {}


  @Post('signup')
  async addUser(@Body() createUserDto: CreateUserDto):Promise<object> {
    const { password } = createUserDto
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const hashedUser = {...createUserDto, password:hashedPassword}
    const user = await this.usersService.addUser(hashedUser);
    return {
      message:'SUCCESS',
      user,
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req ): any {
    return {
      user: req.user,
      msg: 'User logged in'
    }

  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): JSON {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { 
      msg: 'DESTROY SESSION',
      session: req.session
    }
  }
}