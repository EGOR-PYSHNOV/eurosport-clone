import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@ArgsType()
export class updateCategoryDto {
  @MinLength(5)
  @IsOptional()
  @IsString()
  @Field((type) => String, { nullable: true })
  readonly title?: string;

  @IsString()
  @IsOptional()
  @Field((type) => String, { nullable: true })
  readonly description?: string;

  @IsString()
  @IsOptional()
  @Field((type) => String, { nullable: true })
  readonly slug?: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Field((type) => Int, { nullable: true })
  readonly order?: number;
}
