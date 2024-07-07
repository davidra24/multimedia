import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Content } from 'src/content/entities/content.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { initialData } from './data/seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
    @InjectModel(Category.name)
    private readonly categoryRepository: Model<Category>,
    @InjectModel(Topic.name)
    private readonly topicRepository: Model<Topic>,
    @InjectModel(Content.name)
    private readonly contentRepository: Model<Content>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    await this.insertData();
  }

  private async deleteTables() {
    await this.contentRepository.deleteMany();
    await this.topicRepository.deleteMany();
    await this.categoryRepository.deleteMany();
    await this.userRepository.deleteMany();
  }

  private async insertData() {
    await Promise.all(
      initialData.users_data.map(
        async (user) => await this.userRepository.create(user),
      ),
    );
    await Promise.all(
      initialData.categories_data.map(
        async (category) => await this.categoryRepository.create(category),
      ),
    );
    await Promise.all(
      initialData.topics_data.map(
        async (topic) => await this.topicRepository.create(topic),
      ),
    );
  }
}
