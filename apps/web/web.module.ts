import { ContainerModule } from "inversify";

import { coreContainer } from "~core/core.module"
import { ICounterStore } from "~core/stores/counter/types";

import { WebCounterCore } from "~web-components/counter/counter.store";


export const webContainer = coreContainer.createChild();

const webModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(WebCounterCore).inSingletonScope();
});

webContainer.load(webModule);
