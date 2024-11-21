import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/providers/user.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/createPost.dto';
import { TagsService } from 'src/tags/provider/tags.service';
import { PatchPostDto } from '../dtos/patchPost.dto';

@Injectable()
export class PostService {
  // find all posts by user id
  constructor(
    // injecting user service
    private readonly userService: UserService,
    //Injecting tags service
    private readonly tagsService: TagsService,
    // injecting post entity and creating post reposiotory
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async findAllPosts() {
    return await this.postRepository.find({
      relations: {
        author: true,
        tags: true,
      },
    });
  }

  public async createPost(createPostDto: CreatePostDto) {
    //find user from database based on provided authorid if author exists then only create post
    const author = await this.userService.findById(createPostDto.author);
    // getting tags list from db
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    //saving to db
    let post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    return await this.postRepository.save(post);
  }

  public async deletePosts() {
    return await this.postRepository.delete({});
  }

  public async findOnePost(id: number) {
    return await this.postRepository.findOneBy({
      id,
    });
  }

  public async updateOnePost(patchPostDto: PatchPostDto) {
    // find the tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    // find the post by id provided in Dto
    const post = await this.postRepository.findOneBy({
      id: patchPostDto.id,
    });

    //update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.featureImageUrl = patchPostDto.featureImageUrl ?? post.featureImageUrl;
    post.status = patchPostDto.status ?? post.status;
    post.slug = patchPostDto.slug ?? post.slug;
    post.postType = patchPostDto.postType ?? post.postType;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    //assign the new tags
    post.tags = tags;
    //saving to db
    return await this.postRepository.save(post);
    // save the post and return
  }
}
