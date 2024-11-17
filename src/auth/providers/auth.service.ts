import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    //injecting user service
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  public login(email: string, password: string, id: string) {
    // check if user exists in database
    const user = this.userService.findById('123');
    // login
    //token

    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
