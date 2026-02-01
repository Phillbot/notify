import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { inject, injectable } from "inversify";

import { IChatStore } from "./types";
import { getWebSocketUrl } from "../../shared/config";
import { IStorageService } from "../../shared/storage";

const NICKNAME_KEY = "chat_nickname";

@injectable()
export class ChatController {
  @observable
  public message = "";

  @observable
  public tempNickname = "";

  @inject(IChatStore.$)
  protected readonly _chatStore!: IChatStore;

  @inject(IStorageService.$)
  private readonly _storageService!: IStorageService;

  constructor() {
    makeObservable(this);
  }

  public async init(): Promise<void> {
    this._chatStore.connect(getWebSocketUrl());
    await this.restoreSession();
  }

  protected async restoreSession(): Promise<void> {
    try {
      const savedNickname = await this._storageService.getItem(NICKNAME_KEY);
      if (savedNickname) {
        runInAction(() => {
          this.tempNickname = savedNickname;
          this._chatStore.setUserName(savedNickname);
        });
      }
    } catch (error) {
      console.warn("Failed to restore session", error);
    }
  }

  @action
  public setTempNickname(name: string): void {
    this.tempNickname = name;
  }

  @action
  public setMessage(text: string): void {
    this.message = text;
  }

  @action
  public join(): void {
    const name = this.tempNickname.trim();
    if (name) {
      this._chatStore.setUserName(name);
      this._storageService.setItem(NICKNAME_KEY, name).catch(console.warn);
    }
  }

  @action
  public logout(): void {
    this._chatStore.setUserName("");
    this.tempNickname = "";
    this._storageService.removeItem(NICKNAME_KEY).catch(console.warn);
  }

  @action
  public sendMessage(): void {
    if (this.message.trim()) {
      this._chatStore.sendMessage(this.message);
      this.message = "";
    }
  }

  @computed
  public get isConnected(): boolean {
    return this._chatStore.isConnected;
  }

  @computed
  public get userName(): string {
    return this._chatStore.userName;
  }

  @computed
  public get connectionUrl(): string {
    return this._chatStore.connectionUrl;
  }

  @computed
  public get messages() {
    return this._chatStore.messages;
  }
}
