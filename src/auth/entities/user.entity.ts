import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ValidRoles } from '../interfaces';

@Schema()
export class User extends Document {
    _id: string

    @Prop({
        unique: true,
        index: true,
        type: String,
    })
    email: string

    @Prop({
        unique: true,
        index: true,
        type: String,
    })
    username: string

    @Prop({
        required: true,
        type: String,
    })
    password: string

    @Prop({ type: String, required: false })
    fullName: string

    @Prop({
        default: true,
        type: Boolean
    })
    isActive: boolean

    @Prop({ type: String, default: ValidRoles.lector, enum: ValidRoles })
    rol: ValidRoles
}

export const UserSchema = SchemaFactory.createForClass(User);