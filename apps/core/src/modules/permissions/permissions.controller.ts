import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuthV2 } from 'libs/utils';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import { ListPermissionDto } from './dto/list-permission.dto';
import { PermissionsService } from './permissions.service';
import { responseListPermissionSuccess } from './response/schema';

@CoreControllers({
  path: 'permissions',
  version: '1',
  tag: 'Permission',
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @AuthV2()
  @Get()
  @ApiResponseCustom([responseListPermissionSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listPermissionDto: ListPermissionDto) {
    return this.permissionsService.findAll(listPermissionDto);
  }
}
