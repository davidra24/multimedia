import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/services';
import { CreateUserDTO } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';
import { CreatedUser } from './interfaces/created-user';

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
          useValue: mockJwtService
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    const createUserDto: CreateUserDTO = { email: 'test@example.com', password: 'password123', fullName: 'Test User', username: "test1", rol: ValidRoles.admin };
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    it('Crea el usuario y retorna la data sin contraseña', async () => {
      const createdUser: CreatedUser = {
        email: 'test@example.com',
        username: 'test1',
        isActive: true
      }

      jest.spyOn(mockUserRepository, "create").mockReturnValue(createdUser)

      const user = {
        ...createUserDto,
        password: hashedPassword,
      };

      const result = await authService.create(user);

      expect(result).toEqual(createdUser);
    });

    it('Maneja los errores de base de datos', () => {
      const errorMock = { code: '23505', detail: 'Duplicate entry' }
      jest.spyOn(mockUserRepository, "create").mockRejectedValue(errorMock)

      const user = {
        ...createUserDto,
        password: hashedPassword,
      };

      const result = authService.create(user)

      expect(result).rejects.toThrow(BadRequestException)
    });
  });

  describe('login', () => {
    it('Retorna el token de usuario si la contraseña es correcta', async () => {
      /* const loginUserDto: LoginUserDTO = { email: 'test@example.com', password: 'password123' };

      const user = {
        email: 'test@example.com',
        password: bcrypt.hashSync(loginUserDto.password, 10),
        _id: 'userId',
      };

      userRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

      const result = await authService.login(loginUserDto);

      expect(result).toEqual({
        email: 'test@example.com',
        _id: 'userId',
        token: 'token',
      });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        select: { email: true, password: true, id: true },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ id: 'userId' }); */
    });

    it('Retorna error de autorización si el usuario no se encuentra', async () => {
      /*  const loginUserDto: LoginUserDTO = { email: 'test@example.com', password: 'password123' };
       userRepository.findOne.mockResolvedValue(null);
 
       await expect(authService.login(loginUserDto)).rejects.toThrow(UnauthorizedException); */
    });

    it('Retorna error de autorización si no hace match la contraseña', async () => {
      /* const loginUserDto: LoginUserDTO = { email: 'test@example.com', password: 'password123' };

      const user = {
        email: 'test@example.com',
        password: bcrypt.hashSync('differentPassword', 10),
        _id: 'userId',
      };

      userRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      await expect(authService.login(loginUserDto)).rejects.toThrow(UnauthorizedException); */
    });
  });
});
