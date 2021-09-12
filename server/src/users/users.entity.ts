import { Comment } from './../comments/comments.entity';
import { Role } from './../roles/roles.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('User')
@Entity({ name: 'users' })
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ type: 'varchar' })
  login: string;

  @Field((type) => String)
  @Column({ type: 'varchar' })
  email: string;

  @Field((type) => String)
  @Column({ type: 'varchar' })
  password: string;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;

  @Field((type) => Int)
  @Column()
  roleId: number;

  @OneToMany((type) => Role, (role) => role.id)
  @JoinColumn()
  @Field(() => Role)
  role: Role;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
