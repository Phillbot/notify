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

interface JoinRoomDto {
  roomId: string;
  userId?: string;
  userName?: string;
}

interface MessageDto {
  text: string;
  userName?: string;
  userId?: string;
  roomId?: string;
}

@WebSocketGateway(PORTS.SERVER_WS, {
  cors: {
    origin: "*",
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  // Track online users: userId -> { socketId, userName }
  private onlineUsers = new Map<string, { socketId: string; userName: string }>();

  constructor(private readonly prisma: PrismaService) { }

  afterInit(_server: Server) {
    console.log(`🚀 Socket.io server initialized on port ${PORTS.SERVER_WS}`);
  }

  async handleConnection(client: Socket) {
    console.log(`🤝 New connection: ${client.id}. Total: ${this.server.sockets.sockets.size}`);

    // Initial join to global, but we don't know the userId yet
    client.join("global");
  }

  handleDisconnect(client: Socket) {
    console.log(`🔌 Client disconnected: ${client.id}. Remaining: ${this.server.sockets.sockets.size}`);

    // Find and remove user from online map
    for (const [userId, data] of this.onlineUsers.entries()) {
      if (data.socketId === client.id) {
        this.onlineUsers.delete(userId);
        console.log(`👤 User ${data.userName} (${userId}) went offline`);
        this.broadcastUsers();
        break;
      }
    }
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket
  ) {
    const roomId = data.roomId || "global";
    const userId = data.userId;
    const userName = data.userName;

    if (userId && userName) {
      this.onlineUsers.set(userId, { socketId: client.id, userName });
      console.log(`👤 User ${userName} (${userId}) is active`);

      // Ensure user exists in DB for foreign key relations
      this.prisma.user.upsert({
        where: { id: userId },
        update: { name: userName },
        create: { id: userId, name: userName },
      }).catch(err => console.error(`❌ Failed to upsert user ${userId}:`, err));

      this.broadcastUsers();
    }

    this.joinRoom(roomId, client);
  }

  private broadcastUsers() {
    const usersList = Array.from(this.onlineUsers.entries()).map(([id, data]) => ({
      id,
      userName: data.userName,
      socketId: data.socketId,
    }));

    this.server.emit("users", usersList);
  }

  private async joinRoom(roomId: string, client: Socket) {
    // Leave previous rooms (except for its own id room)
    client.rooms.forEach(room => {
      if (room !== client.id) {
        client.leave(room);
      }
    });

    client.join(roomId);
    console.log(`🏠 Client ${client.id} joined room: ${roomId}`);

    // Send history for THIS room only
    try {
      const history = await this.prisma.message.findMany({
        where: { roomId },
        take: 50,
        orderBy: { createdAt: "asc" },
      });

      const historyPayload = history.map((msg) => ({
        from: msg.senderName || "Unknown",
        text: msg.text,
        senderId: msg.senderId || "system",
        userId: msg.userId || undefined,
        roomId: msg.roomId,
      }));

      client.emit("history", historyPayload);
    } catch (error) {
      console.error(`❌ Failed to load history for room ${roomId}:`, error);
    }
  }

  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() data: MessageDto,
    @ConnectedSocket() client: Socket
  ) {
    try {
      const senderName = data.userName || `User ${client.id}`;
      const roomId = data.roomId || "global";
      const userId = data.userId;

      const reply = {
        from: senderName,
        text: data.text,
        senderId: client.id,
        userId: userId,
        roomId: roomId,
      };

      console.log(`📣 Room [${roomId}] From ${senderName}: ${data.text}`);

      // Save to DB (async)
      this.prisma.message.create({
        data: {
          text: data.text,
          senderName: senderName,
          senderId: client.id,
          userId: userId,
          roomId: roomId,
        },
      }).catch(err => console.error("❌ Failed to save message to DB:", err));

      // Routing logic
      if (roomId.startsWith("dm:")) {
        // Direct Message: Send to both participants specifically
        const participants = roomId.replace("dm:", "").split("_");
        participants.forEach(pId => {
          const userData = this.onlineUsers.get(pId);
          if (userData) {
            this.server.to(userData.socketId).emit("message", reply);
          }
        });
      } else {
        // Regular room: Broadcast to room
        this.server.to(roomId).emit("message", reply);
      }
    } catch (error) {
      console.error("❌ Failed to process message:", error);
    }
  }
}
