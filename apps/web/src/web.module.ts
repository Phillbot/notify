import { ContainerModule } from "inversify";

import { coreContainer } from "~core/di";

import { ICounterStore } from "~core/stores/counter";

import { WebCounterCore } from "~web-components/counter/counter.store";

export const webContainer = coreContainer.createChild();

const webModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(WebCounterCore);
});

webContainer.load(webModule);
