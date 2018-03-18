const merge = require("webpack-merge");

const common = require("./webpack.common.js");
const { definePlugin } = require("./plugins");

module.exports = merge(common, {
  plugins: [definePlugin("production")]
});
