const webpack = require("webpack");
const { TamaguiPlugin } = require("tamagui-loader");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert/"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    zlib: require.resolve("browserify-zlib"),
  });
  // Object.assign(fallback, {
  //   crypto: false,
  //   stream: false,
  //   assert: false,
  //   http: false,
  //   https: false,
  //   os: false,
  //   url: false,
  //   zlib: false
  // });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new TamaguiPlugin({
      config: "./src/tamagui.config.ts",
      components: ["tamagui"], // matching the yarn add you chose above
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
