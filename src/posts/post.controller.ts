import { Controller } from '@nestjs/common';
import { PostService } from './providers/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
}
