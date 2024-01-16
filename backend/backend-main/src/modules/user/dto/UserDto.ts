import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsEmail, IsString /*IsEnum*/ } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/resources/enums/role.enum';
import { IsRoleValid } from '../pipe/is-role-valid.pipe';

export type UserDocument = HydratedDocument<UserDto>;

@Schema()
export class UserDto {
  @ApiProperty({
    description: 'Nome do usuario',
    default: 'Nome do usuario',
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    type: String,
    required: [true, 'Nome do usuario é obrigatorio!'],
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuario',
  })
  @Prop({
    type: String,
    required: [true, 'Email do usuario é obrigatorio!'],
    unique: [true, 'Email já cadastrado no sistema!'],
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuario',
  })
  @Prop({
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'Numero de telefone do usuario',
  })
  @IsNotEmpty()
  @IsString()
  @Prop({
    type: String,
    required: [true, 'Numero de telefone do usuario é obrigatorio!'],
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'RG ou CPF do usuario',
  })
  @IsNotEmpty()
  @IsString()
  @Prop({
    type: String,
    required: [true, 'Informe um Documento valido!'],
    unique: [true, 'Documento ja cadastrado!'],
  })
  document: string;

  @ApiProperty({
    description: 'CEP do usuario',
  })
  @Prop({
    type: String,
    default: '',
  })
  zipCode: string;

  @ApiProperty({
    description: 'Bairro do usuario',
  })
  @Prop({
    type: String,
    default: '',
  })
  neighborhood: string;

  @ApiProperty({
    description: 'Rua do usuario',
  })
  @Prop({
    type: String,
    default: '',
  })
  street: string;

  @ApiProperty({
    description: 'Cidade do usuario',
  })
  @Prop({
    type: String,
    default: '',
  })
  city: string;

  @ApiProperty({
    description: 'Numero do usuario',
  })
  @Prop({
    type: String,
    default: '',
  })
  number: string;

  // @IsEnum(Role)
  @IsRoleValid()
  @ApiProperty({
    description: 'Permissão do usuario',
    default: 'user',
  })
  @Prop({
    type: String,
    enum: [Role],
    default: Role.User,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDto);
