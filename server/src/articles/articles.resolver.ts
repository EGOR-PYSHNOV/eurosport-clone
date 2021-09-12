import { Category } from './../categories/categories.entity';

import { createArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Article, Filters, sortTopViewsByTypePost } from './articles.entity';
import { Comment } from 'src/comments/comments.entity';

@Resolver((of) => Article)
export class ArticlesResolver {
  constructor(private articlesService: ArticlesService) {}

  @Mutation((returns) => Article)
  async createArticle(@Args() articleDto: createArticleDto) {
    return this.articlesService.createArticle(articleDto);
  }

  @Mutation((returns) => Article)
  async updateArticle(
    @Args('id', { type: () => Int }) id: number,
    @Args() articleDto: createArticleDto,
  ) {
    return this.articlesService.updateArticle(id, articleDto);
  }

  @Mutation(() => Article, { nullable: true })
  async deleteArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.deleteArticle(id);
  }

  @Mutation((returns) => Article, { nullable: true })
  async updateViewsArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.addViewToArticle(id);
  }

  @Query((returns) => Article)
  async getArticle(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Article> {
    return await this.articlesService.findArticle(slug);
  }

  @Query((returns) => [Article])
  async getTopViewsArticles(
    @Args('sortTopViewsByTypePost', { nullable: true })
    sortTopViewsByTypePost: sortTopViewsByTypePost,
  ): Promise<Article[]> {
    return await this.articlesService.findTopViewsArticles(
      sortTopViewsByTypePost,
    );
  }

  @Query((returns) => Article)
  async getHotArticle(): Promise<Article> {
    return await this.articlesService.findHotArticle();
  }

  @Query((returns) => [Article])
  async getArticlesByCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Article[]> {
    return await this.articlesService.getArticlesByCategory(id);
  }

  @ResolveField((returns) => Category)
  async category(@Parent() article: Article) {
    return await this.articlesService.getCategory(article.categoryId);
  }

  @ResolveField((returns) => [Comment])
  async comments(@Parent() article: Article): Promise<Comment[]> {
    return await this.articlesService.getCommentsArticle(article.id);
  }

  @Query((returns) => [Article])
  async getAllArticles(
    @Args('filters', { nullable: true })
    filters: Filters,
    @Args('isRandom', { nullable: true })
    isRandom: boolean,
    @Args('excludeArticle', { nullable: true })
    excludeArticle: string,
  ): Promise<Article[]> {
    return await this.articlesService.findArticles(
      filters,
      isRandom,
      excludeArticle,
    );
  }

  @Query((returns) => [Article])
  async ArticlesSearchQuery(
    @Args('filters', { type: () => String }) filters: string,
  ): Promise<Article[]> {
    return await this.articlesService.searchArticle(filters);
  }
}
