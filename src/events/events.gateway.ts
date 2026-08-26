import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Дозволяємо підключення з будь-яких доменів
export class EventsGateway {

  // NestJS автоматично присвоїть сюди екземпляр сервера Socket.io
  @WebSocketServer()
  server: Server;

  // Метод, який ми будемо викликати з нашого TasksService
  broadcastTaskUpdate(task: any) {
    // Розсилаємо подію з назвою 'taskUpdated' всім клієнтам
    this.server.emit('taskUpdated', task);
  }
}
