/**
 * Abstract interface for chat transport layer.
 * Implementations can use WebSocket, Socket.io, or any other protocol.
 */
export interface IChatTransport {
  /**
   * Connect to the chat server.
   */
  connect(url: string): void;

  /**
   * Disconnect from the chat server.
   */
  disconnect(): void;

  /**
   * Send a message to the server.
   */
  send(data: string): void;

  /**
   * Register a callback for incoming messages.
   */
  onMessage(callback: (data: string) => void): void;

  /**
   * Check if the transport is connected.
   */
  get isConnected(): boolean;
}
