import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService
{

  /* Create a user in the database */
  async create(createUserDto: CreateUserDto)
  {
    const user = await User.create({ ...createUserDto }).save();
    delete user.password;
    return user;
  };

  /* Get a user in the database by email */
  async findUserByEmail(email: string)
  {
    return await User.findOneBy({ email })
  };

  /* Get all users in the database */
  async findAll()
  {
    return await User.find();
  }

  /* Get a user in the database by id */
  async findOne(id: number)
  {
    const user = await User.findOneBy({ id })
    
    if (user)
    {
      return user
    }

    return undefined
  }

  update(id: number, updateUserDto: UpdateUserDto)
  {
    return `This action updates a #${id} user`;
  }

  remove(id: number)
  {
    return `This action removes a #${id} user`;
  }
}
