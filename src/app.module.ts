import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PhotographiesModule } from './photographies/photographies.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/entities/user.entity';
import { Commentary } from './comments/entities/comment.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Photography } from './photographies/entities/photography.entity';
import { DataSource } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Profile,Photography, Commentary/* , join(__dirname, '*', '.entity.{ts,js}'), */],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ProfilesModule,
    PhotographiesModule,
    CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { constructor(private datasource: DataSource) {} }
