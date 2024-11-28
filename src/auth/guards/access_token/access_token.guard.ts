import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    // inject jwt service
    private readonly jwtService: JwtService,
    // inject jwtconfig service
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // extract request from excution context
    const request: Request = context.switchToHttp().getRequest();

    // extract token from request header
    const [_, token] = request?.headers?.authorization?.split(' ') ?? [];
    console.log(token);

    // validate token
    if (!token) {
      throw new UnauthorizedException();
    }
    //
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigService,
      );
      // set user property in request

      request['user'] = {
        email: payload.email,
        id: payload.sub,
        role: payload.role,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

