import { ValidRoles } from './valid-roles';

export interface CreatedUser {
  username: string;
  isActive: boolean;
  rol: ValidRoles;
  token: string;
}
