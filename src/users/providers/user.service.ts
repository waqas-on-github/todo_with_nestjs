import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserParamDto } from '../dtos/createUserParam.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UserService {
  // find all users
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
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
  public findById(userId: string) {
    const isAuthed = this.authService.isAuth();
    return {
      id: 1,
      isAuthed: isAuthed,
      firstName: 'waqas',
      lastName: 'ali',
      email: 'waqas@gmail.com',
      password: '1234569999',
    };
  }
}
