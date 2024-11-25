import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access_token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/decorator/auth.decorator';

@Injectable()
export class AuthancationGuard implements CanActivate {
  private readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap = {
    [AuthType.Bearer]: this.accesTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accesTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [this.defaultAuthType];

    const gurds = authTypes?.map((Type) => this.authTypeGuardMap[Type]).flat();
    const error = new UnauthorizedException();

    for (const instance of gurds) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        err = error;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
