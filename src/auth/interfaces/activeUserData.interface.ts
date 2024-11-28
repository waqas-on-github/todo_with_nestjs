import { Role } from '../enums/roles.enums';

export interface ActiveUserData {
  sub: number;
  email: string;
  role: Role;
}
