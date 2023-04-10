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

  findOne(id: number)
  {
    return `This action returns a #${id} photo`;
  }

  async update(id: number, file: Express.Multer.File)
  {
    const updatedPhoto = await Photo.findOneBy({id});
    const user = await User.findOneBy({id});
    const album = await Album.findOneBy({id})

    updatedPhoto.photo = file.filename;
    updatedPhoto.information = file.originalname;
    updatedPhoto.mimeType = file.mimetype;
    
    if(!user){
      throw new NotFoundException()
    }
    if(!album){
      throw new NotFoundException()
    }
    if(updatedPhoto.id !== user.id){
      throw new Error(`User with id ${user.id} is not authorized to update photo with id ${updatedPhoto.id}`);
    }
    if (!updatedPhoto){
      throw new BadRequestException(`Photo not found`);
    }

    const photo = await updatedPhoto.save();
    return photo;
    
  }

  async remove(id: number)
  {
    const photo = await Photo.findOneBy({id});
    if(!photo){
      throw new BadRequestException(`Photo not found.`);
    }
    await photo.remove();
    return photo;
  }
}
