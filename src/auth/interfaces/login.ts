import { ValidRoles } from './valid-roles';

export interface LoginResponse {
  username: string;
  isActive: boolean;
  token: string;
  rol: ValidRoles;
}
