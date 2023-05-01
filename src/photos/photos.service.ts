import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import * as fs from 'fs';


@Injectable()
export class PhotosService
{
  async create(file: Express.Multer.File): Promise<Photo | undefined>
  {
    const newPhoto = new Photo();

    newPhoto.photo = file.filename;
    newPhoto.information = file.originalname;
    newPhoto.mimeType = file.mimetype;

    const photo = await newPhoto.save();
    return photo;
  }

  async findAll()
  {
    return await Photo.find();
  }

  async findOne(id: number)
  {
    const photoExist = await Photo.findOneBy({ id });
    /* console.log(photoExist); */
    return photoExist
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto, file: Express.Multer.File)
  {
    const updatedPhoto = await Photo.findOneBy({ id });
    if (updatedPhoto)
    {
      //Delete the photo file in 'uploads'.
      const path = `${process.cwd()}/uploads/${updatedPhoto.photo}`;
      fs.unlink(path, (err) =>
      {
        if (err)
        {
          return console.log(err);
        }
        console.log('file deleted successfully');
      })

      updatedPhoto.photo = file.filename;
      updatedPhoto.information = file.originalname;
      updatedPhoto.mimeType = file.mimetype;

      const photo = await updatedPhoto.save();
      return photo;
    }
    return null;
  }


  async remove(id: number)
  {
    const photo = await this.findOne(id);
    if (photo)
    {
      //Delete the photo file in 'uploads'.
      const path = `${process.cwd()}/uploads/${photo.photo}`;
      fs.unlink(path, (err) =>
      {
        if (err)
        {
          return console.log(err);
        }
        console.log('file deleted successfully');
      })
      return await photo.remove();
    }
    return null;
  }
}
