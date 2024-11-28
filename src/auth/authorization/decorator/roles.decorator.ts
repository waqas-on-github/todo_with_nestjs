import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles.enums';

export const ROLES_KEY = 'roles';
export const Roles = (...role: Role[]) => {
  return SetMetadata(ROLES_KEY, role);
};
