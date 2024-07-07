import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {}),

  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadFile(file)
  }

  async uploadFileWithName(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto: UploadFileDto) {
    const { fileName } = uploadFileDto
    return await this.filesService.uploadFileWithName(file, fileName)
  }

  @Get('download/:fileName')
  async downloadFile(@Param('fileName') fileName: string) {
    return await this.filesService.downloadFile(fileName)
  }

}
