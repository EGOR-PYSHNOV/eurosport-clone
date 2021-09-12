import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsInt,
  IsEmail,
} from 'class-validator';

@InputType()
export class createUserDto {
  @MinLength(5)
  @IsString()
  @Field((type) => String)
  readonly login: string;

  @IsString()
  @IsEmail()
  @Field((type) => String)
  readonly email: string;

  @IsString()
  @Field((type) => String)
  readonly password: string;

  @Field((type) => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsNumber()
  @IsInt()
  readonly roleId: number;
}
