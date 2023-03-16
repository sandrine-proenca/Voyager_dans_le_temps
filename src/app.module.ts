import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PhotographiesModule } from './photographies/photographies.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, ProfilesModule, PhotographiesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
