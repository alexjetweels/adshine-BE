import { HttpStatus, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ErrorCode } from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import { generateHash, validateHash } from 'libs/utils/util';
import { CoreUserLoginDto } from '../dto/login.dto';
import { CoreUserRegisterDto } from '../dto/register.dto';
import { TokenService } from './token.service';
import { CoreUserChangePasswordDto } from '../dto/change-password.dto';
import { ContextProvider } from 'libs/utils/providers/context.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
  ) {}

  async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }
  async register(
    body: CoreUserRegisterDto,
    optional?: {
      isAdmin?: boolean;
    },
  ) {
    const existingUser = await this.getUserByEmail(body.email);

    if (existingUser) {
      throw new ApiException(
        'Email người dùng đã tồn tại',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const hashedPassword = generateHash(body.password);

    const newUser = await this.prismaService.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: optional?.isAdmin ? Role.ADMIN : Role.USER,
      },
    });

    return this.tokenService.signToken(newUser);
  }

  async login(body: CoreUserLoginDto) {
    const user = await this.getUserByEmail(body.email);

    if (!user) {
      throw new ApiException(
        'Không tìm thấy người dùng',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    const isMathPassword = await validateHash(body.password, user.password);

    if (!isMathPassword) {
      throw new ApiException(
        'Email hoặc mật khẩu không đúng',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (user.isBan) {
      throw new ApiException('Người dùng đang bị ban', HttpStatus.FORBIDDEN);
    }

    return this.tokenService.signToken(user);
  }

  async generateNewToken(user: User, isAccessToken = false) {
    return this.tokenService.signToken(user, isAccessToken);
  }

  async changePassword(body: CoreUserChangePasswordDto) {
    const user = ContextProvider.getAuthUser<User>();

    const isMathPassword = await validateHash(body.oldPassword, user.password);

    if (!isMathPassword) {
      throw new ApiException(
        'Mật khẩu cũ không đúng',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    const hashedPassword = generateHash(body.newPassword);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return true;
  }
}
