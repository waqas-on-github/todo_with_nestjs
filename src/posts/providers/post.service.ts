import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/providers/user.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/createPost.dto';
import { MetaOptions } from 'src/meta-options/metaOptions.entity';

@Injectable()
export class PostService {
  // find all posts by user id
  constructor(private readonly userService: UserService) {}

  // injecting post entity and creating post reposiotory
  @InjectRepository(Post)
  private readonly postRepository: Repository<Post>;

  // injecting metaOptions  entity and creating Metaoptions reposiotory
  @InjectRepository(MetaOptions)
  private readonly metaOptionsRepository: Repository<MetaOptions>;

  public async findAll(userId: number) {
    return await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    let post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  public async deletePost(id: number) {
    // get posts from db
    let post = await this.postRepository.findOneBy({ id: id });

    // if found delete post
    await this.postRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }
}
