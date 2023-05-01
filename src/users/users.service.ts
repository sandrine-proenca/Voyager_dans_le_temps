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

  /* Retrieving a user in the database by his email and albums */
  async findByEmailWithAlbums(email: string)
  {
    return await User.findOne({ where: { email }, relations: {albums: true} })
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
    const user = await User.findOne({
      relations: { albums: true },
      where: { id: id },
    });

    if (user)
    {
      return user;
    }

    return undefined;
  }


  /* Deleting a user in the database by his id */
  async update(id: number, updateUserDto: UpdateUserDto)
  {
    const updateUser = await User.findOneBy({ id });

    if (!updateUser) throw new NotFoundException();

    if (updateUserDto.email !== undefined)
    {
      updateUser.email = updateUserDto.email
    };

    if (updateUserDto.firstname !== undefined)
    {
      updateUser.firstname = updateUserDto.firstname
    };

    if (updateUserDto.lastname !== undefined)
    {
      updateUser.lastname = updateUserDto.lastname
    };

    if (updateUserDto.birthday !== undefined)
    {
      updateUser.birthday = updateUserDto.birthday
    };

    if (updateUserDto.phone !== undefined)
    {
      updateUser.phone = updateUserDto.phone
    };

    if (updateUserDto.address !== undefined)
    {
      updateUser.address = updateUserDto.address
    };

    if (updateUserDto.job !== undefined)
    {
      updateUser.job = updateUserDto.job
    };

    if (updateUserDto.father !== undefined)
    {
      updateUser.father = updateUserDto.father
    };

    if (updateUserDto.mother !== undefined)
    {
      updateUser.mother = updateUserDto.mother
    };

    if (updateUserDto.myself !== undefined)
    {
      updateUser.myself = updateUserDto.myself
    };

    if (updateUserDto.travel !== undefined)
    {
      updateUser.travel = updateUserDto.travel
    };

    if (updateUserDto.anecdote !== undefined)
    {
      updateUser.anecdote = updateUserDto.anecdote
    };


    return await updateUser.save();
  }

  /* Delete a user in the database by his id */
  async remove(id: number): Promise<User | undefined>
  {
    const deleteUser = await User.findOne({
      relations: { photos: true, albums: true },
      where: { id: id },
    });

    User.remove(deleteUser);
    return deleteUser;
  }

}
