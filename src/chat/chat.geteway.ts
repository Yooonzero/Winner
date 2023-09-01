import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// 소켓IO
@WebSocketGateway(8080, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage('createRoom')
  createRoom() {}

  @SubscribeMessage('join')
  joinChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomId: string,
  ): void {
    // 이미 접속한 방인지 확인
    console.log('socket.rooms', roomId);
    socket.join(String(roomId));
  }
  @SubscribeMessage('message')
  sendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: string,
    @MessageBody() roomId: string,
  ) {
    console.log('socket roomId = ', roomId[1]);
    // console.log('socket.rooms', socket.rooms);

    // 룸에 있는 유저에게만 메세지 보내기
    this.server.to(String(roomId[1])).emit('receive-message', message);
  }
}
