import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refreshTokenDto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserService } from 'src/users/providers/user.service';
import { GenerateTokensProvider } from './generateTokens.provider';
import { ActiveUserData } from '../interfaces/activeUserData.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    // jwt service
    private readonly jwtService: JwtService,

    // jwt config service
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    //inject token generater
    private readonly generateTokensProvider: GenerateTokensProvider,
    // user service
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  public async generateRefreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // verify refresh token
      const payload = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      // find user form db by user id you get from refresh token payload
      const user = await this.userService.findById(payload.sub);

      // generate new access and refresh tokens

      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
