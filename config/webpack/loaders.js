const babelLoader = {
  test: /(\.jsx|\.js)$/,
  loader: "babel-loader",
  exclude: /(node_modules(?!\/webpack-dev-server)|bower_components)/
};

const cssLoader = {
  test: /(\.scss|\.css)/,
  loaders: [
    "style-loader",
    "css-loader?modules&importLoaders=1&localIdentName=kn-[name]__[local]___[hash:base64:5]",
    "sass-loader"
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
