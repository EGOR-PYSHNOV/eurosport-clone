import { CategoriesService } from './categories.service';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Category } from './categories.entity';
import { createCategoryDto } from './dto/create-category.dto';
import { updateCategoryDto } from './dto/update-category.dto';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Mutation((returns) => Category)
  async createCategory(@Args() categoryDto: createCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }

  @Mutation((returns) => Category)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args() categoryDto: updateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryDto);
  }

  @Mutation(() => Category, { nullable: true })
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  @Query((returns) => Category)
  async getCategory(
    @Args('slug', { type: () => String }) slug: string,
  ): Promise<Category> {
    return await this.categoriesService.findCategoryBySlug(slug);
  }

  @Query((returns) => [Category])
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.findCategories();
  }
}
