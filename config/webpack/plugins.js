const path = require("path");
const webpack = require("webpack");

const definePlugin = env =>
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(env)
    }
  });

const ignorePlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

module.exports = {
  definePlugin,
	ignorePlugin
};
