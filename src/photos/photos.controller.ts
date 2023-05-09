import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, UploadedFile, NotFoundException, Res } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { imageFileFilter } from './middleware/imageFileFilter';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetUser } from 'src/auth/get-user.decorator';
import PhotosService from './photos.service';



@ApiTags('PHOTOS') // Create a PHOTOS category in swagger UI.
@Controller('photos')
export default class PhotosController
{
  constructor(
    private readonly photosService: PhotosService,
    private readonly userService: UsersService,
    private readonly albumService: AlbumsService) {}



  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiBody({ type: CreatePhotoDto })
  @ApiOperation({ summary: `Add a new photo` })
  @ApiResponse({ status: 201, description: `Photo posted` })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({  //Function that can be used with Multer returns an implemented storage engine to store photos locally.(Fonction utilisable avec multer retourne un moteur de stockage implémenté pour stocker les photos en local.)
      destination: './uploads',
      filename: (req, file, callback) =>
      {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); //Return a multer number specific to each photo.(Retourne un numéro multer propre à chaque photo.)
        const ext = extname(file.originalname); //Extension of the original file.(Extension du fichier original.)
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    }),
    fileFilter: imageFileFilter,
  }))
  @Post('uploads')
  async uploadFile(
    @Body() createPhotoDto: CreatePhotoDto,
    @GetUser() user,
    @UploadedFile() savedFiles: Array<Express.Multer.File>)
  {
    console.log(savedFiles);
    const oneUser = await this.userService.findOne(user.userId);
    const albumExist = await this.albumService.findAlbumById(createPhotoDto.albumId);
    if (!albumExist) throw new NotFoundException(`The photo album does not exist.`);
    const newPhoto = await this.photosService.create(
      oneUser,
      savedFiles,
      createPhotoDto
    )
    return {
      statusCode: 201,
      message: `Successful creation of a new upload`,
      data: newPhoto
    };
  }





  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Get(':imgpath')
  async findAllPhotos (@Param('imgpath') file, @Res() res)
  {
    return res.sendFile(file, { root: '.uploads' });
  }





  //@UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  //@UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  /* @Get(':id')
  async findOnePhoto(@Param('id') id: number)
  {
    const onePhoto = await this.photosService.findOne(id);
    if (!onePhoto)
    {
      throw new NotFoundException(`Photo whith id ${id} not found.`);
    }
    return {
      statusCode: 200,
      message: `Photo with id ${id} is found.`,
      data: onePhoto
    }
  } */




  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()@ApiBody({ type: CreatePhotoDto })
  @ApiOperation({ summary: `Change a photo.` })
  @ApiBody({ type: UpdatePhotoDto })
  @ApiResponse({ status: 200, description: `The photo is changed.` })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({  //Function that can be used with Multer returns an implemented storage engine to store photos locally.(Fonction utilisable avec multer retourne un moteur de stockage implémenté pour stocker les photos en local.)
      destination: './uploads',
      filename: (req, file, callback) =>
      {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); //Return a multer number specific to each photo.(Retourne un numéro multer propre à chaque photo.)
        const ext = extname(file.originalname); //Extension of the original file.(Extension du fichier original.)
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    }),
    fileFilter: imageFileFilter,
  }))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePhotoDto: UpdatePhotoDto, /* @UploadedFile() file: Express.Multer.File */)
  {
    const photoExist = await this.photosService.findOne(id);
    if (!photoExist)
    {
      throw new NotFoundException(`Photo not found`);
    }
    const albumExist = await this.albumService.findAlbumById(updatePhotoDto.albumId);

    const photoUpdated = await this.photosService.update(id, updatePhotoDto/* , file */);

    return {
      statusCode: 200,
      message: `Success of change.`,
      data: photoUpdated
    };

  }


  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @Delete(':id')
  async remove(@Param('id') id: number)
  {
    const photoExist = await this.photosService.findOne(id);
    if (!photoExist) throw new NotFoundException(`This photo does not exist.`);

    const deletedPhoto = await this.photosService.remove(id);
    return {
      statusCode: 200,
      message: `Deleted photo.`,
      data: deletedPhoto
    };
  }
}
