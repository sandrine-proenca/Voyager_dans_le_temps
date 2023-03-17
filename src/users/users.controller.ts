import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
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

  @ApiTags('Sign Up')
  @ApiOperation({ summary: "Création d'un compte utilisateur" })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    if(createUserDto.password !== createUserDto.password_confirm){
      throw new ConflictException("les most de passe sont différents")
    }

    const userExist = await this.usersService.findUserByEmail(createUserDto.email)
    if(userExist){
      throw new HttpException("L'adresse mail existe déjà !", HttpStatus.NOT_ACCEPTABLE);
    }

    createUserDto.password = await encodePassword(createUserDto.password)

    const newAccount = await this.usersService.create(createUserDto)

    return {
      statusCode: 201,
      message: "Création du nouveau compte réussie !",
      data: newAccount};
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
