import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    //injecting user service
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    // inject hashing provider
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async SignIn(signInDto: SignInDto) {
    //find the user using email
    const user = await this.userService.findByEmail(signInDto.email);
    // throw error if user not found
    if (!user) {
      throw new UnauthorizedException('invalid crediantials');
    }
    //compare password with encrypted password
    const isPasswordCorrect = await this.hashingProvider.VerifyPassword(
      signInDto.password,
      user.password,
    );
    // throw error if password is not correct
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('invalid crediantials');
    }
    //if password is correct then return user
    return user;
  }
}
