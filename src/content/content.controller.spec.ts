import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

describe('ContentController', () => {
  let controller: ContentController;

  const mockUserRoleGuard = {}

  jest.mock('src/auth/decorators', () => ({
    Auth: () => jest.fn(() => () => { }),
  }));

  const mockContentService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ContentController],
      providers: [{ provide: ContentService, useValue: mockContentService }, { provide: UserRoleGuard, useValue: mockUserRoleGuard }],

    }).compile();

    controller = module.get<ContentController>(ContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
