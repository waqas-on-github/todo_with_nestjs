import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/enums/roles.enums';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { ActiveUserData } from 'src/auth/interfaces/activeUserData.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const userRolesOnContext = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!userRolesOnContext) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: ActiveUserData = request.user;
    console.log(userRolesOnContext);

    const hasUserRole = [...userRolesOnContext].some((role) => {
      return user?.role === role;
    });
    console.log('hasrole value ', hasUserRole);

    if (!hasUserRole) {
      return false;
    }
    return true;
  }
}
