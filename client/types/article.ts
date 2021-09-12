import { ICategory } from './category';
export interface IArticle {
  id: number;
  title: string;
  text: string;
  image: string;
  hot: boolean;
  video: string;
  slug: string;
  description: string;
  views: number;
  createdDate: Date;
  updatedDate: Date;
  category: ICategory;
}
