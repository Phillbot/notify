/* eslint-env node */
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],

  plugins: ["@stylistic/stylelint-plugin"],

  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
      rules: {
        "@stylistic/block-closing-brace-newline-after": null,
        "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-else-empty-line-before": "never",
      },
    },
  ],

  rules: {
    "@stylistic/indentation": 2,
    "@stylistic/block-closing-brace-newline-after": [
      "always",
      {
        ignoreAtRules: ["else"],
      },
    ],
    "@stylistic/block-opening-brace-space-before": "always",
    "@stylistic/declaration-block-semicolon-newline-after": "always",
    "@stylistic/no-eol-whitespace": true,

    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "value-keyword-case": [
      "lower",
      {
        ignoreKeywords: ["currentColor", "optimizeLegibility"],
      },
    ],
    "color-hex-length": "long",
    "block-no-empty": true,
    "declaration-block-no-duplicate-properties": true,
    "property-no-vendor-prefix": null,
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]+)?(__([a-z0-9-]+))?(_([a-z0-9-]+))?$",
      {
        message: "Expected class selector to be BEM kebab-case (e.g., .block__element_modifier)",
      },
    ],
  },
};
