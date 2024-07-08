import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/auth/services';
import { CategoriesService } from 'src/categories/categories.service';
import { FilterDto } from 'src/common/dto/filter.dto';
import { handleException } from 'src/common/handeErrors';
import { FilesService } from 'src/files/files.service';
import { TopicService } from 'src/topic/topic.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private readonly contentRepository: Model<Content>,
    private readonly categoryService: CategoriesService,
    private readonly topicService: TopicService,
    private readonly fileService: FilesService,
    private readonly userService: UserService,
  ) {}

  async create(
    createContentDto: CreateContentDto,
    content: Express.Multer.File[],
    cover: Express.Multer.File[],
  ) {
    try {
      if (!content || !content[0])
        throw new BadRequestException('Seleccione un archivo de contenido');
      if (!cover || !cover[0])
        throw new BadRequestException('Seleccione una caratula');

      const { category, topic, author } =
        await this.validateSecondaryServices(createContentDto);

      const uploadedCover = await this.fileService.uploadFile(cover[0]);
      const image_cover = uploadedCover.fileName;

      const { contentFileExtension: fileExtension } = await this.extension(
        content[0],
      );

      const saved = await this.contentRepository.create({
        ...createContentDto,
        category,
        topic,
        author,
        image_cover,
        fileExtension,
      });
      const fileName = `${saved.id}.${fileExtension}`;

      const file = await this.fileService.uploadFileWithName(
        content[0],
        fileName,
      );

      return { content: saved, file };
    } catch (error) {
      console.log(error);
      handleException(error);
    }
  }

  async findAll(filterDto: FilterDto) {
    const { category, topic } = filterDto;
    let contents: Array<Content>;

    if (category && topic)
      contents = await this.contentRepository.find({ category, topic });

    if (!contents && category)
      contents = await this.contentRepository.find({ category });
    if (!contents && topic)
      contents = await this.contentRepository.find({ topic });
    if (!contents) contents = await this.contentRepository.find();

    if (!contents) throw new NotFoundException('Contenido no encontrado');

    const returnedContents = Promise.all(
      contents.map(async (content) => {
        const image_cover = await this.fileService.downloadFile(
          content.image_cover,
        );
        const file = await this.fileService.downloadFile(
          `${content.id}.${content.fileExtension}`,
        );
        return { ...content.toObject(), image_cover, file };
      }),
    );

    return returnedContents;
  }

  async findOne(id: string): Promise<Partial<Content>> {
    const content = await this.contentRepository.findById(id);

    if (!content) throw new NotFoundException('Contenido no encontrado');

    const image_cover = await this.fileService.downloadFile(
      content.image_cover,
    );

    const file = await this.fileService.downloadFile(
      `${content.id}.${content.fileExtension}`,
    );

    return { ...content.toObject(), image_cover, file };
  }

  async update(
    id: string,
    updateContentDto: UpdateContentDto,
    content: Express.Multer.File[],
    cover: Express.Multer.File[],
  ) {
    const existContent = await this.findOne(id);

    const { category, topic, author } =
      await this.validateSecondaryServices(updateContentDto);

    const { fileExtension, image_cover: old_image_cover } = existContent;
    let image_cover = old_image_cover ? old_image_cover : null;

    if (cover && cover[0]) {
      await this.fileService.removeFile(old_image_cover);
      const { fileName } = await this.fileService.uploadFile(cover[0]);
      image_cover = fileName;
    }
    const { contentFileExtension } = await this.extension(content[0]);

    const updated = await this.contentRepository.findByIdAndUpdate(
      id,
      {
        ...updateContentDto,
        category,
        topic,
        author,
        image_cover,
        contentFileExtension,
      },
      { new: true, runValidators: true },
    );

    if (content && content[0]) {
      await this.fileService.removeFile(`${id}.${fileExtension}`);
      const fileName = `${id}.${contentFileExtension}`;
      await this.fileService.uploadFileWithName(content[0], fileName);
    }

    return {
      ...updated.toJSON(),
      ...updateContentDto,
      category,
      topic,
      author,
      image_cover,
      contentFileExtension,
    };
  }

  async remove(_id: string) {
    const { fileExtension, image_cover } = await this.findOne(_id);
    this.fileService.removeFile(`${_id}.${fileExtension}`);
    this.fileService.removeFile(image_cover);
    const result = await this.contentRepository.deleteOne({ _id });
    const { deletedCount } = result;
    if (deletedCount === 0)
      throw new NotFoundException(`Categoría con el id: ${_id} no existe`);
    return { status: HttpStatus.OK, data: result };
  }

  private async extension(content?: Express.Multer.File) {
    const contentFileExtension = content.mimetype.split('/')[1];
    return { contentFileExtension };
  }

  private async validateSecondaryServices(dto: Partial<CreateContentDto>) {
    const {
      category: category_name,
      topic: topic_name,
      author: username,
    } = dto;

    const category = await this.categoryService.findOneName(category_name);
    const topic = await this.topicService.findOneName(topic_name);
    const author = await this.userService.getUser(username);

    if (!category || !topic || !author)
      throw new NotFoundException(
        'La información no es suficiete para crear el contenido',
      );

    return { category, topic, author };
  }
}
