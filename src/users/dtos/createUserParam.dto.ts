import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class CreateUserParamDto {
  @ApiPropertyOptional({
    description: 'Get user by specific id',
    example: 1123,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
