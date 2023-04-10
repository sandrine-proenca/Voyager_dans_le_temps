import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, UploadedFile, Res } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AlbumsService } from 'src/albums/albums.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { imageFileFilter } from './middleware/imageFileFilter';



@ApiTags('PHOTOS') // Create a PHOTOS category in swagger UI.
@UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService,
    private readonly userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: `Add a new file` })
    @UseInterceptors(FileInterceptor('file', {fileFilter:imageFileFilter}))//HTML form field file name and maximum number of photos (Nom du fichier du champs du formulaire HTML et nombre maximum de photos)
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



    @UseGuards(JwtAuthGuard)
    @Get('upload')
    @UseInterceptors(ClassSerializerInterceptor)
  async findAllPhotos(){
    const photos = await this.photosService.findAll();
    return photos.map(photo => photo.save());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body()  file: Express.Multer.File) {
    const photo = await this.photosService.update(+id, file);
    return {
      statusCode: 200,
      message: `Success of change.`,
      data: photo
    };
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const photo = await this.photosService.remove(+id);
    return {
      statusCode: 200,
      message: `Deletion success.`,
      data: photo
    };
  }
}
