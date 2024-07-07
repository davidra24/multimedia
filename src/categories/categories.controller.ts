import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.creador)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.creador, ValidRoles.lector)
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':term')
  @Auth(ValidRoles.admin, ValidRoles.creador, ValidRoles.lector)
  findOne(@Param('term') term: string) {
    return this.categoriesService.findOne(term);
  }

  @Patch(':term')
  @Auth(ValidRoles.admin, ValidRoles.creador)
  update(@Param('term') term: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(term, updateCategoryDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
