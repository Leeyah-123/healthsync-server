import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { SuspensionTimes } from 'src/utils/common';

export class SuspendUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: "User's id" })
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['1 week', '1 month', '3 months'])
  @ApiProperty({
    type: 'string',
    description:
      "How long user will be suspended. Can be either '1 week', '1 month' or '3 months'",
  })
  suspensionTime: SuspensionTimes;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Reason for suspending user',
  })
  reason: string;
}
