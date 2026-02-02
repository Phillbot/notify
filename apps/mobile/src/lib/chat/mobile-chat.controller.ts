import { injectable } from "inversify";

import { ChatController } from "~core/stores/chat";

import { getMobileWebSocketUrl } from "../config/mobile-endpoints";

/**
 * Mobile-specific ChatController that uses correct WebSocket URL for Android/iOS
 */
@injectable()
export class MobileChatController extends ChatController {
  public override async init(): Promise<void> {
    // Use mobile-specific WebSocket URL
    this._chatStore.connect(getMobileWebSocketUrl());
    await this.restoreSession();
  }
}
