const path = require('path');
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

module.exports = (storybookBaseConfig, configType) => {
		if (configType === 'PRODUCTION') {
				// see https://github.com/storybooks/storybook/issues/1570
				storybookBaseConfig.plugins = storybookBaseConfig.plugins.filter(plugin => plugin.constructor.name !== 'UglifyJsPlugin')
		}

		storybookBaseConfig.module = {
				rules: [{
						use: 'babel-loader',
						test:  /\.js$/,
						exclude: /node_modules/
				}, {
						test: /\.md$/,
						loader: "raw-loader"
				}, {
						test: /\.json$/,
						loader: 'json-loader'
				}, {
						test: /\.css$/,
						loader: 'style-loader!css-loader'
				}, {
						test: /\.scss$/,
						loaders: [
								"style-loader",
								"css-loader?modules&importLoaders=1&localIdentName=kn-[name]__[local]___[hash:base64:5]",
								"sass-loader"
						]
				}, {
                    test: /\.svg$/,
          loader: "svg-inline-loader?classPrefix"
        }],
		};

		return storybookBaseConfig;
};