import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Content extends Document {
  _id: string;

  @Prop()
  content_name: string;

  @Prop()
  image_cover: string;

  @Prop()
  author: string;

  @Prop()
  category: string;

  @Prop()
  topic: string;

  @Prop()
  fileExtension: string;

  file: string;
}
export const ContentSchema = SchemaFactory.createForClass(Content);
