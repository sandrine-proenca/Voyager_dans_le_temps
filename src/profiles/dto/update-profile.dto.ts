import { PartialType } from '@nestjs/swagger';
import { CreateProfilesDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfilesDto) {}
