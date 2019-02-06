const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { babelLoader, cssLoader } = require("./loaders");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  externals: {
    react: "react",
    "react-dom": "react-dom"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "dist"),
    library: "@kenshooui/react-multi-select",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [babelLoader, cssLoader]
  }
};
