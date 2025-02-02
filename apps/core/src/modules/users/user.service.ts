import { HttpStatus, Injectable } from '@nestjs/common';
import { WebAppUser } from './user.type';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { ContextProvider } from 'libs/utils/providers/context.provider';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { map, omit, pick } from 'lodash';
import TonWeb from 'tonweb';
import { ListUserDto } from './dto/list-user.dto';
import { generateHash, randomPassword, schemaPaging } from 'libs/utils/util';
import { CoreCreateUserDto } from './dto/create-user.dto';
import { ApiException } from 'libs/utils/exception';
import { ErrorCode } from 'libs/utils/enum';
import { CoreUpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserInfo() {
    const user = ContextProvider.getAuthUser<User>();

    return {
      ...omit(user, ['password']),
    };
  }

  async updateUserProfile(dto: UpdateUserProfileDto) {
    const user = ContextProvider.getAuthUser<User>();

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...pick(dto, ['cityId']),
      },
    });
  }

  async getListUser(query: ListUserDto) {
    const where = {
      role: Role.USER,
    } as { role: Role; details?: object; email?: object; OR?: object[] };

    if (query.search) {
      where.OR = [
        { email: { contains: query.search, mode: 'insensitive' } },
        { name: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const records = await this.prismaService.user.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    const total = await this.prismaService.user.count({ where });

    const users = map(records, (record) => {
      return {
        id: record.id,
        email: record.email,
        name: record.name,
        isBan: record.isBan,
        createdAt: record.createdAt,
      };
    });

    return schemaPaging({
      data: users,
      page: query.page,
      limit: query.limit,
      totalPage: Math.ceil(total / query.limit),
      totalItems: total,
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async createUser(body: CoreCreateUserDto) {
    const existingUser = await this.getUserByEmail(body.email);

    if (existingUser) {
      throw new ApiException(
        'User existing',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const password = randomPassword();
    const hashedPassword = generateHash(password);
    const data = {
      email: body.email,
      password: hashedPassword,
      name: body.name || 'Default Name',
    };

    await this.prismaService.user.create({
      data,
    });

    return { ...data, password };
  }

  async updateUser(userId: number, body: CoreUpdateUserDto) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        role: Role.USER,
      },
    });

    if (!existingUser) {
      throw new ApiException(
        'User not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }
    const data = {
      email: body.email,
      name: body.name,
      isBan: body.isBan,
    };
    let newPassword;

    if (body.email) {
      const existingUserEmail = await this.prismaService.user.findFirst({
        where: {
          email: body.email,
          role: Role.USER,
          id: {
            not: userId,
          },
        },
      });

      if (existingUserEmail) {
        throw new ApiException(
          'Email existing',
          HttpStatus.BAD_REQUEST,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    if (body.isResetPassword) {
      const password = randomPassword();
      newPassword = password;
      const hashedPassword = generateHash(password);
      Object.assign(data, { password: hashedPassword });
    }

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return { ...user, password: newPassword };
  }
}
