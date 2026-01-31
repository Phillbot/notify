import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import sassDts from 'vite-plugin-sass-dts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  base: './',
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: `@use "@/styles/mixins" as *;`,
      },
    },
  },
  build: {
    sourcemap: isDev,
  },
  esbuild: {
    jsx: "preserve"
  },
  optimizeDeps: {
    entries: [],
  },
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
      babel: {
        presets: [
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: "automatic" }]
        ],
        plugins: [
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-transform-class-properties", { loose: true }]
        ]
      }
    }),
    sassDts({
      enabledMode: ['development', 'production'],
      sourceDir: resolve(__dirname, 'src'),
      outputDir: resolve(__dirname, 'src/__generated__/styles'),
      legacyFileFormat: false,
    }) as any,
  ],
  resolve: {
    alias: {
      "~core/utils": resolve(__dirname, "../../packages/core/shared/utils"),
      "~core/types": resolve(__dirname, "../../packages/core/shared/types"),
      "~core/di": resolve(__dirname, "../../packages/core/shared/di"),
      "~core/react": resolve(__dirname, "../../packages/core/react"),
      "~core/stores": resolve(__dirname, "../../packages/core/stores"),
      "~web-components": resolve(__dirname, "src/components"),
      "@": resolve(__dirname, "src")
    }
  }
});
