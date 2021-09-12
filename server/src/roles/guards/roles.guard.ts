import { RolesService } from './../roles.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

const matchRoles = (roles, userRoles) => {
  return roles.some((role) => {
    if (role === userRoles) {
      return true;
    } else {
      throw new ForbiddenException('You do not have permission!');
    }
  });
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesServise: RolesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const ctx = GqlExecutionContext.create(context);

    if (!roles) {
      return true;
    }

    const req = ctx.getContext().req;
    const user = req.user;
    const roleUser = await this.rolesServise.findRole(user.roleId);

    return matchRoles(roles, roleUser.title);
  }
}
