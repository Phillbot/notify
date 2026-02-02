import { mergeConfig, defineConfig } from "vitest/config";
import path from "path";
import swc from "unplugin-swc";

import baseConfig from "../../vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "node",
      include: ["src/**/*.{test,spec}.ts"],
      globals: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
);
