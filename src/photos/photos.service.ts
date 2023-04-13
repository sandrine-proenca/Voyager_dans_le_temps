import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/albums/entities/album.entity';

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

  async findOne(id: number)
  {
    try
    {
      const photoExist = await Photo.findOneBy({ id });
      /* console.log(photoExist); */
      return photoExist
      
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto, file: Express.Multer.File)
  {
    const updatedPhoto = await Photo.findOneBy({id});

    updatedPhoto.photo = file.filename;
    updatedPhoto.information = file.originalname;
    updatedPhoto.mimeType = file.mimetype;
    updatedPhoto.user = updatePhotoDto.user
    

    const photo = await updatedPhoto.save();
    return photo;
    
  }

  async remove(id: number)
  {
    try
    {
    const photo = await this.findOne(id);
    if (photo)
    {
    return await photo.remove();
    }
    return null;
  }
  catch (error)
  {
    throw new InternalServerErrorException();
  }
  }
}
