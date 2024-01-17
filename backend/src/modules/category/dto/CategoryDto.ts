import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryDto>;

@Schema()
export class CategoryDto {
  @ApiProperty()
  @Prop({
    type: String,
    required: [true, 'Nome não pode ser vazio'],
    unique: [true, 'Nome da categoria ja existe'],
  })
  name: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  description: string;

  @ApiProperty()
  @Prop({ type: String, default: '' })
  img: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDto);
