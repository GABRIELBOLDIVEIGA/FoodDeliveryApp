import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = HydratedDocument<OrderDto>;

@Schema()
export class OrderDto {
  @ApiProperty({
    description: 'Usuario',
    type: 'string',
    default: 'ID do usuario',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuario não pode ser vazio.'],
  })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.String, default: '' })
  @ApiProperty({
    description: 'Endereço de entrega',
    type: 'string',
    default:
      '{"zipCode":"29156-120","neighborhood":"Buraco da Pedra","street":"Beco da Facada","city":"Crocacica","number":"321"}',
  })
  deliveryAddress: string;

  @Prop({
    // type: [
    //   {
    //     product: {
    //       productID: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
    //       name: MongooseSchema.Types.String,
    //       price: MongooseSchema.Types.Number,
    //       amount: MongooseSchema.Types.Number,
    //     },
    //   },
    // ],

    productID: {
      type: MongooseSchema.Types.ObjectId,
      ref: 'Product',
      autopopulate: true,
      required: [true, 'Informe o ID do produto.'],
    },
    name: {
      type: String,
      required: [true, 'Informe o nome do produto.'],
    },
    price: {
      type: Number,
      required: [true, 'Informe o preço do produto.'],
      min: [0, 'Preço deve ser maior que {VALUE}.'],
    },
    amount: {
      type: Number,
      required: [true, 'Informe a quantidade de produtos.'],
      min: [0, 'Quantidade deve ser maior que {VALUE}.'],
    },
  })
  @ApiProperty({
    type: 'array',
    description: 'Produtos',
    default: [
      {
        productID: 'ID do produto',
        name: 'Nome do produto A',
        price: 3.5,
        amount: 6,
      },
      {
        productID: 'ID do produto',
        name: 'Nome do produto B',
        price: 4.25,
        amount: 2,
      },
    ],
  })
  products: [
    {
      product: {
        productID: string;
        name: string;
        price: number;
        amount: number;
      };
    },
  ];

  @Prop({
    type: MongooseSchema.Types.Number,
    required: [true, 'Informe o total do pedido.'],
    min: [0, 'Total não pode ser menor que {VALUE}.'],
  })
  @ApiProperty({
    type: 'number',
    description: 'Total',
    default: 29.5,
  })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDto);
