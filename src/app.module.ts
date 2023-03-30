import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { User as Users } from './users/entities/user.entity';
import { Commentary as Commentaries } from './comments/entities/comment.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { AlbumsModule } from './albums/albums.module';

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
      entities: [Users, Commentaries],
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    CommentsModule,
    AuthModule,
    AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { constructor(private datasource: DataSource) {} }

