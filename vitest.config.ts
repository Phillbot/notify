import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  test: {
    globals: true,
    api: {
      host: "0.0.0.0",
      port: 51204,
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.test.ts",
        "**/*.spec.ts",
        "vitest.config.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "~core/utils": "/home/plbt/dev/notify/packages/core/shared/utils",
      "~core/types": "/home/plbt/dev/notify/packages/core/shared/types",
      "~core/config": "/home/plbt/dev/notify/packages/core/shared/config",
      "~core/di": "/home/plbt/dev/notify/packages/core/shared/di",
      "~core/stores": "/home/plbt/dev/notify/packages/core/stores",
      "~core/react": "/home/plbt/dev/notify/packages/core/react",
    },
  },
});
