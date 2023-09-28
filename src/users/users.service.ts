import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Users } from './interfaces/users.interfaces';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUser = new this.userModel(createUsersDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }
}