import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './providers/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public getPosts(@Query('userId') userId: string) {
    return this.postService.findAll(userId);
  }
}
