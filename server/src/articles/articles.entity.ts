import { Comment } from './../comments/comments.entity';
import { Category } from 'src/categories/categories.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  ObjectType,
  Field,
  Int,
  InputType,
  registerEnumType,
  ArgsType,
} from '@nestjs/graphql';

@ObjectType('Article')
@Entity({ name: 'articles' })
export class Article {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar' })
  title: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  text: string;

  @Field({ defaultValue: false })
  @Column({ default: false, type: 'boolean' })
  hot: boolean;

  @Field((type) => Int, { defaultValue: 0 })
  @Column({ default: 0, type: 'int' })
  views: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  video: string;

  @Field()
  @Column({ type: 'varchar' })
  slug: string;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field((type) => Int)
  @Column()
  categoryId: number;

  @OneToMany((type) => Category, (category) => category.id)
  @JoinColumn()
  @Field(() => Category)
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];
}

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum TypePost {
  RegularPost = 'image',
  VideoPost = 'video',
}

registerEnumType(TypePost, {
  name: 'TypePost',
});

registerEnumType(Sort, {
  name: 'Sort',
});

@ObjectType('sortTopViewsByTypePost')
@InputType()
export class sortTopViewsByTypePost {
  @Field((type) => TypePost, { nullable: true })
  type: TypePost;
}

@ObjectType('Filters')
@InputType()
export class Filters {
  @Field((type) => Int, { nullable: true })
  limit: number;
  @Field((type) => Sort, { nullable: true })
  sortByDate: Sort;

  @Field((type) => TypePost, { nullable: true })
  sortTopViewsByTypePost: TypePost;
}
