module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "~core/utils": "../../packages/core/shared/utils",
            "~core/types": "../../packages/core/shared/types",
            "~core/config": "../../packages/core/shared/config",
            "~core/di": "../../packages/core/shared/di",
            "~core/react": "../../packages/core/react",
            "~core/stores": "../../packages/core/stores",
          },
        },
      ],
      ["@babel/plugin-transform-typescript", { allowDeclareFields: true }],
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ],
  };
};
