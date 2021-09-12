import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthLoginInput {
  @IsString()
  @Field((type) => String)
  login: string;

  @IsString()
  @Field((type) => String)
  password: string;
}
