import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { FilterDto } from 'src/common/dto/filter.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'content', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  @Auth(ValidRoles.admin, ValidRoles.creador)
  async create(
    @UploadedFiles()
    files: { content: Express.Multer.File[]; cover: Express.Multer.File[] },
    @Body() createContentDto: CreateContentDto,
  ) {
    const { content, cover } = files;
    return await this.contentService.create(createContentDto, content, cover);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.creador, ValidRoles.lector)
  findAll(@Query() filterDto: FilterDto) {
    return this.contentService.findAll(filterDto);
  }

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.creador)
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.contentService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'content', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  @Auth(ValidRoles.admin, ValidRoles.creador)
  update(
    @UploadedFiles()
    files: { content: Express.Multer.File[]; cover: Express.Multer.File[] },
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    const { content, cover } = files;
    return this.contentService.update(id, updateContentDto, content, cover);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.contentService.remove(id);
  }
}
