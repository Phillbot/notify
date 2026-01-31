import { ContainerModule } from "inversify";

import { coreContainer } from "~core/di";
import { ICounterStore } from "~core/stores/counter";

const coreModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(ICounterStore.useClass);
});

coreContainer.load(coreModule);
