import { Body, Controller, Get, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/metaOptions.service';
import { CreatePostMetaOptionsDto } from './dtos/createPostMetaOptions.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    //Injecting metaoptions sevice
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  @Get()
  public async getMetaOptions() {
    return this.metaOptionsService.getMetaOptions();
  }

  @Post()
  public async createMetaOptions(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaOptionsService.createMetaOptions(createPostMetaOptionsDto);
  }
}
