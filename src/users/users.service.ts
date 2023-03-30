import { Injectable } from '@nestjs/common';
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
  async create(createUserDto: CreateUserDto)
  {
    const user = await User.create({ ...createUserDto }).save();
    delete user.password;
    return user;
  };


  /* Retrieving a user in the database by his email */
  async findUserByEmail(email: string)
  {
    return await User.findOneBy({ email })
  };


  /* Retrieving all users in the database */
  async findAll()
  {
    return await User.find();
  }


  /*  Retrieving a user in the database by his id */
  async findOne(id: number)
  {
    const user = await User.findOneBy({ id })

    if (user)
    {
      return user
    }

    return undefined
  }


  /* Deleting a user in the database by his id */
  async update(id: number, updateUserDto: UpdateUserDto)
  {
    const updateUser = await User.findOneBy({id})

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
    updateUser.anecdote = updateUserDto.anecdote,


    await User.save(updateUser)

    return updateUser
  }

  /* Delete a user in the database by his id */
  async remove(id: number | any)
  {
    const user = await User.remove(id)

    if(user){
      return user
    }
    return undefined
  }
}
