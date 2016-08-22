/* eslint-env node */
const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const scss = require('postcss-scss');

gulp.task('postcss', runPostcss);

gulp.task('watch', function(){
	return watch('./_sass/**/*.scss', runPostcss);
});

function runPostcss(){
	return gulp.src('./_sass/**/*.scss')
		.pipe(postcss([autoprefixer({ cascade: false })], { syntax: scss }))
		.pipe(gulp.dest('./_sass'));
}
