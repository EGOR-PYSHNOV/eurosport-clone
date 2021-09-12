import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar' })
  title: string;

  @Field()
  @Column({ type: 'varchar' })
  description: string;

  @Field()
  @Column({ type: 'varchar' })
  slug: string;

  @Field((type) => Int)
  @Column({ type: 'int' })
  order: number;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}
