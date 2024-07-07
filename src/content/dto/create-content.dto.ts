import { IsString } from 'class-validator'

export class CreateContentDto {
    @IsString()
    content_name: string

    @IsString()
    author: string

    @IsString()
    category: string

    @IsString()
    topic: string
    /* 
        @IsArray()
        files: Array<Express.Multer.File> */
}
