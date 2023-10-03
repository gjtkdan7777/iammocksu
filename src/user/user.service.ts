import { Model } from 'mongoose';
import { Injectable, Inject, Logger, HttpException, Response, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interfaces';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findOne({ id }).exec();
  }
  
  async addUser(createUserDto: CreateUserDto): Promise<User | Error> {

    try {
      const existingUser = await this.findOne(createUserDto.id) // 기존사용자
      if(existingUser) {
        throw new HttpException('ALREADY SIGNUP', HttpStatus.BAD_REQUEST) // 같은 아이디가 있을떄
      }
      
      return await new this.userModel(createUserDto).save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    } 
  }
}