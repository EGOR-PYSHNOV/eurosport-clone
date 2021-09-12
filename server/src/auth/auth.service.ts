import { AuthLoginInput } from './dto/auth-login.input';
import { createUserDto } from './../users/dto/createUserDto';
import { UserToken } from './models/user-token';
import { AuthHelper } from './auth.helper';
import { User } from './../users/users.entity';
import { UsersService } from './../users/users.service';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string) {
    return await this.userService.findUser(login);
  }

  async register(user: createUserDto): Promise<UserToken> {
    const found = await this.userService.findUser(user.login);

    if (found) {
      throw new BadRequestException('Cannot register with login');
    }

    const password = await AuthHelper.hash(user.password);
    const created = await this.userService.createUser({
      ...user,
      password,
    });

    const payload = { login: created.login, sub: created.id };

    return {
      user: created,
      token: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY }),
    };
  }

  async login(user: AuthLoginInput): Promise<UserToken> {
    const found = await this.userService.findUser(user.login);

    if (!found) {
      throw new NotFoundException('User does not exist');
    }

    const passwordValid = await AuthHelper.validate(
      user.password,
      found.password,
    );

    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    const payload = { login: found.login, sub: found.id };

    return {
      user: found,
      token: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY }),
    };
  }

  async verify(token: string): Promise<User> | null {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });

    const user = await this.userService.findUser(decoded.login);

    if (!user) {
      throw new Error('Unable to get the user from decoded user');
    }

    return user;
  }
}
