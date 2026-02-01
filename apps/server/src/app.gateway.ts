import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { PORTS } from "~core/config";

import { PrismaService } from "@/prisma/prisma.service";

@WebSocketGateway(PORTS.SERVER_WS, {
  cors: {
    origin: "*",
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly prisma: PrismaService) { }

  afterInit(_server: Server) {
    console.log(`🚀 Socket.io server initialized on port ${PORTS.SERVER_WS}`);
  }

  async handleConnection(client: Socket) {
    console.log(`🤝 New connection: ${client.id}. Total: ${this.server.sockets.sockets.size}`);

    // Send history
    try {
      const history = await this.prisma.message.findMany({
        take: 50,
        orderBy: { createdAt: "asc" },
      });

      const historyPayload = history.map((msg) => ({
        from: msg.senderName || "Unknown",
        text: msg.text,
        senderId: msg.senderId || "system",
      }));

      // In socket.io we can emit a named event
      client.emit("history", historyPayload);
    } catch (error) {
      console.error("❌ Failed to load history:", error);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌 Client disconnected: ${client.id}. Remaining: ${this.server.sockets.sockets.size}`);
  }

  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ) {
    try {
      // In socket.io, data is already parsed if sent as JSON
      const senderName = data.userName || `User ${client.id}`;

      const reply = {
        from: senderName,
        text: data.text,
        senderId: client.id,
      };

      // Broadcast to all clients including sender
      console.log(`📣 From ${senderName} (${client.id}): ${data.text}`);
      this.server.emit("message", reply);

      // Save to DB asynchronously
      this.prisma.message.create({
        data: {
          text: data.text,
          senderName: senderName,
          senderId: client.id,
        },
      }).catch(err => {
        console.error("❌ Failed to save message to DB:", err);
      });
    } catch (error) {
      console.error("❌ Failed to process message:", error);
    }
  }
}
