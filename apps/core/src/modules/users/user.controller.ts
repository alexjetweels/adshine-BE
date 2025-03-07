import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { AuthV2 } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { CoreCreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { CoreUpdateUserDto } from './dto/update-user.dto';
import {
  responseCreateUserSuccess,
  responseGetListUserSuccess,
  responseMeSuccess,
  responseStatisticsUserSuccess,
  responseUpdateUserSuccess,
} from './response/schema';
import { UserService } from './user.service';
import { UserStatsDto } from './dto/user-stats.dto';

@CoreControllers({
  path: 'users',
  version: '1',
  tag: 'User',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthV2()
  @Get('me')
  @ApiResponseCustom([responseMeSuccess])
  @HttpCode(HttpStatus.OK)
  async getMe() {
    return this.userService.getUserInfo();
  }

  @AuthV2([PERMISSION_KEYS.USER_VIEW])
  @Get()
  @ApiResponseCustom([responseGetListUserSuccess])
  @HttpCode(HttpStatus.OK)
  async getListUser(@Query() query: ListUserDto) {
    return this.userService.getListUser(query);
  }

  @AuthV2([PERMISSION_KEYS.USER_CREATE])
  @Post()
  @ApiResponseCustom([responseCreateUserSuccess])
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CoreCreateUserDto) {
    return this.userService.createUser(body);
  }

  @AuthV2([PERMISSION_KEYS.USER_UPDATE])
  @Post(':userId')
  @ApiResponseCustom([responseUpdateUserSuccess])
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId') userId: number,
    @Body() body: CoreUpdateUserDto,
  ) {
    return this.userService.updateUser(userId, body);
  }

  @AuthV2([PERMISSION_KEYS.USER_VIEW])
  @Get(':userId')
  @ApiResponseCustom([responseUpdateUserSuccess])
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('userId') userId: number) {
    return this.userService.findOne(userId);
  }

  @AuthV2([PERMISSION_KEYS.USER_VIEW])
  @AuthV2()
  @Get('/:userId/stats')
  @ApiResponseCustom([responseStatisticsUserSuccess])
  @HttpCode(HttpStatus.OK)
  async getStatisticsUser(
    @Param('userId') userId: number,
    @Query() query: UserStatsDto,
  ) {
    return this.userService.getStatisticsUser(userId, query);
  }
}
