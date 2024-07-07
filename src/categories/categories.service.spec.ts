import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { CategoryType } from './interfaces/category-type';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const mockCategoryRepository = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create categories service', () => {
    const createCategoryDto: CreateCategoryDto = {
      category_name: 'video',
      category_type: CategoryType.file,
    };
    it('Should create a category', async () => {
      const categoryCreated = {
        _id: '123',
        category_name: 'video',
        category_type: CategoryType.file,
      };

      jest
        .spyOn(mockCategoryRepository, 'create')
        .mockReturnValue(categoryCreated);

      const result = await service.create(createCategoryDto);

      expect(result).toBe(categoryCreated);
    });

    it('Maneja los errores de  category', () => {
      const errorMock = { code: 11000, detail: 'Duplicate entry' };
      jest.spyOn(mockCategoryRepository, 'create').mockRejectedValue(errorMock);

      const result = service.create(createCategoryDto);

      expect(result).rejects.toThrow(BadRequestException);
    });
  });
});
