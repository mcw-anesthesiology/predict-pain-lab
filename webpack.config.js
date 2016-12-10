/* eslint-env node */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		bundle: [
			'babel-polyfill',
			'raf/polyfill',
			'classlist-polyfill',
			'element-dataset',
			'./_js/bundle.js'
		],
		blog: './_js/blog.js',
		people: './_js/people.js'
	},
	output: {
		path: './resources/',
		publicPath: '/resources/',
		filename: '../js/[name].js' // I guess this works but it's gross
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.html$/,
				loaders: [
					'babel-loader',
					'svelte-loader'
				]
			},
			{
				test: /\.yaml$/,
				loaders: [
					'json-loader',
					'yaml-loader'
				]
			},
			{
				test: /\.svg/,
				include: /_includes/,
				loader: 'raw-loader'
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
				include: /node_modules/,
				loader: 'file-loader'
			},
			{
				test: path.resolve(__dirname, '_js/lib/modernizr.js'),
				loaders: [
					'imports-loader?this=>window',
					'exports-loader?window.Modernizr'
				]
			},
			{
				test: /element-dataset/,
				loader: 'apply-loader'
			}
		]
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsFilename: '../js/stats.json'
		})
	],
	devtool: 'source-map'
};
