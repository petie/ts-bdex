import { Test, TestingModule } from '@nestjs/testing';
import { PathFinderService } from './path-finder.service';

describe('PathFinderService', () => {
  let service: PathFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathFinderService],
    }).compile();

    service = module.get<PathFinderService>(PathFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
