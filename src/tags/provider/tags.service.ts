import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    // inject tag repository
    @InjectRepository(Tag)
    private readonly tagsReposiotry: Repository<Tag>,
  ) {}

  public async CreateTag(createTagDto: CreateTagDto) {
    const tag = this.tagsReposiotry.create(createTagDto);
    return await this.tagsReposiotry.save(tag);
  }

  public async getAllTags() {
    return this.tagsReposiotry.find({
     
    });
  }

  public async findMultipleTags(tags: number[]) {
    let results = await this.tagsReposiotry.find({
      where: { id: In(tags) },
    });

    return results;
  }

  public async getSingleTag(id: number) {
    return await this.tagsReposiotry.findOneBy({
      id: id,
    });
  }
}
