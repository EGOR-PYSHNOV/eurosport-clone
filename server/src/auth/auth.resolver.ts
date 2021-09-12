import { RolesService } from './../roles/roles.service';
import { Role } from './../roles/roles.entity';
import { CurrentUser } from './current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthLoginInput } from './dto/auth-login.input';
import { UserToken } from './models/user-token';
import { createUserDto } from './../users/dto/createUserDto';
import { AuthService } from './auth.service';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from 'src/users/users.entity';

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private readonly service: AuthService,
    private readonly rolesService: RolesService,
  ) {}

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return user;
  }

  @Mutation((returns) => UserToken, { nullable: true })
  register(
    @Args({ name: 'input', type: () => createUserDto }) input: createUserDto,
  ) {
    return this.service.register(input);
  }

  @Mutation((returns) => UserToken)
  login(
    @Args({ name: 'input', type: () => AuthLoginInput }) input: AuthLoginInput,
  ) {
    return this.service.login(input);
  }

  @ResolveField((returns) => Role)
  async role(@Parent() user: User) {
    return await this.rolesService.findRole(user.roleId);
  }
}
