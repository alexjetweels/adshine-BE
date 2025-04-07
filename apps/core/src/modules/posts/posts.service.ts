import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { ListPostDto } from './dto/list-post.dto';
import { PostStatus, Prisma, Role } from '@prisma/client';
import { P } from 'pino';
import { schemaPaging } from 'libs/utils/util';
import { ApiException } from 'libs/utils/exception';
import { ErrorCode } from 'libs/utils/enum';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    return this.prismaService.post.create({
      data: {
        ...createPostDto,
        createBy: user.id,
      },
    });
  }

  async findAll(listPostDto: ListPostDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    if (user.role !== Role.ADMIN) {
      listPostDto.status = PostStatus.SHOW;
    }

    const where = {} as Prisma.PostWhereInput;

    if (listPostDto.search) {
      where.OR = [
        {
          title: { contains: listPostDto.search, mode: 'insensitive' },
        },
        {
          content: {
            contains: listPostDto.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (listPostDto.status) {
      where.status = listPostDto.status;
    }

    if (listPostDto.type) {
      where.type = listPostDto.type;
    }

    const records = await this.prismaService.post.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        // content: true,
        type: true,
        status: true,
        iconType: true,
        createdAt: true,
        updatedAt: true,
        create: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      take: listPostDto.limit,
      skip: (listPostDto.page - 1) * listPostDto.limit,
    });

    const total = await this.prismaService.post.count({ where });

    return schemaPaging({
      data: records,
      page: listPostDto.page,
      limit: listPostDto.limit,
      totalPage: Math.ceil(total / listPostDto.limit),
      totalItems: total,
    });
  }

  async findOne(id: string) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    if (!post) {
      throw new ApiException(
        'Bài viết không tồn tại',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    await this.prismaService.post.update({
      where: { id },
      data: updatePostDto as Prisma.PostUpdateInput,
    });

    return updatePostDto;
  }
}
