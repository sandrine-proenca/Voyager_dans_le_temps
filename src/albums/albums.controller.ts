import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

  /** Création d'un nouvel album nécessite :
   * * 
   */
  @UseGuards(JwtAuthGuard) // doit être connecté/enregistré
@Controller('albums')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly userService: UsersService) {}


  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    const allAlbums = await this.albumsService.findAll();
    if (!allAlbums){
      throw new NotFoundException(`Albums not found.`);
    }
    return allAlbums;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const oneAlbum = await this.albumsService.findOne(+id);
    if(!oneAlbum){
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    return oneAlbum;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    const albumExist = await this.findOne(id);
    if (!albumExist){
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    const updateAlbum = await this.albumsService.update(+id, updateAlbumDto);
    return updateAlbum;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const albumExist = await this.findOne(id);
    if (!albumExist){
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    const deletedAlbum = await this.albumsService.remove(+id);
    return {
      statusCode: 200,
      message: `deleted album`,
      data: deletedAlbum
    }
  }
}
