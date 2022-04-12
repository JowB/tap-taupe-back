import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Message } from "./schema/message.schema";

@WebSocketGateway({
  cors: { origin: "*" },
  namespace: "/messages",
})
export class MessagesGateway {
  @WebSocketServer() wss: Server;

  sendNewMessage(message: Message): void {
    this.wss.emit("addMessage", message);
  }
}
