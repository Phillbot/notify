# Configuration

Centralized configuration for all application ports and endpoints.

## Ports

| Service           | Port   | Description             |
| ----------------- | ------ | ----------------------- |
| HTTP Server       | `3000` | Main NestJS HTTP API    |
| WebSocket Server  | `3001` | Chat WebSocket server   |
| Web Dev Server    | `5173` | Vite development server |
| Mobile Dev Server | `8081` | Expo development server |

## Usage

### Server (NestJS)

```typescript
import { PORTS } from "~core/config";

// WebSocket Gateway
this.wss = new WebSocketServer({ port: PORTS.SERVER_WS });

// HTTP Server
await app.listen(PORTS.SERVER_HTTP);
```

### Web/Mobile (React)

```typescript
import { getWebSocketUrl } from "~core/config";

// Browser/Emulator (localhost)
chatStore.connect(getWebSocketUrl());

// Physical device (use your local IP)
chatStore.connect(getWebSocketUrl({ deviceIp: "192.168.0.106" }));
```

## Environment Variables

For production, override ports using environment variables:

```bash
# Server
PORT=3000
WS_PORT=3001

# Web
VITE_API_URL=https://api.example.com
VITE_WS_URL=wss://api.example.com
```

## Adding New Endpoints

1. Add port to `PORTS` constant in `endpoints.ts`
2. Add endpoint to `ENDPOINTS` constant
3. Update this README
