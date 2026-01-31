import { ContainerModule } from "inversify";

import { coreContainer } from "~core/di";

import { ICounterStore, CoreCounterStore } from "~core/stores/counter";
import { IChatStore, IChatTransport, ChatStore } from "~core/stores/chat";

import { RNWebSocketTransport } from "./lib/transport";

export const mobileContainer = coreContainer.createChild();

const mobileModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(CoreCounterStore);
  bind<IChatTransport>(IChatTransport.$)
    .to(RNWebSocketTransport)
    .inSingletonScope();
  bind<IChatStore>(IChatStore.$).to(ChatStore).inSingletonScope();
});

mobileContainer.load(mobileModule);
