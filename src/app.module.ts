import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/entities/user.entity';
import { Commentary } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/entities/album.entity';
import { PhotosModule } from './photos/photos.module';
import { Photo } from './photos/entities/photo.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Album, Commentary, Photo,Image],
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    CommentsModule,
    AuthModule,
    AlbumsModule,
    PhotosModule,
    ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

