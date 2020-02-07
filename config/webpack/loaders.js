const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelLoader = {
  test: /(\.jsx|\.js)$/,
  loader: "babel-loader",
  exclude: /(node_modules(?!\/webpack-dev-server)|bower_components)/
};

const cssLoader = {
  test: /(\.s[ac]ss|\.css)/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader:
        "css-loader?modules&importLoaders=true&localIdentName=kn-[name]__[local]___[hash:base64:5]"
    },
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        sassOptions: {
          fiber: true
        }
      }
    }
  ]
};

const pngLoader = {
  test: /\.png$/,
  loader: "url-loader?limit=10000&mimetype=image/png"
};

const mdLoader = {
  test: /\.md$/,
  loader: "raw"
};

const jsonLoader = {
  test: /\.json$/,
  loader: "json"
};

const svgLoader = {
  test: /\.svg$/,
  loader: "svg-inline-loader?classPrefix"
};

module.exports = {
  babelLoader,
  cssLoader,
  pngLoader,
  mdLoader,
  jsonLoader,
  svgLoader
};
