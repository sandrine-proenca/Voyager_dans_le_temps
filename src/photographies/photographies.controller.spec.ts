import { Test, TestingModule } from '@nestjs/testing';
import { PhotographiesController } from './photographies.controller';
import { PhotographiesService } from './photographies.service';

describe('PhotographiesController', () => {
  let controller: PhotographiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotographiesController],
      providers: [PhotographiesService],
    }).compile();

    controller = module.get<PhotographiesController>(PhotographiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
