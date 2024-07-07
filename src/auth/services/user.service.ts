import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userRepository: Model<User>) { }

    async getUser(term: string) {
        let user = null
        if (isValidObjectId(term)) user = await this.userRepository.findById(term);
        if (!user) user = await this.userRepository.findOne({ username: term });
        if (!user) throw new NotFoundException(
            `Temática con el término de busqueda ${term} no encontrado`,
        );
        return user.username
    }
}