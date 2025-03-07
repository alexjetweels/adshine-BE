import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DateField, DateFieldOptional } from 'libs/utils';

export class UserStatsDto {
  @ApiProperty({
    description: 'Start time',
    example: '2025-03-07 15:42:15.490',
    required: true,
  })
  @IsNotEmpty()
  @DateField()
  startTime: Date;

  @ApiProperty({
    description: 'End time',
    example: '2025-03-06 15:42:15.490',
    required: true,
  })
  @IsNotEmpty()
  @DateField()
  endTime: Date;
}
