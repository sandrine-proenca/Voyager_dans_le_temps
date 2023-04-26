import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


/**
 * All services for the User table:
 * * **create**         : Create a user in the database.
 * * **findUserByEmail**: Find a user in the database by his email.
 * * **findAll**        : Find all users in the database.
 * * **findOne**        : Find a user in the database by his id.
 * * **update**         : Modify a user in the database by his id.
 * * **remove**         : Delete a user in the database by his id.
 */
@Injectable()
export class UsersService
{

  /* Create a user in the database */
  async create(createUserDto: CreateUserDto, hash: string): Promise<User>
  {
      const newUser = new User();

      newUser.email = createUserDto.email;
      newUser.password = hash;
      newUser.firstname = createUserDto.firstname;
      newUser.lastname = createUserDto.lastname;
      newUser.birthday = createUserDto.birthday;
      newUser.phone = createUserDto.phone;
      newUser.address = createUserDto.address;
      newUser.job = createUserDto.job;
      newUser.father = createUserDto.father;
      newUser.mother = createUserDto.mother;
      newUser.myself = createUserDto.myself;
      newUser.travel = createUserDto.travel;
      newUser.anecdote = createUserDto.anecdote;

      await newUser.save();
      return newUser;
  };


  /* Retrieving a user in the database by his email */
  async findUserByEmail(email: string)
  {
    return await User.findOneBy({ email })
  };


  /* Retrieving all users in the database */
  async findAll()
  {
    try
    {
      return await User.find();
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }


  /*  Retrieving a user in the database by his id */
  async findOne(id: number)
  {
    try
    {
      return await User.findOneBy({ id })
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }

  }


  /* Deleting a user in the database by his id */
  async update(id: number, updateUserDto: UpdateUserDto)
  {
    const updateUser = await User.findOneBy({ id });
console.log(id);

    if (!updateUser) throw new NotFoundException();

      updateUser.email = updateUserDto.email,
      updateUser.firstname = updateUserDto.firstname,
      updateUser.lastname = updateUserDto.lastname,
      updateUser.birthday = updateUserDto.birthday,
      updateUser.phone = updateUserDto.phone,
      updateUser.address = updateUserDto.address,
      updateUser.job = updateUserDto.job,
      updateUser.father = updateUserDto.father,
      updateUser.mother = updateUserDto.mother,
      updateUser.myself = updateUserDto.myself,
      updateUser.travel = updateUserDto.travel,
      updateUser.anecdote = updateUserDto.anecdote;
    try
    {
      return await User.save(updateUser);
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }

  /* Delete a user in the database by his id */
  async remove(id: number)
  {
    try
    {
      const user = await this.findOne(id);
      if (user)
      {
        return await user.remove();
      }
      return null;
    }
    catch (error)
    {
      throw new InternalServerErrorException();
    }
  }
}
