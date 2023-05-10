import { Injectable } from '@nestjs/common';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import * as fs from 'fs';
import { User } from 'src/users/entities/user.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Album } from 'src/albums/entities/album.entity';
import Photo from './entities/photo.entity';


@Injectable()
export default class PhotosService
{


  async create(
    user: User,
    file: Express.Multer.File,
    albumId: number
    ): Promise<Photo | undefined>
  {
    const album = await Album.findOneBy({ id:albumId});

    const newPhoto = new Photo();

    newPhoto.user = user;
    newPhoto.file = file.filename;
    newPhoto.originalName = file.originalname;
    newPhoto.album = album;
    Photo.save(newPhoto);
    return newPhoto;
  }



  async findAll(): Promise<Photo[] | undefined>
  {
    return await Photo.find();
  }



  async findOne(id: number): Promise<Photo[] | undefined>
  {
    const photoExist = await Photo.find( { where: { id: id } } );
    return photoExist;
  }



  async findOneByName(photo: string): Promise<Photo |undefined>{
    const photoName = await Photo.findOneBy( { originalName: photo});
    return photoName;
  }



  async update(
    id: number, 
    albumId: number, 
    /* file: Express.Multer.File */
    ): Promise<Photo | undefined>
  {
    //const album = await Album.findOneBy({ id: albumId })
    const updatedPhoto = await Photo.findOneBy({ id: id });
    /* updatedPhoto?.album.push(albumId); */
    const photoUpdated = updatedPhoto.save();

    return photoUpdated;
    /* if (updatedPhoto)
    {
      Delete the photo file in 'uploads'.
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
    return null; */
  }


  async remove(id: number)
  {
    const deletedPhoto = await Photo.findOneBy({ id });
    if (deletedPhoto)
    {
      //Delete the photo file in 'uploads'.
      const path = `${process.cwd()}/uploads/${deletedPhoto.originalName}`;
      fs.unlink(path, (err) =>
      {
        if (err)
        {
          return console.log(err);
        }
        console.log('file deleted successfully');
      })
      return await deletedPhoto.remove();
    }
    return null;
  }
}
