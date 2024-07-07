import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/services';
import { AuthController } from './auth.controller';
import { CreateUserDTO } from './dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { ValidRoles } from './interfaces';
import { LoginResponse } from './interfaces/login';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = {
    create: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should call AuthService.create with the correct parameters', async () => {
      const createUserDto: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        username: 'testuser1',
        rol: ValidRoles.admin,
      };
      const createdUser = {
        _id: '1',
        email: 'test@example.com',
        fullName: 'Test User',
        rol: [ValidRoles.admin],
        password: 'password123',
      };

      jest.spyOn(mockAuthService, 'create').mockResolvedValue(createdUser);

      const result = await authController.register(createUserDto);

      expect(result).toBe(createdUser);
    });
  });

  describe('login', () => {
    it('should call AuthService.login with the correct parameters', async () => {
      const loginUserDTO: LoginUserDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockResponse: LoginResponse = {
        username: 'testuser1',
        isActive: Boolean(true),
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODhkYzA3MGFhN2EwMjEyODFlMGZlYiIsImlhdCI6MTcyMDMzNjIyNywiZXhwIjoxNzIwNDIyNjI3fQ.tZ13ZbRm0y3gPYeiXtyrUZGh2FyjlJ3VS9Lbx6p824g',
      };
      jest.spyOn(authController, 'login').mockResolvedValue(mockResponse);

      const result = await authController.login(loginUserDTO);

      expect(result).toEqual(mockResponse);
    });
  });
});
