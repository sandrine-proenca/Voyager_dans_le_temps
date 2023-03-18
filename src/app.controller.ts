import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {

  constructor ( private authService: AuthService) {}

  @ApiTags (`Sign In`)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login ( @Request() req: any ) {
    return this.authService.login (req.user);
  }

  @ApiTags (`User Profile`)
  @UseGuards(JwtAuthGuard)
  @Get(`profile`)
  getProfile ( @Request() req ) {
    return req.user
  }
}
