import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotographiesService } from './photographies.service';
import { CreatePhotographyDto } from './dto/create-photography.dto';
import { UpdatePhotographyDto } from './dto/update-photography.dto';

@Controller('photographies')
export class PhotographiesController {
  constructor(private readonly photographiesService: PhotographiesService) {}

  @Post()
  create(@Body() createPhotographyDto: CreatePhotographyDto) {
    return this.photographiesService.create(createPhotographyDto);
  }

  @Get()
  findAll() {
    return this.photographiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photographiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotographyDto: UpdatePhotographyDto) {
    return this.photographiesService.update(+id, updatePhotographyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photographiesService.remove(+id);
  }
}
