import { Controller, Get, Post, Body, Param, Delete, Patch, ParseUUIDPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetDecoratorUser } from 'src/auth/get-user.decorator';

@Controller('tasks') // Це означає, що всі маршрути тут будуть починатися з /tasks
@UseGuards(JwtAuthGuard)
export class TasksController {
  // Впровадження залежностей (Dependency Injection) - ми просимо Nest дати нам TasksService
  constructor(private tasksService: TasksService) { }

  @Get() // Обробляє GET /tasks
  getAllTasks(
    @GetDecoratorUser() user: User
  ) {
    return this.tasksService.getAllTasks(user);
  }

  // TODO (Pipes): Додати ParseUUIDPipe до декоратора @Param("id")
  // Це автоматично перевірятиме, чи є переданий ID валідним UUID, перш ніж код піде далі
  @Get(":id")
  getTasksById(@Param("id", ParseUUIDPipe) id: string, @GetDecoratorUser() user: User) {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete(":id")
  deleteTask(@Param("id", ParseUUIDPipe) id: string, @GetDecoratorUser() user: User) {
    return this.tasksService.deleteTasks(id, user)
  }


  @Patch(":id/status")
  updateTaskStatus(@Param("id", ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskStatusDto, @GetDecoratorUser() user: User) {
    return this.tasksService.updateTaskStatus(id, updateTaskDto.status, user)
  }


  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetDecoratorUser() user: User
  ) {
    return this.tasksService.createTask(createTaskDto, user);
  }
}
