import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException, HttpException, HttpStatus, BadRequestException, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { log } from 'console';


/**
 * All controllers for the User table:
 * * **create**         : Creating a user account.
 * * **findAll**        : Retrieving all users.
 * * **findOne**        : Retrieving a user by id.
 * * **update**         : Editing a user.
 * * **remove**         : Deleting a user account by his id.
 */
@ApiTags('USERS') // cree une categorie USERS dans swagger UI
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@Controller('users')
export class UsersController
{
  constructor(private readonly usersService: UsersService) { }


  @ApiTags(`Sign Up`)
  @ApiOperation({ summary: `Creating a user account` })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post(`register`)
  async create(@Body() createUserDto: CreateUserDto)
  {
    const saltOrRounds = 10;

    const ExistingUser = await this.usersService.findUserByEmail(createUserDto.email);

    if (ExistingUser)
    {
      throw new HttpException(`The email already exists !`, HttpStatus.NOT_ACCEPTABLE);
    }

    const existingEmail = await this.usersService.findUserByEmail(createUserDto.email);
    if(existingEmail){
      throw new HttpException(`This email already exists, please modify it.`,HttpStatus.CONFLICT);
    }

    // Hashage du password
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    

    // Création du user
    const user = await this.usersService.create(createUserDto, hash);
    

    return {
      statusCode: 201,
      message: `Successful creation of a new account !`,
      data: user
    };
  }


  @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @ApiOperation({ summary: `Retrieving all users` })
  @Get()
  async findAll()
  {
    const allUsers = await this.usersService.findAll();

    return {
      statusCode: 200,
      message: `Successful users recovery !`,
      data: allUsers
    };
  }


  @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @ApiOperation({ summary: `Retrieving a user by id` })
  @Get(':id')
  async findOne(@Param('id') id: number)
  {
    const oneUser = await this.usersService.findOne(id);
    if (!oneUser)
    {
      throw new BadRequestException(`User not found`);
    }
    return {
      statusCode: 200,
      message: `Successful user ${id} recovery !`,
      data: oneUser
    }
  }


  @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @ApiOperation({ summary: `Editing a user by his id` })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto)
  {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    if (!updatedUser)
    {
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      statusCode: 201,
      message: `Saved user changes`,
      data: updatedUser
    }
  }


  /* @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @ApiOperation({ summary: `Editing a user` })
  @Patch()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req)
  {

    const account = req.user.id
    const updateAccount = await this.usersService.update(account, updateUserDto)

    if (!updateAccount)
    {
      throw new HttpException(`Erreur Server`, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return {
      statusCode: 200,
      message: `Saved user changes`,
      data: updateAccount
    }
  } */


  /** Deleting a user by its id for the admin or family's admin. */
  @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @ApiOperation({ summary: ` Deleting a user account by his id ` })
  @ApiResponse({ status: 200, description: `Account deleted` })
  @Delete(':id')
  async removeUser(@Param('id') id: string)
  {
    const deleteUser = await this.usersService.remove(+id);

    return {
      statusCode: 200,
      message: `The deletion of the user is saved`,
      data: deleteUser
    }
  }
}
