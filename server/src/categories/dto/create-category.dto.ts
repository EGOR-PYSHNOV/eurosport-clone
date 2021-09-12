import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@ArgsType()
export class createCategoryDto {
  @MinLength(5)
  @IsString()
  @Field((type) => String)
  readonly title: string;

  @IsString()
  @Field((type) => String, { nullable: true })
  readonly description: string;

  @IsString()
  @Field((type) => String, { nullable: true })
  readonly slug: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Field((type) => Int, { nullable: true, defaultValue: 0 })
  readonly order: number;
}
