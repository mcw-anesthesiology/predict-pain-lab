/* eslint-env node */
module.exports = {
	entry: {
		bundle: './_js/bundle.js'
	},
	output: {
		path: './resources/',
		publicPath: '/resources/',
		filename: '../js/[name].js' // I guess this works but it's gross
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
				loaders: [
					'json',
					'yaml'
				]
			},
			{
				test: /\.svg/,
				include: /_includes/,
				loader: 'raw'
			},
			{
				test: /\.css$/,
				loaders: [
					'style',
					'css'
				]
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
				include: /node_modules/,
				loader: 'file'
			}
		]
	},
	devtool: 'source-map'
};
