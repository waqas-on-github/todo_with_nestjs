import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class CreateUserParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: string;
}
