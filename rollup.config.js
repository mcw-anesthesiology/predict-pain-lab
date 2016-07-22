// Not using this, using webpack for the web

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: './_js/index.js',
	dest: './js/bundle.js',
	format: 'umd',
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		nodeResolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs(),
		uglify()
	]
};
