import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger/';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Param('userId') userId: number) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTodosByUserIdNotCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserNotCompleted(userId);
  }

  @Get('/findAllCompleted/:userId')
  findAllTodosByUserIdCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserCompleted(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todoService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
