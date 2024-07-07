import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [CommonModule],
  exports: [FilesService]
})
export class FilesModule { }
