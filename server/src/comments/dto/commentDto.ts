import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNumber, IsString, MinLength } from 'class-validator';

@ArgsType()
export class commentDto {
  @MinLength(5)
  @IsString()
  @Field((type) => String)
  readonly text: string;

  @Field((type) => Int)
  @IsNumber()
  @IsInt()
  readonly articleId: number;
}
