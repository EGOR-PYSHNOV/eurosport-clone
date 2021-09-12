import { User } from './../../users/users.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserToken {
  @Field({ nullable: true })
  token: string;
  @Field({ nullable: true })
  user: User;
}
