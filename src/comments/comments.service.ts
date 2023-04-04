import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Commentaries } from './entities/comment.entity';

@Injectable()
export class CommentsService
{
  async create(createCommentDto: CreateCommentDto)
  {
    try
    {
      return await Commentaries.create({ ...createCommentDto }).save();
    }
    catch (error)
    {
      throw new InternalServerErrorException()
    }
  }

  async findAll()
  {
    try
    {
      return await Commentaries.find();
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
      return await Commentaries.findOneBy({ id })
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto)
  {
    const updatedCommentary = await Commentaries.findOneBy({id});

    if (!updatedCommentary) throw new NotFoundException();
    updatedCommentary.commentary = updateCommentDto.commentary;

    try 
    {
      return await Commentaries.save(updatedCommentary);
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
