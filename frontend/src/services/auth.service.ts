import axios from 'axios';
import { LoginResponse, ValidRoles } from '../interfaces/user';
import { API_GATEWAY } from '../utils/constants';

export const login = async (email: string, password: string) => {
  try {
    return await axios.post<LoginResponse>(API_GATEWAY + '/auth/login', {
      email,
      password,
    });
  } catch (error: any) {
    return error.response.data?.message;
  }
};

export const register = async (
  email: string,
  username: string,
  password: string,
  rol: ValidRoles,
  fullName?: string,
) => {
  try {
    return await axios.post<LoginResponse>(API_GATEWAY + '/auth/register', {
      email,
      username,
      password,
      fullName,
      rol,
    });
  } catch (error: any) {
    return error.response.data?.message;
  }
};
