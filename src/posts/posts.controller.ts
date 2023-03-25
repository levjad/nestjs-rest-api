import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { IPost } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('posts')
@UseFilters(new HttpExceptionFilter())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  public findAll(): Array<IPost> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  public findOne(@Param('id', ParseIntPipe) id: number): IPost {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public create(@Body() post: IPost): IPost {
    return this.postsService.create(post);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.delete(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: IPost,
  ): IPost {
    return this.postsService.update(id, post);
  }
}
