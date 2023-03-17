import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  /* Create a user in the database */
  async create(createUserDto: CreateUserDto) {
    const user = await User.create({ ...createUserDto}).save();
    delete user.password;
    return user;
  };

  /* Get a user in the database by email */
  async findUserByEmail(email: string){
    return await User.findOneBy({email})
  };

  async findAll() {
    return await User.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
