import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesResolver } from './categories.resolver';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesResolver],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
