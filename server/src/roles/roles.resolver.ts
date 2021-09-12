import { roles } from './models/roles';
import { Authorize } from './roles.decorator';

import { roleDto } from './dto/roleDto';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

@Resolver((of) => Role)
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  @Authorize(roles.ADMIN)
  @Mutation((returns) => Role)
  async createRole(@Args() roleDto: roleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @Mutation((returns) => Role)
  async updateRole(
    @Args('id', { type: () => Int }) id: number,
    @Args() roleDto: roleDto,
  ) {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Mutation(() => Role, { nullable: true })
  async deleteRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.deleteRole(id);
  }

  @Query((returns) => Role)
  async getRole(@Args('id', { type: () => Int }) id: number): Promise<Role> {
    return await this.rolesService.findRole(id);
  }

  @Query((returns) => [Role])
  async getAllRoles(): Promise<Role[]> {
    return await this.rolesService.findRoles();
  }
}
