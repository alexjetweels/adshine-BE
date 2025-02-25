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
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { CreateProductCategoriesDto } from './dto/create-product-categories.dto copy';
import { ListProductCategoriesDto } from './dto/list-product-categories.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByName(name: string, idExclude?: number) {
    const where = { name } as Prisma.ProductWhereInput;

    if (idExclude) {
      where.id = {
        not: idExclude,
      };
    }

    return await this.prismaService.product.findFirst({
      where,
    });
  }

  async checkProductCategoryExist(categoryId: number) {
    return this.prismaService.productCategory.findUnique({
      where: { id: categoryId, status: StatusProduct.ACTIVE },
    });
  }

  async findProductCategoryByName(name: string) {
    return this.prismaService.productCategory.findFirst({
      where: { name, status: StatusProduct.ACTIVE },
    });
  }

  async createCategories(body: CreateProductCategoriesDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const nameCategoryIsExist = await this.findProductCategoryByName(body.name);
    if (nameCategoryIsExist) {
      throw new ApiException(
        'Category name already exists',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const newCategory = await this.prismaService.productCategory.create({
      data: { ...body, createBy: user.id },
    });

    return newCategory;
  }

  async findAllCategories(query: ListProductCategoriesDto) {
    const where = {} as {
      OR?: object[];
      status?: StatusProduct;
      categoryId?: number;
    };

    if (query.search) {
      where.OR = [{ name: { contains: query.search, mode: 'insensitive' } }];
    }

    if (query.status) {
      where.status = query.status;
    }

    const records = await this.prismaService.productCategory.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    const total = await this.prismaService.productCategory.count({ where });

    const productCategories = map(records, (record) => {
      return {
        ...record,
      };
    });

    return schemaPaging({
      data: productCategories,
      page: query.page,
      limit: query.limit,
      totalPage: Math.ceil(total / query.limit),
      totalItems: total,
    });
  }

  async create(body: CreateProductDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const isExist = await this.checkProductCategoryExist(body.categoryId);

    if (!isExist) {
      throw new ApiException(
        'Category not existing',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const nameProductIsExist = await this.findByName(body.name);
    if (nameProductIsExist) {
      throw new ApiException(
        'Product name already exists',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const newProduct = await this.prismaService.product.create({
      data: { ...body, createBy: user.id },
    });

    return newProduct;
  }

  async findAll(query: ListProductDto) {
    const where = {} as {
      OR?: object[];
      status?: StatusProduct;
      categoryId?: number;
    };

    if (query.search) {
      where.OR = [{ name: { contains: query.search, mode: 'insensitive' } }];
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.categoryId) {
      where.categoryId = query.categoryId;
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
        ErrorCode.INVALID_INPUT,
      );
    }

    await this.prismaService.product.update({
      where: { id },
      data: body as Prisma.ProductUpdateInput,
    });

    return body;
  }
}
