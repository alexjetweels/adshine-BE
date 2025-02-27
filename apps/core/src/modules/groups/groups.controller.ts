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
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { AuthV2, UUIDField } from 'libs/utils';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreateGroupSuccess,
  responseDetailGroupSuccess,
  responseListGroupSuccess,
  responseUpdateGroupSuccess,
} from './response/schema';
import { ListGroupDto } from './dto/list-group.dto';

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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(+id);
  // }
}
