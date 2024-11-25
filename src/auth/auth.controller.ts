import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/signIn.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { UserService } from 'src/users/providers/user.service';
import { CreateUserDto } from 'src/users/dtos/createuser.dto';
import { RefreshTokenDto } from './dtos/refreshTokenDto';

@Controller('auth')
@ApiTags('Auth')
@Auth(AuthType.None)
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly userService: UserService,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.SignIn(signInDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  public signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
