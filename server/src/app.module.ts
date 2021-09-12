import { ServeStaticModule } from '@nestjs/serve-static';
import { Comment } from './comments/comments.entity';
import { Role } from './roles/roles.entity';
import { Article } from './articles/articles.entity';
import { Category } from './categories/categories.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { GraphQLModule } from '@nestjs/graphql';

import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { UploadFileModule } from './upload-file/upload-file.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      uploads: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRESS_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRESS_PASSWORD || 'root',
      database: process.env.POSTGRES_DB || 'eurosport-clone',
      entities: [Category, Article, User, Role, Comment],
      synchronize: true,
    }),
    ArticlesModule,
    CategoriesModule,
    UsersModule,
    RolesModule,
    AuthModule,
    CommentsModule,
    UploadFileModule,
  ],
})
export class AppModule {}
