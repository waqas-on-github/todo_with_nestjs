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
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/decorator/public';
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    // inject jwt service
    private readonly jwtService: JwtService,
    // inject jwtconfig service
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>,

    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // extract request from excution context
    const request: Request = context.switchToHttp().getRequest();
    // extract token from request header
    const [_, token] = request?.headers?.authorization?.split(' ') ?? [];

    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    // validate token
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfigService,
      );
      // set user property in request
      request['user'] = payload;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
