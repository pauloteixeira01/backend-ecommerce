import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUser: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUser.password, saltOrRounds);

    const user: User = {
      ...createUser,
      password: passwordHashed,
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  async listUsers(): Promise<User[]> {
    return this.users;
  }
}
