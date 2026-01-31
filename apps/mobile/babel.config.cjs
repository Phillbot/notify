module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "~core/utils": "../../packages/core/shared/utils",
            "~core/types": "../../packages/core/shared/types",
            "~core/config": "../../packages/core/shared/config",
            "~core/di": "../../packages/core/shared/di",
            "~core/react": "../../packages/core/react",
            "~core/stores": "../../packages/core/stores",
            "~core": "../../packages/core",
            "@": "./src",
          },
        },
      ],
    ],
  };
};
