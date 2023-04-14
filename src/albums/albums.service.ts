import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AlbumsService
{
  /* Create an album in the database */
  async create(createAlbumDto: CreateAlbumDto, user: User)
  {
    try
    {
      /* console.log(`---createAlbumDto service--->`, createAlbumDto); */

      const newAlbum = await Album.create({ ...createAlbumDto });
      /* console.log(`newAlbum 1 service--->`, newAlbum); */

      delete user.password;
      newAlbum.users = [ user ];
      /* console.log(`newAlbum 2 service--->`, newAlbum); */

      return await newAlbum.save();
    }
    catch (error)
    {
      throw new InternalServerErrorException()
    }
  }

  /* Retrieving all albums in the database */
  async findAll(): Promise<Album[]>
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
  async findAlbumById(id: number)
  {
    try
    {
      return await Album.findOne({ relations: { users: true }, where: { id } })
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto)
  {
    try
    {
    //Find the album by its id.
    const updatedAlbum = await Album.findOneBy({ id });
    if (!updatedAlbum) 
    { 
      throw new NotFoundException() 
    };
    
    updatedAlbum.name = updateAlbumDto.name;
    updatedAlbum.users = updateAlbumDto.users;
    
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
      const album = await Album.findOneBy({ id });
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

  /** 
* @method findAlbumAndUser:
* * A method for returning data from a user relationship and an album.
*/
  async findAlbumAndUser(userId: number, name: string)
  {
    return await Album.findOne({ where: { users: { id: userId }, name: name } });
  }
}