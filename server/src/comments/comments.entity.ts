import { Article } from './../articles/articles.entity';
import { User } from './../users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'comments' })
export class Comment {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar' })
  text: string;

  @Field((type) => Int)
  @Column()
  userId: number;

  @ManyToOne((type) => User, (user) => user.comments)
  @Field(() => User)
  user: User;

  @Field((type) => Int)
  @Column()
  articleId: number;

  @ManyToOne((type) => Article, (user) => user.comments)
  @Field(() => Article)
  article: Article;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}
