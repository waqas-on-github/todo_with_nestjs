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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':id?/')
  @ApiOperation({
    summary: 'fetches the list of registerd users on the application ',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'limit the number of users',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'position of the page number that API to return',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Users  fatched successfully based on the query ',
  })
  public getUser(@Param() createUserParamDto: CreateUserParamDto) {
    return this.userService.findById(createUserParamDto.id);
  }

  @Get()
  public getUsers(
    @Param() createUserParamDto: CreateUserParamDto,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: any,
    @Query('offset', new DefaultValuePipe(10), ParseIntPipe) offset: any,
  ) {
    return this.userService.findAll(createUserParamDto);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
