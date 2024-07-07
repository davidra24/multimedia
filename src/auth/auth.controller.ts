import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, LoginUserDTO } from './dto';
import { LoginResponse } from './interfaces/login';
import { AuthService } from './services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return await this.authService.create(createUserDTO);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDTO: LoginUserDTO): Promise<LoginResponse> {
    return this.authService.login(loginUserDTO);
  }
}
