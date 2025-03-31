import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { sharedViteConfig } from "../../vite.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  ...sharedViteConfig,
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
        plugins: [
          "babel-plugin-transform-typescript-metadata",
          ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      },
    }),
  ],
  root: __dirname,
  resolve: {
    alias: {
      "~core": resolve(__dirname, "../../packages/core"),
      "~web-components": resolve(__dirname, "components"),
    },
  },
});
