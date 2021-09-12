import { GraphQLUpload } from 'graphql-upload';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateArticle')
@ArgsType()
export class createArticleDto {
  @Field((type) => String)
  @MinLength(5)
  @IsString()
  readonly title: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly text: string;

  @Field((type) => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly hot: boolean;

  @Field((type) => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsInt()
  readonly views: number;

  @Field((type) => GraphQLUpload, { nullable: true })
  @IsOptional()
  readonly image: GraphQLUpload;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly video: string;

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsString()
  readonly slug: string;

  @Field((type) => Int)
  @IsOptional()
  @IsNumber()
  @IsInt()
  readonly categoryId: number;
}
