import { Controller, Get, Post, Body, Param, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interfaces';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('user')
@UseFilters(new HttpExceptionFilter)
export class UserController {
  constructor(private readonly usersService: UserService) {}


  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // createUserDto는 사용자가 제출한 회원가입 정보를 담고 있어야 합니다.
    return this.usersService.register(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('name') name : string ): Promise<User> {
    return this.usersService.findOne(name);
  }
}