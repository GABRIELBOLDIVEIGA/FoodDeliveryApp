import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@ApiTags('Auth')
@UseFilters(new HttpExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() userLoginDto: UserLoginDto) {
    const token = await this.authService.signIn(
      userLoginDto.email,
      userLoginDto.password,
    );

    return {
      access_token: token,
    };
  }
}
