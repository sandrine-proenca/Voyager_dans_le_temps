import { Controller, Get, Request, Post, UseGuards, UploadedFile, UploadedFiles, UseInterceptors, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

@Controller()
export class AppController {

  constructor ( private readonly authService: AuthService) {}

  @ApiTags (`Sign In`)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login ( @Request() req: any ) {
    return this.authService.login (req.user);
  }

  @ApiTags (`User Profile`)
  @UseGuards(JwtAuthGuard)
  @Get(`userprofile`)
  getProfile ( @Request() req ) {
    return req.user
  }

  /////////////////////////////////////
  // import and get photos
  /////////////////////////////////////

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
seeUploadedFile(@Param('imgpath') image, @Res() res) {
  return res.sendFile(image, { root: './files' });
}
}
