import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Users } from './interfaces/users.interfaces';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<Users>,
  ) {}

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdUser = new this.usersModel(createUsersDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOne(name: string): Promise<Users | undefined> {
    return this.usersModel.findOne({ name }).exec();
  }
}