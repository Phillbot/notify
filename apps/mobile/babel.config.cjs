module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    assumptions: {
      setPublicClassFields: true,
      privateFieldsAsProperties: true,
    },
    plugins: [
      "babel-plugin-transform-typescript-metadata",
      [
        require.resolve("@babel/plugin-transform-typescript"),
        { allowDeclareFields: true },
      ],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        require.resolve("@babel/plugin-transform-flow-strip-types"),
        { allowDeclareFields: true },
      ],
      [
        require.resolve("@babel/plugin-transform-class-properties"),
        { loose: true },
      ],
      [
        require.resolve("@babel/plugin-transform-private-methods"),
        { loose: true },
      ],
      [
        require.resolve("@babel/plugin-transform-private-property-in-object"),
        { loose: true },
      ],
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
