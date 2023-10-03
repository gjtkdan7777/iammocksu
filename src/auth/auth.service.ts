import { Injectable, NotAcceptableException, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
) {}

async validateUser(id: string, password: string): Promise<any> {
  const user = await this.usersService.findOne(id);
  if (!user) {
    throw new NotAcceptableException('NOT FIND USER');
  }
  const passwordValid = await bcrypt.compare(password, user.password)
  if (user && passwordValid) {
    return {
      userId: user.id,
      userName: user.name
    };
  }
  return null;
}


}