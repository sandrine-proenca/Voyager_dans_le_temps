import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, UsersService]
})
export class ProfilesModule {}
