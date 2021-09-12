export enum roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export type RolesType = roles.ADMIN | roles.EDITOR | roles.USER;

export interface IRole {
  id: number;
  title: string;
}
