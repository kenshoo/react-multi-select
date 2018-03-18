const path = require("path");
const { babelLoader, cssLoader, mdLoader, pngLoader, jsonLoader, svgLoader } = require("./loaders");
const { ignorePlugin } = require("./plugins");

module.exports = {
  entry: {
    index: "./src/index.js",
    table: "./src/components/table/index.js",
  },
  plugins: [ignorePlugin],
  externals: {
    react: "react",
    "react-dom": "react-dom"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "dist"),
    library: "kenshoo-shared",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [babelLoader, cssLoader, mdLoader, pngLoader, jsonLoader, svgLoader]
  }
};
