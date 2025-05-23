import { Body, HttpCode, HttpStatus, Patch, Post, Sse } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthRefreshToken, AuthV2 } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { ContextProvider } from 'libs/utils/providers/context.provider';
import { responseSuccessBasic } from 'libs/utils/schema';
import { CoreUserChangePasswordDto } from './dto/change-password.dto';
import { CoreUserLoginDto } from './dto/login.dto';
import {
  responseLoginSuccess,
  responseRefreshTokenSuccess,
} from './response/schema';
import { AuthService } from './services/auth.service';
import { interval, map, Observable, Subject } from 'rxjs';
import { OneSignalService } from '../one-signal/one-signal.service';

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
  notificationEvent: Subject<any> = new Subject();
  @AuthV2()
  @ApiResponseCustom([responseSuccessBasic])
  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() body: CoreUserChangePasswordDto) {
    return this.authService.changePassword(body);
  }

  @AuthV2()
  @Sse('sse')
  sse(): Observable<any> {
    return new Observable((observer) => {
      const subscription = interval(1000)
        .pipe(
          map((_) => ({
            data: { hello: `world ${new Date().toISOString()}` },
          })),
        )
        .subscribe(observer);

      setTimeout(() => {
        observer.complete(); // Đóng SSE sau 60s
      }, 60000);

      return () => subscription.unsubscribe();
    });
  }
}
