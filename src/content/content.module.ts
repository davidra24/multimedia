import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { FilesModule } from 'src/files/files.module';
import { TopicModule } from 'src/topic/topic.module';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content, ContentSchema } from './entities/content.entity';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,
        schema: ContentSchema,
      },
    ]),
    CategoriesModule,
    TopicModule,
    FilesModule,
    AuthModule,
  ],
})
export class ContentModule {}
