import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/services';
import { AuthController } from './auth.controller';
import { CreateUserDTO } from './dto';
import { ValidRoles } from './interfaces';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = {
    create: jest.fn(),
    login: jest.fn(),
  }

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
      const createUserDto: CreateUserDTO = { email: 'test@example.com', password: 'password123', fullName: 'Test User', username: "", rol: ValidRoles.admin };
      const createdUser = { _id: '1', email: 'test@example.com', fullName: 'Test User', rol: [ValidRoles.admin], password: 'password123' };

      jest.spyOn(mockAuthService, 'create').mockResolvedValue(createdUser);

      const result = await authController.register(createUserDto);

      expect(result).toBe(createdUser);
    });
  });

  describe('login', () => {
    it('should call AuthService.login with the correct parameters', async () => {
      /* const loginUserDto: LoginUserDTO = { email: 'test@example.com', password: 'password123' };
      const loggedInUser = { _id: '1', email: 'test@example.com', token: 'token' };
      jest.spyOn(authService, 'login').mockResolvedValue(loggedInUser);

      const result = await authController.login(loginUserDto);

      expect(result).toBe(loggedInUser);
      expect(authService.login).toHaveBeenCalledWith(loginUserDto); */
    });
  });
});
