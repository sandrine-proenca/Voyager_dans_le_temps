import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UsersService } from 'src/users/users.service';
import { PhotosService } from 'src/photos/photos.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, PhotosService]
})
export class CommentsModule {}
