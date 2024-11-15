import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id/:optional?')
  public getUsers(
    @Param() params: any,
    @Query() query: any,
    @Headers() headers: any,
  ) {
    console.log('params are ', params);
    console.log('query data is ', query);
    console.log('headers are ', headers);

    return 'user returned from users controller and params are ' + params.id;
  }

  @Post()
  public createUsers(@Body() body: any) {
    console.log('body is ', body);
    return 'user returned from users controller';
  }
}
