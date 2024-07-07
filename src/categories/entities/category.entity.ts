import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryType } from '../interfaces/category-type';

@Schema()
export class Category extends Document {
  _id: string;

  @Prop({
    unique: true,
    index: true,
  })
  category_name: string;

  @Prop({ default: CategoryType.text, enum: CategoryType })
  category_type: CategoryType;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
