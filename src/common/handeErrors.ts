import { BadRequestException } from '@nestjs/common';

export const handleException = (error: any) => {

    if (error.code === 11000) {
        throw new BadRequestException('El recurso que desea crear ya existe')
    }
    throw error
}