import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class CoreUpdateUserDto {
  @ApiProperty({
    description: 'User email address, should be a valid email format',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'User name, should not exceed 50 characters',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'reset password',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isResetPassword?: boolean;

  @ApiProperty({
    description: 'block user',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isBan?: boolean;

  @ApiProperty({
    description: 'Permission group ids, should be an array of string',
    example: [
      'e83e4a7c-4a61-458b-911d-f5f247e40865',
      'e83e4a7c-4a61-458b-911d-f5f247e40865',
    ],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  permissionGroupIds: UUID[];
}
