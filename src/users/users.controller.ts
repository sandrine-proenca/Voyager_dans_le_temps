import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpException, HttpStatus, BadRequestException, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';


/**
 * All controllers for the User table:
 * * **create**         : Creating a user account.
 * * **findAll**        : Retrieving all users.
 * * **findOne**        : Retrieving a user by id.
 * * **update**         : Editing a user.
 * * **remove**         : Deleting a user account by his id.
 */
@ApiTags('USERS') //Creates a USERS category in swagger UI.
@Controller('users')
export class UsersController
{
  constructor(private readonly usersService: UsersService) { }


  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: `Creating a user account` })
  @ApiResponse({ status: 201, description: 'User is created.' })
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
    if (existingEmail)
    {
      throw new HttpException(`This email already exists, please modify it.`, HttpStatus.CONFLICT);
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


  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiOperation({ summary: `Retrieving all users` }) @ApiResponse({ status: 200, description: 'Search for all users are found.' })
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


  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiOperation({ summary: `Retrieving a user by id` }) @ApiResponse({ status: 200, description: 'Search for a user by id is found.' })
  @Get('/account')
  async findOneUser(@GetUser() user)
  {
    const oneUser = await this.usersService.findOne(user.userId);
    if (!oneUser)
    {
      throw new BadRequestException(`User not found`);
    }
    return {
      statusCode: 200,
      message: `Successful user ${user.userId} recovery !`,
      data: oneUser
    }
  }


  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: `Editing a user by his id` }) 
  @ApiResponse({ status: 200, description: 'Your user has been modified' })
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @GetUser() user)
  {    
    const updatedUser = await this.usersService.update(user.userId, updateUserDto);

    if (!updatedUser)
    {
      throw new NotFoundException('No user found');
    }

    return {
      statusCode: 201,
      message: `Saved user changes`,
      data: updatedUser
    }
  }


  /** Deleting a user by its id for the admin or family's admin. */
  @UseGuards(JwtAuthGuard) // verifie que le token est valide
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiOperation({ summary: ` Deleting a user account by his id ` })
  @ApiResponse({ status: 200, description: `Account has been deleted` })
  @Delete()
  async removeUser(@GetUser() user)
  {
    const deleteUser: number = user.userId;
    const data = await this.usersService.findOne(deleteUser);
    if (!data) 
    throw new NotFoundException(`Your account has already been deleted.`);
    const removeUser = await this.usersService.remove(user.userId);

    return {
      statusCode: 200,
      message: `The deletion of the user is saved`,
      data: removeUser
    }
  }
}
