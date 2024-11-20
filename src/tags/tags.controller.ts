import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './provider/tags.service';
import { CreateTagDto } from './dtos/tags.dto';

@Controller('tags')
export class TagsController {
  // inject tags service

  constructor(private readonly tagsService: TagsService) {}

  // get all tages
  @Get()
  public getAllTags() {
    return this.tagsService.getAllTags();
  }

  // create tags
  @Post()
  public CreateTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.CreateTag(createTagDto);
  }
}
