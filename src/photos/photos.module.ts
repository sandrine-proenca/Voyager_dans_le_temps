import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { MulterModule } from '@nestjs/platform-express';
import { AlbumsService } from 'src/albums/albums.service';
import PhotosController from './photos.controller';
import PhotosService from './photos.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () =>({
        dest: './uploads',
      })
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService,UsersService,AlbumsService]
})
export class PhotosModule {}
