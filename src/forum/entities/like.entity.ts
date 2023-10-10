import { ApiProperty } from '@nestjs/swagger';

export class LikeEntity {
  @ApiProperty({
    type: 'string',
    description: 'ID of the like',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'ID of associated post',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  postId: string;

  @ApiProperty({
    type: 'string',
    description: 'ID of like author',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  authorId: string;

  @ApiProperty({
    type: 'Date',
    description: 'Date of creation of like',
    example: new Date(),
  })
  createdAt: Date;
}
