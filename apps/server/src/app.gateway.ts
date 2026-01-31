import { Injectable, OnModuleInit } from "@nestjs/common";
import { WebSocketServer, WebSocket } from "ws";

import { PORTS } from "~core/config";

@Injectable()
export class AppGateway implements OnModuleInit {
  private wss!: WebSocketServer;

  onModuleInit() {
    console.log(`🚀 Starting WebSocket server on port ${PORTS.SERVER_WS}...`);
    this.wss = new WebSocketServer({ port: PORTS.SERVER_WS, host: "0.0.0.0" });

    this.wss.on("listening", () => {
      console.log(`✅ WebSocket server is listening on port ${PORTS.SERVER_WS}`);
    });

    this.wss.on("error", (error) => {
      console.error("❌ WebSocket server error:", error);
    });

    this.wss.on("connection", (ws: WebSocket) => {
      const clientId = Math.random().toString(36).substring(7);
      (ws as any).id = clientId;

      console.log(`🤝 New connection: ${clientId}. Total: ${this.wss.clients.size}`);

      ws.on("message", (message: string) => {
        try {
          const rawMessage = message.toString();
          const parsed = JSON.parse(rawMessage);

          const reply = JSON.stringify({
            from: `User ${clientId}`,
            text: parsed.text,
            senderId: clientId,
          });

          // Broadcast to all connected clients
          console.log(`📣 From ${clientId}: ${parsed.text} (to ${this.wss.clients.size} clients)`);

          this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(reply);
            }
          });
        } catch (error) {
          console.error("❌ Failed to broadcast message:", error);
        }
      });

      ws.on("close", () => {
        const remaining = this.wss.clients.size;
        console.log(`🔌 Client disconnected. Remaining clients: ${remaining}`);
      });
    });
  }
}
