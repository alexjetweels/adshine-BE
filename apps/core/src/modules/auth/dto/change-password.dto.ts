import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { CustomValidateIsPassword } from 'libs/utils/pipes/validation.pipe';

export class CoreUserChangePasswordDto {
  @ApiProperty({
    description:
      'User password, should be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(CustomValidateIsPassword)
  oldPassword: string;

  @ApiProperty({
    description:
      'User password, should be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(CustomValidateIsPassword)
  newPassword: string;
}
