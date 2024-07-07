import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDTO, LoginUserDTO } from '../dto';
import { User } from '../entities/user.entity';
import { CreatedUser } from '../interfaces/created-user';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userRepository: Model<User>,
    private readonly jwtService: JwtService,
  ) { }
  async create(createUserDto: CreateUserDTO): Promise<CreatedUser> {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      const { email, username, isActive } = user
      return { email, username, isActive };
    } catch (error) {
      throw new BadRequestException(`error desconocido vea el log ${error.code}`);
    }
  }

  async login(loginUserDTO: LoginUserDTO) {
    const { email, password } = loginUserDTO;
    const user = await this.userRepository.findOne({ email })
    if (!user || !user.isActive) throw new UnauthorizedException('Credenciales inválidas o usuario desactivado');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales inválidas o usuario desactivado');

    const { username, isActive } = user

    return {
      username,
      isActive,
      token: this.getJWTToken({ id: user._id }),
    };
  }

  private getJWTToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}