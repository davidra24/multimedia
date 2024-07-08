export class CreateContentDto {
  content_name: string;

  author: string;

  category: string;

  topic: string;
  /* 
        @IsArray()
        files: Array<Express.Multer.File> */
}
