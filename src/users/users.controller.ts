import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createuser.dto';
import { UserService } from './providers/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
  @Get()
  public getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Delete()
  public deleteUsers() {
    return this.userService.deleteUsers();
  }
  @Post('/create')
  public testApi(@Body() prompt: string) {
    return this.userService.testApi(prompt);
  }
}
