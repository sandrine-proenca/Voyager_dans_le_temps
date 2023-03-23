import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfilesDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { profile } from 'console';
import { Profiles } from './entities/profile.entity';
import { HttpException } from '@nestjs/common/exceptions';

@ApiTags(`PROFILES`)
@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly usersService: UsersService) {}

  @ApiBody({type: CreateProfilesDto})
  @ApiOperation({ summary: `Adding a profile to a user account.`})
  @Post()
  // Creating the profile with error message.
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


  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
