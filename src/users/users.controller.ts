import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { encodePassword } from 'src/auth/bcrypt';

@ApiTags('USERS')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('Sign Up')
  @ApiOperation({ summary: "Creating a user account" })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {

    if(createUserDto.password !== createUserDto.password_confirm){
      throw new ConflictException(`Passwords are not the same`)
    }

    const userExist = await this.usersService.findUserByEmail(createUserDto.email)
    if(userExist){
      throw new HttpException("The email already exists !", HttpStatus.NOT_ACCEPTABLE);
    }

    createUserDto.password = await encodePassword(createUserDto.password)

    const newAccount = await this.usersService.create(createUserDto)

    return {
      statusCode: 201,
      message: "Successful creation of a new account !",
      data: newAccount};
  }

  @Get()
  @ApiOperation({ summary: `Retrieving all users`})
  async findAll() {
    const allUsers = await this.usersService.findAll()
    return {
      statusCode: 200,
      message: `Successful users recovery !`,
      data: allUsers
    };
  }

  @Get(':id')
  @ApiOperation({ summary: `Get a user by id`})
  async findOne(@Param('id') id: string) {
    const oneUser = await this.usersService.findOne(+id);
    if(!oneUser){
      throw new BadRequestException(`User not found`)
    }
    return {
      statusCode: 200,
      message: `Successful user ${id} recovery !`,
      data: oneUser
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
