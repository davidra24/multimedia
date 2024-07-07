import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from 'src/categories/categories.service';
import { Topic } from './entities/topic.entity';
import { TopicService } from './topic.service';

describe('TopicService', () => {
  let service: TopicService;

  const mockTopicRepository = {};
  const mockCategoriesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicService,
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: getModelToken(Topic.name), useValue: mockTopicRepository },
      ],
    }).compile();

    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
