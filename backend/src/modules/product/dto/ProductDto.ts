// import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SideDishDto } from 'src/modules/sideDish/dto/SideDishDto';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type Productdocument = HydratedDocument<ProductDto>;

@Schema()
export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto',
    default: 'Nome do produto',
  })
  @Prop({
    type: String,
    unique: [true, 'Nome do produto já cadastroado'],
    required: [true, 'Não pode ser vazio.'],
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Preço do produto',
    default: 11,
  })
  @Prop({
    type: Number,
    required: [true, 'Preço não pode ser vazio.'],
    min: [0, 'Preço não pode ser negativo.'],
  })
  price: number;

  @ApiProperty({
    description: 'Descrição do produto',
    default: 'Descrição do produto',
  })
  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @ApiProperty({
    description: 'Preço promocional do produto',
    default: 12.56,
  })
  @Prop({
    type: Number,
    default: 0,
    min: [0, 'Preço não pode ser negativo.'],
  })
  promotionalPrice: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Categoria do produto',
    default: 'ID da Categoria do Porduto',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Não pode ser vazio.'],
    autopopulate: true,
  })
  category: string;

  @IsArray()
  @ApiProperty({
    description: 'Acompanhamento do produto',
    default: ['ID do acompanhameto'],
  })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'SideDish' })
  sideDish: SideDishDto;

  @ApiProperty({
    type: 'string',
    description: 'URL da imagem do produto',
    format: 'binary',
    required: false,
  })
  @Prop({
    type: String,
    default: '',
  })
  img: string;

  @ApiProperty({
    description: 'Produto disponivel no cardapio',
    default: false,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  avaliable: boolean;

  @ApiProperty({
    description: 'Promoção ativa',
    default: false,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  activePromotion: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDto);
