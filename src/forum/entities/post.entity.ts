import { ApiProperty } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty({
    type: 'string',
    description: 'ID of the post',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Title of post',
    example: 'Very Interesting Title',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Content of the post',
    example: 'Lots of very interesting stuff...',
  })
  content: string;

  @ApiProperty({
    type: 'string',
    description: 'ID of post author',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  authorId: string;

  @ApiProperty({
    type: 'string',
    description: 'Slug generated from post title',
    example: 'very-interesting-title',
  })
  slug: string;

  @ApiProperty({
    type: 'Date',
    description: 'Date of creation of post',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: 'Date',
    description: 'Date of last update of post',
    example: new Date(),
  })
  updatedAt: Date;
}
