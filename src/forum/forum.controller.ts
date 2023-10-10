import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/utils/common';
import { CommentDto, CreatePostDto, EditPostDto } from './dto';
import { CommentEntity, LikeEntity, PostEntity } from './entities';
import { ForumService } from './forum.service';

@Controller('forum')
@ApiTags('Forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get('/posts')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [PostEntity],
    description: 'All posts',
  })
  getPosts() {
    return this.forumService.getPosts();
  }

  @Get('/posts/id/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: PostEntity,
    description: 'Post with provided ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Post Not Found',
  })
  async getPostById(@Param('id') id: string) {
    const post = this.forumService.getPostById(id);
    if (!post) throw new NotFoundException();

    return post;
  }

  @Get('/posts/user/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [PostEntity],
    description: 'Posts by user',
  })
  getPostsByUserId(@Req() req: RequestWithUser) {
    return this.forumService.getPostsByUserId(req.user.id);
  }

  @Get('/comments/id/:id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: CommentEntity,
    description: 'Comment with specified ID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Cpmment Not Found',
  })
  getCommentById(@Param('id') id: string) {
    const comment = this.forumService.getCommentById(id);
    if (!comment) throw new NotFoundException();

    return comment;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [CommentEntity],
    description: 'Comments under post',
  })
  @Get('/comments/post/:id')
  @UseGuards(AuthGuard)
  getCommentsByPostId(@Param('id') id: string) {
    return this.forumService.getCommentsByPostId(id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PostEntity,
    description: 'Created Post',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @Post('/posts')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  createPost(@Req() req: RequestWithUser, @Body() dto: CreatePostDto) {
    return this.forumService.createPost(req.user.id, dto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentEntity,
    description: 'Created comment',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Associated Post Not Found',
  })
  @Post('/comments')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Req() req: RequestWithUser, @Body() dto: CommentDto) {
    return this.forumService.createComment(req.user.id, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [LikeEntity],
    description: 'Created or deleted like',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Associated Post/Like Not Found',
  })
  @Put('/likes/:id')
  @UseGuards(AuthGuard)
  async likeOrUnlikePost(
    @Req() req: RequestWithUser,
    @Param('id') postId: string,
  ) {
    return this.forumService.likeOrUnlikePost(req.user.id, postId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PostEntity,
    description: 'Updated post record',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Post Not Found',
  })
  @Patch('/posts/:id')
  @UseGuards(AuthGuard)
  async editPost(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: EditPostDto,
  ) {
    return this.forumService.editPost(req.user.id, id, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: CommentEntity,
    description: 'Updated user record',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Comment/Associated Post Not Found',
  })
  @Patch('/comments/:id')
  @UseGuards(AuthGuard)
  async editComment(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: CommentDto,
  ) {
    return this.forumService.editComment(req.user.id, id, dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Post successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Post Not Found',
  })
  @Delete('/posts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deletePost(@Req() req: RequestWithUser, @Param('id') postId: string) {
    return this.forumService.deletePost(req.user, postId);
  }

  @ApiResponse({
    type: CommentEntity,
    description: 'Comment deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'Comment Not Found',
  })
  @Delete('/comments/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Req() req: RequestWithUser,
    @Param('id') commentId: string,
  ) {
    return this.forumService.deleteComment(req.user, commentId);
  }
}
