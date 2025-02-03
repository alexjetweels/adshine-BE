import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { Auth } from 'libs/utils';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreateOrderSuccess,
  responseListOrderSuccess,
} from './response/schema';
import { ListOrderDto } from './dto/list-order.dto';
import { RoleType } from 'libs/utils/enum';

@CoreControllers({
  path: 'orders',
  version: '1',
  tag: 'Order',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Auth()
  @Post()
  @ApiResponseCustom([responseCreateOrderSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  @Auth()
  @Get()
  @ApiResponseCustom([responseListOrderSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: ListOrderDto) {
    return this.ordersService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.ordersService.findOne(+id);
  // }

  @Auth([RoleType.ADMIN])
  @Patch(':id')
  @ApiResponseCustom([])
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    return this.ordersService.update(id, body);
  }
}
