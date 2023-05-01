import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';

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



  /**
   * Create an album in the database.
   */
  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiBody({ type: CreateAlbumDto })
  @ApiOperation({ summary: `Add a commentary to one photo.` })
  @ApiResponse({ status: 201, description: `Comment posted` })
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @GetUser() user)
  {
    const userLog = await this.userService.findOne(user.userId);


    const albumExist = await this.albumsService.findOneByName(createAlbumDto.name);


    if (!albumExist)
      throw new HttpException(`This album already exist.`, HttpStatus.BAD_REQUEST);

    const newAlbum = await this.albumsService.create(createAlbumDto, userLog);

    return {
      statusCode: 201,
      message: `This album is created.`,
      data: newAlbum
    };
  };



  /**
   * Retrieving all albums in the database.
   */
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



  /**
   * Retrieving an album in the database by his id.
   */
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


  /**
   * Change the name of the album in the database by the user.
   */
  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAlbumDto: UpdateAlbumDto, @GetUser() user)
  {
    const userLog = await this.userService.findOne(user.userId);

    const albumExist = await this.userService.findOne(user.userId)

    if (!albumExist)
      throw new NotFoundException(`Album with id ${id} not found.`);

    const albumUpdated = await this.albumsService.update(id, updateAlbumDto, userLog);

    if (!albumUpdated)
      throw new NotFoundException('No user found');


    return {
      statusCode: 200,
      message: `Success of change.`,
      data: albumUpdated
    };
  }


  /**
   * Delete the album from the database by the user.
   */
  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Delete(':id')
  async remove(@Param('id') id: number)
  {
    const albumExist = await this.findOne(id);

    if (!albumExist)
      throw new NotFoundException(`Album with id ${id} not found.`);

    const deletedAlbum = await this.albumsService.remove(id);

    return {
      statusCode: 200,
      message: `Deleted album.`,
      data: deletedAlbum
    }
  }
}
