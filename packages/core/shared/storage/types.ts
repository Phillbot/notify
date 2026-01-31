import { createValueToken } from "../di";

export interface IStorageService {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export const IStorageService = createValueToken("IStorageService");
