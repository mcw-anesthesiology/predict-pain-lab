/* eslint-env node */
module.exports = {
	entry: './_js/index.js',
	output: {
		path: './js/',
		filename: 'bundle.js'
	},
	target: 'web',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	devtool: 'source-map'
};
