import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  maxLength,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enums';
import { PostType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/createPostMetaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'title of the post',
    example: 'My First Post',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
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
  @MaxLength(1024)
  featureImageUrl?: string;

  @ApiPropertyOptional({
    description: 'publish on date of the post',
    example: '2024-11-20T12:00:00Z',
  })
  @IsOptional()
  @IsISO8601()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'list of ids of tags ',
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: Object,
    description: 'meta options is json string ',
    example: "{'key': 'author', 'value': 'John Doe'}",
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions: CreatePostMetaOptionsDto | null;

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  author: number;
}
