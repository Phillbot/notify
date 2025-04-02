import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "inversify-react";

import { App } from "~web-components/app.component";

import { webContainer } from "./web.module";

import './reset.css'

if (process.env.NODE_ENV === "development") {
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
