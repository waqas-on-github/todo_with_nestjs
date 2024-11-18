import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class tagsDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  featuredImageUrl: string;
}
