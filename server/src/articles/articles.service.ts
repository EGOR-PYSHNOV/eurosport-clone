import {
  UploadFileService,
  FileType,
} from './../upload-file/upload-file.service';
import { CommentsService } from './../comments/comments.service';
import { Injectable } from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Article, Filters, sortTopViewsByTypePost } from './articles.entity';
import { CategoriesService } from './../categories/categories.service';

import { Repository } from 'typeorm';
import { endOfWeek, startOfWeek } from 'date-fns';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
    private categoriesService: CategoriesService,
    private commentsService: CommentsService,
    private fileService: UploadFileService,
  ) {}

  async createArticle(dto: createArticleDto) {
    const file = await dto.image;
    const imagePath = this.fileService.createFile(FileType.IMAGE, file);

    const article = await this.articlesRepository.save({
      ...dto,
      image: imagePath,
    });
    return article;
  }

  async updateArticle(id: number, dto: createArticleDto) {
    const file = await dto.image;

    if (file) {
      const imagePath = this.fileService.createFile(FileType.IMAGE, file);
      await this.articlesRepository.update(id, {
        ...dto,
        image: imagePath,
      });
    } else {
      await this.articlesRepository.update(id, dto);
    }

    return await this.articlesRepository.findOne(id);
  }

  async deleteArticle(id: number) {
    await this.articlesRepository.delete({ id });
  }

  async findArticle(slug: string) {
    const article = await this.articlesRepository.findOne({ slug });

    return article;
  }

  async findArticles(
    filters: Filters = null,
    isRandom: boolean = null,
    excludeArticle: string = null,
  ) {
    const articles = await this.articlesRepository.createQueryBuilder(
      'articles',
    );

    let query = articles;

    if (isRandom) {
      query = query.orderBy('RANDOM()');
    }

    if (excludeArticle) {
      query = query.where(`articles.slug != '${excludeArticle}'`);
    }

    if (filters) {
      const { limit, sortByDate } = filters;
      for (const key of Object.keys(filters)) {
        switch (key) {
          case 'sortByDate':
            query = query.orderBy('articles.createdDate', sortByDate);
            break;
          case 'limit':
            query = query.limit(limit);
            break;
        }
      }
    }

    return query.getMany();
  }

  async findTopViewsArticles(
    sortTopViewsByTypePost: sortTopViewsByTypePost = null,
  ) {
    const articles = await this.articlesRepository.createQueryBuilder(
      'articles',
    );

    if (sortTopViewsByTypePost.type) {
      const startDateWeek = startOfWeek(new Date(), {
        weekStartsOn: 1,
      }).toISOString();
      const endDateWeek = endOfWeek(new Date(), {
        weekStartsOn: 1,
      }).toISOString();

      articles
        .orderBy(`articles.${sortTopViewsByTypePost.type}`, 'DESC')
        .orderBy('articles.views', 'DESC')
        .where(`articles.${sortTopViewsByTypePost.type} IS NOT NULL `)
        .andWhere(
          `articles.createdDate BETWEEN '${startDateWeek}' AND '${endDateWeek}' `,
        )
        .limit(6)
        .getMany();
    }

    return articles.getMany();
  }

  async findHotArticle() {
    const article = await this.articlesRepository
      .createQueryBuilder('articles')
      .where('articles.hot=true')
      .getOne();

    return article;
  }

  async getCategory(id: number) {
    return this.categoriesService.findCategory(id);
  }

  async getArticlesByCategory(id: number) {
    return this.articlesRepository.find({ where: { categoryId: id } });
  }

  async getCommentsArticle(id: number) {
    return this.commentsService.findComments(id);
  }

  async searchArticle(filters: string) {
    const articles = await this.articlesRepository
      .createQueryBuilder('articles')
      .where(
        `LOWER(articles.title) like '%${filters}%' OR LOWER(articles.description) like '%${filters}%'`,
      )
      .getMany();

    return articles;
  }

  async addViewToArticle(id: number) {
    const article = await this.articlesRepository.findOne(id);

    await this.articlesRepository.update(id, {
      views: article.views + 1,
    });

    return article;
  }
}
