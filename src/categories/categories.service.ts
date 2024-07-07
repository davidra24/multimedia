import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { handleException } from '../common/handeErrors';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private readonly categoryRepository: Model<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      if (createCategoryDto.category_name)
        createCategoryDto.category_name = createCategoryDto.category_name.toLowerCase()
      return await this.categoryRepository.create(createCategoryDto);
    } catch (error) {
      handleException(error);
    }
  }


  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(term: string) {
    let category: Category
    if (isValidObjectId(term)) category = await this.categoryRepository.findById(term);
    if (!category) category = await this.categoryRepository.findOne({ category_name: term });
    if (!category) throw new NotFoundException(
      `Categoría con el término de busqueda ${term} no encontrado`,
    );
    return category
  }

  async findOneName(term: string) {
    const category: Category = await this.findOne(term);
    const { category_name } = category
    return category_name
  }

  async update(term: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category: Category = await this.findOne(term);
      if (updateCategoryDto.category_name)
        updateCategoryDto.category_name = updateCategoryDto.category_name.toLowerCase();

      await category.updateOne(updateCategoryDto, { new: true, runValidators: true });
      return { ...category.toJSON(), ...updateCategoryDto };
    } catch (error) {
      handleException(error);
    }
  }

  async remove(_id: string) {
    const result = await this.categoryRepository.deleteOne({ _id });
    const { deletedCount } = result;
    if (deletedCount === 0)
      throw new NotFoundException(`Categoría con el id: ${_id} no existe`);
    return { status: HttpStatus.OK, data: result };
  }

}
