import path from "path";
import { mergeConfig, defineConfig } from "vitest/config";
import baseConfig from "../../vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "node", // Or 'jsdom' if testing components later
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~mobile/src": path.resolve(__dirname, "./src"),
      },
    },
  })
);
