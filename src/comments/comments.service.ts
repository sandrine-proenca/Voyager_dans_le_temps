import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Commentary } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Injectable()
export class CommentsService
{

  /* async createComment ( createCommentDto: CreateCommentDto, user: User)
  {
    const response = Commentary.create ({ ...createCommentDto });
    delete user.password;
    response.user.id = user.id;
    return await response.save();
  }


  async findAll(): Promise<Commentary[]> {
    return await Commentary.find();
  } */



  async create(createCommentDto: CreateCommentDto,
    user: User): Promise <Commentary | undefined>
  {console.log('Test');
  
    const photo = await Photo.findOneBy({ id: createCommentDto.photoId})
    console.log(photo);
    
    if(photo !== null){
      const comment = new Commentary();
      comment.content = createCommentDto.content;
      comment.photo = photo;
      comment.user = user;
      await comment.save();
      return await Commentary.findOne({
        relations: { photo: true, user: true},
        select: {
          id: true,
          content: true,
          photo: { id: true },
          user: { id: true }
        },
        where: { id: comment.id }
      });
    }
    return undefined;
  }


  async findAll(): Promise<Commentary[] | undefined>
  {
    try
    {
      return await Commentary.find();
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async findOneCommentary(id: number): Promise<Commentary | undefined>
  {
    console.log(`---test-service-avant-try--->`);
    
    try
    {
      return await Commentary.findOne({
        relations: { photo: true, user: true},
        select: {
          id: true,
          content: true,
          photo: { id: true },
          user: { id: true }
        },
        where: { id }
      });
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }



  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Commentary | undefined>
  {
    try 
    {
    const updatedCommentary = await Commentary.findOne({
      relations: { photo: true, user: true},
      select: {
        id: true,
        content: true,
        photo: { id: true },
        user: { id: true }
      },
      where: { id:id }
    });

    if (!updatedCommentary)
    {
      throw new NotFoundException()
    };
    updatedCommentary.content = updateCommentDto.content;
      return await Commentary.save(updatedCommentary);
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }



  async deleteCommentary(id: number): Promise<Commentary | undefined>
  {
    try
    {
      const commentary = await Commentary.findOne({
        relations: { photo: true, user: true},
        select: {
          id: true,
          content: true,
          photo: { id: true },
          user: { id: true }
        },
        where: { id:id }
      });
      if (commentary){
        return await commentary.remove();
      }
      return null;
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }
}
