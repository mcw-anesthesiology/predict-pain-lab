/* eslint-env node */
module.exports = {
	entry: {
		bundle: './_js/bundle.js',
		'research-map': './_js/research-map.js'
	},
	output: {
		path: './js/',
		filename: '[name].js'
	},
	target: 'web',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.yaml$/,
				loader: 'json!yaml'
			}
		]
	},
	devtool: 'source-map'
};
