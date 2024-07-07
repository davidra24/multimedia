import { IsString, MaxLength, MinLength } from 'class-validator';
import { CategoryType } from '../interfaces/category-type';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  category_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  category_type: CategoryType;
}
