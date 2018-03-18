const path = require("path");
const { babelLoader, cssLoader, mdLoader, pngLoader, jsonLoader, svgLoader } = require("./loaders");

module.exports = {
  entry: {
    index: "./index.js"
  },
  externals: {
    react: "react",
    "react-dom": "react-dom"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "dist"),
    library: "@kenshooui/react-multi-select",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [babelLoader, cssLoader, mdLoader, pngLoader, jsonLoader, svgLoader]
  }
};
