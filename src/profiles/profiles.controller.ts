import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus, ClassSerializerInterceptor } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfilesDto } from './dto/create-profile.dto';
import { UpdateProfileDto as UpdateProfilesDto } from './dto/update-profile.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Req, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { profile } from 'console';
import { Profiles } from './entities/profile.entity';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { AdminGuard } from 'src/auth/user-role.enum/admin.guard';
import { FamilyAdminGuard } from 'src/auth/user-role.enum/family-admin.guard';import { UserGuard } from 'src/auth/user-role.enum/user.guard';



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
  @UseGuards(JwtAuthGuard, FamilyAdminGuard, AdminGuard)
  @Get()
  async findAll() {
    const profileExist = await this.profilesService.findAllProfiles();
    if ( !profileExist){
      throw new HttpException(`No profile exists.`, HttpStatus.NOT_FOUND)
    }
    return profileExist
  }

  
  
  @ApiOperation({ summary: "Search for a profile by id." })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profileById = await this.profilesService.findOneProfileById(+id);
    if ( !profileById){
      throw new HttpException (`The profile does not exist.`, HttpStatus.NOT_FOUND)
    }
    return {
      statusCode: 200,
      message: `Successful recovery of your profile.`,
      data: profileById
    }
  }

  
  // Edit a profile by its id.
  @UseGuards(JwtAuthGuard, FamilyAdminGuard, AdminGuard)
  @ApiOperation({summary: `Editing a profile.`})
  @Patch()
  async update(@Body() updateProfilesDto: UpdateProfilesDto, @Req() req) {

    // condition to know if the presentation of the user exists.
    if ( req.user.profile === null ){
      throw new HttpException(`Impossible! Please create a profile first.`, HttpStatus.FORBIDDEN)
    }

    const updatedProfile = await this.profilesService.updateProfileById(req.user.profile.id, updateProfilesDto)

    return{
      statusCode: 200,
      message: `The profile has been modified.`,
      data: updatedProfile
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.removeProfileById(+id);
  }
}
