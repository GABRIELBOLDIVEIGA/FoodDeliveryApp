import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    description: 'Email do usuário.',
    default: 'cliente@email.com',
  })
  @IsNotEmpty({
    message: 'Campo email é obrigatório.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha de acesso.',
    default: '123456',
  })
  @IsNotEmpty({
    message: 'Campo senha é obrigatória.',
  })
  password: string;
}
