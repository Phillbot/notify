import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "inversify-react";

import { isDev } from "~core/utils";

import { App } from "~web-components/app.component";

import { webContainer } from "./web.module";

import './reset.css'

if (isDev()) {
  console.log("Hey dev! 🎯");
}

const appRoot = document.getElementById("root");

if (!appRoot) {
  throw new Error('root node is not exist');
}

createRoot(appRoot).render(
  <StrictMode>
    <Provider container={webContainer}>
      <App />
    </Provider>
  </StrictMode>
);
