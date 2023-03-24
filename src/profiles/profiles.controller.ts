import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus, ClassSerializerInterceptor } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfilesDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { profile } from 'console';
import { Profiles } from './entities/profile.entity';
import { HttpException } from '@nestjs/common/exceptions';
import { AdminGuard } from 'src/auth/user-role.enum/admin.guard';
import { FamilyAdminGuard } from 'src/auth/user-role.enum/family-admin.guard';



/**
 * @class ProfilesController
 * A class allowing: to bring together several CRUD methods related to the profile part.
 * A method to:
 * * Control incoming data when creating a profile.
 * * Check and enforce that the constraints are respected.
 * * Return a warning message in case of error or success.
 */
@ApiTags(`PROFILES`)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService) {}


  // Creating the profile with error message.
  @ApiBody({type: CreateProfilesDto})
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: `Adding a profile to a user account.`})
  @Post()
  async create(@Body() createProfileDto: CreateProfilesDto,@Request() req) {
    if ( req.user.profile){
      throw new HttpException(`Impossible you already have a profile.`, HttpStatus.FORBIDDEN)
    }
    const profileCreated = await this.profilesService.createProfile(req.user, createProfileDto)
    return {
      statusCode: 201,
      message:`Profile created.`,
      data: profileCreated
    }
  }

  // Recovery of all profiles with error message.
  @ApiOperation({ summary: `Search for user profiles.`})
  @Get()
  async findAll() {
    const profileExist = await this.profilesService.findAllProfiles();
    if ( !profileExist){
      throw new HttpException(`No profile exists.`, HttpStatus.NOT_FOUND)
    }
    return profileExist
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOneProfileById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateProfileById(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.removeProfileById(+id);
  }
}
