import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, UploadedFile, Res, BadRequestException, NotFoundException } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { imageFileFilter } from './middleware/imageFileFilter';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Photo } from './entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/albums/entities/album.entity';



@UseGuards(JwtAuthGuard)
@ApiTags('PHOTOS') // Create a PHOTOS category in swagger UI.
@UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
@Controller('photos')
export class PhotosController
{
  constructor(
    private readonly photosService: PhotosService,
    private readonly userService: UsersService,
    private readonly albumService: AlbumsService) { }

  @ApiOperation({ summary: `Add a new file` })
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
  async uploadFile(@UploadedFile() file: Express.Multer.File)
  {
    console.log(file);
    const newPhoto = await this.photosService.create(file)
    return {
      statusCode: 201,
      message: `Successful creation of a new upload`,
      data: newPhoto
    };
  }


  @Get()
async findAllPhotos(){
  const photos = await this.photosService.findAll();
  return photos;
}



  @Get(':id')
  async findOnePhoto(@Param('id') id: string)
  {
    return this.photosService.findOne(+id);
  }





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
  async update(@Param('id') id: number, @Body() updatePhotoDto: UpdatePhotoDto, @UploadedFile() file: Express.Multer.File)
  {
    const photoExist = await this.photosService.findOne(id);
    if (!photoExist)
    {
      throw new BadRequestException(`Photo not found`);
    }

    /* const user = await User.findOneBy({ id });
    console.log(user);
    
    if (!user)
    {
      throw new NotFoundException()
    } */

    /* const album = await Album.findOneBy({ id });
    if (!album)
    {
      throw new NotFoundException()
    } */
    
    /* if (photoExist.id !== user.id)
    {
      throw new Error(`User with id ${user.id} is not authorized to update photo with id ${photoExist.id}`);
    } */

    const photo = await this.photosService.update(id, updatePhotoDto, file);

    return {
      statusCode: 200,
      message: `Success of change.`,
      data: photo
    };

  }


  /* @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads'
    }),
    fileFilter: imageFileFilter,
  })) */
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  @Delete(':id')
  async remove(@Param('id') id: number)
  {
    const deletedPhoto = await this.photosService.remove(id);


    return {
      statusCode: 200,
      message: `Deletion success.`,
      data: deletedPhoto
    };
  }
}
