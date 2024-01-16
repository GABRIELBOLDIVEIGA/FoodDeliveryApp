import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UserService } from 'src/modules/user/user.service';

export interface UserPayload {
  sub: string;
  userId: string;
  name: string;
  email: string;
  zipCode: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  phone: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userService.login(email);

    if (!user) {
      throw new BadRequestException('Usuário não cadastrado!');
    }
    if (!(await bcryptjs.compare(password, user.password))) {
      throw new UnauthorizedException('Senha não confere!');
    }

    const payload: UserPayload = {
      sub: user._id.toString(),
      userId: user._id.toString(),
      // sub: `${user._id}`,
      // userId: `${user._id}`,
      name: user.name,
      email: user.email,
      zipCode: user.zipCode,
      neighborhood: user.neighborhood,
      street: user.street,
      city: user.city,
      number: user.number,
      phone: user.phoneNumber,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
