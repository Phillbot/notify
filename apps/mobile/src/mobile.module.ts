import { ContainerModule } from "inversify";

import { coreContainer } from "~core/di";

import { ICounterStore, CoreCounterStore } from "~core/stores/counter";

export const mobileContainer = coreContainer.createChild();

const mobileModule = new ContainerModule((bind) => {
    bind<ICounterStore>(ICounterStore.$).to(CoreCounterStore);
});

mobileContainer.load(mobileModule);
