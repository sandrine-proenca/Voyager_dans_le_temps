import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AdminGuard } from './user-role.enum/admin.guard';
import { FamilyAdminGuard } from './user-role.enum/family-admin.guard';
import { UserGuard } from './user-role.enum/user.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '5000000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, AdminGuard, FamilyAdminGuard, UserGuard],
  exports: [AuthService, AdminGuard, FamilyAdminGuard, UserGuard],
})
export class AuthModule {}
