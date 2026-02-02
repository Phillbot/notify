import path from "path";

import { mergeConfig, defineConfig } from "vitest/config";

import baseConfig from "../../vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "node",
      include: ["**/*.{test,spec}.{ts,tsx}"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
        "~core/utils": path.resolve(__dirname, "./shared/utils"),
        "~core/types": path.resolve(__dirname, "./shared/types"),
        "~core/config": path.resolve(__dirname, "./shared/config"),
        "~core/di": path.resolve(__dirname, "./shared/di"),
        "~core/stores": path.resolve(__dirname, "./stores"),
        "~core/react": path.resolve(__dirname, "./react"),
      },
    },
  })
);
