import { UploadFileModule } from './../upload-file/upload-file.module';
import { CommentsModule } from './../comments/comments.module';
import { CategoriesModule } from './../categories/categories.module';
import { ArticlesResolver } from './articles.resolver';
import { Article } from './articles.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CategoriesModule,
    CommentsModule,
    UploadFileModule,
  ],

  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesResolver],
})
export class ArticlesModule {}
