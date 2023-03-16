import { Injectable } from '@nestjs/common';
import { CreatePhotographyDto } from './dto/create-photography.dto';
import { UpdatePhotographyDto } from './dto/update-photography.dto';

@Injectable()
export class PhotographiesService {
  create(createPhotographyDto: CreatePhotographyDto) {
    return 'This action adds a new photography';
  }

  findAll() {
    return `This action returns all photographies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photography`;
  }

  update(id: number, updatePhotographyDto: UpdatePhotographyDto) {
    return `This action updates a #${id} photography`;
  }

  remove(id: number) {
    return `This action removes a #${id} photography`;
  }
}
