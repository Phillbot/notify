import { Provider } from "inversify-react";

import { mobileContainer } from "./mobile.module";
import { App } from "./App";

export const Main = () => (
  <Provider container={mobileContainer}>
    <App />
  </Provider>
)
