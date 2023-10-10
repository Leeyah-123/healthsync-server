import { ApiProperty } from '@nestjs/swagger';

export class CommentEntity {
  @ApiProperty({
    type: 'string',
    description: 'ID of the comment',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Content of the cpmment',
    example: 'My very interesting comment',
  })
  comment: string;

  @ApiProperty({
    type: 'string',
    description: 'ID of post',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  postId: string;

  @ApiProperty({
    type: 'string',
    description: 'ID of comment author',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  authorId: string;

  @ApiProperty({
    type: 'Date',
    description: 'Date of creation of comment',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'Date of last update of comment',
    example: new Date(),
  })
  updatedAt: Date;
}
