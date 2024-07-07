import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { handleException } from 'src/common/handeErrors';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {

  constructor(
    @InjectModel(Topic.name) private readonly topicRepository: Model<Topic>,
    private readonly categoryService: CategoriesService
  ) { }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    try {
      const categories: Array<Category> = await this.resolveCategories(createTopicDto)
      if (!categories) throw new NotFoundException('No se encuentra la categoría sobre la cual desea crear la temática')
      return await this.topicRepository.create({ ...createTopicDto, categories });
    } catch (error) {
      handleException(error);
    }
  }

  async findAll(): Promise<Array<Topic>> {
    return await this.topicRepository.find()
  }

  async findOne(term: string): Promise<Topic> {
    let topic: Topic
    if (isValidObjectId(term)) topic = await this.topicRepository.findById(term);
    if (!topic) topic = await this.topicRepository.findOne({ topic_name: term });
    if (!topic) throw new NotFoundException(
      `Temática con el término de busqueda ${term} no encontrado`,
    );
    return topic
  }

  async findOneName(term: string) {
    const topic: Topic = await this.findOne(term);
    const { topic_name } = topic
    return topic_name
  }

  async update(term: string, updateTopicDto: UpdateTopicDto) {
    try {
      const topic: Topic = await this.findOne(term);
      const categories: Array<Category> = await this.resolveCategories(updateTopicDto)
      await topic.updateOne({ ...updateTopicDto, categories }, { new: true, runValidators: true });
      return { ...topic.toJSON(), ...updateTopicDto, categories };
    } catch (error) {
      handleException(error);
    }
  }

  async remove(_id: string) {
    const result = await this.topicRepository.deleteOne({ _id });
    const { deletedCount } = result;
    if (deletedCount === 0)
      throw new NotFoundException(`Categoría con el id: ${_id} no existe`);
    return { status: HttpStatus.OK, data: result };
  }

  resolveCategories = async (dto: Partial<CreateTopicDto>) => {
    const categories: Array<Category> = []
    const promisedCategories: Array<Promise<Category>> = []
    if (dto.topic_name)
      dto.topic_name = dto.topic_name.toLowerCase();

    dto.categories.map(category => {
      promisedCategories.push(this.categoryService.findOne(category))
    })

    const resolvedCategories: Array<Category> = await Promise.all(promisedCategories)

    resolvedCategories.map(category => {
      const exists = categories.findIndex(cat => cat.id === category.id)
      if (exists === -1) categories.push(category)
    })

    return categories
  }

}
