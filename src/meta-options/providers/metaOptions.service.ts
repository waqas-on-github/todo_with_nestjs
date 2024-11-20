import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from '../metaOptions.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/createPostMetaOptions.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
  ) {}

  public createMetaOptions(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOptionsEntity = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );
    return this.metaOptionsRepository.save(metaOptionsEntity);
  }

  public getMetaOptions() {
    return this.metaOptionsRepository.find({
      relations: {
        post: true,
      },
    });
  }
}
