// vite.config.base.ts
import type { UserConfig } from "vite";

const isDev = process.env.NODE_ENV === "development";

export const sharedViteConfig: UserConfig = {
  base: './',
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    sourcemap: isDev,
  },
};
