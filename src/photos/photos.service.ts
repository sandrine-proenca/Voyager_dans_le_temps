import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService
{
  /* async create(createPhotoDto: CreatePhotoDto) {
    const newPhoto = new Photo();

    newPhoto.photo = createPhotoDto.photo;
    newPhoto.information = createPhotoDto.information;
    newPhoto.user = createPhotoDto.user;
    newPhoto.album = createPhotoDto.album;
    await newPhoto.save();
    return newPhoto;
  } */
  async create(file: Express.Multer.File): Promise<Photo>
  {
    try
    {
      const newPhoto = new Photo();

      newPhoto.photo = file.filename;
      newPhoto.information = file.originalname;
      newPhoto.mimeType = file.mimetype;

      const photo = await newPhoto.save();
      return photo;
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async findAll()
  {
    try
    {
      return await Photo.find();
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number)
  {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto)
  {
    return `This action updates a #${id} photo`;
  }

  remove(id: number)
  {
    return `This action removes a #${id} photo`;
  }
}
