import type { Config } from "stylelint";

const config: Config = {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "block-no-empty": true,
    "color-hex-length": "long",
    "declaration-block-no-duplicate-properties": true,
  },
};

export default config;
