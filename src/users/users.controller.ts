import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorator/activeUser';
import { ActiveUserData } from 'src/auth/interfaces/activeUserData.interface';
import { Roles } from 'src/auth/authorization/decorator/roles.decorator';
import { Role } from 'src/auth/enums/roles.enums';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
  @Roles(Role.Admin)
  @Get()
  public getAllUsers(@ActiveUser() user: ActiveUserData) {
    console.log(user.email);

    return this.userService.findAll();
  }

  @Delete()
  public deleteUsers() {
    return this.userService.deleteUsers();
  }
}
