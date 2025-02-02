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
import { Auth } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserService } from './user.service';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreateUserSuccess,
  responseGetListUserSuccess,
  responseMeSuccess,
  responseUpdateUserSuccess,
} from './response/schema';
import { RoleType } from 'libs/utils/enum';
import { ListUserDto } from './dto/list-user.dto';
import { CoreCreateUserDto } from './dto/create-user.dto';
import { CoreUpdateUserDto } from './dto/update-user.dto';

@CoreControllers({
  path: 'users',
  version: '1',
  tag: 'User',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('me')
  @ApiResponseCustom([responseMeSuccess])
  @HttpCode(HttpStatus.OK)
  async getMe() {
    return this.userService.getUserInfo();
  }

  @Auth([RoleType.ADMIN])
  @Get('')
  @ApiResponseCustom([responseGetListUserSuccess])
  @HttpCode(HttpStatus.OK)
  async getListUser(@Query() query: ListUserDto) {
    return this.userService.getListUser(query);
  }

  @Auth([RoleType.ADMIN])
  @Post('')
  @ApiResponseCustom([responseCreateUserSuccess])
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CoreCreateUserDto) {
    return this.userService.createUser(body);
  }

  @Auth([RoleType.ADMIN])
  @Post(':userId')
  @ApiResponseCustom([responseUpdateUserSuccess])
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('userId') userId: number,
    @Body() body: CoreUpdateUserDto,
  ) {
    return this.userService.updateUser(userId, body);
  }

}
