import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Commentary } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

@Injectable()
export class CommentsService
{
  async create(createCommentDto: CreateCommentDto, user: User): Promise <Commentary | null>
  {
    const photo = await Photo.findOneBy({
      id: createCommentDto.photoId
    })
    if(photo !== null){
      const newComment = new Commentary();
      newComment.commentary = createCommentDto.commentary;
      newComment.photo = photo;
      newComment.user = user;
      await newComment.save();
      return await Commentary.findOne({
        relations: {photo: true, user: true},
        select: {
          id: true,
          commentary: true,
          photo: { id: true},
          user: { id: true},
        },
        where: {id: newComment.id}
      })
    }

    return null;
    
  }


  async findAll()
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

  async findOne(id: number)
  {
    try
    {
      return await Commentary.findOneBy({ id })
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto)
  {
    const updatedCommentary = await Commentary.findOneBy({id});

    if (!updatedCommentary) throw new NotFoundException();
    updatedCommentary.commentary = updateCommentDto.commentary;

    try 
    {
      return await Commentary.save(updatedCommentary);
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
      const commentary = await this.findOne(id);
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
