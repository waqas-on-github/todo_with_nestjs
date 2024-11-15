import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createuser.dto';
import { CreateUserParamDto } from './dtos/createUserParam.dto';

@Controller('users')
export class UsersController {
  @Get(':id?/')
  public getUsers(
    @Param() createUserParamDto: CreateUserParamDto,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: any,
    @Query('offset', new DefaultValuePipe(10), ParseIntPipe) offset: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log('limit is ', limit);
    console.log('offset is ', offset);
    console.log('params are ', createUserParamDto);
    console.log('headers are ', headers);
    console.log('your ip is ', ip);

    return (
      'user returned from users controller and id is  ' + createUserParamDto.id
    );
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log('body is ', createUserDto);
    return 'user returned from users controller';
  }
}
