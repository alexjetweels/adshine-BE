import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CoreUpdateUserDto {
  @ApiProperty({
    description: 'User email address, should be a valid email format',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'User name, should not exceed 50 characters',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'reset password',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isResetPassword?: boolean;

  @ApiProperty({
    description: 'block user',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isBan?: boolean;
}
