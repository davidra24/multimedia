import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/services';
import { CreateUserDTO, LoginUserDTO } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { CreatedUser } from './interfaces/created-user';
import { LoginResponse } from './interfaces/login';

describe('AuthService', () => {
  let authService: AuthService;
  const mockUserRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
  };
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    const createUserDto: CreateUserDTO = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'Test User',
      username: 'test1',
      rol: ValidRoles.admin,
    };
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    it('Crea el usuario y retorna la data sin contraseña', async () => {
      const createdUser: CreatedUser = {
        email: 'test@example.com',
        username: 'test1',
        isActive: true,
      };

      jest.spyOn(mockUserRepository, 'create').mockReturnValue(createdUser);

      const user = {
        ...createUserDto,
        password: hashedPassword,
      };

      const result = await authService.create(user);

      expect(result).toEqual(createdUser);
    });

    it('Maneja los errores de base de datos', () => {
      const errorMock = { code: '23505', detail: 'Duplicate entry' };
      jest.spyOn(mockUserRepository, 'create').mockRejectedValue(errorMock);

      const user = {
        ...createUserDto,
        password: hashedPassword,
      };

      const result = authService.create(user);

      expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    const loginUserDTO: LoginUserDTO = {
      email: 'test@example.com',
      password: 'password123',
    };
    it('Retorna el token de usuario si la contraseña es correcta', async () => {
      const mockResponse: LoginResponse = {
        username: 'testuser1',
        isActive: Boolean(true),
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODhkYzA3MGFhN2EwMjEyODFlMGZlYiIsImlhdCI6MTcyMDMzNjIyNywiZXhwIjoxNzIwNDIyNjI3fQ.tZ13ZbRm0y3gPYeiXtyrUZGh2FyjlJ3VS9Lbx6p824g',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      const result = await authService.login(loginUserDTO);

      expect(result).toEqual(mockResponse);
    });

    it('Retorna error de autorización', () => {
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new UnauthorizedException('Error de autorizacion'));

      const result = authService.login(loginUserDTO);

      expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
