import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Auth } from 'libs/utils';
import { RoleType } from 'libs/utils/enum';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreateProductSuccess,
  responseDetailProductSuccess,
  responseListProductSuccess,
  responseUpdateProductSuccess,
} from './response/schema';
import { ListProductDto } from './dto/list-product.dto';

@CoreControllers({
  path: 'products',
  version: '1',
  tag: 'Product',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth([RoleType.ADMIN])
  @Post()
  @ApiResponseCustom([responseCreateProductSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Auth()
  @Get()
  @ApiResponseCustom([responseListProductSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: ListProductDto) {
    return this.productsService.findAll(query);
  }

  @Auth()
  @Get(':id')
  @ApiResponseCustom([responseDetailProductSuccess])
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Auth([RoleType.ADMIN])
  @Patch(':id')
  @ApiResponseCustom([responseUpdateProductSuccess])
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }
}
