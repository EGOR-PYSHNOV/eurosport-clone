import { Role } from './../roles/roles.entity';
import { UsersService } from './users.service';
import { User } from './users.entity';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
@Resolver((of) => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findUsers();
  }

  @Query((returns) => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Mutation((returns) => User)
  async updateUserRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('roleId', { type: () => Int }) roleId: number,
  ) {
    return this.usersService.updateUserRole(id, roleId);
  }

  @Mutation(() => User, { nullable: true })
  async deleteArticle(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.deleteUser(id);
  }

  @ResolveField((returns) => Role)
  async role(@Parent() user: User) {
    return await this.usersService.getRoleUser(user.roleId);
  }
}
