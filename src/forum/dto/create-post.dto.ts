import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'Title of the post',
    example: 'My very interesting post',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'Content of the post',
    example: 'Very long and compelling content...yada yada yada',
  })
  content: string;
}
