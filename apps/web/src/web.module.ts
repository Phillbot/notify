import { ContainerModule } from "inversify";

import { coreModule } from "~core/core.module";
import { coreContainer } from "~core/di";
import { IStorageService } from "~core/shared/storage";
import { IChatStore, IChatTransport, ChatStore } from "~core/stores/chat";
import { ICounterStore } from "~core/stores/counter";

import { WebCounterCore } from "@/features/counter/ui/counter.store";
import { WebStorageService } from "@/features/storage/web-storage.service";
import { WebSocketTransport } from "@/lib/transport";

// Load base core dependencies
if (!coreContainer.isBound(ICounterStore.$)) {
  coreContainer.load(coreModule);
}

export const webContainer = coreContainer.createChild();

const webModule = new ContainerModule((bind) => {
  // Override base counter with web implementation
  bind<ICounterStore>(ICounterStore.$).to(WebCounterCore);

  // Register transports and stores for Web
  bind<IChatTransport>(IChatTransport.$).to(WebSocketTransport).inSingletonScope();
  bind<IChatStore>(IChatStore.$).to(ChatStore).inSingletonScope();

  // Storage
  bind<IStorageService>(IStorageService.$).to(WebStorageService).inSingletonScope();
});

webContainer.load(webModule);
