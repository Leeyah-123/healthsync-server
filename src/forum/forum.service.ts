import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment, Post, PrismaClient, User } from '@prisma/client';
import { CommentDto, CreatePostDto, EditPostDto } from './dto';

const prisma = new PrismaClient();

@Injectable()
export class ForumService {
  getPosts(): Promise<Post[]> {
    return prisma.post.findMany({ include: { _count: true } });
  }

  getPostById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({ where: { id }, include: { _count: true } });
  }

  getPostsByUserId(userId: string): Promise<Post[]> {
    return prisma.post.findMany({
      where: { authorId: userId },
      include: { _count: true },
    });
  }

  getCommentById(id: string): Promise<Comment | null> {
    return prisma.comment.findUnique({ where: { id } });
  }

  getCommentsByPostId(postId: string): Promise<Comment[]> {
    return prisma.comment.findMany({ where: { postId } });
  }

  createPost(authorId: string, dto: CreatePostDto): Promise<Post> {
    const slug: string = dto.title.toLowerCase().split(' ').join('-');

    return prisma.post.create({
      data: {
        ...dto,
        slug,
        authorId,
      },
      include: { _count: true },
    });
  }

  async createComment(authorId: string, dto: CommentDto) {
    const post = await this.getPostById(dto.postId);
    if (!post) throw new NotFoundException('Post Not Found');

    return prisma.comment.create({
      data: { ...dto, authorId },
    });
  }

  async likeOrUnlikePost(authorId: string, postId: string) {
    const post = await this.getPostById(postId);
    if (!post) throw new NotFoundException('Post Not Found');

    const like = await prisma.like.findFirst({ where: { postId, authorId } });

    // If user has already liked this post, delete like. Else, create like
    if (like) await prisma.like.delete({ where: { id: like.id } });
    else return prisma.like.create({ data: { postId, authorId } });
  }

  async editPost(authorId: string, id: string, dto: EditPostDto) {
    const post = await this.getPostById(id);
    if (!post) throw new NotFoundException('Post Not Found');

    if (post.authorId !== authorId)
      throw new UnauthorizedException(
        "You're not allowed to edit this comment",
      );

    return prisma.post.update({
      where: { id },
      data: { ...dto },
    });
  }

  async editComment(authorId: string, id: string, dto: CommentDto) {
    const post = await this.getPostById(dto.postId);
    if (!post) throw new NotFoundException('Post Not Found');

    const comment = await this.getCommentById(id);
    if (!comment) throw new NotFoundException('Comment Not Found');

    if (comment.authorId !== authorId)
      throw new UnauthorizedException(
        "You're not allowed to edit this comment",
      );

    return prisma.comment.update({
      where: { id },
      data: { comment: dto.comment },
    });
  }

  async deletePost(user: User, postId: string) {
    const post = await this.getPostById(postId);
    if (!post) throw new NotFoundException('Post Not Found');

    if (user.id !== post.authorId && user.role !== 'moderator')
      throw new UnauthorizedException("You're not allowed to delete this post");

    return prisma.post.delete({ where: { id: postId } });
  }

  async deleteComment(user: User, commentId: string) {
    const comment = await this.getCommentById(commentId);
    if (!comment) throw new NotFoundException('Comment Not Found');

    if (user.id !== comment.authorId && user.role !== 'moderator')
      throw new UnauthorizedException(
        "You're not allowed to delete this comment",
      );

    return prisma.comment.delete({ where: { id: commentId } });
  }
}
