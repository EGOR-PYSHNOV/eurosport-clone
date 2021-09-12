import { CategoriesService } from './categories.service';
import { createCategoryDto } from './dto/create-category.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() categoryDto: createCategoryDto) {
    return this.categoriesService.createCategory(categoryDto);
  }
}
