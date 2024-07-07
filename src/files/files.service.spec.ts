import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from 'src/common/common.service';
import { FilesService } from './files.service';

describe('FilesService', () => {
  let service: FilesService;

  const mockCommonService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService, { provide: CommonService, useValue: mockCommonService }],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
