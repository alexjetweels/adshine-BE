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
import { CreateGroupDto } from './dto/create-group.dto';
import { ListGroupDto } from './dto/list-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import {
  responseCreateGroupSuccess,
  responseDetailGroupSuccess,
  responseListGroupSuccess,
  responseUpdateGroupSuccess,
} from './response/schema';

@CoreControllers({
  path: 'groups',
  version: '1',
  tag: 'Group',
})
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @AuthV2([PERMISSION_KEYS.GROUP_CREATE])
  @Post()
  @ApiResponseCustom([responseCreateGroupSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @AuthV2()
  @Get()
  @ApiResponseCustom([responseListGroupSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listGroupDto: ListGroupDto) {
    return this.groupsService.findAll(listGroupDto);
  }

  @AuthV2()
  @Get(':id')
  @ApiResponseCustom([responseDetailGroupSuccess])
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id, { isView: true });
  }

  @AuthV2()
  @Patch(':id')
  @ApiResponseCustom([responseUpdateGroupSuccess])
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @AuthV2([PERMISSION_KEYS.GROUP_DELETE])
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
