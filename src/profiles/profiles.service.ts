import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateProfilesDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profiles } from './entities/profile.entity';

@Injectable()
// Class for managing SQL queries for profiles.
export class ProfilesService {

  // Create a profile in the database.
  async createProfile( userLog: User, createProfilesDto: CreateProfilesDto): Promise <Profiles> {
    const profile = new Profiles()
    profile.job = createProfilesDto.job
    profile.father = createProfilesDto.father
    profile.mother = createProfilesDto.mother
    profile.myself = createProfilesDto.myself
    profile.travel = createProfilesDto.travel
    profile.anecdote = createProfilesDto.anecdote
    profile.user = userLog

    await profile.save()

    return profile
  }


  // Find all profiles.
  async findAllProfiles() {
    return await Profiles.find();
  }


  // Find a profile with the id.
  async findOneProfileById(id: number) {
    return  await Profiles.findOneBy({id: id});
  }


  // Edit a profile by its id.
  async updateProfileById(id: number, updateProfilesDto: UpdateProfileDto): Promise <Profiles> {

    const profile = await Profiles.findOneBy({id})

    profile.job = updateProfilesDto.job
    profile.father = updateProfilesDto.father
    profile.mother = updateProfilesDto.mother
    profile.myself = updateProfilesDto.myself
    profile.travel = updateProfilesDto.travel
    profile.anecdote = updateProfilesDto.anecdote
    
    return await profile.save();
  }


  // Delete a profile by its id.
  removeProfileById(id: number) {
    return `This action removes a #${id} profile`;
  }
}
