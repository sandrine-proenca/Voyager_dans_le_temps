import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService
{
  /* Create an album in the database */
  async create(createAlbumDto: CreateAlbumDto)
  {
    try
    {
      return await Album.create({ ...createAlbumDto }).save();
    }
    catch (error)
    {
      throw new InternalServerErrorException()
    }
  }

  /* Retrieving all albums in the database */
  async findAll()
  {
    try
    {
    return await Album.find();
  }
  catch (error)
  {
    throw new InternalServerErrorException();
  }
  }

  /*  Retrieving an album in the database by his id */
  async findOne(id: number)
  {
    try
    {
      return await Album.findOneBy({ id })
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto)
  {
    const updatedAlbum = await Album.findOneBy({id});
    if (!updatedAlbum) throw new NotFoundException();
    updatedAlbum.name = updateAlbumDto.name;
    try
    {
      return await Album.save(updatedAlbum);
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number)
  {
    try
    {
      const album = await Album.findOneBy({id});
      if (album)
      {
        return await album.remove();
      }
      return null;
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }
}
