import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';
import { SignInDto } from '../dtos/signIn.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generateTokens.provider';
import { RefreshTokenDto } from '../dtos/refreshTokenDto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    //injecting user service
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    // inject hashing provider
    private readonly hashingProvider: HashingProvider,
    //inject token generater
    private readonly generateTokensProvider: GenerateTokensProvider,

    private readonly refreshTokensProvider: RefreshTokensProvider,
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
    return await this.generateTokensProvider.generateTokens(user);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.generateRefreshTokens(
      refreshTokenDto,
    );
  }
}
