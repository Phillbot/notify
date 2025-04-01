module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
      "tsconfig.base.json",
      "apps/web/tsconfig.json",
      "apps/mobile/tsconfig.json",
      "packages/core/tsconfig.json"
    ],
    tsconfigRootDir: __dirname,
  },

  env: {
    browser: true,
    es2021: true,
  },

  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: [
          "./tsconfig.base.json",
          "./apps/*/tsconfig.json",
          "./packages/*/tsconfig.json"
        ],
      },
    },
  },

  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint",
    "import"
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],

  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    "@typescript-eslint/no-explicit-any": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "react/prop-types": "off",
    "no-useless-declare": "off",

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "object",
          "type",
          "unknown"
        ],
        pathGroups: [
          {
            pattern: "**/*.module.scss",
            group: "unknown",
            position: "after",
          },
          {
            pattern: "~core/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "~web-components/**",
            group: "internal",
            position: "after",
          }
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always-and-inside-groups",
        alphabetize: {
          order: "ignore",
          caseInsensitive: true,
        },
      },
    ]
  }
};
