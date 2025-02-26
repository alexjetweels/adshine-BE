import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { AuthV2 } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ListProductDto } from './dto/list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import {
  responseCreateProductCategorySuccess,
  responseCreateProductSuccess,
  responseDetailProductSuccess,
  responseListProductCategorySuccess,
  responseListProductSuccess,
  responseUpdateProductCategorySuccess,
  responseUpdateProductSuccess,
} from './response/schema';
import { CreateProductCategoriesDto } from './dto/create-product-categories.dto copy';
import { ListProductCategoriesDto } from './dto/list-product-categories.dto';
import { UpdateProductCategoriesDto } from './dto/update-product-categoies.dto';

@CoreControllers({
  path: 'products',
  version: '1',
  tag: 'Product',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @AuthV2([PERMISSION_KEYS.PRODUCT_CREATE])
  @Post('categories')
  @ApiResponseCustom([responseCreateProductCategorySuccess])
  @HttpCode(HttpStatus.CREATED)
  createCategories(@Body() body: CreateProductCategoriesDto) {
    return this.productsService.createCategories(body);
  }

  @AuthV2()
  @Get('categories')
  @ApiResponseCustom([responseListProductCategorySuccess])
  @HttpCode(HttpStatus.OK)
  findAllCategories(@Query() body: ListProductCategoriesDto) {
    return this.productsService.findAllCategories(body);
  }

  @AuthV2([PERMISSION_KEYS.PRODUCT_UPDATE])
  @Patch('categories/:id')
  @ApiResponseCustom([responseUpdateProductCategorySuccess])
  @HttpCode(HttpStatus.OK)
  updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateProductCategoriesDto,
  ) {
    return this.productsService.updateCategory(id, body);
  }

  @AuthV2([PERMISSION_KEYS.PRODUCT_CREATE])
  @Post()
  @ApiResponseCustom([responseCreateProductSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  @AuthV2()
  @Get()
  @ApiResponseCustom([responseListProductSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: ListProductDto) {
    return this.productsService.findAllProduct(query);
  }

  @AuthV2()
  @Get(':id')
  @ApiResponseCustom([responseDetailProductSuccess])
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.productsService.findOneProduct(id);
  }

  @AuthV2([PERMISSION_KEYS.PRODUCT_UPDATE])
  @Patch(':id')
  @ApiResponseCustom([responseUpdateProductSuccess])
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productsService.updateProduct(id, body);
  }
}
