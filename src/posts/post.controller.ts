import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/createPost.dto';
import { PatchPostDto } from './dtos/patchPost.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public getPosts() {
    return this.postService.findAllPosts();
  }

  @Get('/:userId?')
  public getPost(@Param('userId', ParseIntPipe) userId: number) {
    return this.postService.findOnePost(userId);
  }

  @ApiOperation({ summary: 'create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'update a post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
     return this.postService.updateOnePost(patchPostDto);
  }



  @Delete()
  public deletePosts() {
    return this.postService.deletePosts();
  }
}

