import { Controller, Get } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  public login() {
    return this.authService.login('waqas@gmail.com', '123456', '123');
  }

  @Get('isAuth')
  public isAuth() {
    return this.authService.isAuth();
  }
}
