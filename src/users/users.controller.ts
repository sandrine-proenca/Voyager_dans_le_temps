import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException, HttpException, HttpStatus, BadRequestException, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { encodePassword } from 'src/auth/bcrypt';


/**
 * All controllers for the User table:
 * * **create**         : Creating a user account.
 * * **findAll**        : Retrieving all users.
 * * **findOne**        : Retrieving a user by id.
 * * **update**         : Editing a user.
 * * **remove**         : Deleting a user account by his id.
 */
@ApiTags('USERS')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  @ApiTags(`Sign Up`)
  @ApiOperation({ summary: `Creating a user account` })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {

    if(createUserDto.password !== createUserDto.password_confirm){
      throw new ConflictException(`Passwords are not the same`)
    }

    const userExist = await this.usersService.findUserByEmail(createUserDto.email)
    if(userExist){
      throw new HttpException(`The email already exists !`, HttpStatus.NOT_ACCEPTABLE);
    }

    createUserDto.password = await encodePassword(createUserDto.password)

    const newAccount = await this.usersService.create(createUserDto)

    return {
      statusCode: 201,
      message: `Successful creation of a new account !`,
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
  @ApiOperation({ summary: `Retrieving a user by id`})
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


  @Patch()
  @ApiOperation({summary: `Editing a user`})
  async update(@Body() updateUserDto: UpdateUserDto, @Request() req) {

    const account = req.user.id
    const updateAccount = await this.usersService.update(account,updateUserDto)

    if(!updateAccount){
      throw new HttpException(`Erreur Server`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return {
      statusCode: 201,
      message: `Saved user changes`,
      data: updateAccount
    }
  }

  
  @Delete(':id')
  @ApiOperation({ summary: ` Deleting a user account by his id `})
  @ApiResponse({ status: 200, description: `Account deleted` })
  async remove(@Param('id') id: string) {
    const userExist = await this.usersService.findOne(+id)
    if(!userExist){
      throw new BadRequestException(`User not found`)
    }
    const deleteUser = await userExist.remove()
    if(!deleteUser){
      throw new HttpException(`Erreur Server`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return {
      statusCode: 201,
      message: `The deletion of the user is saved`,
      data: deleteUser
    }
  }
}
