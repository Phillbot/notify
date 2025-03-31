import "reflect-metadata";
import { Container, ContainerModule } from "inversify";

import { CoreCounterStore } from "~core/stores/counter/counter.store";
import { ICounterStore } from "~core/stores/counter/types";

export const coreContainer = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});

const coreModule = new ContainerModule((bind) => {
  bind<ICounterStore>(ICounterStore.$).to(CoreCounterStore);
});

coreContainer.load(coreModule);

