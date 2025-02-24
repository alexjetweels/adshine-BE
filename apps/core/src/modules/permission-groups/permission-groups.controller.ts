import {
  Body,
  Delete,
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
import { responseSuccessBasic } from 'libs/utils/schema';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { ListPermissionGroupDto } from './dto/list-notifation.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PermissionGroupsService } from './permission-groups.service';
import {
  responseCreatePermissionGroupSuccess,
  responseDetailPermissionGroupSuccess,
  responseListPermissionGroupSuccess,
} from './response/schema';

@CoreControllers({
  path: 'permission-groups',
  version: '1',
  tag: 'Permission groups',
})
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}

  @AuthV2([PERMISSION_KEYS.PERMISSION_GROUP_CREATE])
  @Post()
  @ApiResponseCustom([responseCreatePermissionGroupSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return this.permissionGroupsService.create(createPermissionGroupDto);
  }

  @AuthV2([PERMISSION_KEYS.PERMISSION_GROUP_VIEW])
  @Get()
  @ApiResponseCustom([responseListPermissionGroupSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listPermissionGroupDto: ListPermissionGroupDto) {
    return this.permissionGroupsService.findAll(listPermissionGroupDto);
  }

  @AuthV2([PERMISSION_KEYS.PERMISSION_GROUP_VIEW])
  @Get(':id')
  @ApiResponseCustom([responseDetailPermissionGroupSuccess])
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.permissionGroupsService.findOne(id);
  }

  @AuthV2([PERMISSION_KEYS.PERMISSION_GROUP_UPDATE])
  @Patch(':id')
  @ApiResponseCustom([responseDetailPermissionGroupSuccess])
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updatePermissionGroupDto: UpdatePermissionGroupDto,
  ) {
    return this.permissionGroupsService.update(id, updatePermissionGroupDto);
  }

  @AuthV2([PERMISSION_KEYS.PERMISSION_GROUP_DELETE])
  @Delete(':id')
  @ApiResponseCustom([responseSuccessBasic])
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.permissionGroupsService.remove(id);
  }
}
