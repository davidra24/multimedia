import { IsArray, IsString } from 'class-validator'

export class CreateTopicDto {
    @IsString()
    topic_name: string

    @IsArray()
    categories: string[]
}
