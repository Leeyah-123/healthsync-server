import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'Comment',
    example: 'I do not particularly like this post.',
  })
  comment: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'Post ID',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  postId: string;
}
