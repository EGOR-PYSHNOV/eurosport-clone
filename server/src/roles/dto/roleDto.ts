import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class roleDto {
  @IsString()
  @Field((type) => String)
  readonly title: string;
}
