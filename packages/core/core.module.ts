import { ContainerModule } from "inversify";

import { coreContainer } from "./shared/di/container";
import { ICounterStore } from "./stores/counter/types";

const coreModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(ICounterStore.useClass);
});

coreContainer.load(coreModule);

