const path = require('path');

/* eslint-env node */
module.exports = {
	entry: [
		'babel-polyfill',
		'raf/polyfill',
		'classlist-polyfill',
		'element-dataset',
		'./_js/bundle.js'
	],
	output: {
		path: './resources/',
		publicPath: '/resources/',
		filename: '../js/bundle.js' // I guess this works but it's gross
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
			},
			{
				test: path.resolve(__dirname, '_js/lib/modernizr.js'),
				loaders: [
					'imports?this=>window',
					'exports?window.Modernizr'
				]
			},
			{
				test: /element-dataset/,
				loader: 'apply'
			}
		]
	},
	devtool: 'source-map'
};
