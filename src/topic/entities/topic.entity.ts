import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';

@Schema()
export class Topic extends Document {
    _id: string

    @Prop({
        unique: true,
        index: true
    })
    topic_name: string

    @Prop({
        type: [mongoose.Types.ObjectId], ref: "Category", select: true
    })
    categories: Category[]
}
export const TopicSchema = SchemaFactory.createForClass(Topic);