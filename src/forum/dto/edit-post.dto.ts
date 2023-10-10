import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiPropertyOptional({
    type: 'string',
    description: 'Content of the post',
    example: 'Very long and compelling content...yada yada yada',
  })
  content?: string;
}
