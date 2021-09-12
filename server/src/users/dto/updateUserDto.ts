import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@ArgsType()
export class updateUserDto {
  @MinLength(5)
  @IsString()
  @Field((type) => String, { nullable: true })
  readonly login: string;

  @IsString()
  @IsEmail()
  @Field((type) => String, { nullable: true })
  readonly email: string;

  @IsString()
  @Field((type) => String, { nullable: true })
  readonly password: string;
}
