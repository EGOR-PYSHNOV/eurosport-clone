import { RolesService } from './../roles/roles.service';
import { updateUserDto } from './dto/updateUserDto';
import { createUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: createUserDto) {
    const user = await this.usersRepository.save(dto);
    return user;
  }

  async updateUser(id: number, dto: updateUserDto) {
    await this.usersRepository.update(id, dto);
    return await this.usersRepository.findOne(id);
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete({ id });
  }

  async findUser(login: string) {
    const user = await this.usersRepository.findOne({
      where: [{ login: login }, { email: login }],
    });

    return user;
  }

  async findUserById(id: number) {
    const user = await this.usersRepository.findOne({ id });

    return user;
  }

  async findUsers() {
    const users = await this.usersRepository.find();

    return users;
  }

  async getRoleUser(id: number) {
    const userRole = await this.rolesService.findRole(id);

    return userRole;
  }

  async updateUserRole(id: number, userRoleId: number) {
    await this.usersRepository.update(id, { roleId: userRoleId });
    return await this.usersRepository.findOne(id);
  }
}
