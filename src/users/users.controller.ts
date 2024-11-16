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
import { UserService } from './providers/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':id?/')
  public getUser(
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

    return this.userService.findAll(createUserParamDto);
  }

  @Get()
  public getUsers(
    @Param() createUserParamDto: CreateUserParamDto,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: any,
    @Query('offset', new DefaultValuePipe(10), ParseIntPipe) offset: any,
  ) {
    return this.userService.findById(createUserParamDto);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log('body is ', createUserDto);
    return 'user returned from users controller';
  }
}
