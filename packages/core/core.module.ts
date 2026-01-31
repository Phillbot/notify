import { ContainerModule } from "inversify";

import { ICounterStore } from "./stores/counter/types";
import { CoreCounterStore } from "./stores/counter/counter.store";
import { ChatController } from "./stores/chat/chat.controller";

export const coreModule = new ContainerModule((bind) => {
  // Base counter implementation
  bind<ICounterStore>(ICounterStore.$).to(CoreCounterStore);

  // Shared chat controller
  bind(ChatController).toSelf().inSingletonScope();
});
