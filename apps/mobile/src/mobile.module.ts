import { ContainerModule } from "inversify";

import { coreModule } from "~core/core.module";
import { coreContainer } from "~core/di";
import { IStorageService } from "~core/shared/storage";
import { IChatStore, IChatTransport, ChatStore } from "~core/stores/chat";
import { ICounterStore, CoreCounterStore } from "~core/stores/counter";

import { NativeStorageService } from "./features/storage/native-storage.service";
import { RNWebSocketTransport } from "./lib/transport";

// Load base core dependencies
if (!coreContainer.isBound(ICounterStore.$)) {
  coreContainer.load(coreModule);
}

export const mobileContainer = coreContainer.createChild();

const mobileModule = new ContainerModule((bind) => {
  // Use standard CoreCounterStore for mobile
  bind<ICounterStore>(ICounterStore.$).to(CoreCounterStore);

  bind<IChatTransport>(IChatTransport.$).to(RNWebSocketTransport).inSingletonScope();
  bind<IChatStore>(IChatStore.$).to(ChatStore).inSingletonScope();

  // Storage
  bind<IStorageService>(IStorageService.$).to(NativeStorageService).inSingletonScope();
});

mobileContainer.load(mobileModule);
