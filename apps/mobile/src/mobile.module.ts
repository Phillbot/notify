import { ContainerModule } from "inversify";

import { coreContainer } from "~core/di";

export const mobileContainer = coreContainer.createChild();

const mobileModule = new ContainerModule(() => { });

mobileContainer.load(mobileModule);
