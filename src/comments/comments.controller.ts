import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { PhotosService } from 'src/photos/photos.service';
import { GetUser } from 'src/auth/get-user.decorator';



@ApiTags('COMMENTARIES')
@Controller('commentaries')
export class CommentsController
{
  constructor(private readonly commentsService: CommentsService/* ,
    private readonly userService: UsersService,
    private readonly photoService: PhotosService */) { }



    @ApiBody({ type: CreateCommentDto })
    @ApiOperation({ summary: "Ajout d'un commentaire sur topic" })
    @ApiResponse({ status: 201, description: 'Commentaire posté' })
    @Post()
    async create( @Body() createCommentDto: CreateCommentDto, @Request() req ){
      const newComment = await this.commentsService.createComment(createCommentDto, req.user);
      return {
        statusCode: 201,
        data: newComment,
        message: "votre commentaire a bien été ajouté"
      }
    }


    
    @Get()
    async findAll() {
      const response = await this.commentsService.findAll();
      if (!response) {
        throw new HttpException("aucun commentaire trouvé", HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: 200,
        data: response,
        message: "Liste de tous les commentaires"
      }
    }





 /*  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiBody({ type: CreateCommentDto })
  @ApiOperation({ summary: `Add a commentary to one photo.` })
  @ApiResponse({ status: 201, description: `Comment posted` })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Request() req
    )
    // @GetUser() user:User
  {
    console.log('Test controller');

    return {
      message: `Comment is valide`,
      data: await this.commentsService.create(createCommentDto, req.user.id)
    }

    
  };



  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiOperation({ summary: "Search for all comments" }) @ApiResponse({ status: 200, description: 'Search for all comments are found.' })
  @Get()
  async findAll()
  {

    const allComments = await this.commentsService.findAll();
    //Error message if all comments do not exist.
    if (!allComments)
    {
      throw new HttpException(`No comments found.`, HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: `List of all comments.`,
      data: allComments
    };
  };



  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiOperation({ summary: "Recherche d'un commentaire par id" })
  @ApiResponse({ status: 200, description: 'Search for a comment by id is found.' })
  @Get(':id')
  async findOne(@Param('id') id: number)
  {
    console.log(`---test-controller-1a-avant-const oneComment--->`);
    const oneComment = await this.commentsService.findOneCommentary(id);
    //Error message if the comment does not exist.
    if (!oneComment)
    {
      throw new HttpException(`No comments found.`, HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: `Comment display successful.`,
      data: oneComment
    }
  }



  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiBody({ type: UpdateCommentDto })
  @ApiOperation({ summary: `Editing a comment by his id.` })
  @ApiResponse({ status: 200, description: 'Your comment has been modified' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @GetUser() getUser)
  {
    const commentExist = await this.commentsService.findOneCommentary(id);
    //Error message if the comment does not exist.
    if (!commentExist)
    {
      throw new HttpException(`No comments found.`, HttpStatus.NOT_FOUND);
    };
    if (commentExist.user.id !== getUser.user.id)
    {
      throw new HttpException(`Not authorized`, HttpStatus.FORBIDDEN)
    }
    const comment = await this.commentsService.update(id, updateCommentDto);
    return {
      statusCode: 200,
      message: `The changes in the comment have been taken into account.`,
      data: comment
    };
  };



  @UseGuards(JwtAuthGuard) // The user must be logged in / registered.
  @UseInterceptors(ClassSerializerInterceptor) // Does not return entity properties marked with @Exclude()
  @ApiOperation({ summary: ` Deleting a commentary by his id ` })
  @ApiResponse({ status: 200, description: `Commentary has been deleted` })
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() getUser)
  {
    const commentExist = await this.commentsService.findOneCommentary(id);
    //Error message if the comment does not exist.
    if (!commentExist)
    {
      throw new HttpException(`No comments found.`, HttpStatus.NOT_FOUND);
    };
    if (commentExist.user.id !== getUser.user.id)
    {
      throw new HttpException(`Not authorized`, HttpStatus.FORBIDDEN)
    }
    const deletedComment = await this.commentsService.deleteCommentary(id);
    if (deletedComment === null)
    {
      throw new NotFoundException();
    };
    return {
      statusCode: 200,
      message: `This commentary number ${id} is deleted.`,
      data: deletedComment
    };
  }; */
};
