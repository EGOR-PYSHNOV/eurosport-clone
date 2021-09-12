import { roleDto } from './dto/roleDto';
import { Role } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async createRole(dto: roleDto) {
    const role = await this.rolesRepository.save(dto);
    return role;
  }

  async updateRole(id: number, dto: roleDto) {
    const role = await this.rolesRepository.update(id, dto);
    return await this.rolesRepository.findOne(id);
  }

  async deleteRole(id: number) {
    await this.rolesRepository.delete({ id });
  }

  async findRole(id: number) {
    const role = await this.rolesRepository.findOne({ id });

    return role;
  }

  async findRoles() {
    const roles = await this.rolesRepository.find();

    return roles;
  }
}
