import { ContainerModule } from "inversify";

import { coreContainer } from "~core/di";
import { ICounterStore } from "~core/stores/counter";
import { IChatStore, IChatTransport, ChatStore } from "~core/stores/chat";

import { WebCounterCore } from "@/features/counter/ui/counter.store";

import { WebSocketTransport } from "@/lib/transport";

export const webContainer = coreContainer.createChild();

const webModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(WebCounterCore);
  bind<IChatTransport>(IChatTransport.$).to(WebSocketTransport).inSingletonScope();
  bind<IChatStore>(IChatStore.$).to(ChatStore).inSingletonScope();
});

webContainer.load(webModule);
