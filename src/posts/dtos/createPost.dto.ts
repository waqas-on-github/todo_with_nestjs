import {
  IsArray,
  IsEnum,
  isEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enums';
import { PostType } from '../enums/postType.enum';
import { CreatePostMetaOptions } from './createPostMetaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'title of the post',
    example: 'My First Post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description:
      'post type should be one of the following values: post, page, story, series',
    example: 'page',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: 'slug of the post',
    example: 'my-first-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-_]+$/, {
    message:
      'slug must contain only lowercase letters, numbers, hyphens and underscores',
  })
  slug: string;

  @ApiProperty({
    description:
      'status of the post should be one of the following values: draft, scheduled, review, published',
    example: 'review',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'content of the post',
    example: 'This is the content of my first post.',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'schema of the post',
    example: '{"type":"text","content":"This is a sample schema"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'feature image url of the post',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  featureImageUrl?: string;

  @ApiPropertyOptional({
    description: 'publish on date of the post',
    example: '2024-11-20T12:00:00Z',
  })
  @IsOptional()
  @IsISO8601()
  publishOn?: Date;
  @ApiPropertyOptional({
    description: 'tags of the post',
    example: ['tech', 'javascript', 'nestjs'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'meta options of the post',
    example: [
      {
        key: 'author',
        value: 'John Doe',
      },
      {
        key: 'readingTime',
        value: '5 min',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptions)
  metaOptions: CreatePostMetaOptions[];
}
