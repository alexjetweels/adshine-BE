import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator';

export class CoreCreateUserDto {
  @ApiProperty({
    description: 'User email address, should be a valid email format',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User name, should not exceed 50 characters',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}
