import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type SideDishdocument = HydratedDocument<SideDishDto>;

@Schema()
export class SideDishDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do acompanhamento',
    default: 'Nome do acompanhamento',
  })
  @Prop({
    type: String,
    required: [true, 'Nome do acompanhamento é obrigatorio!'],
    unique: [true, 'Nome do acompanhamento já cadastrado!'],
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do acompanhamento',
    default: 'Descrição do acompanhamento',
  })
  @Prop({ type: String, default: '' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Preço do acompanhamento',
    default: 10,
  })
  @Prop({
    type: Number,
    required: [true, 'Preço do acompanhamento é obrigatorio!'],
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Acompanhamento disponivel no cardapio.',
    default: true,
  })
  @Prop({
    type: Boolean,
    required: [true, 'Disponibilidade do acompanhamento é obrigatorio!'],
  })
  avaliable: boolean;
}

export const SideDishSchema = SchemaFactory.createForClass(SideDishDto);
