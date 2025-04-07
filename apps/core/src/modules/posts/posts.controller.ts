import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { AuthV2 } from 'libs/utils';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreatePostSuccess,
  responseDetailPostSuccess,
  responseListPostSuccess,
} from './response/schema';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { ListPostDto } from './dto/list-post.dto';

@CoreControllers({
  path: 'posts',
  version: '1',
  tag: 'Post',
})
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @AuthV2()
  @Post()
  @ApiResponseCustom([responseCreatePostSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @AuthV2()
  @Get()
  @ApiResponseCustom([responseListPostSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listPostDto: ListPostDto) {
    return this.postsService.findAll(listPostDto);
  }

  @AuthV2()
  @Get(':id')
  @ApiResponseCustom([responseDetailPostSuccess])
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @AuthV2([PERMISSION_KEYS.POST_UPDATE])
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }
}
