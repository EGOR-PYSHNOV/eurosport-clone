import { updateCategoryDto } from './dto/update-category.dto';
import { createCategoryDto } from './dto/create-category.dto';
import { Category } from './categories.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(dto: createCategoryDto) {
    const category = await this.categoriesRepository.save(dto);
    return category;
  }

  async updateCategory(id: number, dto: updateCategoryDto) {
    const category = await this.categoriesRepository.update(id, dto);
    return await this.categoriesRepository.findOne(id);
  }

  async deleteCategory(id: number) {
    await this.categoriesRepository.delete({ id });
  }

  async findCategory(id: number) {
    const category = await this.categoriesRepository.findOne({ id });

    return category;
  }

  async findCategoryBySlug(slug: string) {
    const category = await this.categoriesRepository.findOne({ slug });

    return category;
  }

  async findCategories() {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}
