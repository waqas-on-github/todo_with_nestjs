import { Injectable } from '@nestjs/common';
import { CreateUserParamDto } from '../dtos/createUserParam.dto';

@Injectable()
export class UserService {
  // find all users
  public findAll(createUserParamDto: CreateUserParamDto) {
    return [
      {
        id: 1,
        firstName: 'waqas',
        lastName: 'ali',
        email: 'waqas@gmail.com',
        password: '1234569999',
      },
      {
        id: 2,
        firstName: 'umair',
        lastName: 'ali',
        email: 'umair@gmail.com',
        password: '0123902313',
      },
    ];
  }

  // find user by id
  public findById(createUserParamDto: CreateUserParamDto) {
    return {
      id: 1,
      firstName: 'waqas',
      lastName: 'ali',
      email: 'waqas@gmail.com',
      password: '1234569999',
    };
  }
}
