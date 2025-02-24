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
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { Auth } from 'libs/utils';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreatePermissionGroupSuccess,
  responseListPermissionGroupSuccess,
  responseDetailPermissionGroupSuccess,
} from './response/schema';
import { ListPermissionGroupDto } from './dto/list-notifation.dto';
import { responseSuccessBasic } from 'libs/utils/schema';

@CoreControllers({
  path: 'permission-groups',
  version: '1',
  tag: 'Permission groups',
})
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @Auth()
  @Post()
  @ApiResponseCustom([responseCreatePermissionGroupSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupsService.create(createPermissionGroupDto);
  }

  @Auth()
  @Get()
  @ApiResponseCustom([responseListPermissionGroupSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listPermissionGroupDto: ListPermissionGroupDto) {
    return this.permissionGroupsService.findAll(listPermissionGroupDto);
  }

  @Auth()
  @Get(':id')
  @ApiResponseCustom([responseDetailPermissionGroupSuccess])
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.permissionGroupsService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  @ApiResponseCustom([responseDetailPermissionGroupSuccess])
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return this.permissionGroupsService.update(id, updatePermissionGroupDto);
  }

  @Auth()
  @Delete(':id')
  @ApiResponseCustom([responseSuccessBasic])
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.permissionGroupsService.remove(id);
  }
}
