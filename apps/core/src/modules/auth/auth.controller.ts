import { Body, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth, AuthRefreshToken } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { ContextProvider } from 'libs/utils/providers/context.provider';
import { responseSuccessBasic } from 'libs/utils/schema';
import { CoreUserRegisterDto } from './dto/register.dto';
import { AuthService } from './services/auth.service';
import {
  responseLoginSuccess,
  responseRefreshTokenSuccess,
  responseRegisterFail,
  responseRegisterSuccess,
} from './response/schema';
import { CoreUserLoginDto } from './dto/login.dto';
import { CoreUserChangePasswordDto } from './dto/change-password.dto';

@CoreControllers({
  path: 'auth',
  version: '1',
  tag: 'Auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponseCustom([responseLoginSuccess])
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: CoreUserLoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  @ApiResponseCustom([responseRefreshTokenSuccess])
  @AuthRefreshToken()
  @HttpCode(HttpStatus.OK)
  async refreshToken() {
    const user = ContextProvider.getAuthUser<User>();

    return this.authService.generateNewToken(user, true);
  }

  @Auth()
  @ApiResponseCustom([responseSuccessBasic])
  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() body: CoreUserChangePasswordDto) {
    return this.authService.changePassword(body);
  }
}
