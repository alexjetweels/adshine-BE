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
import { UpdateProductCategoriesDto } from './dto/update-product-categoies.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findProductByName(
    name: string,
    options?: { status?: StatusProduct; idExclude?: number },
  ) {
    const where = { name } as Prisma.ProductWhereInput;

    if (options?.idExclude) {
      where.id = {
        not: options?.idExclude,
      };
    }

    if (options?.status) {
      where.status = options?.status;
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

  async findProductCategoryByName(
    name: string,
    options?: { status?: StatusProduct; idExclude?: number },
  ) {
    const where = { name } as Prisma.ProductCategoryWhereInput;

    if (options?.idExclude) {
      where.id = {
        not: options?.idExclude,
      };
    }

    if (options?.status) {
      where.status = options?.status;
    }

    return await this.prismaService.productCategory.findFirst({
      where,
    });
  }

  async createCategories(body: CreateProductCategoriesDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const nameCategoryIsExist = await this.findProductCategoryByName(
      body.name,
      { status: StatusProduct.ACTIVE },
    );
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

  async createProduct(body: CreateProductDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const isExist = await this.checkProductCategoryExist(body.categoryId);

    if (!isExist) {
      throw new ApiException(
        'Category not existing',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const nameProductIsExist = await this.findProductByName(body.name, {
      status: StatusProduct.ACTIVE,
    });
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

  async findAllProduct(query: ListProductDto) {
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
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
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

  async findOneProduct(id: number) {
    return await this.prismaService.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOneProductCategory(id: number) {
    return await this.prismaService.productCategory.findUnique({
      where: { id },
    });
  }

  async updateCategory(id: number, body: UpdateProductCategoriesDto) {
    const productCategory = await this.findOneProductCategory(id);

    if (!productCategory) {
      throw new ApiException(
        'Product category not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (body.name || body.status) {
      const condition = { idExclude: id } as {
        idExclude?: number;
        status?: StatusProduct;
      };
      if (
        body.status === StatusProduct.ACTIVE &&
        productCategory.status === StatusProduct.INACTIVE
      ) {
        condition.status = body.status;
      }
      const nameCategoryIsExist = await this.findProductCategoryByName(
        body.name || productCategory.name,
        condition,
      );
      if (nameCategoryIsExist) {
        throw new ApiException(
          'Category name already exists',
          HttpStatus.BAD_REQUEST,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    await this.prismaService.productCategory.update({
      where: { id },
      data: body as Prisma.ProductUpdateInput,
    });

    return body;
  }

  async updateProduct(id: number, body: UpdateProductDto) {
    const product = await this.findOneProduct(id);

    if (!product) {
      throw new ApiException(
        'Product not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (body.name || body.status) {
      const condition = { idExclude: id } as {
        idExclude?: number;
        status?: StatusProduct;
      };
      if (
        body.status === StatusProduct.ACTIVE &&
        product.status === StatusProduct.INACTIVE
      ) {
        condition.status = body.status;
      }
      const nameProductIsExist = await this.findProductByName(
        body.name || product.name,
        condition,
      );
      if (nameProductIsExist) {
        throw new ApiException(
          'Product name already exists',
          HttpStatus.BAD_REQUEST,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    await this.prismaService.product.update({
      where: { id },
      data: body as Prisma.ProductUpdateInput,
    });

    return body;
  }
}
