import { Test, TestingModule } from '@nestjs/testing';
import { PhotographiesService } from './photographies.service';

describe('PhotographiesService', () => {
  let service: PhotographiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotographiesService],
    }).compile();

    service = module.get<PhotographiesService>(PhotographiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
