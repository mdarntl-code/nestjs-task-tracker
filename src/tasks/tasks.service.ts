import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  getAllTasks(user: User) {
    return this.tasksRepository.find({ where: { user } });
  }


  async getTaskById(id: string, user: User) {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }



  async deleteTasks(id: string, user: User) {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User) {
    const task = await this.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Задачу з ID ${id} не знайдено`);
    }
    task.status = status;
    return this.tasksRepository.save(task);
  }



  createTask(createTaskDto: CreateTaskDto, user: User) {
    const newTask = this.tasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
      user,
    });
    return this.tasksRepository.save(newTask);
  }
}
