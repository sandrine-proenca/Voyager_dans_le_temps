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
      const newImage = await this.photosService.create(file)
      return {
        statusCode: 201,
        message: `Successful creation of a new upload`,
        data: newImage
      };
    }



  @Get(':fileId')
  async seeUploadedFile(@Param('fileId') fileId, @Res() res): Promise<any> {
    return res.findAll(fileId, { root: './uploads'});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(+id);
  }
}
