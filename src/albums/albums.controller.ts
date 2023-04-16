import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/** Création d'un nouvel album nécessite :
 * * 
 */
@ApiTags('ALBUMS')
@Controller('albums')
export class AlbumsController
{
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly userService: UsersService) { }


  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiBody({ type: CreateAlbumDto })
  @ApiOperation({ summary: `Add a commentary to one photo.` })
  @ApiResponse({ status: 201, description: `Comment posted` })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @Request() req)
  {
    /* console.log('testcreateAlbumDto :',createAlbumDto); */
    const albumExist = await this.albumsService.findAlbumAndUser(req.user.id, createAlbumDto.name);
    /* console.log(albumExist); */

    if (albumExist)
    {
      throw new HttpException(`This album already exist.`, HttpStatus.BAD_REQUEST);
    }
    const newAlbum = await this.albumsService.create(createAlbumDto, req.user);
    /* console.log(`---newAlbum controller--->`, newAlbum); */


    return {
      statusCode: 201,
      message: `This album is created.`,
      data: newAlbum
    };
  };

  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Get()
  async findAllAlbums()
  {
    const allAlbums = await this.albumsService.findAll();
    if (!allAlbums)
    {
      throw new NotFoundException(`Albums not found.`);
    }
    return {
      statusCode: 200,
      message: `List of all albums.`,
      data: allAlbums
    };
  }

  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Get(':id')
  async findOne(@Param('id') id: number)
  {
    const oneAlbum = await this.albumsService.findAlbumById(id);
    if (!oneAlbum)
    {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    return {
      statusCode: 200,
      message: `Album with id ${id} is found.`,
      data: oneAlbum
    };
  }

  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAlbumDto: UpdateAlbumDto)
  {
    const albumExist = await this.findOne(id);
    if (!albumExist)
    {
      throw new NotFoundException(`Album with id ${id} not found.`);
    }
    const updateAlbum = await this.albumsService.update(+id, updateAlbumDto);
    return updateAlbum;
  }

  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Delete(':id')
  async remove(@Param('id') id: number)
  {
    const albumExist = await this.findOne(id);
    if (!albumExist)
    {
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
