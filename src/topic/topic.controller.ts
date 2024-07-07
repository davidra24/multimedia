import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) { }

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.creador)
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.creador, ValidRoles.lector)
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':term')
  @Auth(ValidRoles.admin, ValidRoles.creador, ValidRoles.lector)
  findOne(@Param('term') term: string) {
    return this.topicService.findOne(term);
  }

  @Patch(':term')
  @Auth(ValidRoles.admin, ValidRoles.creador)
  update(@Param('term') term: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(term, updateTopicDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.topicService.remove(id);
  }
}
