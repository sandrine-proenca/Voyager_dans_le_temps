import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AlbumsService
{
  /* Create an album in the database */
  async create(createAlbumDto: CreateAlbumDto, user: User): Promise<Album | undefined>
  {

    const newAlbum = new Album();
    newAlbum.name = createAlbumDto.name;
    newAlbum.users = [ user ];

    await newAlbum.save();

    return newAlbum;
  }



  /* Retrieving all albums in the database */
  async findAll(): Promise<Album[]>
  {
    return await Album.find({ relations: { photos: true } });

  }



  /*  Retrieving an album in the database by his id */
  async findAlbumById(id: number)
  {
    return await Album.findOne({ relations: { users: true }, where: { id } })
  }



  /*Retrieving an album in the database by his name*/
  async findOneByName(name: string): Promise<Album[] | undefined>
  {
    const oneNom = await Album.find({
      where: { name: name },
      relations: { users: true },
    });
    if (oneNom)
    {
      return oneNom;
    }
    return undefined;
  }


  /* Change the name of the album in the database by the user. */
  async update(id: number, updateAlbumDto: UpdateAlbumDto, user: User)
  {
    //Find the album by its id.
    const updatedAlbum = await Album.findOneBy({ id });

    if (!updatedAlbum) throw new NotFoundException();

    if (updateAlbumDto.name !== undefined)
    {
      updatedAlbum.name = updateAlbumDto.name

    }
    return await updatedAlbum.save();
  }


  /* Delete the album from the database by the user. */
  async remove(id: number)
  {
    const album = await Album.findOneBy({ id });

    return await album.remove();

  }

}