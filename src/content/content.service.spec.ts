import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/auth/services';
import { CategoriesService } from 'src/categories/categories.service';
import { FilesService } from 'src/files/files.service';
import { TopicService } from 'src/topic/topic.service';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';

describe('ContentService', () => {
  let service: ContentService;

  const mockContentRepository = {};
  const mockCategoryService = {};
  const mockUserService = {}
  const mockTopicService = {}
  const mockFilesService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getModelToken(Content.name),
          useValue: mockContentRepository,
        },
        {
          provide: CategoriesService,
          useValue: mockCategoryService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: TopicService,
          useValue: mockTopicService,
        },
        {
          provide: FilesService,
          useValue: mockFilesService,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
