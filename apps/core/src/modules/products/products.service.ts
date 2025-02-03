import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ApiException } from 'libs/utils/exception';
import { ErrorCode } from 'libs/utils/enum';
import { ListProductDto } from './dto/list-product.dto';
import { map } from 'lodash';
import { schemaPaging } from 'libs/utils/util';
import { Prisma, StatusProduct } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByCategory(category: string) {
    return await this.prismaService.product.findFirst({
      where: {
        category,
      },
    });
  }
  async create(body: CreateProductDto) {
    const isExist = await this.findByCategory(body.category);

    if (isExist) {
      throw new ApiException(
        'Product category existing',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const newProduct = await this.prismaService.product.create({
      data: body,
    });

    return newProduct;
  }

  async findAll(query: ListProductDto) {
    const where = {} as { OR?: object[]; status?: StatusProduct };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { category: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    console.log('query', query);
    if (query.status) {
      where.status = query.status;
    }

    const records = await this.prismaService.product.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    const total = await this.prismaService.product.count({ where });

    const products = map(records, (record) => {
      return {
        ...record,
      };
    });

    return schemaPaging({
      data: products,
      page: query.page,
      limit: query.limit,
      totalPage: Math.ceil(total / query.limit),
      totalItems: total,
    });
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  async update(id: number, body: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) {
      throw new ApiException(
        'Product not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.NOT_FOUND,
      );
    }

    await this.prismaService.product.update({
      where: { id },
      data: body as Prisma.ProductUpdateInput,
    });

    return body;
  }

}
