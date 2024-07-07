import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ValidRoles } from '../interfaces';

export class CreateUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  rol: ValidRoles
}
