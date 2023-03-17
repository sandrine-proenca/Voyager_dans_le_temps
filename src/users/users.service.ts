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


  /* Find a user in the database by his email */
  async findUserByEmail(email: string)
  {
    return await User.findOneBy({ email })
  };


  /* Find all users in the database */
  async findAll()
  {
    return await User.find();
  }


  /*  Find a user in the database by his id */
  async findOne(id: number)
  {
    const user = await User.findOneBy({ id })

    if (user)
    {
      return user
    }

    return undefined
  }


  /*Modify a user in the database by his id */
  async update(id: number, updateUserDto: UpdateUserDto)
  {
    const updateUser = await User.findOneBy({id})

    updateUser.email = updateUserDto.email,
    updateUser.password = updateUserDto.password,
    updateUser.firstname = updateUserDto.firstname,
    updateUser.lastname = updateUserDto.lastname,
    updateUser.birthday = updateUserDto.birthday,
    updateUser.phone = updateUserDto.phone,
    updateUser.address = updateUserDto.address

    await User.save(updateUser)

    return updateUser
  }


  remove(id: number)
  {
    return `This action removes a #${id} user`;
  }
}
