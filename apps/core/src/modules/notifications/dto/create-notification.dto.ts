import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { NotificationStatus } from '@prisma/client';
export class CreateNotificationDto {
  @ApiProperty({
    description: 'The title',
    example: 'Example Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiProperty({
    description: 'The content',
    example: 'Example Content',
    required: true,
  })
  @IsString()
  @MaxLength(500)
  content: string;

  //status
  @ApiProperty({
    description: 'The status',
    example: 'Example Status',
    required: false,
  })
  @IsOptional()
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;

  //icon type
  @ApiProperty({
    description: 'The icon type',
    example: 'Example Icon Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  iconType?: string;

  //icon url
  @ApiProperty({
    description: 'The icon url',
    example: 'Example Icon Url',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  iconUrl?: string;
}
