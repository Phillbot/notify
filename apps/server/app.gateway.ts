import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebSocketServer, WebSocket } from 'ws';

import { isDev } from '~core/utils';

@Injectable()
export class AppGateway implements OnModuleInit {
  private wss: WebSocketServer;

  onModuleInit() {

    isDev

    this.wss = new WebSocketServer({ port: 3001 });

    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => {
        const payload = message.toString();
        const reply = {
          from: 'server',
          text: payload,
        };
        ws.send(JSON.stringify(reply));
      });
    });
  }
}
