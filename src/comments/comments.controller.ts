import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpException, HttpStatus, UseGuards, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { PhotosService } from 'src/photos/photos.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('COMMENTARIES')
@Controller('commentaries')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
    private readonly userService: UsersService,
    private readonly photoService: PhotosService) {}
  @ApiBody({type: CreateCommentDto})
  @ApiOperation({summary: `Add a commentary to one photo.`})
  @ApiResponse({status: 201, description:`Comment posted`})
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    const newComment = await this.commentsService.create(createCommentDto, user);
    /* console.log(newComment); */
    
    return {
      statusCode: 201,
      message: `The new comment is created.`,
      data: newComment
    };
  };



  @Get()
  async findAll() {
    const allComments = await this.commentsService.findAll();
    if(!allComments){
      throw new HttpException(`No comments found.`,HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: `List of all comments.`,
      data: allComments
    };
  };



  @Get(':id')
  async findOne(@Param('id') id: string) {
    const oneComment = await this.commentsService.findOne(+id);
    if(!oneComment){
      throw new HttpException(`No comments found.`,HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: `Comment display successful.`,
      data: oneComment
    }
  }


  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    const commentExist = await this.commentsService.findOne(+id);
    if(!commentExist){
      throw new HttpException(`No comments found.`,HttpStatus.NOT_FOUND);
    };
    const comment = await this.commentsService.update(+id, updateCommentDto);
    return {
      statusCode: 200,
      message: `The changes in the comment have been taken into account.`,
      data: comment
    };
  };

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const commentExist = await this.commentsService.findOne(+id);
    if(!commentExist){
      throw new HttpException(`No comments found.`,HttpStatus.NOT_FOUND);
    };
    const deletedComment = await this.commentsService.remove(+id);
    if(deletedComment === null){
      throw new NotFoundException();
    };
    return {
      statusCode: 200,
      message: `This commentary number ${id} is deleted.`,
      data: deletedComment
    };
  };
};
