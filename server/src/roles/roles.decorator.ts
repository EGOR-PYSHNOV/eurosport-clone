import { RolesGuard } from './guards/roles.guard';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { roles, RolesType } from './models/roles';

export const Authorize = (...roles: RolesType[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(GqlAuthGuard, RolesGuard),
  );
