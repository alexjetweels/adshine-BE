import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Auth } from 'libs/utils';
import { ListPermissionDto } from './dto/list-permission.dto';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { responseListPermissionSuccess } from './response/schema';

@CoreControllers({
  path: 'permissions',
  version: '1',
  tag: 'Permission',
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Auth()
  @Get()
  @ApiResponseCustom([responseListPermissionSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listPermissionDto: ListPermissionDto) {
    return this.permissionsService.findAll(listPermissionDto);
  }
}
