import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FilterDto {

    @ApiProperty({
        default: 'video',
        description: 'categoria de filtro ',
    })
    @IsOptional()
    @Type(() => String)
    category?: string;

    @ApiProperty({
        default: 'matematicas',
        description: 'tematica de filtro ',
    })
    @IsOptional()
    @Type(() => String)
    topic?: string;


}
