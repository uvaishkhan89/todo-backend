import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

//ADD TODO BASED ON USER ID
//FIND ALL TODOS BASED ON USER ID (NOT COMPLETED)
//FIND ALL TODOS BASED ON USER ID (COMPLETED)
//MARK TODO AS COMPLETE BASED ON TODO ID
//DELETE TODO BASED ON TODO ID

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>, private usersService: UsersService){}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.usersService.findUserById(userId);
    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    // user not completed
    return this.todoRepository.find({
      relations: ['user'], 
      where: {user: {id: userId}, completed: false }
    });
  }


  findAllTodoByUserCompleted(userId: number) {
    // user completed
    return this.todoRepository.find({
      relations: ['user'], 
      where: {user: {id: userId}, completed: true }
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} todo`;
  // }

  update(todoId: number) {
    console.log(todoId);
    
    return this.todoRepository.update(todoId, { completed: true })
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
