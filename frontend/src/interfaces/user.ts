export enum ValidRoles {
  admin = 'admin',
  creador = 'creador',
  lector = 'lector',
}

export interface LoginResponse {
  username: string;
  isActive: boolean;
  token: string;
  rol: ValidRoles;
  message?: string;
}
