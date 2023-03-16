import { Module } from '@nestjs/common';
import { PhotographiesService } from './photographies.service';
import { PhotographiesController } from './photographies.controller';

@Module({
  controllers: [PhotographiesController],
  providers: [PhotographiesService]
})
export class PhotographiesModule {}
