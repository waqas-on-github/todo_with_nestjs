import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/providers/user.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  // find all posts by user id
  constructor(private readonly userService: UserService) {}

  // injecting post entity and creating post reposiotory
  // @InjectRepository(Post)
  // private readonly postRepository: Repository<Post>;
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  public findAll(userId: number) {
    const user = this.userService.findById(userId);
    return [
      {
        title: 'title 1',
        body: 'waqas is a good boy',
      },
      {
        id: 2,
        title: 'title 2',
        body: 'umair is a good boy',
        userId: 1,
      },
    ];
  }
}
