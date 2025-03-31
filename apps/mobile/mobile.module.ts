import { ContainerModule } from "inversify";

import { coreContainer } from "~core/core.module"

export const mobileContainer = coreContainer.createChild();

const mobileModule = new ContainerModule(() => { });

mobileContainer.load(mobileModule);
