import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { AuthV2 } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import {
  responseCreateOrderSuccess,
  responseListOrderSuccess,
} from './response/schema';

@CoreControllers({
  path: 'orders',
  version: '1',
  tag: 'Order',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @AuthV2([PERMISSION_KEYS.ORDER_CREATE])
  @Post()
  @ApiResponseCustom([responseCreateOrderSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }

  @AuthV2()
  @Get()
  @ApiResponseCustom([responseListOrderSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: ListOrderDto) {
    return this.ordersService.findAll(query);
  }

  @AuthV2()
  @Patch(':id')
  @ApiResponseCustom([])
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    return this.ordersService.update(id, body);
  }
}
